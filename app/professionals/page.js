"use client"
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star , Award , CheckCircle } from 'lucide-react';
import Sidebar from '../_components/Sidebar';
import Link from 'next/link';
import SearchSection from '../_components/SearchSection';  // Make sure to adjust the import path
import AuthModal from '../_components/auth/AuthModal';


const ProfessionalsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(null);

  
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
      is_verified: true,
      bio: "Εξειδικευμένη παιδίατρος με έμφαση στην προληπτική ιατρική",
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
      bio: "Έμπειρος ηλεκτρολόγος με εξειδίκευση σε οικιακές και βιομηχανικές εγκαταστάσεις",
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
      bio: "Ειδικευμένη φυσιοθεραπεύτρια με έμφαση στην αποκατάσταση τραυματισμών και χρόνιου πόνου" ,
      is_verified: true,
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
      bio: "Πιστοποιημένος υδραυλικός με εμπειρία σε εγκαταστάσεις, συντήρηση και επισκευές δικτύων νερού"  ,
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
        bio: "Ψυχολόγος με εξειδίκευση στη γνωσιακή-συμπεριφορική θεραπεία και τη διαχείριση άγχους"  ,
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
        bio: "Έμπειρος προπονητής με εξειδίκευση στη βελτίωση της φυσικής κατάστασης και αθλητικών επιδόσεων"  ,
        is_verified: true,
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
        bio: "Προσωπικός γυμναστής με έμφαση στη λειτουργική προπόνηση και την εξατομικευμένη άσκηση"  ,
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
        bio: "Έμπειρος λογιστής με εξειδίκευση στη φορολογική συμμόρφωση και τη χρηματοοικονομική ανάλυση"  ,
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
        bio: "Διατροφολόγος με έμφαση στη δημιουργία εξατομικευμένων διατροφικών προγραμμάτων"  ,
        experience: "7 χρόνια εμπειρίας"
      }
  ];

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

  const availableProfessions = [...new Set(professionals.map(pro => pro.profession))];
  const [filteredPros, setFilteredPros] = useState(professionals);
  const [filters, setFilters] = useState({
    search: '',
    areaSearch: '',
    location: 'all',
    availability: 'all',
    rating: 'all'
  });

  const locations = [...new Set(professionals.map(pro => pro.location.split(',')[0]))];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search');
    const locationQuery = params.get('location');

    if (searchQuery || locationQuery) {
      setFilters(prev => ({
        ...prev,
        search: searchQuery || '',
        areaSearch: locationQuery || ''
      }));
    }
  }, []);

  // Separate function for applying filters
  const applyFilters = (pros) => {
    let result = [...pros];

    // Search filter with tone normalization
    if (filters.search && filters.search.trim()) {
      const searchTerm = normalizeGreekText(filters.search);
      result = result.filter(pro =>
        (pro.name && normalizeGreekText(pro.name).includes(searchTerm)) ||
        (pro.profession && normalizeGreekText(pro.profession).includes(searchTerm))
      );
    }

    // Area search filter
    if (filters.areaSearch && filters.areaSearch.trim()) {
      const areaTerm = normalizeGreekText(filters.areaSearch);
      result = result.filter(pro => 
        pro.location && normalizeGreekText(pro.location).includes(areaTerm)
      );
    }

    // Location filter
    if (filters.location && filters.location !== 'all') {
      const normalizedLocation = normalizeGreekText(filters.location);
      result = result.filter(pro => 
        pro.location && normalizeGreekText(pro.location.split(',')[0]) === normalizedLocation
      );
    }

    // Availability filter
    if (filters.availability && filters.availability !== 'all') {
      result = result.filter(pro =>
        pro.availability && (
          filters.availability === 'today' 
            ? pro.availability.includes('σήμερα')
            : pro.availability.includes('αύριο')
        )
      );
    }

    // Rating filter
    if (filters.rating && filters.rating !== 'all') {
      const ratingValue = filters.rating;
      result = result.filter(pro => {
        if (ratingValue === '1') return pro.rating >= 1 && pro.rating < 3;
        if (ratingValue === '3') return pro.rating >= 3 && pro.rating < 4;
        if (ratingValue === '4') return pro.rating >= 4;
        return true;
      });
    }

    return result;
  };

  // Separate function for applying sorting
  const applySorting = (pros) => {
    let result = [...pros];
    
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
        result.sort((a, b) => a.id - b.id);
        break;
      case 'experienced':
        result.sort((a, b) => {
          const getYears = (exp) => parseInt(exp?.split(' ')[0]) || 0;
          return getYears(b.experience) - getYears(a.experience);
        });
        break;
      default:
        result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  };

  useEffect(() => {
    // First apply all filters
    const filteredResults = applyFilters(professionals);
    // Then apply sorting to the filtered results
    const sortedResults = applySorting(filteredResults);
    setFilteredPros(sortedResults);
  }, [filters]);

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
          <span className="truncate">{pro.location}</span>
        </div>

        <div className="flex items-center space-x-2 text-green-600">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{pro.availability}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
          <Award className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{pro.experience}</span>
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

  const handleBookingClick = (professionalId) => {
    // Here you would check if user is logged in
    const isLoggedIn = false; // Replace with actual auth check
    
    if (!isLoggedIn) {
      setSelectedProfessionalId(professionalId);
      setShowAuthModal(true);
    } else {
      // Proceed with booking
      // You can redirect to booking page or show booking modal
      window.location.href = `/booking/${professionalId}`;
    }
  }
  
  return (
    <div className="min-h-screen bg-[#edecf4]">
      <div className="flex">
        <Sidebar setFilters={setFilters} availableProfessions={availableProfessions} />
        <div className="flex-1 p-8">
          <SearchSection 
            filters={filters}
            setFilters={setFilters}
            frequentSearches={frequentSearches}
          />

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPros.map(renderProfessionalCard)}
          </div>
        </div>
        <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab="user"
        initialView="register"
        trigger="booking"
        onSuccessfulAuth={() => {
          // After successful auth, redirect to booking
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