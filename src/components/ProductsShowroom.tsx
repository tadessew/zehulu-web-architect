
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { translations } from '@/utils/translations';

interface Product {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  image: string;
  category: string;
  categoryEn: string;
}

interface ProductsShowroomProps {
  t: any;
}

const ProductsShowroom = ({ t }: ProductsShowroomProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const navigate = useNavigate();

  const products: Product[] = [
    {
      id: 1,
      name: "ዘመናዊ የመኝታ ክፍል ሴት",
      nameEn: "Modern Bedroom Set",
      description: "ዘመናዊ ዲዛይን ያለው የመኝታ ክፍል እቃዎች ሙሉ ሴት",
      descriptionEn: "Complete bedroom furniture set with modern design",
      price: 25000,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3",
      category: "የመኝታ ክፍል",
      categoryEn: "Bedroom"
    },
    {
      id: 2,
      name: "የመቀመጫ ክፍል ሶፋ",
      nameEn: "Living Room Sofa",
      description: "ምቹ እና ዘላቂ የመቀመጫ ክፍል ሶፋ",
      descriptionEn: "Comfortable and durable living room sofa",
      price: 18000,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3",
      category: "የመቀመጫ ክፍል",
      categoryEn: "Living Room"
    },
    {
      id: 3,
      name: "የመመገቢያ ጠረጴዛ ሴት",
      nameEn: "Dining Table Set",
      description: "6 ሰዎች የሚመገቡበት የመመገቢያ ጠረጴዛ ከወንበሮች ጋር",
      descriptionEn: "6-person dining table set with chairs",
      price: 15000,
      image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3",
      category: "የመመገቢያ ክፍል",
      categoryEn: "Dining Room"
    },
    {
      id: 4,
      name: "የጽሕፈት ጠረጴዛ",
      nameEn: "Office Desk",
      description: "የቤት እና የጽሕፈት ቤት ስራ የሚሰራበት ጠረጴዛ",
      descriptionEn: "Home and office work desk",
      price: 8000,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3",
      category: "የጽሕፈት ቤት",
      categoryEn: "Office"
    },
    {
      id: 5,
      name: "ዋል ፔንቲንግ አገልግሎት",
      nameEn: "Wall Painting Service",
      description: "ሙያዊ የግድግዳ ቀለም ቀባት አገልግሎት",
      descriptionEn: "Professional wall painting service",
      price: 5000,
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3",
      category: "ፊኒሺንግ",
      categoryEn: "Finishing"
    },
    {
      id: 6,
      name: "የላሚኔት ፍሎሪንግ",
      nameEn: "Laminate Flooring",
      description: "ጥራት ያለው የላሚኔት ወለል መስኪያ አገልግሎት",
      descriptionEn: "Quality laminate flooring installation service",
      price: 3500,
      image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3",
      category: "ፊኒሺንግ",
      categoryEn: "Finishing"
    }
  ];

  const categories = [
    { value: 'all', label: 'ሁሉም', labelEn: 'All' },
    { value: 'የመኝታ ክፍል', label: 'የመኝታ ክፍል', labelEn: 'Bedroom' },
    { value: 'የመቀመጫ ክፍል', label: 'የመቀመጫ ክፍል', labelEn: 'Living Room' },
    { value: 'የመመገቢያ ክፍል', label: 'የመመገቢያ ክፍል', labelEn: 'Dining Room' },
    { value: 'የጽሕፈት ቤት', label: 'የጽሕፈት ቤት', labelEn: 'Office' },
    { value: 'ፊኒሺንግ', label: 'ፊኒሺንግ', labelEn: 'Finishing' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section id="products" className="py-20 bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-orange-300/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-200/20 to-red-300/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-yellow-200/20 to-amber-300/20 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-br from-amber-300/20 to-orange-400/20 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {t.productsTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.productsSubtitle}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-slide-in-left">
          {categories.map((category, index) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.value)}
              className={`mb-2 transform transition-all duration-300 hover:scale-105 ${
                selectedCategory === category.value 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {t === translations?.am ? category.label : category.labelEn}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className={`group relative overflow-hidden transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl animate-scale-in cursor-pointer bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-2 border-transparent hover:border-amber-200 dark:hover:border-amber-800 ${
                hoveredProduct === product.id ? 'shadow-2xl scale-105 rotate-1' : ''
              }`}
              style={{ 
                animationDelay: `${index * 150}ms`,
                perspective: '1000px'
              }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* 3D Image Container */}
              <div className="relative overflow-hidden rounded-t-lg h-64 transform-gpu">
                <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
                
                <img
                  src={product.image}
                  alt={t === translations?.am ? product.name : product.nameEn}
                  className={`w-full h-full object-cover transition-all duration-700 transform-gpu ${
                    hoveredProduct === product.id 
                      ? 'scale-110 brightness-110 saturate-110' 
                      : 'scale-100'
                  }`}
                  style={{
                    filter: hoveredProduct === product.id 
                      ? 'brightness(1.1) saturate(1.2) contrast(1.1)' 
                      : 'brightness(1) saturate(1) contrast(1)'
                  }}
                />
                
                {/* Floating Badge */}
                <Badge className={`absolute top-4 right-4 z-20 transition-all duration-300 transform ${
                  hoveredProduct === product.id 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 scale-110 shadow-lg' 
                    : 'bg-amber-500'
                } text-white font-semibold`}>
                  {t === translations?.am ? product.category : product.categoryEn}
                </Badge>

                {/* Animated Overlay Icons */}
                <div className={`absolute inset-0 flex items-center justify-center z-15 transition-all duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="flex space-x-2">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce delay-100">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              <CardHeader className="relative z-10">
                <CardTitle className={`text-xl transition-all duration-300 ${
                  hoveredProduct === product.id 
                    ? 'text-amber-600 dark:text-amber-400 transform scale-105' 
                    : 'text-foreground'
                }`}>
                  {t === translations?.am ? product.name : product.nameEn}
                </CardTitle>
                <p className="text-muted-foreground transition-all duration-300">
                  {t === translations?.am ? product.description : product.descriptionEn}
                </p>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-bold transition-all duration-300 ${
                    hoveredProduct === product.id 
                      ? 'text-amber-600 dark:text-amber-400 scale-110' 
                      : 'text-primary'
                  }`}>
                    {product.price.toLocaleString()} ብር
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className={`flex-1 transition-all duration-300 transform ${
                      hoveredProduct === product.id 
                        ? 'hover:scale-105 border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950' 
                        : ''
                    }`}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {t.viewDetails}
                  </Button>
                  <Button className={`flex-1 transition-all duration-300 transform hover:scale-105 ${
                    hoveredProduct === product.id 
                      ? 'bg-gradient-to-r from-amber-600 to-orange-700 shadow-lg' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-600'
                  }`}>
                    {t.inquireProduct}
                  </Button>
                </div>
              </CardContent>

              {/* 3D Shine Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 transition-all duration-700 ${
                hoveredProduct === product.id 
                  ? 'translate-x-full opacity-100' 
                  : '-translate-x-full opacity-0'
              }`}></div>
            </Card>
          ))}
        </div>

        {/* Floating Action Elements */}
        <div className="fixed bottom-8 right-8 z-50">
          <div className="flex flex-col space-y-3">
            <Button
              size="lg"
              className="rounded-full w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-bounce"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ↑
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsShowroom;
