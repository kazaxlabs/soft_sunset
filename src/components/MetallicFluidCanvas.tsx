import { useEffect, useRef } from "react";

export default function MetallicFluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles or flow vectors
    const points: { x: number; y: number; ox: number; oy: number; speed: number; angle: number; size: number; color: string }[] = [];
    const numPoints = 60;

    // Premium restricted palette: warm creams, soft peachy tans, and brand orange
    const colors = [
      "rgba(255, 253, 250, 0.65)",  // Warm Cream
      "rgba(233, 213, 195, 0.35)",  // Soft Peachy Tan
      "rgba(242, 78, 30, 0.10)",    // Brand Orange
      "rgba(242, 78, 30, 0.15)",    // Brand Orange Medium
      "rgba(251, 230, 215, 0.55)",  // Peach
      "rgba(255, 255, 255, 0.45)",  // Soft White
    ];

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        ox: Math.random() * width,
        oy: Math.random() * height,
        speed: 0.2 + Math.random() * 0.6,
        angle: Math.random() * Math.PI * 2,
        size: 150 + Math.random() * 250,
        color: colors[i % colors.length],
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let time = 0;
    const render = () => {
      time += 0.002;
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#FAF6F0"); // Top warm cream
      bgGrad.addColorStop(0.5, "#F7EBD9"); // Middle soft beige
      bgGrad.addColorStop(1, "#ebdcc2"); // Bottom rich warm sand
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Draw beautiful warm organic layers with standard alpha-blending
      ctx.globalCompositeOperation = "source-over";

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.angle += 0.005 * p.speed;
        
        // Swirl around their original center combined with mouse interaction
        const waveX = Math.sin(p.angle + time) * 120;
        const waveY = Math.cos(p.angle * 1.5 + time) * 120;

        const targetX = p.ox + waveX + (mouseRef.current.x - width / 2) * (0.1 * p.speed);
        const targetY = p.oy + waveY + (mouseRef.current.y - height / 2) * (0.1 * p.speed);

        p.x += (targetX - p.x) * 0.02;
        p.y += (targetY - p.y) * 0.02;

        // Draw soft liquid metal gradients
        const gradient = ctx.createRadialGradient(p.x, p.y, 10, p.x, p.y, p.size);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.5, p.color.replace("0.", "0.05"));
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      // Subtle metallic mesh grid effect
      ctx.strokeStyle = "rgba(18, 18, 18, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
