import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  trail: Array<{ x: number; y: number }>;
  length: number;
}

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gradient colors matching the text: white → #FFE5B4 → #D4AF37
    const gradientColors = [
      { from: '#FFFFFF', to: '#FFE5B4' },
      { from: '#FFE5B4', to: '#D4AF37' },
      { from: '#FFFFFF', to: '#D4AF37' },
      { from: '#D4AF37', to: '#FFFFFF' },
      { from: '#FFE5B4', to: '#FFFFFF' },
      { from: '#D4AF37', to: '#FFE5B4' }
    ];

    const createFirework = (x: number, y: number) => {
      const particleCount = 60;
      const gradientIndex = Math.floor(Math.random() * gradientColors.length);
      const gradient = gradientColors[gradientIndex];
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.2;
        const speed = 2 + Math.random() * 4;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        // Interpolate color between from and to based on particle position in the circle
        const t = i / particleCount;
        const r1 = parseInt(gradient.from.slice(1, 3), 16);
        const g1 = parseInt(gradient.from.slice(3, 5), 16);
        const b1 = parseInt(gradient.from.slice(5, 7), 16);
        const r2 = parseInt(gradient.to.slice(1, 3), 16);
        const g2 = parseInt(gradient.to.slice(3, 5), 16);
        const b2 = parseInt(gradient.to.slice(5, 7), 16);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);
        const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        
        particlesRef.current.push({
          x,
          y,
          vx,
          vy,
          life: 1.0,
          color,
          trail: [],
          length: 8 + Math.random() * 12
        });
      }
    };

    const updateParticles = () => {
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i];
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // Gravity
        
        // Add to trail
        particle.trail.push({ x: particle.x, y: particle.y });
        const maxTrailLength = Math.ceil(particle.length / 2);
        if (particle.trail.length > maxTrailLength) {
          particle.trail.shift();
        }
        
        // Decrease life
        particle.life -= 0.012;
        
        // Remove dead particles
        if (particle.life <= 0 || particle.y > canvas.height) {
          particlesRef.current.splice(i, 1);
        }
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        if (particle.trail.length < 2) return;
        
        // Draw particle as a thin line (trail)
        ctx.globalAlpha = particle.life;
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 8;
        ctx.shadowColor = particle.color;
        
        ctx.beginPath();
        ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
        
        for (let i = 1; i < particle.trail.length; i++) {
          ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initial fireworks
    createFirework(canvas.width / 2, canvas.height - 100);
    
    // Random fireworks at intervals - bắn khắp màn hình
    const fireworkInterval = setInterval(() => {
      if (particlesRef.current.length < 150) { // Limit particle count
        const x = Math.random() * canvas.width;
        const y = canvas.height * 0.2 + Math.random() * canvas.height * 0.7;
        createFirework(x, y);
      }
    }, 1500);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(fireworkInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[200]"
      style={{ opacity: 1 }}
    />
  );
};

export default Fireworks;

