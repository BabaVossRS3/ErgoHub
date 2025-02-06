"use client"

import React, { useState, useEffect } from 'react';
import { 
  Building2,
  Stethoscope,
  Home,
  Sparkles,
  Briefcase,
  Computer,
  PartyPopper,
  Car,
  Dog
} from 'lucide-react';
import { jobCategories, searchProfessions } from '../../data/jobCategories';
import { searchAreas, greekAreas } from '../../data/greekAreas';

// Map of category IDs to their respective icons
const categoryIcons = {
  'healthcare': Stethoscope,
  'home-services': Home,
  'beauty-wellness': Sparkles,
  'professional-services': Briefcase,
  'tech-services': Computer,
  'events-entertainment': PartyPopper,
  'automotive': Car,
  'pet-services': Dog,
  'education': Building2
};

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // In a real application, this would be replaced with an API call
    // to fetch the view counts from your backend
    const fetchPopularCategories = () => {
      // Simulated view count data
      const viewCounts = {
        'healthcare': 1500,
        'tech-services': 1200,
        'home-services': 1000,
        'beauty-wellness': 800,
        'professional-services': 750,
      };

      // Get categories data and add view counts
      const categoriesWithViews = jobCategories
        .map(category => ({
          ...category,
          views: viewCounts[category.id] || 0
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      setCategories(categoriesWithViews);
    };

    fetchPopularCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // In a real application, you would:
    // 1. Send an API request to increment the view count
    // 2. Update analytics
    // 3. Navigate to the category page
    console.log(`Category clicked: ${categoryId}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-20 p-4">
      <h2 className="text-3xl text-center mb-10 font-light text-gray-500">Δημοφιλή Κατηγορίες</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category.id];
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="flex flex-col items-center justify-center p-6 bg-[#dfdcf1] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 aspect-square"
            >
              {Icon && <Icon className="w-12 h-12 mb-3 text-[#974dc6]" />}
              <span className="text-sm font-medium text-gray-700 text-center">
                {category.name}
              </span>
              <span className="text-xs text-gray-500 mt-2">
                {category.views.toLocaleString()} κλίκ
              </span>
            </button>
          )}
        )}
      </div>
    </div>
  );
};

export default PopularCategories;