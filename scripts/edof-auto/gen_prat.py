"""Mise en page FS055 : cases NA/A par critère, totaux, champs d'en-tête."""
import fitz, json, sys
d = fitz.open(sys.argv[1])
res = []
for pi, p in enumerate(d):
    boxes = []
    labels = []
    for b in p.get_text("rawdict")["blocks"]:
        for l in b.get("lines", []):
            txt = "".join(c["c"] for s in l["spans"] for c in s["chars"]).strip()
            for s in l["spans"]:
                for c in s["chars"]:
                    if c["c"] in "□☐":
                        x0, y0, x1, y1 = c["bbox"]
                        boxes.append([round(x0, 1), round(y0, 1), round(x1, 1), round(y1, 1)])
            if txt and not set(txt) <= set("□☐ "):
                labels.append([round(v, 1) for v in l["bbox"]] + [txt[:60]])
    # dédoublonnage
    uniq = []
    for bx in sorted(boxes, key=lambda b: (round(b[1]), b[0])):
        if not any(abs(bx[0] - u[0]) < 2 and abs(bx[1] - u[1]) < 2 for u in uniq):
            uniq.append(bx)
    res.append({"w": p.rect.width, "h": p.rect.height, "boxes": uniq,
                "labels": [l for l in labels if any(k in l[4] for k in ("NA", "/", "Centre", "Nom", "Date", "présentation", "Commentaire", "Avis", "Favorable", "Défavorable", "Signature", "Note", "EVALUATION CONTINUE", "Appréciation", "TOTAL", "C1", "C2", "C3", "C4", "C5", "C6", "Compétence"))]})
json.dump(res, open(sys.argv[2], "w", encoding="utf-8"), ensure_ascii=False)
for i, p in enumerate(res):
    xs = sorted(set(round(b[0]) for b in p["boxes"]))
    print("page", i + 1, "cases", len(p["boxes"]), "x", xs)
    print("   y", [round(b[1]) for b in p["boxes"]])
    for l in p["labels"]:
        print("   L", l[0], l[1], l[3], l[4])
