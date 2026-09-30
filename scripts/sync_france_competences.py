#!/usr/bin/env python3
"""
Synchronise la base locale des certifications RNCP / RS avec France Compétences.

Source : export open data quotidien de France Compétences publié sur data.gouv.fr
(jeu « Répertoire national des certifications professionnelles et répertoire
spécifique », id 5eebbc067a14b6fecc9c9976, flux XML v4.1).

Sortie (servie statiquement par l'application, chargée à la demande ; .fcz = JSON gzip) :
  public/france-competences/meta.json          date de l'export, volumes
  public/france-competences/index.fcz          toutes les fiches (actives et inactives) : code, intitulé,
                                               niveau, statut, échéance, remplaçante
  public/france-competences/fiches/<clé>.fcz   détail des fiches ACTIVES, par paquet de codes
                                               (blocs + compétences + modalités d'évaluation, ROME,
                                               activités, capacités, prérequis, voies d'accès…)

Usage : python scripts/sync_france_competences.py [--work <dossier de travail>]
Rien n'est inventé : chaque champ est recopié de l'export officiel.
"""
import argparse, gzip, json, os, re, shutil, subprocess, sys, urllib.request, zipfile, xml.etree.ElementTree as ET
from datetime import date

DATASET = "5eebbc067a14b6fecc9c9976"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "france-competences")


def http_get(url, dest=None):
    """urllib, puis curl si le magasin de certificats de Python est périmé."""
    try:
        if dest:
            urllib.request.urlretrieve(url, dest)
            return None
        with urllib.request.urlopen(url) as r:
            return r.read()
    except Exception as e:
        if not shutil.which("curl"):
            raise
        print("urllib a échoué (", e, "), passage par curl", file=sys.stderr)
        if dest:
            subprocess.run(["curl", "-sSL", "-o", dest, url], check=True)
            return None
        return subprocess.run(["curl", "-sSL", url], check=True, capture_output=True).stdout


def latest_resources():
    d = json.loads(http_get(f"https://www.data.gouv.fr/api/1/datasets/{DATASET}/"))
    res = {}
    for x in d["resources"]:
        t = x["title"]
        for kind in ("rncp", "rs"):
            if re.match(rf"export-fiches-{kind}-v4-1-\d{{4}}-\d{{2}}-\d{{2}}\.zip$", t):
                if kind not in res or t > res[kind]["title"]:
                    res[kind] = x
    return res


def download(url, path):
    if os.path.exists(path):
        return path
    print("téléchargement", url, file=sys.stderr)
    http_get(url, path)
    return path


def txt(el, path):
    v = el.findtext(path)
    return re.sub(r"\s+", " ", v).strip() if v else ""


def split_list(s):
    """Les listes de l'export sont des textes où les éléments sont séparés par des tirets ou des doubles espaces."""
    if not s:
        return []
    parts = re.split(r"\s{2,}|\s-\s|^-\s|\n|•|;(?=\s*[A-ZÉÈÀ])", s)
    out = []
    for p in parts:
        p = p.strip(" -–•\t")
        if len(p) >= 12 and p not in out:
            out.append(p)
    return out[:40]


def cut(s, n):
    s = s or ""
    return s if len(s) <= n else s[: n - 1].rsplit(" ", 1)[0] + "…"


def cut_list(items, n_items, n_chars):
    return [cut(x, n_chars) for x in items[:n_items]]


def fr_to_iso(d):
    m = re.match(r"(\d{2})/(\d{2})/(\d{4})", d or "")
    return f"{m.group(3)}-{m.group(2)}-{m.group(1)}" if m else ""


def parse(xml_path, kind, index, details):
    n = 0
    for _, el in ET.iterparse(xml_path):
        if el.tag != "FICHE":
            continue
        n += 1
        code = txt(el, "NUMERO_FICHE")
        actif = txt(el, "ACTIF").lower() == "oui"
        certifs = [txt(c, "NOM_CERTIFICATEUR") for c in el.findall("CERTIFICATEURS/CERTIFICATEUR") if txt(c, "ETAT_CERTIFICATEUR") != "Inactif"]
        certifs = list(dict.fromkeys(c for c in certifs if c))
        nouvelles = [txt(c, "ID_FICHE_NOUVELLE_CERTIFICATION") for c in el.findall("NOUVELLES_CERTIFICATIONS/NOUVELLE_CERTIFICATION")]
        niveau = txt(el, "NOMENCLATURE_EUROPE/NIVEAU").replace("NIV", "")
        abrege = txt(el, "ABREGE/CODE")
        intitule = txt(el, "INTITULE")
        entry = {
            "c": code, "i": intitule, "a": abrege, "n": niveau, "t": kind.upper(),
            "on": actif, "fin": fr_to_iso(txt(el, "DATE_FIN_ENREGISTREMENT")),
            "cert": certifs[:3],
        }
        if nouvelles:
            entry["new"] = [x for x in nouvelles if x]
        # Index : fiche inactive réduite à l'essentiel (alerte + remplaçante éventuelle).
        index.append(entry if actif else {k: v for k, v in entry.items() if k in ("c", "i", "a", "n", "on", "fin", "new")})
        if actif:
            blocs = []
            for b in el.findall("BLOCS_COMPETENCES/BLOC_COMPETENCES")[:14]:
                blocs.append({
                    "code": txt(b, "CODE"), "libelle": txt(b, "LIBELLE"),
                    "competences": cut_list(split_list(b.findtext("LISTE_COMPETENCES") or ""), 8, 200),
                    "modalites": cut(txt(b, "MODALITES_EVALUATION"), 350),
                })
            voies = [lbl for tag, lbl in (("SI_JURY_FI", "Formation initiale"), ("SI_JURY_CA", "Apprentissage"), ("SI_JURY_FC", "Formation continue"), ("SI_JURY_CQ", "Contrat de professionnalisation"), ("SI_JURY_CL", "Candidature individuelle"), ("SI_JURY_VAE", "VAE")) if txt(el, f"{tag}/ACTIF").lower() == "oui"]
            stats = []
            for s in el.findall("STATISTIQUES_PROMOTIONS/STATISTIQUES_PROMOTION"):
                stats.append({"annee": txt(s, "ANNEE"), "certifies": txt(s, "NOMBRE_CERTIFIES"), "certifiesVae": txt(s, "NOMBRE_CERTIFIES_VAE"), "insertion6mois": txt(s, "TAUX_INSERTION_GLOBAL_6MOIS"), "insertionMetier2ans": txt(s, "TAUX_INSERTION_METIER_2ANS")})
            details[code] = {
                **entry,
                "abregeLibelle": txt(el, "ABREGE/LIBELLE"),
                "dateDecision": fr_to_iso(txt(el, "DATE_DECISION")),
                "dateEffet": fr_to_iso(txt(el, "DATE_EFFET")),
                "typeEnregistrement": txt(el, "TYPE_ENREGISTREMENT"),
                "objectifs": cut(txt(el, "OBJECTIFS_CONTEXTE"), 400),
                "activites": cut_list(split_list(el.findtext("ACTIVITES_VISEES") or ""), 8, 180),
                # Les capacités ne servent qu'aux fiches sans blocs (la plupart des RS).
                "capacites": cut_list(split_list(el.findtext("CAPACITES_ATTESTEES") or ""), 0 if blocs else 10, 220),
                "modalitesEvaluation": cut(txt(el, "MODALITES_EVALUATION"), 800),
                "prerequis": cut(txt(el, "PREREQUIS_ENTREE_FORMATION"), 500),
                "prerequisValidation": cut(txt(el, "PREREQUIS_VALIDATION_CERTIFICATION"), 300),
                "secteurs": cut(txt(el, "SECTEURS_ACTIVITE"), 400),
                "typesEmplois": cut(txt(el, "TYPE_EMPLOI_ACCESSIBLES"), 400),
                "rome": [{"code": txt(r, "CODE"), "libelle": txt(r, "LIBELLE")} for r in el.findall("CODES_ROME/ROME")],
                "formacodes": [{"code": txt(r, "CODE"), "libelle": txt(r, "LIBELLE")} for r in el.findall("FORMACODES/FORMACODE")],
                "nsf": [{"code": txt(r, "CODE"), "libelle": txt(r, "LIBELLE")} for r in el.findall("CODES_NSF/NSF")],
                "blocs": blocs,
                "voies": voies,
                "stats": stats[-3:],
                "anciennes": [txt(c, "ID_FICHE_ANCIENNE_CERTIFICATION") for c in el.findall("ANCIENNES_CERTIFICATIONS/ANCIENNE_CERTIFICATION")],
                "url": f"https://www.francecompetences.fr/recherche/{kind}/{re.sub(r'^[A-Z]+', '', code)}/",
            }
        el.clear()
    return n


def shard_key(code):
    """RNCP39030 → RNCP390 ; RS7482 → RS74 : paquets de quelques centaines de Ko."""
    m = re.match(r"([A-Z]+)(\d+)", code)
    if not m:
        return "divers"
    p, d = m.groups()
    return f"{p}{d[:3]}" if p == "RNCP" else f"{p}{d[:2]}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--work", default=os.path.join(ROOT, ".fc-cache"))
    a = ap.parse_args()
    os.makedirs(a.work, exist_ok=True)
    res = latest_resources()
    index, details, volumes, export_date = [], {}, {}, ""
    for kind in ("rncp", "rs"):
        r = res[kind]
        export_date = max(export_date, re.search(r"(\d{4}-\d{2}-\d{2})", r["title"]).group(1))
        zpath = download(r["url"], os.path.join(a.work, r["title"]))
        with zipfile.ZipFile(zpath) as z:
            name = z.namelist()[0]
            xml_path = os.path.join(a.work, name)
            if not os.path.exists(xml_path):
                z.extract(name, a.work)
        volumes[kind] = parse(xml_path, kind, index, details)
    os.makedirs(os.path.join(OUT, "fiches"), exist_ok=True)
    for f in os.listdir(os.path.join(OUT, "fiches")):
        os.remove(os.path.join(OUT, "fiches", f))
    shards = {}
    for code, d in details.items():
        shards.setdefault(shard_key(code), {})[code] = d
    # JSON compressé en gzip, extension neutre « .fcz » pour qu'aucun hébergeur n'ajoute
    # d'en-tête Content-Encoding : le navigateur décompresse avec DecompressionStream.
    def dump_gz(obj, path):
        raw = json.dumps(obj, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        with open(path, "wb") as fh:
            fh.write(gzip.compress(raw, compresslevel=9, mtime=0))
    for k, v in shards.items():
        dump_gz(v, os.path.join(OUT, "fiches", f"{k}.fcz"))
    index.sort(key=lambda e: e["c"])
    dump_gz(index, os.path.join(OUT, "index.fcz"))
    if os.path.exists(os.path.join(OUT, "index.json")):
        os.remove(os.path.join(OUT, "index.json"))
    meta = {"source": f"https://www.data.gouv.fr/datasets/{DATASET}/", "exportDate": export_date, "syncDate": date.today().isoformat(),
            "fiches": len(index), "actives": len(details), "volumes": volumes, "shards": len(shards)}
    with open(os.path.join(OUT, "meta.json"), "w", encoding="utf-8") as fh:
        json.dump(meta, fh, ensure_ascii=False, indent=1)
    print(json.dumps(meta, ensure_ascii=False))


if __name__ == "__main__":
    main()
