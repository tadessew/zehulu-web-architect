
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { translations } from '@/utils/translations';
import { useState } from 'react';

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
  
  const t = translations[currentLanguage];
  const portfolio = portfolios.find(p => p.id === parseInt(id || ''));

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentLanguage === 'am' ? 'ወደ ቤት ገጽ' : 'Back to Home'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentLanguage(prev => prev === 'am' ? 'en' : 'am')}
            >
              {currentLanguage === 'am' ? 'English' : 'አማርኛ'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-500 text-white">
            {currentLanguage === 'am' ? portfolio.category : portfolio.categoryEn}
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {currentLanguage === 'am' ? portfolio.title : portfolio.titleEn}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentLanguage === 'am' ? portfolio.description : portfolio.descriptionEn}
          </p>
        </div>

        {/* Project Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">
                {currentLanguage === 'am' ? 'አካባቢ' : 'Location'}
              </h3>
              <p className="text-muted-foreground">
                {currentLanguage === 'am' ? portfolio.location : portfolio.locationEn}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">
                {currentLanguage === 'am' ? 'የፕሮጀክት ጊዜ' : 'Duration'}
              </h3>
              <p className="text-muted-foreground">
                {currentLanguage === 'am' ? portfolio.duration : portfolio.durationEn}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">
                {currentLanguage === 'am' ? 'ደንበኛ' : 'Client'}
              </h3>
              <p className="text-muted-foreground">
                {currentLanguage === 'am' ? portfolio.client : portfolio.clientEn}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Before/After Comparison */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            {currentLanguage === 'am' ? 'ከዚህ በፊት እና ከዛ በኋላ' : 'Before & After'}
          </h2>
          <div className="relative aspect-video rounded-lg overflow-hidden max-w-4xl mx-auto">
            <img
              src={showBefore ? portfolio.beforeImage : portfolio.afterImage}
              alt={showBefore ? "Before" : "After"}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={() => setShowBefore(!showBefore)}
                className="bg-black/70 text-white hover:bg-black/80"
              >
                {showBefore 
                  ? (currentLanguage === 'am' ? 'ከዛ በኋላ ይመልከቱ' : 'Show After')
                  : (currentLanguage === 'am' ? 'ከዚህ በፊት ይመልከቱ' : 'Show Before')
                }
              </Button>
            </div>
            <Badge className="absolute top-4 left-4 bg-black/70 text-white">
              {showBefore 
                ? (currentLanguage === 'am' ? 'ከዚህ በፊት' : 'Before')
                : (currentLanguage === 'am' ? 'ከዛ በኋላ' : 'After')
              }
            </Badge>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            {currentLanguage === 'am' ? 'የፕሮጀክት ምስሎች' : 'Project Gallery'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.images.map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Project image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {currentLanguage === 'am' ? 'ተመሳሳይ ፕሮጀክት ይፈልጋሉ?' : 'Looking for a Similar Project?'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {currentLanguage === 'am' 
              ? 'ለእርስዎ ቤት ተመሳሳይ ስራ ለመሥራት ያግኙን።'
              : 'Contact us to create a similar transformation for your home.'
            }
          </p>
          <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600">
            {currentLanguage === 'am' ? 'አሁን ያግኙን' : 'Contact Us Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
