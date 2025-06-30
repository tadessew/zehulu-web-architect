
import { useState } from 'react';
import { Search, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  currentLanguage: string;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  t: any;
}

const Header = ({ currentLanguage, toggleLanguage, toggleTheme, isDarkMode, t }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ዘ</span>
            </div>
            <span className="text-xl font-bold">ዘሁሉ</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.home}
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.products}
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.portfolio}
            </button>
            <button 
              onClick={() => scrollToSection('estimator')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.estimator}
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.blog}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.contact}
            </button>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-48"
              />
            </div>
          </form>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{currentLanguage === 'am' ? 'EN' : 'አማ'}</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t.home}
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t.products}
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t.portfolio}
              </button>
              <button 
                onClick={() => scrollToSection('estimator')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t.estimator}
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t.blog}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t.contact}
              </button>
            </nav>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
