'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Developer at TechCorp',
    content: 'ShopifyUI has completely transformed how we build Shopify apps. The components are intuitive, well-documented, and save us hours of development time.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Product Manager at StartupXYZ',
    content: 'The accessibility features in ShopifyUI are outstanding. We can confidently build apps that work for everyone, and our users love the consistent experience.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Frontend Lead at E-commerce Plus',
    content: 'ShopifyUI components are not just beautiful, they\'re also incredibly performant. Our app load times improved significantly after switching.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'CTO at RetailTech',
    content: 'The TypeScript support and comprehensive documentation make ShopifyUI a joy to work with. Our team productivity has increased dramatically.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Loved by Developers
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See what developers are saying about ShopifyUI
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border-2">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {currentTestimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{currentTestimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentTestimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-lg leading-relaxed text-muted-foreground">
                &ldquo;{currentTestimonial.content}&rdquo;
              </blockquote>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
