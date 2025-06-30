import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { translations } from '@/utils/translations';

interface FooterProps {
  t: any;
}

const Footer = ({ t }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ዘ</span>
              </div>
              <span className="text-xl font-bold">ዘሁሉ</span>
            </div>
            <p className="text-muted-foreground">
              {t === translations?.am 
                ? "ለቤትዎ ምቹ እና ማራኪ የቤት እቃዎች እና ሙያዊ የፊኒሺንግ አገልግሎቶች።"
                : "Quality furniture and professional finishing services for your home."
              }
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {t === translations?.am ? "ፈጣን ሊንኮች" : "Quick Links"}
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {t.home}
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {t.products}
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {t.portfolio}
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {t.blog}
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {t.services}
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>{t === translations?.am ? "የቤት እቃዎች" : "Furniture"}</p>
              <p>{t === translations?.am ? "ዋል ፔንቲንግ" : "Wall Painting"}</p>
              <p>{t === translations?.am ? "ወለል መስኪያ" : "Flooring"}</p>
              <p>{t === translations?.am ? "ሙሉ ፊኒሺንግ" : "Complete Finishing"}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {t.contact}
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>+251 911 123 456</p>
              <p>info@zehulu.com</p>
              <p>{t === translations?.am ? "አዲስ አበባ፣ ኢትዮጵያ" : "Addis Ababa, Ethiopia"}</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © {currentYear} ዘሁሉ. {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
