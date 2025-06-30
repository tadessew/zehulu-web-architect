
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductsShowroom from '@/components/ProductsShowroom';
import PortfolioSection from '@/components/PortfolioSection';
import BlogPreview from '@/components/BlogPreview';
import EstimatorSection from '@/components/EstimatorSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState('am');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  
  const t = translations[currentLanguage];

  useEffect(() => {
    // Apply theme on load
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'am' ? 'en' : 'am');
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        currentLanguage={currentLanguage}
        toggleLanguage={toggleLanguage}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        t={t}
      />
      
      <main>
        <HeroSection t={t} />
        <ProductsShowroom t={t} />
        <PortfolioSection t={t} />
        <EstimatorSection t={t} />
        <BlogPreview t={t} />
        <ContactSection t={t} />
      </main>
      
      <Footer t={t} />
    </div>
  );
};

export default Index;
