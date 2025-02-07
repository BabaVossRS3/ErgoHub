"use client"
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star } from 'lucide-react';
import Sidebar from '../_components/Sidebar';

const ProfessionalsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  
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
  


  const professionals = [
    {
      id: 1,
      name: "Δρ. Μαρία Παπαδοπούλου",
      profession: "Παιδίατρος",
      rating: 4.8,
      reviews: 127,
      location: "Χαλάνδρι, Αθήνα",
      availability: "Διαθέσιμη σήμερα",
      imageUrl: "./images/happy-woman-home-coronavirus-quarantine.jpg",
      price: "από 50€",
      experience: "15 χρόνια εμπειρίας"
    },
    {
      id: 2,
      name: "Γιώργος Αντωνίου",
      profession: "Ηλεκτρολόγος",
      rating: 4.9,
      reviews: 89,
      location: "Νέα Σμύρνη, Αθήνα",
      availability: "Διαθέσιμος αύριο",
      imageUrl: "./images/handsome-young-cheerful-man-with-arms-crossed.jpg",
      price: "από 30€",
      experience: "10 χρόνια εμπειρίας"
    },
    {
      id: 3,
      name: "Ελένη Δημητρίου",
      profession: "Φυσιοθεραπεύτρια",
      rating: 5.0,
      reviews: 156,
      location: "Γλυφάδα, Αθήνα",
      availability: "Διαθέσιμη σήμερα",
      imageUrl: "./images/portrait-beautiful-young-woman-standing-grey-wall.jpg",
      price: "από 40€",
      experience: "8 χρόνια εμπειρίας"
    },
    {
      id: 4,
      name: "Νίκος Κωνσταντίνου",
      profession: "Υδραυλικός",
      rating: 4.7,
      reviews: 92,
      location: "Περιστέρι, Αθήνα",
      availability: "Διαθέσιμος σήμερα",
      imageUrl: "./images/pexels-olly-834863.jpg",
      price: "από 35€",
      experience: "12 χρόνια εμπειρίας"
    },
    {
      id: 5,
      name: "Αναστασία Μαυροπούλου",
      profession: "Ψυχολόγος",
      rating: 5.0,
      reviews: 203,
      location: "Κηφισιά, Αθήνα",
      availability: "Διαθέσιμη αύριο",
      imageUrl: "./images/portrait-beautiful-young-woman-standing-grey-wall.jpg",
      price: "από 60€",
      experience: "13 χρόνια εμπειρίας"
    },
    {
      id: 6,
      name: "Βασίλης Αλεξάνδρου",
      profession: "Προπονητής Personal Trainer",
      rating: 4.9,
      reviews: 167,
      location: "Γλυφάδα, Αθήνα",
      availability: "Διαθέσιμος σήμερα",
      imageUrl: "./images/handsome-young-cheerful-man-with-arms-crossed.jpg",
      price: "από 35€",
      experience: "9 χρόνια εμπειρίας"
    },
    {
      id: 7,
      name: "Χριστίνα Οικονόμου",
      profession: "Δικηγόρος",
      rating: 4.8,
      reviews: 142,
      location: "Μαρούσι, Αθήνα",
      availability: "Διαθέσιμη σήμερα",
      imageUrl: "./images/portrait-beautiful-young-woman-standing-grey-wall.jpg",
      price: "από 80€",
      experience: "17 χρόνια εμπειρίας"
    },
    {
      id: 8,
      name: "Αντώνης Παπανικολάου",
      profession: "Λογιστής",
      rating: 4.9,
      reviews: 178,
      location: "Πειραιάς",
      availability: "Διαθέσιμος αύριο",
      imageUrl: "./images/handsome-young-cheerful-man-with-arms-crossed.jpg",
      price: "από 45€",
      experience: "11 χρόνια εμπειρίας"
    },
    {
      id: 9,
      name: "Σοφία Καραγιάννη",
      profession: "Διατροφολόγος",
      rating: 4.7,
      reviews: 134,
      location: "Νέα Σμύρνη, Αθήνα",
      availability: "Διαθέσιμη σήμερα",
      imageUrl: "./images/portrait-beautiful-young-woman-standing-grey-wall.jpg",
      price: "από 40€",
      experience: "7 χρόνια εμπειρίας"
    }
  ];

  const [filteredPros, setFilteredPros] = useState(professionals);
  const [filters, setFilters] = useState({
    search: '',
    location: 'all',
    availability: 'all',
    priceRange: 'all',
    rating: 'all'
  });

  const locations = [...new Set(professionals.map(pro => pro.location.split(',')[0]))];
  const priceRanges = [
    { label: 'Όλες οι τιμές', value: 'all' },
    { label: '€0 - €30', value: '0-30' },
    { label: '€31 - €50', value: '31-50' },
    { label: '€51+', value: '51-plus' }
  ];

  useEffect(() => {
    let result = [...professionals];
  
    // Search filter with tone normalization
    if (filters.search) {
      const searchTerm = normalizeGreekText(filters.search);
      result = result.filter(pro =>
        normalizeGreekText(pro.name).includes(searchTerm) ||
        normalizeGreekText(pro.profession).includes(searchTerm)
      );
    }
  
    // Location filter with tone normalization
    if (filters.location !== 'all') {
      const normalizedLocation = normalizeGreekText(filters.location);
      result = result.filter(pro => 
        normalizeGreekText(pro.location.split(',')[0]) === normalizedLocation
      );
    }
  
    // Rest of the filters remain the same
    if (filters.availability !== 'all') {
      result = result.filter(pro =>
        filters.availability === 'today' 
          ? pro.availability.includes('σήμερα')
          : pro.availability.includes('αύριο')
      );
    }
  
    if (filters.priceRange !== 'all') {
      result = result.filter(pro => {
        const price = parseInt(pro.price.replace(/[^0-9]/g, ''));
        switch(filters.priceRange) {
          case '0-30':
            return price <= 30;
          case '31-50':
            return price > 30 && price <= 50;
          case '51-plus':
            return price > 50;
          default:
            return true;
        }
      });
    }
  
    if (filters.rating !== 'all') {
      const minRating = parseInt(filters.rating);
      result = result.filter(pro => pro.rating >= minRating);
    }
  
    setFilteredPros(result);
  }, [filters]);
  const renderProfessionalCard = (pro) => (
    <div 
      key={pro.id}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-[500px]"
    >
      <div className="p-6 bg-[#dfdcf1] h-32">
        <div className="flex items-center space-x-4">
          <img
            src={pro.imageUrl}
            alt={pro.name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-lg truncate">{pro.name}</h3>
            <p className="text-gray-600 truncate">{pro.profession}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 h-16 flex items-center">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
            <span className="font-bold">{pro.rating}</span>
            <span className="text-gray-600 truncate">({pro.reviews} κριτικές)</span>
          </div>
        </div>

        <div className="px-6 py-3 flex items-center space-x-2 text-gray-600 h-12 border-b border-gray-100">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{pro.location}</span>
        </div>

        <div className="px-6 py-3 flex items-center space-x-2 text-green-600 h-12 border-b border-gray-100">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{pro.availability}</span>
        </div>

        <div className="px-6 py-4 bg-gray-50 h-16 flex items-center">
          <div className="flex justify-between items-center w-full">
            <span className="text-[#974dc6] font-semibold truncate">{pro.price}</span>
            <span className="text-gray-600 text-sm truncate ml-2">{pro.experience}</span>
          </div>
        </div>

        <div className="p-6 mt-auto">
          <button className="w-full bg-[#974dc6] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300">
            Κράτηση
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#edecf4]">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Αναζήτηση επαγγελματία ή υπηρεσίας..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#974dc6]"
                />
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* [Previous filter controls remain the same] */}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPros.map(renderProfessionalCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalsPage;