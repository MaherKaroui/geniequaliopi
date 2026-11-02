"""Écrit src/lib/edofAuto/rs7650Layout.ts à partir des relevés PyMuPDF (coordonnées en points,
origine en haut à gauche comme dans PyMuPDF ; la conversion pdf-lib se fait au remplissage)."""
import json, sys
theo = json.load(open("theo_layout.json", encoding="utf-8"))
prat = json.load(open("prat.json", encoding="utf-8"))

Q = []
for pi, p in enumerate(theo):
    for q in p["questions"]:
        Q.append({
            "page": pi,
            "titre": q["title"].replace("Question : ", "").replace("Question :", "").strip(),
            "options": [[o["n"], o["x"], o["y"], o["y2"]] for o in q["opts"]],
            "note": q["score"],
            "lignes": q["lines"],
        })
assert len(Q) == 37, len(Q)
totaux6 = theo[5]["totals"]

# Grille pratique : lignes de cases (NA, A) regroupées par compétence
def rows(page):
    r = {}
    for b in prat[page]["boxes"]:
        r.setdefault(round(b[1] / 3), []).append(b)
    out = []
    for k in sorted(r):
        v = sorted(r[k], key=lambda b: b[0])
        assert len(v) == 2, v
        out.append([page] + v[0] + v[1][:1] + [v[1][2]])  # page, NA x0,y0,x1,y1, A x0, A x1
    return out

p1, p2, p3, p4, p5 = rows(0), rows(1), rows(2), rows(3), rows(4)
comp = [p1, p2[:5], p2[5:] + p3[:2], p3[2:], p4, p5]
assert [len(c) for c in comp] == [5, 5, 7, 9, 11, 5], [len(c) for c in comp]

def r1(v):
    return [round(x, 1) for x in v]

lines = []
lines.append("// Généré par scripts/edof-auto (relevé PyMuPDF des PDF du certificateur EYES PERFECT).")
lines.append("// Coordonnées en points, origine en HAUT à gauche ; conversion pdf-lib au remplissage.")
lines.append("")
lines.append("export interface QuestionTheoLayout { page: number; titre: string; options: [number, number, number, number][]; note: [number, number, number] | null; lignes: [number, number, number, number][] }")
lines.append("")
lines.append("/** 37 questions de l'évaluation théorique FS063, dans l'ordre de lecture (colonne gauche puis droite). */")
lines.append("export const THEO_QUESTIONS: QuestionTheoLayout[] = [")
for q in Q:
    lines.append("  " + json.dumps({"page": q["page"], "titre": q["titre"], "options": [r1(o) for o in q["options"]], "note": r1(q["note"]) if q["note"] else None, "lignes": [r1(l) for l in q["lignes"]]}, ensure_ascii=False) + ",")
lines.append("];")
lines.append("")
lines.append("/** Totaux de section de la page 6 (« /3 » hygiène, « /4 » technique) : [x, y0, y1, libellé]. */")
lines.append("export const THEO_TOTAUX_P6: [number, number, number, string][] = " + json.dumps([[round(t[0], 1), round(t[1], 1), round(t[2], 1), t[3]] for t in totaux6], ensure_ascii=False) + ";")
lines.append("")
lines.append("/** Grille pratique FS055 : par compétence, une ligne par critère = [page, NA x0, y0, x1, y1, A x0, A x1]. */")
lines.append("export const PRAT_CRITERES: number[][][] = " + json.dumps([[r1(r) for r in c] for c in comp]) + ";")
lines.append("")
open(sys.argv[1], "w", encoding="utf-8").write("\n".join(lines))
print("ok", len(Q), [len(c) for c in comp], totaux6)
