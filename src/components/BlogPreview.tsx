
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  image: string;
  author: string;
  authorEn: string;
  date: string;
  category: string;
  categoryEn: string;
}

interface BlogPreviewProps {
  t: any;
}

const BlogPreview = ({ t }: BlogPreviewProps) => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "የቤት እቃዎች ምርጫ ላይ ሊታሰቡ የሚገቡ 5 ነጥቦች",
      titleEn: "5 Points to Consider When Choosing Furniture",
      excerpt: "ለቤትዎ ተስማሚ የሆኑ የቤት እቃዎችን ለመምረጥ ሊታሰቡ የሚገቡ አስፈላጊ ነጥቦች።",
      excerptEn: "Essential points to consider when selecting suitable furniture for your home.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3",
      author: "አብራሃም ተስፋዬ",
      authorEn: "Abraham Tesfaye",
      date: "2024-01-15",
      category: "ምክሮች",
      categoryEn: "Tips"
    },
    {
      id: 2,
      title: "ዘመናዊ የቤት ዲዛይን አዝማሚያዎች 2024",
      titleEn: "Modern Home Design Trends 2024",
      excerpt: "በ2024 ለሚወጡ ዘመናዊ የቤት ዲዛይን አዝማሚያዎች መመሪያ።",
      excerptEn: "A guide to modern home design trends emerging in 2024.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3",
      author: "ሳራ ሐይሉ",
      authorEn: "Sara Hailu",
      date: "2024-01-10",
      category: "ዲዛይን",
      categoryEn: "Design"
    },
    {
      id: 3,
      title: "የቤት እቃዎች ጥገና እና እንክብካቤ",
      titleEn: "Furniture Maintenance and Care",
      excerpt: "የቤት እቃዎችዎን ለረጅም ጊዜ እንዲያገለግሉ እንዴት መንከባከብ እንደሚችሉ።",
      excerptEn: "How to care for your furniture to ensure long-lasting service.",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3",
      author: "ዳንኤል አብዱ",
      authorEn: "Daniel Abdu",
      date: "2024-01-05",
      category: "እንክብካቤ",
      categoryEn: "Care"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.blogTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.blogSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={t === translations?.am ? post.title : post.titleEn}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 right-4 bg-blue-500 text-white">
                  {t === translations?.am ? post.category : post.categoryEn}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">
                  {t === translations?.am ? post.title : post.titleEn}
                </CardTitle>
                <p className="text-muted-foreground line-clamp-3">
                  {t === translations?.am ? post.excerpt : post.excerptEn}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{t === translations?.am ? post.author : post.authorEn}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('am-ET')}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {t.readMore}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground"
          >
            ተጨማሪ ልጥፎች ይመልከቱ / View More Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
