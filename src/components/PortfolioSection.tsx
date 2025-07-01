
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { PortfolioFilter } from '@/components/PortfolioFilter';
import { PortfolioSkeletonGrid } from '@/components/ui/portfolio-skeleton';
import { usePortfolio } from '@/hooks/usePortfolio';
import { translations } from '@/utils/translations';

interface PortfolioSectionProps {
  t: any;
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const PortfolioSection = ({ t }: PortfolioSectionProps) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Get current language from translations object
  const currentLanguage = t === translations?.am ? 'am' : 'en';
  
  const {
    projects,
    isLoading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    categories,
    filteredCount
  } = usePortfolio(currentLanguage);

  // GSAP animations
  useEffect(() => {
    if (!isLoading && projects.length > 0 && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Animate section title
        gsap.fromTo('.portfolio-title', 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: '.portfolio-title',
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Animate portfolio cards
        gsap.fromTo('.portfolio-card', 
          { opacity: 0, y: 100, scale: 0.8 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [isLoading, projects]);

  // Handle touch interactions for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    
    // Add subtle 3D tilt effect on touch
    gsap.to(e.currentTarget, {
      duration: 0.3,
      rotateX: (y - 50) * 0.1,
      rotateY: (x - 50) * 0.1,
      ease: 'power2.out'
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    gsap.to(e.currentTarget, {
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out'
    });
  };

  if (error) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 portfolio-title">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.portfolioTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.portfolioSubtitle}
          </p>
        </div>

        {/* Portfolio Filter */}
        {!isLoading && (
          <PortfolioFilter
            categories={categories}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            t={t}
          />
        )}

        {/* Results count */}
        {!isLoading && searchTerm && (
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              {filteredCount} {t.resultsFound || 'results found'} {searchTerm && `for "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <PortfolioSkeletonGrid count={4} />}

        {/* Portfolio Grid */}
        {!isLoading && (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="portfolio-card group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={() => navigate(`/portfolio/${project.id}`)}
                style={{ perspective: '1000px' }}
              >
                <div className="relative h-80 overflow-hidden">
                  {/* Optimized Before/After Images */}
                  <div className="relative w-full h-full">
                    <OptimizedImage
                      src={project.beforeImage}
                      alt={`${currentLanguage === 'am' ? project.title : project.titleEn} - Before`}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        hoveredProject === project.id ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    <OptimizedImage
                      src={project.afterImage}
                      alt={`${currentLanguage === 'am' ? project.title : project.titleEn} - After`}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    
                    {/* Before/After Label */}
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant="secondary" 
                        className="bg-black/70 text-white backdrop-blur-sm"
                      >
                        {hoveredProject === project.id ? 'ከዛ በኋላ / After' : 'ከዚህ በፊት / Before'}
                      </Badge>
                    </div>

                    {/* Category and Location */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Badge className="bg-amber-500 text-white">
                        {currentLanguage === 'am' ? project.category : project.categoryEn}
                      </Badge>
                      <Badge variant="outline" className="bg-white/90 text-black">
                        {currentLanguage === 'am' ? project.location : project.locationEn}
                      </Badge>
                    </div>

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-sm mb-2">{t.beforeAfter}</p>
                        <Button 
                          variant="outline" 
                          className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/portfolio/${project.id}`);
                          }}
                        >
                          {t.viewProject}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {currentLanguage === 'am' ? project.title : project.titleEn}
                  </h3>
                  <p className="text-muted-foreground">
                    {currentLanguage === 'am' ? project.description : project.descriptionEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && projects.length === 0 && (searchTerm || selectedCategory) && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">{t.noResults || 'No results found'}</h3>
            <p className="text-muted-foreground mb-4">
              {t.tryDifferentSearch || 'Try adjusting your search or filters'}
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
            >
              {t.clearFilters || 'Clear Filters'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
