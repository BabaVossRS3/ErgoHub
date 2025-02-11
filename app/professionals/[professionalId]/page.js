"use client"
import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  Star, 
  Award, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle,
  Clock4
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { useState } from 'react';
import AuthModal from './../../_components/auth/AuthModal'; // Add this import

// This will be our dynamic page component
const ProfessionalProfile = ({ params }) => {
  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);
  const professionalId = unwrappedParams.professionalId;
  const [showAuthModal, setShowAuthModal] = useState(false);

  
  // In a real app, you'd fetch the professional's data using the ID
  // For now, let's use mock data
  const professional = {
    id: professionalId,
    name: "Δρ. Μαρία Παπαδοπούλου",
    profession: "Παιδίατρος",
    rating: 4.8,
    reviews: 127,
    location: "Χαλάνδρι, Αθήνα",
    availability: "Διαθέσιμη σήμερα",
    imageUrl: "/images/happy-woman-home-coronavirus-quarantine.jpg",
    is_verified: true,
    bio: "Εξειδικευμένη παιδίατρος με έμφαση στην προληπτική ιατρική",
    experience: "15 χρόνια εμπειρίας",
    email: "maria.papadopoulou@example.com",
    phone: "+30 210 1234567",
    services: [
      {
        id: 1,
        name: "Παιδιατρική Εξέταση",
        duration: 30,
        price: 50
      },
      {
        id: 2,
        name: "Προληπτικός Έλεγχος",
        duration: 45,
        price: 70
      },
      {
        id: 3,
        name: "Εμβολιασμός",
        duration: 20,
        price: 40
      }
    ],
    availability_hours: {
      monday: ["09:00-14:00", "17:00-20:00"],
      tuesday: ["09:00-14:00", "17:00-20:00"],
      wednesday: ["09:00-14:00"],
      thursday: ["09:00-14:00", "17:00-20:00"],
      friday: ["09:00-14:00", "17:00-20:00"],
      saturday: ["10:00-14:00"],
      sunday: []
    }
  };

  const weekDays = {
    monday: "Δευτέρα",
    tuesday: "Τρίτη",
    wednesday: "Τετάρτη",
    thursday: "Πέμπτη",
    friday: "Παρασκευή",
    saturday: "Σάββατο",
    sunday: "Κυριακή"
  };

  const handleBookingClick = () => {
    // Here you would check if user is logged in
    const isLoggedIn = false; // Replace with actual auth check
    
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      // Proceed with booking
      window.location.href = `/booking/${professional.id}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#edecf4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img
                src={professional.imageUrl}
                alt={professional.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {professional.is_verified && (
                <CheckCircle className="absolute -bottom-2 -right-2 w-8 h-8 text-green-500 bg-white rounded-full" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{professional.name}</h1>
                {professional.is_verified && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-xl text-gray-600 mb-4">{professional.profession}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{professional.rating}</span>
                  <span className="text-gray-600">({professional.reviews} κριτικές)</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{professional.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-green-600">
                  <Clock className="w-5 h-5" />
                  <span>{professional.availability}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-5 h-5" />
                  <span>{professional.experience}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
            <button 
                onClick={handleBookingClick}
                className="bg-[#974dc6] text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg"
              >
                Κλείσε Ραντεβού
              </button>
              <Link href={`/chat/${professional.id}`} className="text-center bg-white border-2 border-[#974dc6] text-[#974dc6] py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-semibold">
                Μήνυμα
              </Link>
            </div>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Σχετικά</h2>
              <p className="text-gray-600">{professional.bio}</p>
            </Card>

            {/* Services Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Υπηρεσίες</h2>
              <div className="space-y-4">
                {professional.services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <div className="flex items-center text-gray-600">
                        <Clock4 className="w-4 h-4 mr-1" />
                        <span>{service.duration} λεπτά</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold">
                      {service.price}€
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Επικοινωνία</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span>{professional.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{professional.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span>{professional.location}</span>
                </div>
              </div>
            </Card>

            {/* Availability Schedule */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Ωράριο Λειτουργίας</h2>
              <div className="space-y-3">
                {Object.entries(professional.availability_hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="capitalize">{weekDays[day]}</span>
                    <span className="text-gray-600">
                      {hours.length > 0 ? hours.join(", ") : "Κλειστά"}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <AuthModal 
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
              initialTab="user"
              initialView="register"
              trigger="booking"
              onSuccessfulAuth={() => {
                // After successful auth, redirect to booking
                window.location.href = `/booking/${professional.id}`;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;