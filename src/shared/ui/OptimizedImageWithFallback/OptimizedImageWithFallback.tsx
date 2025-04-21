'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type OptimizedImageWithFallbackProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: string;
  alt: string;
  fallBackSrc?: string;
};

const OptimizedImageWithFallback: React.FC<OptimizedImageWithFallbackProps> = ({
  src,
  alt,
  fallBackSrc = '/nofoto.jpg',
  ...rest
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      src={imageError ? fallBackSrc : src}
      alt={alt}
      onError={() => setImageError(true)}
      {...rest}
    />
  );
};

export default OptimizedImageWithFallback;
