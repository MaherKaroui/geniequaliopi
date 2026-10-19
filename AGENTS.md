# Architecture rules

- Rapid generation enables `FormationInfo.dureeSaisiePrioritaire` at its shared preparation boundary; duration helpers honor it to preserve entered duration without changing other generators.
- VAE contractual articles are generated through the shared `genVAEContrat` for indicators 4 and 9; company presence selects the parties while the declared funding selects payment terms, avoiding divergent documents.
- External quality-services contracts use the shared `genContratPrestationQualiopi` across action types, distinct from trainer and beneficiary contracts, so mandate clauses and provider identity cannot diverge.
- Only `/vae?embed=1` mounts the standalone VAE presentation outside AccessGate, without global navigation, chat or saved-dossier history; it never grants persistent access or changes authentication/RLS, so embedding does not unlock other tools or expose saved records.
- Embedded VAE presentation overrides semantic tokens only inside its page wrapper; normal tools and generated document styles remain independent of the host-app appearance.
- Standalone VAE exports use template-local PDF margins and opt into row-by-row table pagination; the shared export default remains unchanged to isolate layout corrections from other generators.