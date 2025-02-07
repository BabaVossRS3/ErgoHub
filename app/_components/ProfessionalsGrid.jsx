'use client';


import React from 'react';
import { Star, MapPin, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import  { useState, useEffect } from 'react';

const ProfessionalsGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [gridIndex, setGridIndex] = useState(0);

  // Mock data for professionals
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

  
  const availableToday = professionals.filter(pro => 
    pro.availability.toLowerCase().includes('σήμερα')
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setSlidesToShow(4);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextCarouselSlide = () => {
    setCarouselIndex((prevIndex) => {
      const maxIndex = professionals.length - slidesToShow;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevCarouselSlide = () => {
    setCarouselIndex((prevIndex) => {
      const maxIndex = professionals.length - slidesToShow;
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const nextGridSlide = () => {
    setGridIndex((prevIndex) => {
      const maxIndex = availableToday.length - slidesToShow;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevGridSlide = () => {
    setGridIndex((prevIndex) => {
      const maxIndex = availableToday.length - slidesToShow;
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const renderProfessionalCard = (pro) => (
    <div 
      key={pro.id}
      className="flex-none w-full md:w-1/3 2xl:w-1/4"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-[500px]">
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
    </div>
  );

  return (
    <div className="min-h-screen bg-[#edecf4] px-4 py-8 mt-20">
      <div className="w-full">
        {/* First Carousel Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3 text-[#974dc6]">Οι Κορυφαίοι του ErgoHub</h2>
            <p className="text-gray-600 text-lg">Γνωρίστε τους πιο αξιόπιστους επαγγελματίες με τις καλύτερες κριτικές</p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <button 
              onClick={prevCarouselSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6 text-[#974dc6]" />
            </button>

            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out gap-6"
                style={{
                  transform: `translateX(-${carouselIndex * (100 / slidesToShow)}%)`,
                }}
              >
                {professionals.map(renderProfessionalCard)}
              </div>
            </div>

            <button 
              onClick={nextCarouselSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6 text-[#974dc6]" />
            </button>
          </div>
        </div>

        {/* Second Carousel Section (Available Today) */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-[#974dc6]">Διαθέσιμοι Σήμερα</h2>
          <p className="text-gray-600 text-lg">Ανακαλύψτε όλους τους επαγγελματίες που είναι διαθέσιμοι στην πλατφόρμα μας</p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <button 
            onClick={prevGridSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-[#974dc6]" />
          </button>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out gap-6"
              style={{
                transform: `translateX(-${gridIndex * (100 / slidesToShow)}%)`,
              }}
            >
              {availableToday.map(renderProfessionalCard)}
            </div>
          </div>

          <button 
            onClick={nextGridSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
          >
            <ChevronRight className="w-6 h-6 text-[#974dc6]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalsGrid;
