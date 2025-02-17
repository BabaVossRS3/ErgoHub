'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Star, 
  Award, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle,
  Clock4,
  Loader2
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import useAuth from '@/lib/hooks/useAuth';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const ProfessionalProfile = () => {
  const params = useParams();
  const professionalId = params.professionalId;
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authStore = useAuth();

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/professionals/${professionalId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch professional data');
        }
        const data = await response.json();
        setProfessional(data);
      } catch (err) {
        console.error('Error fetching professional:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessional();
  }, [professionalId]);

  const handleBookingClick = () => {
    if (!authStore.isAuthenticated) {
      authStore.openAuthModal({
        initialTab: 'user',
        initialView: 'login',
        trigger: 'booking'
      });
    } else {
      window.location.href = `/booking/${professionalId}`;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#edecf4] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#974dc6]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#edecf4] flex items-center justify-center">
        <Card className="p-6">
          <h2 className="text-xl text-red-600">{error}</h2>
        </Card>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-[#edecf4] flex items-center justify-center">
        <Card className="p-6">
          <h2 className="text-xl">Professional not found</h2>
        </Card>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-[#edecf4] py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      {/* Profile Header */}
      <Card className="mb-8 p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Image */}
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
          
          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {professional.name}
              </h1>
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
                <span>{professional.online ? 'Διαθέσιμος τώρα' : 'Μη διαθέσιμος'}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-5 h-5" />
                <span>{professional.experience} Χρόνια Εμπειρίας</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleBookingClick}
              className="bg-[#974dc6] text-white py-3 px-6 rounded-lg hover:bg-opacity-90 
                       transition-all duration-300 font-semibold shadow-md hover:shadow-lg
                       transform hover:-translate-y-1"
            >
              Κλείσε Ραντεβού
            </button>
            <Link 
              href={`/chat/${professional.id}`} 
              className="text-center bg-white border-2 border-[#974dc6] text-[#974dc6] 
                       py-3 px-6 rounded-lg hover:bg-gray-50 transition-all duration-300 
                       font-semibold transform hover:-translate-y-1"
            >
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
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4">Σχετικά</h2>
            <p className="text-gray-600">{professional.bio}</p>
          </Card>

          {/* Services Section */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4">Υπηρεσίες</h2>
            <div className="space-y-4">
              {professional.services?.map((service) => (
                <div 
                  key={service.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg
                           hover:shadow-md transition-shadow duration-300"
                >
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <div className="flex items-center text-gray-600">
                      <Clock4 className="w-4 h-4 mr-1" />
                      <span>{service.duration} λεπτά</span>
                    </div>
                    {service.description && (
                      <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                    )}
                  </div>
                  <div className="text-lg font-bold">
                    {(service.price / 100).toFixed(2)}€
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Contact Info */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4">Επικοινωνία</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{professional.businessEmail || professional.email}</span>
              </div>
              {professional.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{professional.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>{professional.location}</span>
              </div>
            </div>
          </Card>

          {/* Availability Schedule */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4">Ωράριο Λειτουργίας</h2>
            <div className="space-y-3">
              {Object.entries(professional.availability || {}).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center py-2 border-b last:border-0">
                  <span className="font-medium">{day}</span>
                  <span className="text-gray-600">
                    {hours?.length > 0 ? hours.join(", ") : "Κλειστά"}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
);
};

export default ProfessionalProfile;