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
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.productsTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.productsSubtitle}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.value)}
              className="mb-2"
            >
              {t === translations?.am ? category.label : category.labelEn}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={t === translations?.am ? product.name : product.nameEn}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 right-4 bg-amber-500 text-white">
                  {t === translations?.am ? product.category : product.categoryEn}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">
                  {t === translations?.am ? product.name : product.nameEn}
                </CardTitle>
                <p className="text-muted-foreground">
                  {t === translations?.am ? product.description : product.descriptionEn}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString()} ብር
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {t.viewDetails}
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600">
                    {t.inquireProduct}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsShowroom;
