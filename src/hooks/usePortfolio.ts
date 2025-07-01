
import { useState, useEffect, useMemo } from 'react';

interface PortfolioProject {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  beforeImage: string;
  afterImage: string;
  category: string;
  categoryEn: string;
  location: string;
  locationEn: string;
}

const mockProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "የቤተሰብ ቤት የመኝታ ክፍል መለወጥ",
    titleEn: "Family Home Bedroom Transformation",
    description: "ሙሉ የመኝታ ክፍል ዳግም ዲዛይን እና ፊኒሺንግ",
    descriptionEn: "Complete bedroom redesign and finishing",
    beforeImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
    afterImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3",
    category: "የመኝታ ክፍል",
    categoryEn: "Bedroom",
    location: "አዲስ አበባ",
    locationEn: "Addis Ababa"
  },
  {
    id: 2,
    title: "ዘመናዊ የመቀመጫ ክፍል ዲዛይን",
    titleEn: "Modern Living Room Design",
    description: "የመቀመጫ ክፍል ሙሉ እንደገና ዲዛይን",
    descriptionEn: "Complete living room redesign",
    beforeImage: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3",
    afterImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3",
    category: "የመቀመጫ ክፍል",
    categoryEn: "Living Room",
    location: "ባህር ዳር",
    locationEn: "Bahir Dar"
  },
  {
    id: 3,
    title: "የመመገቢያ ቦታ ማሻሻል",
    titleEn: "Dining Area Enhancement", 
    description: "የመመገቢያ ክፍል ምሳሌያዊ ለውጥ",
    descriptionEn: "Exemplary dining room transformation",
    beforeImage: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?ixlib=rb-4.0.3",
    afterImage: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3",
    category: "የመመገቢያ ክፍል",
    categoryEn: "Dining Room",
    location: "ጎንደር",
    locationEn: "Gondar"
  },
  {
    id: 4,
    title: "የቤት ጽሕፈት ቤት መፍጠር",
    titleEn: "Home Office Creation",
    description: "ውጤታማ የቤት ጽሕፈት ቤት ቦታ መፍጠር",
    descriptionEn: "Creating an efficient home office space",
    beforeImage: "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3",
    afterImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3",
    category: "የጽሕፈት ቤት",
    categoryEn: "Office",
    location: "ሐዋሳ",
    locationEn: "Hawassa"
  }
];

export const usePortfolio = (currentLanguage: string = 'am') => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate API call
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProjects(mockProjects);
      } catch (err) {
        setError('Failed to load portfolio projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = !selectedCategory || 
        (currentLanguage === 'am' ? project.category : project.categoryEn) === selectedCategory;
      
      const searchFields = currentLanguage === 'am' 
        ? [project.title, project.description, project.category, project.location]
        : [project.titleEn, project.descriptionEn, project.categoryEn, project.locationEn];
      
      const matchesSearch = !searchTerm || 
        searchFields.some(field => 
          field.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchTerm, currentLanguage]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = projects.map(project => 
      currentLanguage === 'am' ? project.category : project.categoryEn
    );
    return [...new Set(cats)];
  }, [projects, currentLanguage]);

  return {
    projects: filteredProjects,
    isLoading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    categories,
    totalProjects: projects.length,
    filteredCount: filteredProjects.length
  };
};
