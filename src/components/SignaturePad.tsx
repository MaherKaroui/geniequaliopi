import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Check } from "lucide-react";

interface SignaturePadProps {
  onSave: (dataUrl: string) => void;
  onCancel: () => void;
  label?: string;
}

function trimTransparentCanvas(sourceCanvas: HTMLCanvasElement): string {
  const sourceCtx = sourceCanvas.getContext("2d");
  if (!sourceCtx) return sourceCanvas.toDataURL("image/png");

  const { width, height } = sourceCanvas;
  const { data } = sourceCtx.getImageData(0, 0, width, height);

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX === -1 || maxY === -1) {
    return sourceCanvas.toDataURL("image/png");
  }

  const padding = 18;
  const croppedWidth = maxX - minX + 1;
  const croppedHeight = maxY - minY + 1;
  const trimmedCanvas = document.createElement("canvas");
  trimmedCanvas.width = croppedWidth + padding * 2;
  trimmedCanvas.height = croppedHeight + padding * 2;

  const trimmedCtx = trimmedCanvas.getContext("2d");
  if (!trimmedCtx) return sourceCanvas.toDataURL("image/png");

  trimmedCtx.drawImage(
    sourceCanvas,
    minX,
    minY,
    croppedWidth,
    croppedHeight,
    padding,
    padding,
    croppedWidth,
    croppedHeight,
  );

  return trimmedCanvas.toDataURL("image/png");
}

export default function SignaturePad({ onSave, onCancel, label = "Signez ci-dessous" }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const initializeContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  useEffect(() => {
    initializeContext();
  }, [initializeContext]);

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDrawing(true);

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    e.preventDefault();

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const endDraw = () => setDrawing(false);

  const clear = () => {
    initializeContext();
    setHasDrawn(false);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;
    onSave(trimTransparentCanvas(canvas));
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{label}</p>
      <div
        className="border-2 border-dashed border-primary/30 rounded-lg p-1"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #f6f6f6 25%, transparent 25%), linear-gradient(-45deg, #f6f6f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f6f6f6 75%), linear-gradient(-45deg, transparent 75%, #f6f6f6 75%)",
          backgroundSize: "18px 18px",
          backgroundPosition: "0 0, 0 9px, 9px -9px, -9px 0px",
        }}
      >
        <canvas
          ref={canvasRef}
          width={1200}
          height={500}
          className="w-full cursor-crosshair rounded touch-none"
          style={{ maxHeight: "320px" }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={clear} className="gap-1 text-xs">
          <Eraser className="w-3 h-3" /> Effacer
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel} className="text-xs">
            Annuler
          </Button>
          <Button size="sm" onClick={save} disabled={!hasDrawn} className="gap-1 text-xs">
            <Check className="w-3 h-3" /> Valider la signature
          </Button>
        </div>
      </div>
    </div>
  );
}
