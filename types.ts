
import type React from 'react';

export interface HangoverPackage {
  title: string;
  price: string;
  inclusions: string[];
  popular?: boolean;
}

export interface OtherService {
    title: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
