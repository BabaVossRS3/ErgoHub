import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star, Award, CheckCircle } from 'lucide-react';
import { jobCategories, searchProfessions } from '../../data/jobCategories';
import { searchAreas, greekAreas } from '../../data/greekAreas';

const normalizeGreekText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
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

const SearchSection = ({ filters, setFilters, frequentSearches }) => {
  const [serviceResults, setServiceResults] = useState([]);
  const [locationResults, setLocationResults] = useState([]);

  // Reuse the existing search suggestion functions from Search.jsx
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
    setFilters(prev => ({ ...prev, search: value }));
    
    if (value.length > 1) {
      const results = getSearchSuggestions(value);
      setServiceResults(results);
    } else {
      setServiceResults([]);
    }
  };
  
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, areaSearch: value }));
    
    if (value.length > 1) {
      const results = getLocationSuggestions(value);
      setLocationResults(results);
    } else {
      setLocationResults([]);
    }
  };
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
      {/* Search Bars Container */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Profession Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Αναζήτηση επαγγελματία ή υπηρεσίας..."
            value={filters.search}
            onChange={handleServiceChange}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#974dc6]"
          />
          {filters.search && (
            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, search: '' }));
                setServiceResults([]);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          
          {serviceResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {serviceResults.map((result, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-purple-50 cursor-pointer"
                  onClick={() => {
                    setFilters(prev => ({ ...prev, search: result.text }));
                    setServiceResults([]);
                  }}
                >
                  {renderSuggestion(result, filters.search)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Area Search */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Αναζήτηση περιοχής..."
            value={filters.areaSearch}
            onChange={handleLocationChange}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#974dc6]"
          />
          {filters.areaSearch && (
            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, areaSearch: '' }));
                setLocationResults([]);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          
          {locationResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {locationResults.map((result, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-purple-50 cursor-pointer"
                  onClick={() => {
                    setFilters(prev => ({ ...prev, areaSearch: result.text }));
                    setLocationResults([]);
                  }}
                >
                  {renderSuggestion(result, filters.areaSearch)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

        {/* Most Frequent Searches and Filters */}
        <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-500">Τελευταίες αναζητήσεις</h3>
          <div className="flex items-center gap-2">
          <div className="flex flex-col pr-5">
                <div className="flex pb-2 items-center gap-2">
                    <h2>Ταξινόμηση με</h2>
                    <Star className="w-4 h-4 text-yellow-400" />
                </div>
                 <select
                    value={filters.sortBy || 'reviewCount'}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="text-sm border border-gray-300 rounded-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#974dc6] bg-white"
                >
                    <option value="reviewCount">Περισσότερες κριτικές</option>
                    <option value="highestRating">Υψηλότερη βαθμολογία</option>
                    <option value="lowestRating">Χαμηλότερη βαθμολογία</option>
                    <option value="newest">Νεότεροι επαγγελματίες</option>
                </select>
            </div>
            
            
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {frequentSearches.slice(0,4).map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setFilters(prev => ({ ...prev, search: item.text }));
                setServiceResults([]);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 hover:bg-purple-100 transition-colors duration-200 text-sm text-purple-800"
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;