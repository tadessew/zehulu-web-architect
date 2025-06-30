import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { translations } from '@/utils/translations';

interface PortfolioProject {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  beforeImage: string;
  afterImage: string;
  category: string;
  categoryEn: string;
  location: string;
  locationEn: string;
}

interface PortfolioSectionProps {
  t: any;
}

const PortfolioSection = ({ t }: PortfolioSectionProps) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const navigate = useNavigate();

  const projects: PortfolioProject[] = [
    {
      id: 1,
      title: "የቤተሰብ ቤት የመኝታ ክፍል መለወጥ",
      titleEn: "Family Home Bedroom Transformation",
      description: "ሙሉ የመኝታ ክፍል ዳግም ዲዛይን እና ፊኒሺንግ",
      descriptionEn: "Complete bedroom redesign and finishing",
      beforeImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
      afterImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3",
      category: "የመኝታ ክፍል",
      categoryEn: "Bedroom",
      location: "አዲስ አበባ",
      locationEn: "Addis Ababa"
    },
    {
      id: 2,
      title: "ዘመናዊ የመቀመጫ ክፍል ዲዛይን",
      titleEn: "Modern Living Room Design",
      description: "የመቀመጫ ክፍል ሙሉ እንደገና ዲዛይን",
      descriptionEn: "Complete living room redesign",
      beforeImage: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3",
      afterImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3",
      category: "የመቀመጫ ክፍል",
      categoryEn: "Living Room",
      location: "ባህር ዳር",
      locationEn: "Bahir Dar"
    },
    {
      id: 3,
      title: "የመመገቢያ ቦታ ማሻሻል",
      titleEn: "Dining Area Enhancement",
      description: "የመመገቢያ ክፍል ምሳሌያዊ ለውጥ",
      descriptionEn: "Exemplary dining room transformation",
      beforeImage: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?ixlib=rb-4.0.3",
      afterImage: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3",
      category: "የመመገቢያ ክፍል",
      categoryEn: "Dining Room",
      location: "ጎንደር",
      locationEn: "Gondar"
    },
    {
      id: 4,
      title: "የቤት ጽሕፈት ቤት መፍጠር",
      titleEn: "Home Office Creation",
      description: "ውጤታማ የቤት ጽሕፈት ቤት ቦታ መፍጠር",
      descriptionEn: "Creating an efficient home office space",
      beforeImage: "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3",
      afterImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3",
      category: "የጽሕፈት ቤት",
      categoryEn: "Office",
      location: "ሐዋሳ",
      locationEn: "Hawassa"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.portfolioTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.portfolioSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-80 overflow-hidden">
                {/* Before/After Images */}
                <div className="relative w-full h-full">
                  <img
                    src={project.beforeImage}
                    alt={`${t === translations?.am ? project.title : project.titleEn} - Before`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      hoveredProject === project.id ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <img
                    src={project.afterImage}
                    alt={`${t === translations?.am ? project.title : project.titleEn} - After`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  
                  {/* Before/After Label */}
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant="secondary" 
                      className="bg-black/70 text-white"
                    >
                      {hoveredProject === project.id ? 'ከዛ በኋላ / After' : 'ከዚህ በፊት / Before'}
                    </Badge>
                  </div>

                  {/* Category and Location */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Badge className="bg-amber-500 text-white">
                      {t === translations?.am ? project.category : project.categoryEn}
                    </Badge>
                    <Badge variant="outline" className="bg-white/90 text-black">
                      {t === translations?.am ? project.location : project.locationEn}
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
                        onClick={() => navigate(`/portfolio/${project.id}`)}
                      >
                        {t.viewProject}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t === translations?.am ? project.title : project.titleEn}
                </h3>
                <p className="text-muted-foreground">
                  {t === translations?.am ? project.description : project.descriptionEn}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
