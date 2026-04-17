import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, Download, Stamp } from "lucide-react";
import { toast } from "sonner";

type StampShape = "round" | "oval" | "rectangle";

const GenerateurTampon = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [topText, setTopText] = useState("SELECT FORMATION");
  const [middleText, setMiddleText] = useState("Organisme de Formation");
  const [bottomText, setBottomText] = useState("SIRET 123 456 789 00012");
  const [centerText, setCenterText] = useState("VILLIERS-LE-BEL");
  const [subCenterText, setSubCenterText] = useState("NDA 11 95 12345 95");
  const [shape, setShape] = useState<StampShape>("round");
  const [color, setColor] = useState("#1e40af");
  const [borderWidth, setBorderWidth] = useState(6);
  const [size, setSize] = useState(500);

  const drawStamp = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const padding = 20;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = borderWidth;

    if (shape === "round") {
      const r = (size - padding * 2) / 2;
      // Outer + inner circles
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r - 12, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.lineWidth = borderWidth;

      // Curved top text
      drawCurvedText(ctx, topText, cx, cy, r - 28, -Math.PI / 2, true);
      // Curved bottom text
      drawCurvedText(ctx, bottomText, cx, cy, r - 28, Math.PI / 2, false);

      // Center horizontal lines
      ctx.font = `bold ${Math.floor(size / 18)}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(middleText, cx, cy - size / 14);
      ctx.font = `bold ${Math.floor(size / 14)}px Arial`;
      ctx.fillText(centerText, cx, cy);
      ctx.font = `${Math.floor(size / 22)}px Arial`;
      ctx.fillText(subCenterText, cx, cy + size / 12);

      // Top horizontal divider lines
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.5, cy - size / 9);
      ctx.lineTo(cx + r * 0.5, cy - size / 9);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.5, cy + size / 9);
      ctx.lineTo(cx + r * 0.5, cy + size / 9);
      ctx.stroke();
    } else if (shape === "oval") {
      const rx = (size - padding * 2) / 2;
      const ry = rx * 0.65;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx - 10, ry - 10, 0, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = `bold ${Math.floor(size / 22)}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(topText, cx, cy - ry * 0.55);
      ctx.font = `bold ${Math.floor(size / 16)}px Arial`;
      ctx.fillText(centerText, cx, cy);
      ctx.font = `${Math.floor(size / 24)}px Arial`;
      ctx.fillText(subCenterText, cx, cy + ry * 0.35);
      ctx.fillText(bottomText, cx, cy + ry * 0.6);
    } else {
      // rectangle
      const w = size - padding * 2;
      const h = w * 0.65;
      const x = (size - w) / 2;
      const y = (size - h) / 2;
      ctx.strokeRect(x, y, w, h);
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 8, y + 8, w - 16, h - 16);
      ctx.lineWidth = borderWidth;

      ctx.font = `bold ${Math.floor(size / 18)}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(topText, cx, y + h * 0.18);
      ctx.font = `bold ${Math.floor(size / 14)}px Arial`;
      ctx.fillText(centerText, cx, cy);
      ctx.font = `${Math.floor(size / 22)}px Arial`;
      ctx.fillText(subCenterText, cx, cy + size / 14);
      ctx.fillText(bottomText, cx, y + h * 0.85);
    }
  };

  const drawCurvedText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    cx: number,
    cy: number,
    radius: number,
    centerAngle: number,
    clockwise: boolean
  ) => {
    if (!text) return;
    ctx.font = `bold ${Math.floor(size / 22)}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const chars = text.split("");
    const angleStep = (Math.floor(size / 22) * 0.9) / radius;
    const totalAngle = angleStep * (chars.length - 1);
    let startAngle = clockwise ? centerAngle - totalAngle / 2 : centerAngle + totalAngle / 2;

    chars.forEach((char, i) => {
      const angle = clockwise ? startAngle + i * angleStep : startAngle - i * angleStep;
      ctx.save();
      ctx.translate(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
      ctx.rotate(clockwise ? angle + Math.PI / 2 : angle - Math.PI / 2);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
  };

  useEffect(() => {
    drawStamp();
  }, [topText, middleText, bottomText, centerText, subCenterText, shape, color, borderWidth, size]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tampon_${centerText.replace(/\s+/g, "_") || "organisme"}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Tampon téléchargé !");
    }, "image/png");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Stamp className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">Générateur de Tampon</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1">
            <ChevronLeft className="w-4 h-4" /> Accueil
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Personnalisation</h2>

          <div className="space-y-2">
            <Label>Forme</Label>
            <Select value={shape} onValueChange={(v) => setShape(v as StampShape)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="round">Rond</SelectItem>
                <SelectItem value="oval">Ovale</SelectItem>
                <SelectItem value="rectangle">Rectangulaire</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Couleur</Label>
              <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label>Épaisseur du bord ({borderWidth}px)</Label>
              <Slider value={[borderWidth]} onValueChange={(v) => setBorderWidth(v[0])} min={2} max={14} step={1} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Taille ({size}px)</Label>
            <Slider value={[size]} onValueChange={(v) => setSize(v[0])} min={300} max={800} step={10} />
          </div>

          <div className="space-y-2">
            <Label>Texte du haut (courbé)</Label>
            <Input value={topText} onChange={(e) => setTopText(e.target.value)} placeholder="NOM DE L'ORGANISME" />
          </div>

          <div className="space-y-2">
            <Label>Sous-titre</Label>
            <Input value={middleText} onChange={(e) => setMiddleText(e.target.value)} placeholder="Organisme de Formation" />
          </div>

          <div className="space-y-2">
            <Label>Texte central principal</Label>
            <Input value={centerText} onChange={(e) => setCenterText(e.target.value)} placeholder="VILLE" />
          </div>

          <div className="space-y-2">
            <Label>Texte central secondaire</Label>
            <Input value={subCenterText} onChange={(e) => setSubCenterText(e.target.value)} placeholder="NDA xx xx xxxxx xx" />
          </div>

          <div className="space-y-2">
            <Label>Texte du bas (courbé)</Label>
            <Input value={bottomText} onChange={(e) => setBottomText(e.target.value)} placeholder="SIRET xxx xxx xxx xxxxx" />
          </div>

          <Button onClick={handleDownload} className="w-full gap-2" size="lg">
            <Download className="w-4 h-4" /> Télécharger PNG (transparent)
          </Button>
        </Card>

        <Card className="p-6 flex items-center justify-center bg-muted/30 sticky top-24 self-start">
          <div className="bg-white p-6 rounded-lg shadow-card">
            <canvas ref={canvasRef} className="max-w-full h-auto" style={{ maxHeight: "70vh" }} />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default GenerateurTampon;
