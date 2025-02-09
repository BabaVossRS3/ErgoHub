"use client"
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star , Award , CheckCircle } from 'lucide-react';
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-[520px] relative group">
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
          <p className="text-gray-600 text-sm line-clamp-2">{pro.bio || 'Επαγγελματίας στο ErgoHub'}</p>
        </div>
      </div>

      <div className="p-6 mt-auto flex gap-4">
        <button className="w-full bg-transparent border-2 border-[#974dc6]  text-[#974dc6] py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          Προφίλ
        </button>
        <button className="w-full bg-[#974dc6] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          Ραντεβού
        </button>
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
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#974dc6]"
                  />
                  {filters.search && (
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                  {/* Most Frequent Searches */}
                  <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Τελευταίες αναζητήσεις</h3>
                  <div className="flex flex-wrap gap-2">
                    {frequentSearches.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setFilters(prev => ({ ...prev, search: item.text }))}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 hover:bg-purple-100 transition-colors duration-200 text-sm text-purple-800"
                      >
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* [Previous filter controls remain the same] */}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {filteredPros.map(renderProfessionalCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalsPage;