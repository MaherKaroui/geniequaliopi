"""Assemble les gabarits NEXUS (gabarits/*.md) en un module TypeScript.

Usage : python scripts/bdc-nexus/bundle.py src/lib/bdc/nexus/nexusTemplates.ts
Nom de fichier d'un gabarit = chemin dans le ZIP, « / » remplacé par « __ ».
"""
import os, json, sys, glob
S = os.path.dirname(os.path.abspath(__file__))
out = sys.argv[1]
items = {}
for p in sorted(glob.glob(os.path.join(S, 'gabarits', '*.md'))):
    nom = os.path.basename(p)[:-3]
    cle = nom.replace('__', '/')
    md = open(p, encoding='utf-8').read().replace('\r\n', '\n').strip() + '\n'
    items[cle] = md
lines = [
    '/**',
    ' * Gabarits du dossier Qualiopi « bilan de compétences » au format du dossier audité NEXUS',
    ' * (Downloads/NEXUS CFA AF BDC/_bdc_travail_NEXUS - PDF), une entrée par pièce.',
    ' *',
    ' * Fichier généré : les données propres à NEXUS FORMATION et à son bénéficiaire ont été',
    ' * remplacées par des variables {{...}}, des blocs {{BLOC:...}}, des cases {{CB:clé=valeur}}',
    ' * et des conditions {{#SI X}}…{{#SINON}}…{{/SI}}, résolus par nexusModele.ts.',
    ' * Clé = chemin dans le ZIP sans extension ; « BEN » = dossier « Bénéficiaire - Prénom NOM ».',
    ' */',
    'export const NEXUS_TEMPLATES: Record<string, string> = {',
]
for k, v in items.items():
    lines.append('  ' + json.dumps(k, ensure_ascii=False) + ': ' + json.dumps(v, ensure_ascii=False) + ',')
lines.append('};')
open(out, 'w', encoding='utf-8', newline='\n').write('\n'.join(lines) + '\n')
print(len(items), 'gabarits ->', out, os.path.getsize(out), 'octets')
