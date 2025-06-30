
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  t: any;
}

const HeroSection = ({ t }: HeroSectionProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-red-950/20 overflow-hidden">
      {/* Dynamic Background with Parallax */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5 transition-transform duration-300"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) scale(1.1)`,
        }}
      ></div>
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10 animate-pulse"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent animate-pulse">
              {t.heroTitle}
            </span>
          </h1>
          <p className={`text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {t.heroSubtitle}
          </p>
          <Button 
            onClick={scrollToProducts}
            size="lg"
            className={`bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-1 animate-bounce delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {t.heroButton}
          </Button>
        </div>
      </div>

      {/* Enhanced Floating Elements with 3D Effects */}
      <div 
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-amber-200 to-amber-400 dark:from-amber-800 dark:to-amber-600 rounded-full opacity-30 animate-pulse delay-1000 transform-gpu"
        style={{
          transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
          boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)',
        }}
      ></div>
      
      <div 
        className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-400 dark:from-orange-800 dark:to-orange-600 rounded-full opacity-30 animate-pulse delay-2000 transform-gpu"
        style={{
          transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px) rotateX(${mousePosition.y * -0.1}deg) rotateY(${mousePosition.x * -0.1}deg)`,
          boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)',
        }}
      ></div>
      
      <div 
        className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-yellow-200 to-yellow-400 dark:from-yellow-800 dark:to-yellow-600 rounded-full opacity-30 animate-pulse delay-500 transform-gpu"
        style={{
          transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px) rotateX(${mousePosition.y * 0.15}deg) rotateY(${mousePosition.x * 0.15}deg)`,
          boxShadow: '0 15px 30px rgba(251, 191, 36, 0.3)',
        }}
      ></div>

      {/* New Floating Furniture Icons */}
      <div 
        className="absolute top-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-amber-300/20 to-orange-400/20 rounded-xl opacity-20 animate-bounce delay-700 transform-gpu"
        style={{
          transform: `translate(${mousePosition.x * 0.06}px, ${mousePosition.y * 0.06}px) rotateZ(${mousePosition.x * 0.05}deg)`,
        }}
      ></div>
      
      <div 
        className="absolute bottom-1/3 right-1/4 w-18 h-18 bg-gradient-to-br from-red-300/20 to-pink-400/20 rounded-xl opacity-20 animate-bounce delay-1500 transform-gpu"
        style={{
          transform: `translate(${mousePosition.x * -0.04}px, ${mousePosition.y * -0.04}px) rotateZ(${mousePosition.x * -0.05}deg)`,
        }}
      ></div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
