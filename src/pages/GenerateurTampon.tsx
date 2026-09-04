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
import { ChevronLeft, Download, Stamp, Upload, Pen, Trash2, Check } from "lucide-react";
import { toast } from "sonner";
import SignaturePad from "@/components/SignaturePad";

type StampShape = "administratif" | "round" | "oval" | "rectangle";
type FontFamily = "Arial" | "Georgia" | "Times New Roman" | "Courier New" | "Verdana" | "Impact";

type CanvasPointerEvent = React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>;

const FONTS: FontFamily[] = ["Arial", "Georgia", "Times New Roman", "Courier New", "Verdana", "Impact"];
const HIGH_RES_SCALE = 3;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const GenerateurTampon = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const signatureImageRef = useRef<HTMLImageElement | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const isDraggingSignatureRef = useRef(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [isDraggingSignature, setIsDraggingSignature] = useState(false);

  // Pré-remplissage depuis le formulaire Organisme (via localStorage)
  const prefill = (() => {
    try {
      const raw = localStorage.getItem("tampon_prefill_organisme");
      if (!raw) return null;
      const o = JSON.parse(raw);
      const ville = [o.codePostal, o.ville].filter(Boolean).join(" ").trim();
      return {
        top: (o.nom || "SELECT FORMATION").toUpperCase(),
        middle: "Organisme de Formation",
        bottom: o.siret ? `SIRET ${o.siret}` : "SIRET 123 456 789 00012",
        center: (ville || o.ville || "VILLIERS-LE-BEL").toUpperCase(),
        sub: o.nda ? `NDA ${o.nda}` : "NDA 11 95 12345 95",
        raisonSociale: (o.nom || "").toUpperCase(),
        adresse: (o.adresse || "").toUpperCase(),
        cpVille: ville.toUpperCase(),
        siret: (o.siret || "").toString(),
        nda: (o.nda || "").toString(),
      };
    } catch { return null; }
  })();

  const [topText, setTopText] = useState(prefill?.top ?? "SELECT FORMATION");
  const [middleText, setMiddleText] = useState(prefill?.middle ?? "Organisme de Formation");
  const [bottomText, setBottomText] = useState(prefill?.bottom ?? "SIRET 123 456 789 00012");
  const [centerText, setCenterText] = useState(prefill?.center ?? "VILLIERS-LE-BEL");
  const [subCenterText, setSubCenterText] = useState(prefill?.sub ?? "NDA 11 95 12345 95");

  // Champs du bloc administratif
  const [admRaisonSociale, setAdmRaisonSociale] = useState(prefill?.raisonSociale || "CEOS ACADEMY");
  const [admAdresse, setAdmAdresse] = useState(prefill?.adresse || "35 AVENUE LEFEVRE,");
  const [admCpVille, setAdmCpVille] = useState(prefill?.cpVille || "69120 VAULX-EN-VELIN");
  const [admSiret, setAdmSiret] = useState(prefill?.siret || "91009758300017");
  const [admSiren, setAdmSiren] = useState("");
  const [admNda, setAdmNda] = useState(prefill?.nda || "84691948269");

  useEffect(() => {
    if (prefill) {
      localStorage.removeItem("tampon_prefill_organisme");
      toast.success("Champs pré-remplis depuis l'organisme");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [shape, setShape] = useState<StampShape>("administratif");
  const [color, setColor] = useState("#000000");
  const [borderWidth, setBorderWidth] = useState(1);
  const [size, setSize] = useState(500);
  const [font, setFont] = useState<FontFamily>("Arial");
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [innerBorder, setInnerBorder] = useState(false);
  const [stars, setStars] = useState(false);
  const [worn, setWorn] = useState(false);

  const [signatureUrl, setSignatureUrl] = useState("");
  const [signatureAspectRatio, setSignatureAspectRatio] = useState<number | null>(null);
  const [signatureSize, setSignatureSize] = useState(40);
  const [signatureX, setSignatureX] = useState(50);
  const [signatureY, setSignatureY] = useState(70);

  const isAdmin = shape === "administratif";

  const admSirenValue = (admSiren.trim() || admSiret.replace(/\D/g, "").slice(0, 9)).trim();

  const admLines = (() => {
    const titleSize = Math.floor(size / 13);
    const bodySize = Math.floor(size / 18);
    const lines: { text: string; bold: boolean; fontSize: number }[] = [];
    if (admRaisonSociale.trim()) lines.push({ text: admRaisonSociale.trim().toUpperCase(), bold: true, fontSize: titleSize });
    if (admAdresse.trim()) lines.push({ text: admAdresse.trim().toUpperCase(), bold: false, fontSize: bodySize });
    if (admCpVille.trim()) lines.push({ text: admCpVille.trim().toUpperCase(), bold: false, fontSize: bodySize });
    if (admSiret.trim()) lines.push({ text: `Siret : ${admSiret.trim()}`, bold: false, fontSize: bodySize });
    if (admSirenValue) lines.push({ text: `Siren : ${admSirenValue}`, bold: false, fontSize: bodySize });
    if (admNda.trim()) lines.push({ text: `NDA : ${admNda.trim()}`, bold: false, fontSize: bodySize });
    return lines;
  })();

  const admPadding = Math.round(size / 28);
  const admContentHeight = admLines.reduce((acc, l) => acc + l.fontSize * 1.15, 0);
  const canvasHeight = isAdmin ? Math.max(60, Math.round(admContentHeight + admPadding * 2)) : size;


  const getSignatureMetrics = () => {
    if (!signatureUrl) return null;

    const sigW = (size * signatureSize) / 100;
    const sigH = sigW * (signatureAspectRatio ?? 0.28);
    const centerX = clamp((size * signatureX) / 100, sigW / 2, Math.max(sigW / 2, size - sigW / 2));
    const centerY = clamp((canvasHeight * signatureY) / 100, sigH / 2, Math.max(sigH / 2, canvasHeight - sigH / 2));

    return {
      width: sigW,
      height: sigH,
      left: centerX - sigW / 2,
      top: centerY - sigH / 2,
      centerX,
      centerY,
    };
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
    clockwise: boolean,
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

  const applyWornEffect = (ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
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

  const drawStamp = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size * HIGH_RES_SCALE;
    canvas.height = canvasHeight * HIGH_RES_SCALE;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.setTransform(HIGH_RES_SCALE, 0, 0, HIGH_RES_SCALE, 0, 0);
    ctx.clearRect(0, 0, size, canvasHeight);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.save();
    ctx.globalAlpha = opacity / 100;
    ctx.translate(size / 2, canvasHeight / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-size / 2, -canvasHeight / 2);

    const cx = size / 2;
    const cy = canvasHeight / 2;
    const padding = 20;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = borderWidth;

    if (isAdmin) {
      const inset = Math.max(borderWidth, 1) / 2 + 1;
      if (borderWidth > 0) {
        ctx.strokeRect(inset, inset, size - inset * 2, canvasHeight - inset * 2);
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let y = admPadding;
      admLines.forEach((line) => {
        const lh = line.fontSize * 1.15;
        ctx.font = `${line.bold ? "bold " : ""}${line.fontSize}px ${font}`;
        ctx.fillText(line.text, cx, y + lh / 2);
        y += lh;
      });
    } else if (shape === "round") {

      const r = (size - padding * 2) / 2;
      if (borderWidth > 0) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

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

      if (borderWidth > 0) {
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.5, cy - size / 9);
        ctx.lineTo(cx + r * 0.5, cy - size / 9);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.5, cy + size / 9);
        ctx.lineTo(cx + r * 0.5, cy + size / 9);
        ctx.stroke();
      }

      if (stars) {
        drawStar(ctx, cx - r + 18, cy, 6);
        drawStar(ctx, cx + r - 18, cy, 6);
      }
    } else if (shape === "oval") {
      const rx = (size - padding * 2) / 2;
      const ry = rx * 0.65;
      if (borderWidth > 0) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (innerBorder) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx - 10, ry - 10, 0, 0, Math.PI * 2);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = borderWidth;
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
      if (borderWidth > 0) {
        ctx.strokeRect(x, y, w, h);
      }

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

    const signatureImage = signatureImageRef.current;
    const signatureMetrics = getSignatureMetrics();

    if (signatureImage && signatureMetrics) {
      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.globalAlpha = opacity / 100;
      ctx.drawImage(signatureImage, signatureMetrics.left, signatureMetrics.top, signatureMetrics.width, signatureMetrics.height);
      ctx.restore();
    }

    if (worn) applyWornEffect(ctx);
  };

  useEffect(() => {
    if (!signatureUrl) {
      signatureImageRef.current = null;
      setSignatureAspectRatio(null);
      return;
    }

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      signatureImageRef.current = image;
      setSignatureAspectRatio(image.height / image.width || 0.28);
    };
    image.src = signatureUrl;
  }, [signatureUrl]);

  useEffect(() => {
    drawStamp();
  }, [
    topText,
    middleText,
    bottomText,
    centerText,
    subCenterText,
    shape,
    color,
    borderWidth,
    size,
    font,
    rotation,
    opacity,
    innerBorder,
    stars,
    worn,
    signatureUrl,
    signatureAspectRatio,
    signatureSize,
    signatureX,
    signatureY,
    admRaisonSociale,
    admAdresse,
    admCpVille,
    admSiret,
    admSiren,
    admNda,
    canvasHeight,
  ]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tampon_${((isAdmin ? admRaisonSociale : centerText) || "organisme").replace(/\s+/g, "_")}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Tampon téléchargé !");
    }, "image/png");
  };

  const handleUseInOrganisme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    try {
      localStorage.setItem("generated_tampon_url", dataUrl);
      toast.success("Tampon enregistré ! Retour au formulaire...");
      setTimeout(() => navigate(-1), 600);
    } catch (e) {
      toast.error("Impossible d'enregistrer le tampon (taille trop grande)");
    }
  };

  const removeWhiteBackgroundFromDataUrl = (dataUrl: string): Promise<string> =>
    new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = image.width;
        tempCanvas.height = image.height;

        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) {
          resolve(dataUrl);
          return;
        }

        tempCtx.drawImage(image, 0, 0);
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          const brightness = (r + g + b) / 3;
          const colorVariance = Math.max(r, g, b) - Math.min(r, g, b);

          if (a > 0 && brightness > 245 && colorVariance < 18) {
            data[i + 3] = 0;
          }
        }

        tempCtx.putImageData(imageData, 0, 0);
        resolve(tempCanvas.toDataURL("image/png"));
      };
      image.src = dataUrl;
    });

  const handleSignatureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const cleaned = await removeWhiteBackgroundFromDataUrl(reader.result as string);
      setSignatureUrl(cleaned);
      setSignatureX(50);
      setSignatureY(70);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const getCanvasPoint = (event: CanvasPointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

    return {
      x: ((clientX - rect.left) / rect.width) * size,
      y: ((clientY - rect.top) / rect.height) * canvasHeight,
    };
  };

  const handleCanvasPointerDown = (event: CanvasPointerEvent) => {
    const point = getCanvasPoint(event);
    const metrics = getSignatureMetrics();
    if (!point || !metrics) return;

    const isInsideSignature =
      point.x >= metrics.left &&
      point.x <= metrics.left + metrics.width &&
      point.y >= metrics.top &&
      point.y <= metrics.top + metrics.height;

    if (!isInsideSignature) return;

    event.preventDefault();
    isDraggingSignatureRef.current = true;
    setIsDraggingSignature(true);
    dragOffsetRef.current = {
      x: point.x - metrics.left,
      y: point.y - metrics.top,
    };
  };

  const handleCanvasPointerMove = (event: CanvasPointerEvent) => {
    if (!isDraggingSignatureRef.current) return;

    const point = getCanvasPoint(event);
    const metrics = getSignatureMetrics();
    if (!point || !metrics) return;

    event.preventDefault();

    const nextCenterX = clamp(point.x - dragOffsetRef.current.x + metrics.width / 2, metrics.width / 2, size - metrics.width / 2);
    const nextCenterY = clamp(
      point.y - dragOffsetRef.current.y + metrics.height / 2,
      metrics.height / 2,
      Math.max(metrics.height / 2, canvasHeight - metrics.height / 2),
    );

    setSignatureX((nextCenterX / size) * 100);
    setSignatureY((nextCenterY / canvasHeight) * 100);
  };

  const stopDraggingSignature = () => {
    isDraggingSignatureRef.current = false;
    setIsDraggingSignature(false);
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
              {isAdmin ? (
                <>
                  <div className="space-y-2">
                    <Label>Raison sociale</Label>
                    <Input value={admRaisonSociale} onChange={(e) => setAdmRaisonSociale(e.target.value)} placeholder="CEOS ACADEMY" />
                  </div>
                  <div className="space-y-2">
                    <Label>Adresse</Label>
                    <Input value={admAdresse} onChange={(e) => setAdmAdresse(e.target.value)} placeholder="35 AVENUE LEFEVRE," />
                  </div>
                  <div className="space-y-2">
                    <Label>Code postal + Ville</Label>
                    <Input value={admCpVille} onChange={(e) => setAdmCpVille(e.target.value)} placeholder="69120 VAULX-EN-VELIN" />
                  </div>
                  <div className="space-y-2">
                    <Label>SIRET</Label>
                    <Input value={admSiret} onChange={(e) => setAdmSiret(e.target.value)} placeholder="91009758300017" />
                  </div>
                  <div className="space-y-2">
                    <Label>SIREN (déduit du SIRET si vide)</Label>
                    <Input value={admSiren} onChange={(e) => setAdmSiren(e.target.value)} placeholder={admSirenValue || "910097583"} />
                  </div>
                  <div className="space-y-2">
                    <Label>NDA</Label>
                    <Input value={admNda} onChange={(e) => setAdmNda(e.target.value)} placeholder="84691948269" />
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </TabsContent>


            <TabsContent value="style" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Forme</Label>
                  <Select
                    value={shape}
                    onValueChange={(v) => {
                      const next = v as StampShape;
                      setShape(next);
                      if (next === "administratif") {
                        setColor("#000000");
                        setBorderWidth(1);
                        setInnerBorder(false);
                        setStars(false);
                        setWorn(false);
                        setRotation(0);
                      }
                    }}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administratif">Bloc administratif (recommandé)</SelectItem>
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
                      {FONTS.map((fontName) => (
                        <SelectItem key={fontName} value={fontName} style={{ fontFamily: fontName }}>
                          {fontName}
                        </SelectItem>
                      ))}
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
                  <Slider value={[borderWidth]} onValueChange={(values) => setBorderWidth(values[0])} min={0} max={14} step={1} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Taille ({size}px)</Label>
                <Slider value={[size]} onValueChange={(values) => setSize(values[0])} min={300} max={800} step={10} />
              </div>

              <div className="space-y-2">
                <Label>Rotation ({rotation}°)</Label>
                <Slider value={[rotation]} onValueChange={(values) => setRotation(values[0])} min={-45} max={45} step={1} />
              </div>

              <div className="space-y-2">
                <Label>Opacité ({opacity}%)</Label>
                <Slider value={[opacity]} onValueChange={(values) => setOpacity(values[0])} min={20} max={100} step={5} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Bordure extérieure</Label>
                <Switch checked={borderWidth > 0} onCheckedChange={(v) => setBorderWidth(v ? 6 : 0)} />
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
                  <div
                    className="border rounded-lg p-3 flex items-center justify-center"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, #f6f6f6 25%, transparent 25%), linear-gradient(-45deg, #f6f6f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f6f6f6 75%), linear-gradient(-45deg, transparent 75%, #f6f6f6 75%)",
                      backgroundSize: "18px 18px",
                      backgroundPosition: "0 0, 0 9px, 9px -9px, -9px 0px",
                    }}
                  >
                    <img src={signatureUrl} alt="Signature" className="max-h-24" />
                  </div>
                  <p className="text-xs text-muted-foreground">Glissez la signature directement dans le tampon à droite.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSignatureUrl("");
                      setSignatureX(50);
                      setSignatureY(70);
                    }}
                    className="gap-2 w-full"
                  >
                    <Trash2 className="w-4 h-4" /> Supprimer la signature
                  </Button>
                  <div className="space-y-2">
                    <Label>Taille de la signature ({signatureSize}%)</Label>
                    <Slider value={[signatureSize]} onValueChange={(values) => setSignatureSize(values[0])} min={15} max={70} step={1} />
                  </div>
                  <div className="space-y-2">
                    <Label>Position verticale ({Math.round(signatureY)}%)</Label>
                    <Slider value={[signatureY]} onValueChange={(values) => setSignatureY(values[0])} min={10} max={90} step={1} />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Ajoutez une signature PNG sans fond, puis glissez-la directement dans le tampon.</p>
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
          <Button onClick={handleUseInOrganisme} variant="secondary" className="w-full gap-2 mt-2" size="lg">
            <Check className="w-4 h-4" /> Utiliser ce tampon dans l'organisme
          </Button>
        </Card>

        <Card className="p-6 flex flex-col items-center justify-center bg-muted/30 sticky top-24 self-start">
          <div
            className="bg-white p-6 rounded-lg shadow-card"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #f9f9f9 25%, transparent 25%), linear-gradient(-45deg, #f9f9f9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f9f9f9 75%), linear-gradient(-45deg, transparent 75%, #f9f9f9 75%)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            }}
          >
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto rounded touch-none"
              style={{
                maxHeight: "70vh",
                cursor: signatureUrl ? (isDraggingSignature ? "grabbing" : "grab") : "default",
              }}
              onMouseDown={handleCanvasPointerDown}
              onMouseMove={handleCanvasPointerMove}
              onMouseUp={stopDraggingSignature}
              onMouseLeave={stopDraggingSignature}
              onTouchStart={handleCanvasPointerDown}
              onTouchMove={handleCanvasPointerMove}
              onTouchEnd={stopDraggingSignature}
            />
          </div>
          {signatureUrl && <p className="mt-3 text-xs text-muted-foreground">Glissez la signature dans le tampon pour la positionner.</p>}
        </Card>
      </main>

      {showSignaturePad && (
        <SignaturePad
          onSave={async (url) => {
            const cleaned = await removeWhiteBackgroundFromDataUrl(url);
            setSignatureUrl(cleaned);
            setSignatureX(50);
            setSignatureY(70);
            setShowSignaturePad(false);
          }}
          onCancel={() => setShowSignaturePad(false)}
        />
      )}
    </div>
  );
};

export default GenerateurTampon;
