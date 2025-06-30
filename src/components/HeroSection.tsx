
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  t: any;
}

const HeroSection = ({ t }: HeroSectionProps) => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/20 dark:to-orange-950/20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
          <Button 
            onClick={scrollToProducts}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {t.heroButton}
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200 dark:bg-amber-800 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-orange-200 dark:bg-orange-800 rounded-full opacity-20 animate-pulse delay-2000"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-20 animate-pulse delay-500"></div>
    </section>
  );
};

export default HeroSection;
