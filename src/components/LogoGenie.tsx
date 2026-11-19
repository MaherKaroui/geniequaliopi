import { useId } from "react";

/**
 * Logo « Génie Qualiopi » : monogramme GQ sur pavé marine, souligné de la flèche violet → rouge
 * de l'ancien logo Qualiopi Generator, et nom en deux lignes (GÉNIE en rouge, QUALIOPI en marine).
 */
export const LogoGenieIcone = ({ className = "w-9 h-9" }: { className?: string }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Génie Qualiopi">
      <defs>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#24408f" />
          <stop offset="1" stopColor="#0f1d47" />
        </linearGradient>
        <linearGradient id={`${id}a`} gradientUnits="userSpaceOnUse" x1="11" y1="0" x2="34" y2="0">
          <stop offset="0" stopColor="#6b3fa0" />
          <stop offset="1" stopColor="#e3262f" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill={`url(#${id}f)`} />
      <rect x=".5" y=".5" width="47" height="47" rx="11.5" fill="none" stroke="#fff" strokeOpacity=".18" />
      <text
        x="24" y="25.5" textAnchor="middle" fill="#fff"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: "-0.5px" }}
      >
        GQ
      </text>
      <path d="M11 36.5h20.5" stroke={`url(#${id}a)`} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M29.5 32.5l6 4-6 4z" fill="#e3262f" />
    </svg>
  );
};

/** Monogramme + nom. `claire` : texte blanc, pour un fond sombre (menu de l'espace de travail). */
const LogoGenie = ({ claire = false, className = "" }: { claire?: boolean; className?: string }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <LogoGenieIcone className="w-11 h-11 shrink-0 drop-shadow-sm" />
    <span className="flex flex-col gap-1.5 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <span className={`text-[11px] font-bold tracking-[.34em] ${claire ? "text-[#ff6b72]" : "text-[#d7262f]"}`}>GÉNIE</span>
      <span className={`text-[20px] font-bold tracking-[.05em] ${claire ? "text-white" : "text-[#1b2f6e] dark:text-white"}`}>QUALIOPI</span>
    </span>
  </span>
);

export default LogoGenie;
