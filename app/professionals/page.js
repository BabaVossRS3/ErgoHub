

"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Clock, Star, Award, CheckCircle } from 'lucide-react';
import debounce from 'lodash/debounce';
import Sidebar from '../_components/Sidebar';
import Link from 'next/link';
import SearchSection from '../_components/SearchSection';
import AuthModal from '../_components/auth/AuthModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { getLocationWithParent } from './../../lib/locationUtils';


const frequentSearches = [
  { icon: '🔧', text: 'Υδραυλικός' },
  { icon: '⚡', text: 'Ηλεκτρολόγος' },
  { icon: '🧹', text: 'Καθαρισμός Σπιτιού' },
  { icon: '🎨', text: 'Ελαιοχρωματιστής' },
  { icon: '🔨', text: 'Μάστορας' },
  { icon: '🪴', text: 'Κηπουρός' },
  { icon: '👩‍⚕️', text: 'Παιδίατρος' },
  { icon: '💪', text: 'Personal Trainer' }
];

const ProfessionalsPage = () => {
  const [professionals, setProfessionals] = useState([]);
  const [filteredPros, setFilteredPros] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    areaSearch: searchParams.get('location') || '',
    location: searchParams.get('location') || 'all',
    availability: 'all',
    rating: 'all',
    sortBy: searchParams.get('sortBy') || 'reviewCount'
  });

  // Create a memoized debounced fetch function
  const debouncedFetch = useMemo(
    () =>
      debounce(async (queryParams) => {
        try {
          setLoading(true);
          const response = await fetch(`/api/professionals?${queryParams}`);
          if (!response.ok) throw new Error('Failed to fetch professionals');
          const data = await response.json();
          setProfessionals(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }, 500),
    []
  );

  // Fetch professionals when certain filters change
  useEffect(() => {
    const queryParams = new URLSearchParams();
    
    // Only include filters that require server-side processing
    if (filters.location !== 'all') queryParams.append('location', filters.location);
    if (filters.rating !== 'all') queryParams.append('rating', filters.rating);
    if (filters.availability !== 'all') queryParams.append('availability', filters.availability);
    
    debouncedFetch(queryParams);

    return () => {
      debouncedFetch.cancel();
    };
  }, [filters.location, filters.rating, filters.availability]);

  const normalizeGreekText = (text) => {
    if (!text) return '';
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

  // Local filtering and sorting effect
  useEffect(() => {
    let result = [...professionals];

    // Apply local search filter
    if (filters.search || filters.areaSearch) {
      const searchTerm = normalizeGreekText(filters.search);
      const areaTerm = normalizeGreekText(filters.areaSearch);

      result = result.filter(pro => {
        const matchesSearch = !searchTerm || 
          normalizeGreekText(pro.name).includes(searchTerm) ||
          normalizeGreekText(pro.profession).includes(searchTerm);
        
        const matchesArea = !areaTerm ||
          normalizeGreekText(pro.location).includes(areaTerm);

        return matchesSearch && matchesArea;
      });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'reviewCount':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'highestRating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowestRating':
        result.sort((a, b) => a.rating - b.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'experienced':
        result.sort((a, b) => {
          const getYears = (exp) => parseInt(exp?.split(' ')[0]) || 0;
          return getYears(b.experience) - getYears(a.experience);
        });
        break;
    }

    setFilteredPros(result);
  }, [professionals, filters.search, filters.areaSearch, filters.sortBy]);

  // Add this new useEffect for URL management
  useEffect(() => {
    const params = new URLSearchParams();
      
    if (filters.search) params.append('search', filters.search);
    if (filters.areaSearch) params.append('location', filters.areaSearch);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    
    const newUrl = `/professionals${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    if (typeof newFilters === 'function') {
      setFilters(newFilters);
    } else {
      setFilters(prev => ({
        ...prev,
        ...newFilters
      }));
    }
  };

  const handleBookingClick = (professionalId) => {
    const isLoggedIn = false; // Replace with actual auth check
    
    if (!isLoggedIn) {
      setSelectedProfessionalId(professionalId);
      setShowAuthModal(true);
    } else {
      window.location.href = `/booking/${professionalId}`;
    }
  };

  const renderProfessionalCard = (pro) => (
    <div key={pro.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-[500px] relative group">
      <div className="p-6 bg-[#dfdcf1] h-36">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={pro.imageUrl}
              alt={pro.name}
              className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
            {pro.is_verified && (
              <CheckCircle className="absolute -bottom-1 -right-1 w-6 h-6 text-green-500 bg-white rounded-full" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-xl text-gray-800 truncate group-hover:text-gray-900">{pro.name}</h3>
            <p className="text-gray-600 truncate">{pro.profession}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
          <span className="font-bold">{pro.rating}</span>
          <span className="text-gray-600 truncate">({pro.reviews} κριτικές)</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">
            {(() => {
              const locationInfo = getLocationWithParent(pro.location);
              return locationInfo.region 
                ? `${locationInfo.area}, ${locationInfo.region}`
                : pro.location;
            })()}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-green-600">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{pro.availability}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
          <Award className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{pro.experience} Χρόνια Εμπειρίας</span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mt-2">
          <p className="text-gray-600 text-sm line-clamp-2">
            {pro.bio || 'Επαγγελματίας στο ErgoHub'}
          </p>
        </div>
      </div>

      <div className="p-6 mt-auto flex gap-4">
        <Link 
          href={`/professionals/${pro.id}`} 
          className="w-full text-center bg-transparent border-2 border-[#974dc6] text-[#974dc6] py-3 px-4 rounded-xl hover:bg-opacity-90 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Προφίλ
        </Link>
        <button 
          onClick={() => handleBookingClick(pro.id)}
          className="text-white w-full px-4 py-2 rounded-xl text-lg font-medium transform hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md"
          style={{ backgroundColor: '#974EC3' }}
        >
          Ραντεβού
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#edecf4]">
      <div className="flex">
        <Sidebar 
          setFilters={handleFilterChange} 
          availableProfessions={[...new Set(professionals.map(pro => pro.profession))]}
          locations={[...new Set(professionals.map(pro => pro.location.split(',')[0]))]}
        />
        <div className="flex-1 p-8">
          <SearchSection 
            filters={filters}
            setFilters={handleFilterChange}
            frequentSearches={frequentSearches}
          />
          
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#974dc6]"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-xl text-center p-8">Error: {error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPros.map(renderProfessionalCard)}
            </div>
          )}
        </div>
        
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialTab="user"
          initialView="register"
          trigger="booking"
          onSuccessfulAuth={() => {
            if (selectedProfessionalId) {
              window.location.href = `/booking/${selectedProfessionalId}`;
            }
          }}
        />
      </div>
    </div>
  );
};

export default ProfessionalsPage;