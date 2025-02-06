import React from 'react';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';

const ProfessionalsGrid = () => {
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

  
  return (
    <div className="min-h-screen bg-[#edecf4] px-4 py-8 mt-20">
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-[#974dc6]">Οι Κορυφαίοι του ErgoHub</h2>
          <p className="text-gray-600 text-lg">Γνωρίστε τους πιο αξιόπιστους επαγγελματίες με τις καλύτερες κριτικές</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-6">
          {professionals.map((pro) => (
            <div 
              key={pro.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-[500px]"
            >
              {/* Header with image and basic info - Fixed height */}
              <div className="p-6 bg-[#dfdcf1] h-32">
                <div className="flex items-center space-x-4">
                  <img
                    src={pro.imageUrl}
                    alt={pro.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0"> {/* For text truncation */}
                    <h3 className="font-semibold text-lg truncate">{pro.name}</h3>
                    <p className="text-gray-600 truncate">{pro.profession}</p>
                  </div>
                </div>
              </div>

              {/* Content section - Fixed height */}
              <div className="flex-1 flex flex-col">
                {/* Rating and reviews - Fixed height */}
                <div className="px-6 py-4 border-b border-gray-100 h-16 flex items-center">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                    <span className="font-bold">{pro.rating}</span>
                    <span className="text-gray-600 truncate">({pro.reviews} κριτικές)</span>
                  </div>
                </div>

                {/* Location - Fixed height */}
                <div className="px-6 py-3 flex items-center space-x-2 text-gray-600 h-12 border-b border-gray-100">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{pro.location}</span>
                </div>

                {/* Availability - Fixed height */}
                <div className="px-6 py-3 flex items-center space-x-2 text-green-600 h-12 border-b border-gray-100">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{pro.availability}</span>
                </div>

                {/* Price and experience - Fixed height */}
                <div className="px-6 py-4 bg-gray-50 h-16 flex items-center">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[#974dc6] font-semibold truncate">{pro.price}</span>
                    <span className="text-gray-600 text-sm truncate ml-2">{pro.experience}</span>
                  </div>
                </div>

                {/* Button section - Fixed height */}
                <div className="p-6 mt-auto">
                  <button className="w-full bg-[#974dc6] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300">
                    Κράτηση
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalsGrid;