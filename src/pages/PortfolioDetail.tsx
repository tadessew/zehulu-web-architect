import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { translations } from '@/utils/translations';
import { useState, useEffect } from 'react';

// Mock portfolio data
const portfolios = [
  {
    id: 1,
    title: "የቤተሰብ ቤት የመኝታ ክፍል መለወጥ",
    titleEn: "Family Home Bedroom Transformation",
    description: "ሙሉ የመኝታ ክፍል ዳግም ዲዛይን እና ፊኒሺንግ። ይህ ፕሮጀክት የወጣት ጥንዶች የመኝታ ክፍል ከባህላዊ ዲዛይን ወደ ዘመናዊ እና ምቹ ቦታ መለወጥን ያሳያል። ከአዳዲስ የቤት እቃዎች፣ የግድግዳ ቀለም እና የወለል ለውጥ ጋር።",
    descriptionEn: "Complete bedroom redesign and finishing. This project showcases the transformation of a young couple's bedroom from traditional design to modern and comfortable space, including new furniture, wall painting, and flooring.",
    beforeImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
    afterImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3"
    ],
    category: "የመኝታ ክፍል",
    categoryEn: "Bedroom",
    location: "አዲስ አበባ",
    locationEn: "Addis Ababa",
    duration: "3 ሳምንት",
    durationEn: "3 weeks",
    client: "የግል ደንበኛ",
    clientEn: "Private Client"
  },
  {
    id: 2,
    title: "ዘመናዊ የመቀመጫ ክፍል ዲዛይን",
    titleEn: "Modern Living Room Design",
    description: "የመቀመጫ ክፍል ሙሉ እንደገና ዲዛይን። ይህ ፕሮጀክት የቤተሰብ የመቀመጫ አካባቢን ወደ ዘመናዊ እና አስደሳች ቦታ የመለወጥ ሂደትን ያሳያል።",
    descriptionEn: "Complete living room redesign. This project shows the process of transforming a family's living area into a modern and welcoming space.",
    beforeImage: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3",
    afterImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3"
    ],
    category: "የመቀመጫ ክፍል",
    categoryEn: "Living Room",
    location: "ባህር ዳር",
    locationEn: "Bahir Dar",
    duration: "2 ሳምንት",
    durationEn: "2 weeks",
    client: "የቤተሰብ ደንበኛ",
    clientEn: "Family Client"
  }
];

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('am');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBefore, setShowBefore] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const t = translations[currentLanguage];
  const portfolio = portfolios.find(p => p.id === parseInt(id || ''));

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-red-950/20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-red-950/20 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-200/10 via-orange-200/10 to-red-200/10"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        {/* Floating 3D Elements */}
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-300/20 to-orange-400/20 rounded-full animate-pulse transform-gpu"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) translateY(${scrollY * 0.3}px)`,
            boxShadow: '0 25px 50px rgba(245, 158, 11, 0.3)',
          }}
        />
        
        <div 
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-orange-300/20 to-red-400/20 rounded-xl animate-bounce transform-gpu"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px) rotateX(${mousePosition.y * -0.1}deg) rotateY(${mousePosition.x * -0.1}deg) translateY(${scrollY * 0.2}px)`,
            boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)',
          }}
        />
        
        <div 
          className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-yellow-300/20 to-amber-400/20 rounded-lg animate-pulse delay-1000 transform-gpu"
          style={{
            transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px) rotateZ(${mousePosition.x * 0.05}deg) translateY(${scrollY * 0.4}px)`,
          }}
        />
        
        {/* Animated Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-amber-400/30 rounded-full animate-pulse transform-gpu"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              transform: `translateY(${scrollY * (0.1 + Math.random() * 0.2)}px)`,
            }}
          />
        ))}
      </div>

      {/* Header with 3D Effects */}
      <div className="bg-white/80 backdrop-blur-md border-b border-amber-200/50 sticky top-0 z-50 shadow-lg shadow-amber-100/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="hover:bg-amber-100/50 hover:scale-105 transition-all duration-300 transform"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentLanguage === 'am' ? 'ወደ ቤት ገጽ' : 'Back to Home'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentLanguage(prev => prev === 'am' ? 'en' : 'am')}
              className="hover:bg-amber-50 hover:border-amber-300 hover:scale-105 transition-all duration-300 transform"
            >
              {currentLanguage === 'am' ? 'English' : 'አማርኛ'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section with 3D Effects */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
            {currentLanguage === 'am' ? portfolio.category : portfolio.categoryEn}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            {currentLanguage === 'am' ? portfolio.title : portfolio.titleEn}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {currentLanguage === 'am' ? portfolio.description : portfolio.descriptionEn}
          </p>
        </div>

        {/* Project Info Cards with 3D Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: MapPin, title: currentLanguage === 'am' ? 'አካባቢ' : 'Location', value: currentLanguage === 'am' ? portfolio.location : portfolio.locationEn },
            { icon: Calendar, title: currentLanguage === 'am' ? 'የፕሮጀክት ጊዜ' : 'Duration', value: currentLanguage === 'am' ? portfolio.duration : portfolio.durationEn },
            { icon: Users, title: currentLanguage === 'am' ? 'ደንበኛ' : 'Client', value: currentLanguage === 'am' ? portfolio.client : portfolio.clientEn }
          ].map((item, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl bg-gradient-to-br from-white/90 to-amber-50/50 dark:from-gray-900/90 dark:to-amber-950/50 backdrop-blur-sm border-2 border-transparent hover:border-amber-200 dark:hover:border-amber-800"
              style={{
                animationDelay: `${index * 200}ms`,
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`
              }}
            >
              <CardContent className="p-6 text-center relative z-10">
                <item.icon className="w-8 h-8 mx-auto mb-2 text-amber-600 group-hover:text-orange-600 transition-colors duration-300 group-hover:scale-110 transform" />
                <h3 className="font-semibold mb-1 group-hover:text-amber-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors duration-300">
                  {item.value}
                </p>
              </CardContent>
              
              {/* 3D Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-all duration-700 group-hover:translate-x-full opacity-0 group-hover:opacity-100"></div>
            </Card>
          ))}
        </div>

        {/* Enhanced Before/After Comparison with 3D Effects */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {currentLanguage === 'am' ? 'ከዚህ በፊት እና ከዛ በኋላ' : 'Before & After'}
          </h2>
          <div className="relative aspect-video rounded-2xl overflow-hidden max-w-4xl mx-auto shadow-2xl shadow-amber-200/50 group">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20 transition-opacity duration-500"
              style={{
                opacity: showBefore ? 0.3 : 0.1
              }}
            />
            <img
              src={showBefore ? portfolio.beforeImage : portfolio.afterImage}
              alt={showBefore ? "Before" : "After"}
              className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-105"
              style={{
                filter: `brightness(${showBefore ? '0.9' : '1.1'}) saturate(${showBefore ? '0.8' : '1.2'}) contrast(${showBefore ? '0.9' : '1.1'})`
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={() => setShowBefore(!showBefore)}
                className="bg-black/70 text-white hover:bg-amber-600/90 hover:scale-110 transform transition-all duration-300 shadow-lg backdrop-blur-sm"
              >
                {showBefore 
                  ? (currentLanguage === 'am' ? 'ከዛ በኋላ ይመልከቱ' : 'Show After')
                  : (currentLanguage === 'am' ? 'ከዚህ በፊት ይመልከቱ' : 'Show Before')
                }
              </Button>
            </div>
            <Badge className="absolute top-4 left-4 bg-black/70 text-white backdrop-blur-sm hover:bg-amber-600/90 transition-all duration-300">
              {showBefore 
                ? (currentLanguage === 'am' ? 'ከዚህ በፊት' : 'Before')
                : (currentLanguage === 'am' ? 'ከዛ በኋላ' : 'After')
              }
            </Badge>
          </div>
        </div>

        {/* Enhanced Image Gallery with 3D Grid */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {currentLanguage === 'am' ? 'የፕሮጀክት ምስሎች' : 'Project Gallery'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.images.map((image, index) => (
              <div 
                key={index} 
                className="group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1"
                style={{
                  animationDelay: `${index * 150}ms`,
                  perspective: '1000px'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <img
                  src={image}
                  alt={`Project image ${index + 1}`}
                  className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                
                {/* 3D Frame Effect */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-amber-300/50 transition-all duration-300" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section with 3D Effects */}
        <div className="text-center relative">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-3xl transform -rotate-1"
            style={{
              transform: `rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg) rotate(-1deg)`
            }}
          />
          <div className="relative z-10 py-12 px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {currentLanguage === 'am' ? 'ተመሳሳይ ፕሮጀክት ይፈልጋሉ?' : 'Looking for a Similar Project?'}
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              {currentLanguage === 'am' 
                ? 'ለእርስዎ ቤት ተመሳሳይ ስራ ለመሥራት ያግኙን።'
                : 'Contact us to create a similar transformation for your home.'
              }
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transform hover:scale-110 hover:rotate-1 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-4"
            >
              {currentLanguage === 'am' ? 'አሁን ያግኙን' : 'Contact Us Now'}
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Action Button with 3D Effect */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          size="lg"
          className="rounded-full w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-bounce"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            transform: `scale(${1 + Math.sin(Date.now() * 0.002) * 0.05}) perspective(1000px) rotateX(${mousePosition.y * 0.02}deg)`
          }}
        >
          ↑
        </Button>
      </div>
    </div>
  );
};

export default PortfolioDetail;
