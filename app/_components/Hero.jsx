'use client';

import React, { useState, useEffect } from 'react';
import { Star, Shield, Clock } from 'lucide-react';
import Image from 'next/image';
import Search from './Search';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    '/images/frame01.png',
    '/images/frame02.png',
    '/images/frame03.png',
    '/images/frame04.png',
    '/images/frame05.png',
    '/images/frame06.png',
    '/images/frame07.png',
    '/images/frame08.png',
    '/images/frame09.png'
  ];

  useEffect(() => {
    setMounted(true);
    const intervalId = setInterval(() => {
      if (mounted) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          setIsTransitioning(false);
        }, 300);
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [mounted, images.length]);

  const trustFeatures = [
    {
      icon: <Shield className="w-6 h-6 text-[#974EC3]" />,
      title: 'Πιστοποιημένοι Επαγγελματίες',
      subtitle: 'Verified Professionals'
    },
    {
      icon: <Star className="w-6 h-6 text-[#974EC3]" />,
      title: 'Αξιολογήσεις Πελατών',
      subtitle: 'Client Reviews'
    },
    {
      icon: <Clock className="w-6 h-6 text-[#974EC3]" />,
      title: 'Άμεση Εξυπηρέτηση',
      subtitle: '24/7 Support'
    }
  ];

  if (!mounted) {
    return null; // Or a loading placeholder
  }

  return (
    <div className="bg-opacity-10 bg-[#504099] px-4 py-8 flex flex-col items-center md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side content */}
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-[#313866]">
              Βρείτε τον Κατάλληλο Επαγγελματία
              <span className="block text-2xl mt-5 font-normal text-[#504099]">
                Find the Perfect Professional
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-8 text-[#504099]">
              Συνδεθείτε με επαγγελματίες στην περιοχή σας. Διαβάστε κριτικές, συγκρίνετε τιμές και κλείστε ραντεβού εύκολα και γρήγορα.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              {trustFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col items-center">
                  {feature.icon}
                  <h3 className="mt-4 font-semibold text-center text-[#313866]">{feature.title}</h3>
                  <p className="text-sm text-center text-[#974EC3]">{feature.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side carousel */}
          <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-lg">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  currentImageIndex === index && !isTransitioning
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible'
                }`}
              >
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;