"""Construit la table de mise en page FS063 (questions -> options, note, lignes de réponse)."""
import json, sys
j = json.load(open(sys.argv[1], encoding="utf-8"))
res = []
for pi, p in enumerate(j["pages"]):
    H = p["h"]
    split = 390
    side = lambda x: 1 if x > split else 0
    qs = [q for q in p["questions"] if q["options"] or q["title"].startswith("Question")]
    heads = [q for q in p["questions"] if not (q["options"] or q["title"].startswith("Question"))]
    used = set()
    page_q = []
    for qi, q in enumerate(qs):
        col = side(q["bbox"][0])
        nxt = [o for o in qs if side(o["bbox"][0]) == col and o["bbox"][1] > q["bbox"][1]]
        y_end = min([o["bbox"][1] for o in nxt] + [H])
        # en-tête de mise en situation juste au-dessus (pages 4-5)
        top = q["bbox"][1]
        for h in heads:
            if side(h["bbox"][0]) == col and h["bbox"][1] < q["bbox"][1] and q["bbox"][1] - h["bbox"][1] < 120:
                top = min(top, h["bbox"][1])
        score = None
        for si, s in enumerate(p["scores"]):
            if si in used or (1 if s[0] > 600 else 0) != col or s[4] != "/1":
                continue
            if top - 16 <= s[1] <= top + 22:
                score = s; used.add(si); break
        dots = [d for d in p["dots"] if side(d[0]) == col and q["bbox"][1] < d[1] < y_end]
        page_q.append({
            "page": pi,
            "title": q["title"],
            "opts": [{"n": o["n"], "x": o["num"][0], "y": o["num"][1], "y2": o["num"][3], "label": o["label"]} for o in q["options"]],
            "score": [score[0], score[1], score[3]] if score else None,
            "lines": [[d[0], d[1], d[2], d[3]] for d in dots],
        })
    totals = [[s[0], s[1], s[3], s[4]] for s in p["scores"] if s[4] != "/1"]
    res.append({"w": p["w"], "h": H, "questions": page_q, "totals": totals})
json.dump(res, open(sys.argv[2], "w", encoding="utf-8"), ensure_ascii=False)
for i, p in enumerate(res):
    print("page", i + 1, "q", len(p["questions"]), "sans note", sum(1 for q in p["questions"] if not q["score"]),
          "ouvertes", [len(q["lines"]) for q in p["questions"] if not q["opts"]], "totaux", len(p["totals"]))
