
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { translations } from '@/utils/translations';
import { useState } from 'react';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Mock blog data
const blogs = [
  {
    id: 1,
    title: "የቤት እቃዎች ምርጫ ላይ ሊታሰቡ የሚገቡ 5 ነጥቦች",
    titleEn: "5 Points to Consider When Choosing Furniture",
    excerpt: "ለቤትዎ ተስማሚ የሆኑ የቤት እቃዎችን ለመምረጥ ሊታሰቡ የሚገቡ አስፈላጊ ነጥቦች።",
    excerptEn: "Essential points to consider when selecting suitable furniture for your home.",
    content: `
      የቤት እቃዎች መምረጥ ቀላል ሊመስል ይችላል፣ ነገር ግን በእውነቱ ብዙ ሊታሰቡ የሚገቡ ነጥቦች አሉ። ይህ ጽሑፍ የቤት እቃዎች ሲመርጡ ሊታሰቡ የሚገቡትን አምስት ዋና ዋና ነጥቦች ያብራራል።

      ## 1. የቦታ መጠን እና አቀማመጥ

      የቤት እቃዎችን ከመግዛትዎ በፊት የሚያስቀምጡበትን ቦታ በጥሞና መለካት አስፈላጊ ነው። የክፍሉን ርዝመት፣ ስፋት እና ቁመት በመለካት የሚገዙት እቃ በቦታው ላይ በሚገባ እንደሚስማማ እርግጠኛ መሆን ይኖርብዎታል።

      ## 2. የቁሳቁስ ጥራት

      የእቃዎች ዘላቂነት በተጠቀመባቸው ቁሳቁሶች ጥራት ይወሰናል። ከእንጨት፣ ከብረት፣ ከጨርቅ እና ሌሎች ቁሳቁሶች የተሰሩ እቃዎችን ሲመርጡ የጥራታቸውን ደረጃ በጥንቃቄ መመርመር ያስፈልጋል።

      ## 3. የቀለም እና የዲዛይን ትስስር

      የሚመርጧቸው የቤት እቃዎች ከቤትዎ አጠቃላይ ዲዛይን እና ከሌሎች እቃዎች ጋር እንዲጣጣሙ ማድረግ አስፈላጊ ነው። የቀለም ምርጫ እና የዲዛይን ዘይቤ ወጥነት ያለው መሆን አለበት።

      ## 4. የአገልግሎት ዓላማ

      እያንዳንዱ የቤት እቃ የተወሰነ ዓላማ ሊኖረው ይገባል። ምን አገልግሎት እንደሚሰጥ፣ ለምን እንደሚያስፈልግ እና እንዴት እንደሚጠቀሙበት በግልጽ ማወቅ ይኖርብዎታል።

      ## 5. የበጀት እቅድ

      ለቤት እቃዎች የሚመደበው በጀት ተጨባጭ እና ተመጣጠን መሆን አለበት። ከበጀትዎ አንፃር ምርጥ ጥራት ያላቸውን እቃዎች መምረጥ ይኖርብዎታል።

      ## መደምደሚያ

      ይህነን አምስት ነጥቦች በመከተል የተሻለ የቤት እቃዎች ምርጫ ማድረግ ይችላሉ። ይህም ለረጅም ጊዜ ተስማሚ እና ማራኪ የቤት አካባቢ ለመፍጠር ይረዳዎታል።
    `,
    contentEn: `
      Choosing furniture may seem simple, but there are actually many points to consider. This article explains five main points to consider when selecting furniture.

      ## 1. Space Size and Layout

      Before buying furniture, it's essential to carefully measure the space where you'll place it. You need to measure the room's length, width, and height to ensure the furniture fits properly in the space.

      ## 2. Material Quality

      The durability of furniture depends on the quality of materials used. When choosing furniture made from wood, metal, fabric, and other materials, you need to carefully examine their quality level.

      ## 3. Color and Design Harmony

      The furniture you choose should match your home's overall design and other furniture pieces. Color choice and design style should be consistent.

      ## 4. Functional Purpose

      Each piece of furniture should serve a specific purpose. You need to clearly understand what service it provides, why you need it, and how you'll use it.

      ## 5. Budget Planning

      The budget allocated for furniture should be realistic and balanced. You need to choose the best quality furniture within your budget.

      ## Conclusion

      By following these five points, you can make better furniture choices. This will help you create a suitable and attractive home environment for the long term.
    `,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3",
    author: "አብራሃም ተስፋዬ",
    authorEn: "Abraham Tesfaye",
    date: "2024-01-15",
    category: "ምክሮች",
    categoryEn: "Tips",
    readTime: "5 ደቂቃ",
    readTimeEn: "5 minutes"
  },
  {
    id: 2,
    title: "ዘመናዊ የቤት ዲዛይን አዝማሚያዎች 2024",
    titleEn: "Modern Home Design Trends 2024",
    excerpt: "በ2024 ለሚወጡ ዘመናዊ የቤት ዲዛይን አዝማሚያዎች መመሪያ።",
    excerptEn: "A guide to modern home design trends emerging in 2024.",
    content: "የ2024 የዲዛይን አዝማሚያዎች ላይ ዝርዝር ይዘት...",
    contentEn: "Detailed content about 2024 design trends...",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3",
    author: "ሳራ ሐይሉ",
    authorEn: "Sara Hailu",
    date: "2024-01-10",
    category: "ዲዛይን",
    categoryEn: "Design",
    readTime: "7 ደቂቃ",
    readTimeEn: "7 minutes"
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('am');
  
  const t = translations[currentLanguage];
  const blog = blogs.find(b => b.id === parseInt(id || ''));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
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

      {/* Hero Image */}
      <div className="aspect-video relative overflow-hidden">
        <OptimizedImage
          src={blog.image}
          alt={currentLanguage === 'am' ? blog.title : blog.titleEn}
          className="w-full h-full object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-500 text-white">
              {currentLanguage === 'am' ? blog.category : blog.categoryEn}
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {currentLanguage === 'am' ? blog.title : blog.titleEn}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {currentLanguage === 'am' ? blog.excerpt : blog.excerptEn}
            </p>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{currentLanguage === 'am' ? blog.author : blog.authorEn}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.date).toLocaleDateString('am-ET')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{currentLanguage === 'am' ? blog.readTime : blog.readTimeEn}</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="whitespace-pre-line leading-relaxed text-foreground">
              {currentLanguage === 'am' ? blog.content : blog.contentEn}
            </div>
          </div>

          {/* Share Section */}
          <div className="border-t pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {currentLanguage === 'am' ? 'ይህን ጽሑፍ አጋሩ' : 'Share this article'}
                </h3>
                <p className="text-muted-foreground">
                  {currentLanguage === 'am' 
                    ? 'ለሌሎችም ጠቃሚ ሊሆን ይችላል።'
                    : 'It might be useful for others too.'
                  }
                </p>
              </div>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                {currentLanguage === 'am' ? 'አጋራ' : 'Share'}
              </Button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">
              {currentLanguage === 'am' ? 'ተዛማጅ ጽሑፎች' : 'Related Articles'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.filter(b => b.id !== blog.id).slice(0, 2).map((relatedBlog) => (
                <Card key={relatedBlog.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => navigate(`/blog/${relatedBlog.id}`)}>
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <OptimizedImage
                      src={relatedBlog.image}
                      alt={currentLanguage === 'am' ? relatedBlog.title : relatedBlog.titleEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">
                      {currentLanguage === 'am' ? relatedBlog.title : relatedBlog.titleEn}
                    </CardTitle>
                    <p className="text-muted-foreground line-clamp-2">
                      {currentLanguage === 'am' ? relatedBlog.excerpt : relatedBlog.excerptEn}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
