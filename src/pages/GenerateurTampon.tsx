import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Download, Stamp, Upload, Pen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import SignaturePad from "@/components/SignaturePad";

type StampShape = "round" | "oval" | "rectangle";
type FontFamily = "Arial" | "Georgia" | "Times New Roman" | "Courier New" | "Verdana" | "Impact";

const FONTS: FontFamily[] = ["Arial", "Georgia", "Times New Roman", "Courier New", "Verdana", "Impact"];

const GenerateurTampon = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSignaturePad, setShowSignaturePad] = useState(false);

  // Texts
  const [topText, setTopText] = useState("SELECT FORMATION");
  const [middleText, setMiddleText] = useState("Organisme de Formation");
  const [bottomText, setBottomText] = useState("SIRET 123 456 789 00012");
  const [centerText, setCenterText] = useState("VILLIERS-LE-BEL");
  const [subCenterText, setSubCenterText] = useState("NDA 11 95 12345 95");

  // Style
  const [shape, setShape] = useState<StampShape>("round");
  const [color, setColor] = useState("#1e40af");
  const [borderWidth, setBorderWidth] = useState(6);
  const [size, setSize] = useState(500);
  const [font, setFont] = useState<FontFamily>("Arial");
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [innerBorder, setInnerBorder] = useState(true);
  const [stars, setStars] = useState(true);
  const [worn, setWorn] = useState(false);

  // Signature
  const [signatureUrl, setSignatureUrl] = useState<string>("");
  const [signatureSize, setSignatureSize] = useState(40);
  const [signatureY, setSignatureY] = useState(70);

  const drawStamp = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Haute résolution x3 pour des écritures ultra-nettes
    const SCALE = 3;
    canvas.width = size * SCALE;
    canvas.height = size * SCALE;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    (ctx as any).textRendering = "geometricPrecision";
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, size, size);

    ctx.save();
    ctx.globalAlpha = opacity / 100;
    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-size / 2, -size / 2);

    const cx = size / 2;
    const cy = size / 2;
    const padding = 20;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = borderWidth;

    if (shape === "round") {
      const r = (size - padding * 2) / 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      if (innerBorder) {
        ctx.beginPath();
        ctx.arc(cx, cy, r - 12, 0, Math.PI * 2);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = borderWidth;
      }

      drawCurvedText(ctx, topText, cx, cy, r - 28, -Math.PI / 2, true);
      drawCurvedText(ctx, bottomText, cx, cy, r - 28, Math.PI / 2, false);

      ctx.font = `bold ${Math.floor(size / 18)}px ${font}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(middleText, cx, cy - size / 14);
      ctx.font = `bold ${Math.floor(size / 14)}px ${font}`;
      ctx.fillText(centerText, cx, cy);
      ctx.font = `${Math.floor(size / 22)}px ${font}`;
      ctx.fillText(subCenterText, cx, cy + size / 12);

      ctx.beginPath();
      ctx.moveTo(cx - r * 0.5, cy - size / 9);
      ctx.lineTo(cx + r * 0.5, cy - size / 9);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.5, cy + size / 9);
      ctx.lineTo(cx + r * 0.5, cy + size / 9);
      ctx.stroke();

      if (stars) {
        drawStar(ctx, cx - r + 18, cy, 6);
        drawStar(ctx, cx + r - 18, cy, 6);
      }
    } else if (shape === "oval") {
      const rx = (size - padding * 2) / 2;
      const ry = rx * 0.65;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      if (innerBorder) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx - 10, ry - 10, 0, 0, Math.PI * 2);
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.font = `bold ${Math.floor(size / 22)}px ${font}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(topText, cx, cy - ry * 0.55);
      ctx.font = `bold ${Math.floor(size / 16)}px ${font}`;
      ctx.fillText(centerText, cx, cy);
      ctx.font = `${Math.floor(size / 24)}px ${font}`;
      ctx.fillText(subCenterText, cx, cy + ry * 0.35);
      ctx.fillText(bottomText, cx, cy + ry * 0.6);
    } else {
      const w = size - padding * 2;
      const h = w * 0.65;
      const x = (size - w) / 2;
      const y = (size - h) / 2;
      ctx.strokeRect(x, y, w, h);
      if (innerBorder) {
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 8, y + 8, w - 16, h - 16);
        ctx.lineWidth = borderWidth;
      }

      ctx.font = `bold ${Math.floor(size / 18)}px ${font}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(topText, cx, y + h * 0.18);
      ctx.font = `bold ${Math.floor(size / 14)}px ${font}`;
      ctx.fillText(centerText, cx, cy);
      ctx.font = `${Math.floor(size / 22)}px ${font}`;
      ctx.fillText(subCenterText, cx, cy + size / 14);
      ctx.fillText(bottomText, cx, y + h * 0.85);
    }

    ctx.restore();

    // Signature overlay (not rotated with stamp - drawn on top)
    if (signatureUrl) {
      const img = new Image();
      img.onload = () => {
        const sigW = (size * signatureSize) / 100;
        const ratio = img.height / img.width;
        const sigH = sigW * ratio;
        const sx = (size - sigW) / 2;
        const sy = (size * signatureY) / 100 - sigH / 2;
        ctx.save();
        ctx.globalAlpha = (opacity / 100) * 0.9;
        ctx.drawImage(img, sx, sy, sigW, sigH);
        ctx.restore();

        if (worn) applyWornEffect(ctx);
      };
      img.src = signatureUrl;
    } else if (worn) {
      applyWornEffect(ctx);
    }
  };

  const applyWornEffect = (ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0) {
        const noise = Math.random();
        if (noise < 0.18) data[i + 3] = 0;
        else if (noise < 0.35) data[i + 3] = Math.floor(data[i + 3] * 0.5);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
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
    ctx.font = `bold ${Math.floor(size / 22)}px ${font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const chars = text.split("");
    const angleStep = (Math.floor(size / 22) * 0.9) / radius;
    const totalAngle = angleStep * (chars.length - 1);
    const startAngle = clockwise ? centerAngle - totalAngle / 2 : centerAngle + totalAngle / 2;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topText, middleText, bottomText, centerText, subCenterText, shape, color, borderWidth, size, font, rotation, opacity, innerBorder, stars, worn, signatureUrl, signatureSize, signatureY]);

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

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSignatureUrl(reader.result as string);
    reader.readAsDataURL(file);
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
        <Card className="p-6">
          <Tabs defaultValue="text">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text">Textes</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="signature">Signature</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Texte du haut (courbé)</Label>
                <Input value={topText} onChange={(e) => setTopText(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Sous-titre</Label>
                <Input value={middleText} onChange={(e) => setMiddleText(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Texte central principal</Label>
                <Input value={centerText} onChange={(e) => setCenterText(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Texte central secondaire</Label>
                <Input value={subCenterText} onChange={(e) => setSubCenterText(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Texte du bas (courbé)</Label>
                <Input value={bottomText} onChange={(e) => setBottomText(e.target.value)} />
              </div>
            </TabsContent>

            <TabsContent value="style" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
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
                <div className="space-y-2">
                  <Label>Police</Label>
                  <Select value={font} onValueChange={(v) => setFont(v as FontFamily)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {FONTS.map(f => <SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Couleur</Label>
                  <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label>Bord ({borderWidth}px)</Label>
                  <Slider value={[borderWidth]} onValueChange={(v) => setBorderWidth(v[0])} min={2} max={14} step={1} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Taille ({size}px)</Label>
                <Slider value={[size]} onValueChange={(v) => setSize(v[0])} min={300} max={800} step={10} />
              </div>

              <div className="space-y-2">
                <Label>Rotation ({rotation}°)</Label>
                <Slider value={[rotation]} onValueChange={(v) => setRotation(v[0])} min={-45} max={45} step={1} />
              </div>

              <div className="space-y-2">
                <Label>Opacité ({opacity}%)</Label>
                <Slider value={[opacity]} onValueChange={(v) => setOpacity(v[0])} min={20} max={100} step={5} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Bordure intérieure</Label>
                <Switch checked={innerBorder} onCheckedChange={setInnerBorder} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Étoiles décoratives (rond)</Label>
                <Switch checked={stars} onCheckedChange={setStars} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Effet usé / vieilli</Label>
                <Switch checked={worn} onCheckedChange={setWorn} />
              </div>
            </TabsContent>

            <TabsContent value="signature" className="space-y-4 mt-4">
              {signatureUrl ? (
                <div className="space-y-3">
                  <div className="border rounded-lg p-3 bg-muted/30 flex items-center justify-center">
                    <img src={signatureUrl} alt="Signature" className="max-h-24" />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSignatureUrl("")} className="gap-2 w-full">
                    <Trash2 className="w-4 h-4" /> Supprimer la signature
                  </Button>
                  <div className="space-y-2">
                    <Label>Taille de la signature ({signatureSize}%)</Label>
                    <Slider value={[signatureSize]} onValueChange={(v) => setSignatureSize(v[0])} min={15} max={70} step={1} />
                  </div>
                  <div className="space-y-2">
                    <Label>Position verticale ({signatureY}%)</Label>
                    <Slider value={[signatureY]} onValueChange={(v) => setSignatureY(v[0])} min={20} max={85} step={1} />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Ajoutez votre signature manuscrite à l'intérieur du tampon.</p>
                  <Button variant="outline" onClick={() => setShowSignaturePad(true)} className="gap-2 w-full">
                    <Pen className="w-4 h-4" /> Dessiner une signature
                  </Button>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2 w-full">
                    <Upload className="w-4 h-4" /> Importer une image
                  </Button>
                  <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleSignatureUpload} />
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Button onClick={handleDownload} className="w-full gap-2 mt-6" size="lg">
            <Download className="w-4 h-4" /> Télécharger PNG (transparent)
          </Button>
        </Card>

        <Card className="p-6 flex items-center justify-center bg-muted/30 sticky top-24 self-start">
          <div className="bg-white p-6 rounded-lg shadow-card" style={{ backgroundImage: "linear-gradient(45deg, #f9f9f9 25%, transparent 25%), linear-gradient(-45deg, #f9f9f9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f9f9f9 75%), linear-gradient(-45deg, transparent 75%, #f9f9f9 75%)", backgroundSize: "20px 20px", backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px" }}>
            <canvas ref={canvasRef} className="max-w-full h-auto" style={{ maxHeight: "70vh" }} />
          </div>
        </Card>
      </main>

      {showSignaturePad && (
        <SignaturePad
          onSave={(url) => { setSignatureUrl(url); setShowSignaturePad(false); }}
          onCancel={() => setShowSignaturePad(false)}
        />
      )}
    </div>
  );
};

export default GenerateurTampon;
