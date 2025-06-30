
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/utils/translations';

// Mock product data - in a real app this would come from an API
const products = [
  {
    id: 1,
    name: "ዘመናዊ የመኝታ ክፍል ሴት",
    nameEn: "Modern Bedroom Set",
    description: "ዘመናዊ ዲዛይን ያለው የመኝታ ክፍል እቃዎች ሙሉ ሴት። ይህ ሴት የመኝታ ፍራሽ፣ የአልባሳት ሣንቲ፣ የመስተዋት ጠረጴዛ እና ሁለት የጎን ጠረጴዛዎችን ያካትታል። ከጥራት ያለው ከእንጨት የተሰራ ሲሆን ለረጅም ጊዜ አገልግሎት የተሰራ ነው።",
    descriptionEn: "Complete bedroom furniture set with modern design. This set includes a bed frame, wardrobe, dressing table, and two side tables. Made from quality wood for long-lasting service.",
    price: 25000,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3"
    ],
    category: "የመኝታ ክፍል",
    categoryEn: "Bedroom",
    specifications: {
      am: ["በመኝታ ፍራሽ: 200x160 ሴ.ሜ", "አልባሳት ሳንቲ: 200x60x220 ሴ.ሜ", "የመስተዋት ጠረጴዛ: 120x40x75 ሴ.ሜ"],
      en: ["Bed Frame: 200x160 cm", "Wardrobe: 200x60x220 cm", "Dressing Table: 120x40x75 cm"]
    }
  },
  {
    id: 2,
    name: "የመቀመጫ ክፍል ሶፋ",
    nameEn: "Living Room Sofa",
    description: "ምቹ እና ዘላቂ የመቀመጫ ክፍል ሶፋ። ከጥራት ያለው ጨርቅ የተሰራ ሲሆን ለቤተሰብ እና እንግዶች ምቹ የመቀመጫ ቦታ ይሰጣል።",
    descriptionEn: "Comfortable and durable living room sofa. Made from quality fabric providing comfortable seating for family and guests.",
    price: 18000,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3"
    ],
    category: "የመቀመጫ ክፍል",
    categoryEn: "Living Room",
    specifications: {
      am: ["ርዝመት: 220 ሴ.ሜ", "ስፋት: 90 ሴ.ሜ", "ቁመት: 85 ሴ.ሜ"],
      en: ["Length: 220 cm", "Width: 90 cm", "Height: 85 cm"]
    }
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentLanguage, setCurrentLanguage] = useState('am');
  const [selectedImage, setSelectedImage] = useState(0);
  
  const t = translations[currentLanguage];
  const product = products.find(p => p.id === parseInt(id || ''));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleInquiry = () => {
    toast({
      title: currentLanguage === 'am' ? "ጥያቄ ተልኳል!" : "Inquiry Sent!",
      description: currentLanguage === 'am' ? "በቅርብ ጊዜ ወደ እርስዎ እንመለሳለን።" : "We will get back to you soon.",
    });
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={currentLanguage === 'am' ? product.name : product.nameEn}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2 bg-amber-500 text-white">
                {currentLanguage === 'am' ? product.category : product.categoryEn}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {currentLanguage === 'am' ? product.name : product.nameEn}
              </h1>
              <p className="text-xl text-muted-foreground">
                {currentLanguage === 'am' ? product.description : product.descriptionEn}
              </p>
            </div>

            <div className="text-3xl font-bold text-primary">
              {product.price.toLocaleString()} ብር
            </div>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">
                  {currentLanguage === 'am' ? 'ዝርዝር መግለጫ' : 'Specifications'}
                </h3>
                <ul className="space-y-2">
                  {product.specifications[currentLanguage].map((spec, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={handleInquiry} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600">
                <ShoppingCart className="w-4 h-4 mr-2" />
                {currentLanguage === 'am' ? 'ይህን ምርት ይጠይቁ' : 'Inquire About This Product'}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
