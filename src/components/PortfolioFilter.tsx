
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

interface PortfolioFilterProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  selectedCategory: string;
  searchTerm: string;
  t: any;
}

export const PortfolioFilter = ({
  categories,
  onCategoryChange,
  onSearchChange,
  selectedCategory,
  searchTerm,
  t
}: PortfolioFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder={t.searchPortfolio || "Search portfolio..."}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Toggle */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          {t.filters || "Filters"}
        </Button>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-2 animate-fade-in">
          <Badge
            variant={selectedCategory === '' ? 'default' : 'outline'}
            className="cursor-pointer transition-all hover:scale-105"
            onClick={() => onCategoryChange('')}
          >
            {t.allCategories || "All"}
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
