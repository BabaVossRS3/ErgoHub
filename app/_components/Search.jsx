"use client"

import React, { useState } from 'react';
import { Search as SearchIcon, MapPin, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { jobCategories, searchProfessions } from '../../data/jobCategories';
import { searchAreas, greekAreas } from '../../data/greekAreas';



const normalizeGreekText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')  // Decompose characters into base character and diacritical marks
    .replace(/[\u0300-\u036f]/g, '')  // Remove diacritical marks (accents/tones)
    .replace(/ά/g, 'α')
    .replace(/έ/g, 'ε')
    .replace(/ή/g, 'η')
    .replace(/ί/g, 'ι')
    .replace(/ϊ/g, 'ι')
    .replace(/ΐ/g, 'ι')
    .replace(/ό/g, 'ο')
    .replace(/ύ/g, 'υ')
    .replace(/ϋ/g, 'υ')
    .replace(/ΰ/g, 'υ')
    .replace(/ώ/g, 'ω');
};

const Search = () => {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [serviceResults, setServiceResults] = useState([]);
  const [locationResults, setLocationResults] = useState([]);

  const getSearchSuggestions = (query) => {
    if (!query) return [];
    
    const normalizedQuery = normalizeGreekText(query);
    let suggestions = [];

    jobCategories.forEach(category => {
      category.subCategories.forEach(subCategory => {
        subCategory.professions.forEach(profession => {
          const normalizedProfession = normalizeGreekText(profession);
          if (normalizedProfession.includes(normalizedQuery)) {
            suggestions.push({
              type: 'profession',
              text: profession,
              category: category.name,
              subCategory: subCategory.name
            });
          }
        });

        const normalizedSubCategory = normalizeGreekText(subCategory.name);
        if (normalizedSubCategory.includes(normalizedQuery)) {
          suggestions.push({
            type: 'subCategory',
            text: subCategory.name,
            category: category.name
          });
        }
      });

      const normalizedCategory = normalizeGreekText(category.name);
      if (normalizedCategory.includes(normalizedQuery)) {
        suggestions.push({
          type: 'category',
          text: category.name
        });
      }
    });

    return suggestions.slice(0, 8);
  };

  const getLocationSuggestions = (query) => {
    if (!query) return [];
    
    const normalizedQuery = normalizeGreekText(query);
    let results = [];

    greekAreas.forEach(region => {
      const normalizedRegion = normalizeGreekText(region.name);
      if (normalizedRegion.includes(normalizedQuery)) {
        results.push({
          type: 'region',
          text: region.name
        });
      }

      region.subAreas.forEach(subArea => {
        const normalizedSubArea = normalizeGreekText(subArea.name);
        if (normalizedSubArea.includes(normalizedQuery)) {
          results.push({
            type: 'subArea',
            text: subArea.name,
            region: region.name
          });
        }

        subArea.areas.forEach(area => {
          const normalizedArea = normalizeGreekText(area);
          if (normalizedArea.includes(normalizedQuery)) {
            results.push({
              type: 'area',
              text: area,
              region: region.name,
              subArea: subArea.name
            });
          }
        });
      });
    });

    return results.slice(0, 8);
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    setService(value);
    
    if (value.length > 1) {
      const results = getSearchSuggestions(value);
      setServiceResults(results);
    } else {
      setServiceResults([]);
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    
    if (value.length > 1) {
      const results = getLocationSuggestions(value);
      setLocationResults(results);
    } else {
      setLocationResults([]);
    }
  };

  // Highlight matching text in suggestions
  const highlightMatch = (text, query) => {
    if (!query) return text;
    
    const normalizedText = normalizeGreekText(text);
    const normalizedQuery = normalizeGreekText(query);
    
    if (!normalizedText.includes(normalizedQuery)) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => 
          normalizeGreekText(part) === normalizedQuery ? 
            <span key={index} className="bg-purple-100">{part}</span> : 
            part
        )}
      </span>
    );
  };

  const renderSuggestion = (result, searchQuery) => {
    let mainText = result.text;
    let subText = '';

    if (result.type === 'area') {
      subText = `${result.region} › ${result.subArea}`;
    } else if (result.type === 'subArea') {
      subText = result.region;
    } else if (result.type === 'profession') {
      subText = `${result.category} › ${result.subCategory}`;
    } else if (result.type === 'subCategory') {
      subText = result.category;
    }

    return (
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="font-medium">{highlightMatch(mainText, searchQuery)}</span>
        </div>
        {subText && (
          <div className="text-sm text-gray-500">
            {subText}
          </div>
        )}
      </div>
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', { service, location });
  };

  return (
    <Card className="p-6 shadow-lg bg-white backdrop-blur-sm mt-20">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        {/* Service Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5" style={{ color: '#974EC3' }} />
          </div>
          <input
            type="text"
            value={service}
            onChange={handleServiceChange}
            placeholder="Αναζήτηση υπηρεσίας..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
            style={{ borderColor: 'rgba(151, 78, 195, 0.2)' }}
          />
          
          {serviceResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {serviceResults.map((result, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-purple-50 cursor-pointer"
                  onClick={() => {
                    setService(result.text);
                    setServiceResults([]);
                  }}
                >
                  {renderSuggestion(result, service)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5" style={{ color: '#974EC3' }} />
          </div>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Τοποθεσία..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
            style={{ borderColor: 'rgba(151, 78, 195, 0.2)' }}
          />

          {locationResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {locationResults.map((result, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-purple-50 cursor-pointer"
                  onClick={() => {
                    setLocation(result.text);
                    setLocationResults([]);
                  }}
                >
                  {renderSuggestion(result, location)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="px-8 py-3 rounded-lg text-white font-medium transition-all duration-200 hover:opacity-90 hover:shadow-md"
          style={{ backgroundColor: '#974EC3' }}
        >
          Αναζήτηση
        </button>
      </form>
    </Card>
  );
};

export default Search;