'use client';


import React from 'react';
import { Star, MapPin, Clock, ChevronLeft, ChevronRight, CheckCircle, Award } from 'lucide-react';
import  { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  
  const availableToday = professionals.filter(pro => 
    pro.availability.toLowerCase().includes('σήμερα')
  );

  const ProfessionalCard = ({ pro }) => (
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
          <p className="text-gray-600 text-sm line-clamp-2">{pro.bio}</p>
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
    <div className="min-h-screen bg-[#edecf4] px-4 py-8 mt-20">
      <div className="mx-auto">
        {/* Top Professionals Section */}
        <div className="mb-20 flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3 text-[#974dc6]">Οι Κορυφαίοι του ErgoHub</h2>
            <p className="text-gray-600 text-lg">Γνωρίστε τους πιο αξιόπιστους επαγγελματίες με τις καλύτερες κριτικές</p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-[90%]"
          >
            <CarouselContent className="-ml-4">
              {professionals.map((pro) => (
                <CarouselItem key={pro.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ProfessionalCard pro={pro} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Available Today Section */}
        <div className="flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3 text-[#974dc6]">Διαθέσιμοι Σήμερα</h2>
            <p className="text-gray-600 text-lg">Ανακαλύψτε όλους τους επαγγελματίες που είναι διαθέσιμοι σήμερα στο ErgoHub</p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-[90%]"
          >
            <CarouselContent className="-ml-4">
              {availableToday.map((pro) => (
                <CarouselItem key={pro.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ProfessionalCard pro={pro} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        
      </div>
    </div>
  );
};

export default ProfessionalsGrid;