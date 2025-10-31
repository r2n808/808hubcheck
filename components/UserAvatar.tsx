
import React from 'react';

interface UserAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`relative flex-shrink-0 ${sizeClasses[size]}`}>
      <img
        className="w-full h-full rounded-full object-cover"
        src={src}
        alt={alt}
      />
    </div>
  );
};
