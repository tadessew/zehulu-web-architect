
import { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    skip: priority
  });

  // Generate WebP and responsive variants
  const generateSrcSet = (originalSrc: string) => {
    const baseUrl = originalSrc.includes('unsplash.com') ? originalSrc : originalSrc;
    if (baseUrl.includes('unsplash.com')) {
      return `
        ${baseUrl}?w=400&fm=webp 400w,
        ${baseUrl}?w=800&fm=webp 800w,
        ${baseUrl}?w=1200&fm=webp 1200w
      `;
    }
    return originalSrc;
  };

  const shouldLoad = priority || inView;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {shouldLoad && (
        <picture>
          <source 
            srcSet={generateSrcSet(src)} 
            type="image/webp"
            sizes={sizes}
          />
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              "w-full h-full object-cover"
            )}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            loading={priority ? "eager" : "lazy"}
          />
        </picture>
      )}
      
      {/* Loading skeleton */}
      {(!shouldLoad || !isLoaded) && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image not available</div>
          </div>
        </div>
      )}
    </div>
  );
};
