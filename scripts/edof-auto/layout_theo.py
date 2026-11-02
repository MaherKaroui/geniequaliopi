"""Extrait la mise en page de l'évaluation théorique RS7650 (FS063) :
questions, options numérotées, zones de réponse libre et cases de note « /1 »."""
import fitz, json, re, sys

src = sys.argv[1]
d = fitz.open(src)
out = {"pages": []}
for pi, p in enumerate(d):
    lines = []
    for b in p.get_text("dict")["blocks"]:
        for l in b.get("lines", []):
            spans = [s for s in l["spans"] if s["text"].strip()]
            if not spans:
                continue
            t = "".join(s["text"] for s in l["spans"]).strip()
            lines.append({"t": t, "bbox": l["bbox"], "spans": [(s["text"], s["bbox"]) for s in spans]})
    lines.sort(key=lambda l: (l["bbox"][0] > 390, l["bbox"][1]))
    qs = []
    scores = []
    dots = []
    for l in lines:
        t = l["t"]
        x0, y0, x1, y1 = l["bbox"]
        if t.startswith("/") and len(t) <= 3:
            scores.append([round(x0, 1), round(y0, 1), round(x1, 1), round(y1, 1), t])
            continue
        if re.fullmatch(r"[.…\s]{10,}", t) or re.fullmatch(r"\d\.\s*[.…]{10,}", t):
            dots.append([round(x0, 1), round(y0, 1), round(x1, 1), round(y1, 1)])
            continue
        if t.startswith("Question") or t.isupper() and len(t) > 8 and x0 < 470 and not t.startswith("Mise") and "MISE EN" not in t and "EVALUATION" not in t and "EXTENSION" not in t and "PERFECT" not in t and "RESERVE" not in t and "CANDIDAT" not in t and "PARIS" not in t:
            qs.append({"title": t, "bbox": [round(v, 1) for v in l["bbox"]], "options": []})
            continue
        m = re.match(r"^(\d)\.\s*(.*)$", t)
        if m and qs:
            # position du numéro : premier span contenant le chiffre
            nb = None
            for txt, bb in l["spans"]:
                if txt.strip().startswith(m.group(1)):
                    nb = bb
                    break
            nb = nb or l["bbox"]
            qs[-1]["options"].append({"n": int(m.group(1)), "label": m.group(2), "num": [round(v, 1) for v in nb[:2]] + [round(nb[0] + 9, 1), round(nb[3], 1)], "bbox": [round(v, 1) for v in l["bbox"]]})
        elif re.fullmatch(r"\d\.", t) and qs:
            qs[-1]["options"].append({"n": int(t[0]), "label": "", "num": [round(v, 1) for v in l["bbox"]], "bbox": [round(v, 1) for v in l["bbox"]]})
        elif qs and qs[-1]["options"] and qs[-1]["options"][-1]["label"] == "" and abs(y0 - qs[-1]["options"][-1]["bbox"][1]) < 4:
            qs[-1]["options"][-1]["label"] = t
    out["pages"].append({"w": p.rect.width, "h": p.rect.height, "questions": qs, "scores": scores, "dots": dots})

json.dump(out, open(sys.argv[2], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for i, pg in enumerate(out["pages"]):
    print("PAGE", i + 1, "questions", len(pg["questions"]), "scores", len(pg["scores"]), "dots", len(pg["dots"]))
    for q in pg["questions"]:
        print("  Q", q["bbox"][:2], q["title"][:70], "| opts", [(o["n"], o["label"][:25]) for o in q["options"]])
    print("  scores", [s[:2] + [s[4]] for s in pg["scores"]])
    print("  dots", [x[:2] for x in pg["dots"]])
