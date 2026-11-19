import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import LogoGenie from "@/components/LogoGenie";
import { FAMILLES, demanderEcran, useParcoursOuvert, type Outil } from "@/lib/outilsAccueil";

/**
 * Design « Espace de travail » : menu latéral fixe, présent sur toutes les pages de l'application,
 * pour passer d'un outil à l'autre sans revenir à l'accueil. Masqué sous la largeur tablette.
 */
const MenuEspace = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const parcoursOuvert = useParcoursOuvert();

  const actif = (o: Outil) =>
    o.action === "preparer" ? pathname === "/" && parcoursOuvert : !!o.route && pathname === o.route;
  const accueilActif = pathname === "/" && !parcoursOuvert;

  const ouvrir = (o: Outil) => {
    if (o.action === "preparer") demanderEcran(navigate, { parcours: true });
    else if (o.route) navigate(o.route);
    else if (o.url) window.open(o.url, "_blank", "noopener");
  };

  const Lien = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      aria-current={on ? "page" : undefined}
      className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${on
        ? "font-semibold text-white bg-[#1d2b4f] shadow-[inset_2px_0_0_#6b97f5] [&_svg]:text-[#8fb0ff]"
        : "hover:bg-white/5"}`}
    >
      {children}
    </button>
  );

  return (
    <aside className="hidden lg:block bg-[#0f1a33] text-[#c9d3e8] px-3 py-5 space-y-5 sticky top-0 h-screen overflow-y-auto">
      <button
        type="button"
        onClick={() => demanderEcran(navigate, { parcours: false })}
        aria-label="Génie Qualiopi — tableau de bord"
        className="px-2"
      >
        <LogoGenie claire />
      </button>
      <nav className="space-y-5">
        <div className="space-y-0.5">
          <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[.09em] text-[#7f8cab]">Accueil</p>
          <Lien on={accueilActif} onClick={() => demanderEcran(navigate, { parcours: false })}>
            <LayoutDashboard className="w-4 h-4 text-[#7f8cab]" /> Tableau de bord
          </Lien>
        </div>
        {FAMILLES.map(f => (
          <div key={f.titre} className="space-y-0.5">
            <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[.09em] text-[#7f8cab]">{f.titre}</p>
            {f.outils.map(o => (
              <Lien key={o.label} on={actif(o)} onClick={() => ouvrir(o)}>
                <o.icon className="w-4 h-4 text-[#7f8cab]" />
                <span className="flex-1 text-left">{o.label}</span>
                {o.url && <ArrowUpRight className="w-3 h-3 text-[#7f8cab]" />}
              </Lien>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default MenuEspace;
