import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text, Html, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CRITERES_INFO } from "@/types/qualiopi";

// 7 couleurs harmonisées par critère
const CRIT_COLORS = ["#c9a961", "#8b6f47", "#a3935a", "#5e7a8b", "#7d6a8f", "#a86464", "#5b8a72"];

type FrameData = {
  critereNum: number;
  critereTitre: string;
  indicNum: number;
  indicTitre: string;
  color: string;
  position: [number, number, number];
  rotationY: number;
};

// Génère un canvas-texture pour chaque cadre (simulant un "tableau")
function makeCanvasTexture(critNum: number, indNum: number, indTitre: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 700;
  const ctx = canvas.getContext("2d")!;
  // Fond papier
  const grad = ctx.createLinearGradient(0, 0, 0, 700);
  grad.addColorStop(0, "#fdfaf3");
  grad.addColorStop(1, "#ede4d0");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 700);
  // Bordure intérieure
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, 472, 660);
  // Sceau circulaire
  ctx.beginPath();
  ctx.arc(256, 140, 60, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 42px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${indNum}`, 256, 140);
  // Label "INDICATEUR"
  ctx.fillStyle = "#3a2a1a";
  ctx.font = "16px Georgia";
  ctx.fillText("INDICATEUR QUALIOPI", 256, 230);
  ctx.font = "italic 13px Georgia";
  ctx.fillStyle = "#7a5a3a";
  ctx.fillText(`Critère ${critNum}`, 256, 252);
  // Titre indicateur (wrap manuel)
  ctx.fillStyle = "#1a1410";
  ctx.font = "bold 22px Georgia";
  const words = indTitre.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > 420) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  let y = 320;
  for (const l of lines.slice(0, 8)) {
    ctx.fillText(l, 256, y);
    y += 32;
  }
  // Footer signature
  ctx.font = "italic 14px Georgia";
  ctx.fillStyle = "#9a7a5a";
  ctx.fillText("— Dossier Qualiopi —", 256, 640);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Texture marbre procédurale pour le sol
function makeMarbleTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 1024; c.height = 1024;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#1a1a1f";
  ctx.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 80; i++) {
    ctx.strokeStyle = `rgba(${180 + Math.random() * 50}, ${170 + Math.random() * 40}, ${160 + Math.random() * 40}, ${0.05 + Math.random() * 0.15})`;
    ctx.lineWidth = 1 + Math.random() * 3;
    ctx.beginPath();
    ctx.moveTo(Math.random() * 1024, Math.random() * 1024);
    ctx.bezierCurveTo(Math.random() * 1024, Math.random() * 1024, Math.random() * 1024, Math.random() * 1024, Math.random() * 1024, Math.random() * 1024);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function PaintingFrame({ data, onClick }: { data: FrameData; onClick: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => makeCanvasTexture(data.critereNum, data.indicNum, data.indicTitre, data.color), [data]);

  useFrame((state) => {
    if (groupRef.current) {
      const targetScale = hovered ? 1.08 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={groupRef}
      position={data.position}
      rotation={[0, data.rotationY, 0]}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
    >
      {/* Cadre doré */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[2.2, 2.9, 0.15]} />
        <meshStandardMaterial color={data.color} metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Toile */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.9, 2.6]} />
        <meshStandardMaterial map={texture} roughness={0.8} />
      </mesh>
      {/* Spot lumineux */}
      <pointLight position={[0, 1.8, 0.8]} intensity={hovered ? 0.8 : 0.3} color="#ffe8c0" distance={4} />
      {/* Plaquette laiton */}
      <mesh position={[0, -1.65, 0.1]}>
        <boxGeometry args={[0.9, 0.18, 0.04]} />
        <meshStandardMaterial color="#b8860b" metalness={0.85} roughness={0.3} />
      </mesh>
    </group>
  );
}

function CritereLabel({ num, titre, color, position, rotationY }: { num: number; titre: string; color: string; position: [number, number, number]; rotationY: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[3.5, 0.9, 0.15]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </mesh>
      <Text position={[0, 0.12, 0.05]} fontSize={0.32} color="#fff8e7" anchorX="center" anchorY="middle" maxWidth={3.2}>
        {`CRITÈRE ${num}`}
      </Text>
      <Text position={[0, -0.22, 0.05]} fontSize={0.14} color="#fff8e7" anchorX="center" anchorY="middle" maxWidth={3.2}>
        {titre}
      </Text>
    </group>
  );
}

// Particules dorées flottantes (poussière de musée)
function GoldenDust({ count = 250 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 10;
      const a = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.sin(a) * r;
      arr[i * 3 + 1] = Math.random() * 5.5 + 0.2;
      arr[i * 3 + 2] = Math.cos(a) * r;
    }
    return arr;
  }, [count]);
  useFrame((s) => {
    if (!ref.current) return;
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += 0.003 + Math.sin(s.clock.elapsedTime + i) * 0.001;
      if (arr[i * 3 + 1] > 5.8) arr[i * 3 + 1] = 0.2;
    }
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    ref.current.rotation.y = s.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffd87a" size={0.04} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Colonne de marbre décorative
function MarbleColumn({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.9, 0.2, 0.9]} />
        <meshStandardMaterial color="#d8cdb5" roughness={0.4} />
      </mesh>
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 5.6, 24]} />
        <meshStandardMaterial color="#e8dec5" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0, 5.95, 0]}>
        <boxGeometry args={[0.85, 0.3, 0.85]} />
        <meshStandardMaterial color="#d8cdb5" roughness={0.4} />
      </mesh>
    </group>
  );
}

// Trophée Qualiopi rotatif central (remplace le torusKnot statique)
function CentralTrophy() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.3;
      ref.current.position.y = 0.9 + Math.sin(s.clock.elapsedTime) * 0.08;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <torusKnotGeometry args={[0.4, 0.13, 120, 20]} />
        <meshStandardMaterial color="#ffcc55" metalness={0.95} roughness={0.1} emissive="#553200" emissiveIntensity={0.4} />
      </mesh>
      <pointLight intensity={1.2} color="#ffd070" distance={5} />
    </group>
  );
}

// Banc de musée
function Bench({ position, rotationY }: { position: [number, number, number]; rotationY: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[2, 0.12, 0.5]} />
        <meshStandardMaterial color="#5b3a22" roughness={0.6} />
      </mesh>
      {[-0.85, 0.85].map((x, i) => (
        <mesh key={i} position={[x, 0.2, 0]}>
          <boxGeometry args={[0.12, 0.4, 0.45]} />
          <meshStandardMaterial color="#3a2515" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// Hologramme de Sophie l'auditrice (guide)
function SophieHologram() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.5;
      const m = ref.current.children[0] as THREE.Mesh;
      if (m && (m.material as THREE.MeshStandardMaterial).opacity !== undefined) {
        (m.material as THREE.MeshStandardMaterial).opacity = 0.55 + Math.sin(s.clock.elapsedTime * 2) * 0.15;
      }
    }
  });
  return (
    <group ref={ref} position={[3.5, 0, 0]}>
      <mesh position={[0, 1.2, 0]}>
        <capsuleGeometry args={[0.35, 1.1, 8, 16]} />
        <meshStandardMaterial color="#7ad7ff" transparent opacity={0.6} emissive="#3a9fd6" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0, 2.15, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#7ad7ff" transparent opacity={0.7} emissive="#3a9fd6" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.55, 32]} />
        <meshStandardMaterial color="#3a9fd6" emissive="#3a9fd6" emissiveIntensity={1.5} side={THREE.DoubleSide} />
      </mesh>
      <Text position={[0, 2.8, 0]} fontSize={0.18} color="#bce9ff" anchorX="center" outlineWidth={0.01} outlineColor="#0a3a5a">
        Sophie · Guide auditrice
      </Text>
    </group>
  );
}

function Gallery({ onSelect }: { onSelect: (f: FrameData) => void }) {
  const marble = useMemo(() => makeMarbleTexture(), []);

  // Calcul positions sur cercle
  const RADIUS = 12;
  const frames: FrameData[] = [];
  const labels: { num: number; titre: string; color: string; position: [number, number, number]; rotationY: number }[] = [];

  // Total indicateurs = 32, on les répartit sur 360° en sections par critère
  const totalAngleStep = (Math.PI * 2) / 32;
  let idx = 0;
  CRITERES_INFO.forEach((crit, ci) => {
    const color = CRIT_COLORS[ci];
    // Centre angulaire de la section critère
    const startIdx = idx;
    const endIdx = idx + crit.indicateurs.length - 1;
    const centerAngle = ((startIdx + endIdx) / 2) * totalAngleStep;
    // Label au-dessus
    labels.push({
      num: crit.numero,
      titre: crit.titre,
      color,
      position: [Math.sin(centerAngle) * (RADIUS - 0.3), 4.2, Math.cos(centerAngle) * (RADIUS - 0.3)],
      rotationY: centerAngle + Math.PI,
    });
    crit.indicateurs.forEach((ind) => {
      const angle = idx * totalAngleStep;
      frames.push({
        critereNum: crit.numero,
        critereTitre: crit.titre,
        indicNum: ind.numero,
        indicTitre: ind.titre,
        color,
        position: [Math.sin(angle) * (RADIUS - 0.4), 1.6, Math.cos(angle) * (RADIUS - 0.4)],
        rotationY: angle + Math.PI,
      });
      idx++;
    });
  });

  return (
    <>
      {/* Sol marbre */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[RADIUS + 2, 64]} />
        <meshStandardMaterial map={marble} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Mur cylindrique */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[RADIUS, RADIUS, 6, 64, 1, true]} />
        <meshStandardMaterial color="#2a2520" side={THREE.BackSide} roughness={0.9} />
      </mesh>

      {/* Plafond */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <circleGeometry args={[RADIUS, 64]} />
        <meshStandardMaterial color="#1a1612" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Lustre central */}
      <group position={[0, 4.5, 0]}>
        <mesh>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#ffe8a0" emissive="#ffd070" emissiveIntensity={1.5} />
        </mesh>
        <pointLight intensity={2} color="#ffe0a0" distance={20} />
      </group>

      {/* Statue centrale = badge Qualiopi avec trophée animé */}
      <group position={[0, 0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.6, 0.8, 1, 16]} />
          <meshStandardMaterial color="#3a2a1a" roughness={0.6} />
        </mesh>
        <CentralTrophy />
        <Text position={[0, -0.7, 0.85]} fontSize={0.18} color="#c9a961" anchorX="center">
          QUALIOPI
        </Text>
      </group>

      {/* Hologramme guide Sophie */}
      <SophieHologram />

      {/* Poussière dorée flottante */}
      <GoldenDust />

      {/* Bancs de musée disposés autour */}
      {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((a, i) => (
        <Bench key={i} position={[Math.sin(a) * 4, 0, Math.cos(a) * 4]} rotationY={a + Math.PI} />
      ))}

      {/* Colonnes de marbre entre chaque critère */}
      {CRITERES_INFO.map((_, ci) => {
        const acc = CRITERES_INFO.slice(0, ci).reduce((s, c) => s + c.indicateurs.length, 0);
        const angle = (acc - 0.5) * totalAngleStep;
        return (
          <MarbleColumn
            key={`col-${ci}`}
            position={[Math.sin(angle) * (RADIUS - 0.15), 0, Math.cos(angle) * (RADIUS - 0.15)]}
          />
        );
      })}

      {/* Cadres */}
      {frames.map((f, i) => (
        <PaintingFrame key={i} data={f} onClick={() => onSelect(f)} />
      ))}

      {/* Labels critères */}
      {labels.map((l, i) => (
        <CritereLabel key={i} {...l} />
      ))}
    </>
  );
}

export default function MuseeDossier() {
  const [selected, setSelected] = useState<FrameData | null>(null);

  return (
    <div className="fixed inset-0 bg-[#0d0a08]">
      {/* HUD top */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <Button variant="outline" className="bg-background/80 backdrop-blur">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour
          </Button>
        </Link>
        <div className="text-center pointer-events-auto">
          <h1 className="text-2xl font-serif tracking-widest text-amber-200 drop-shadow">
            🏛️ MUSÉE DU DOSSIER
          </h1>
          <p className="text-xs text-amber-100/60 italic mt-1">Galerie virtuelle Qualiopi · 7 critères · 33 indicateurs</p>
        </div>
        <div className="bg-background/80 backdrop-blur px-3 py-2 rounded-md text-xs text-muted-foreground pointer-events-auto">
          🖱️ Clic-glisser pour pivoter · Molette pour zoomer · Clic sur un cadre
        </div>
      </div>

      <Canvas shadows camera={{ position: [0, 2.5, 4], fov: 60 }}>
        <Suspense fallback={null}>
          <fog attach="fog" args={["#1a1612", 8, 30]} />
          <ambientLight intensity={0.25} />
          <Gallery onSelect={setSelected} />
          <OrbitControls
            enablePan={false}
            minDistance={2}
            maxDistance={11}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 4}
            target={[0, 1.5, 0]}
            autoRotate
            autoRotateSpeed={0.4}
          />
        </Suspense>
      </Canvas>

      {/* Modal détail */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider px-3 py-1 rounded-full w-fit"
                  style={{ backgroundColor: selected.color + "22", color: selected.color }}
                >
                  <Sparkles className="w-3 h-3" />
                  CRITÈRE {selected.critereNum} · INDICATEUR {selected.indicNum}
                </div>
                <DialogTitle className="text-2xl font-serif mt-2">{selected.indicTitre}</DialogTitle>
                <DialogDescription className="italic text-muted-foreground">
                  {selected.critereTitre}
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg p-4 border" style={{ borderColor: selected.color + "55", backgroundColor: selected.color + "0a" }}>
                <p className="text-sm leading-relaxed">
                  Ce tableau représente les preuves générées pour l'<strong>indicateur {selected.indicNum}</strong> de votre dossier Qualiopi.
                  Retournez sur l'accueil pour générer ou consulter les documents associés.
                </p>
              </div>
              <Link to="/">
                <Button className="w-full" style={{ backgroundColor: selected.color }}>
                  Voir les documents de cet indicateur
                </Button>
              </Link>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
