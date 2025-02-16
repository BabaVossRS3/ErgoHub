'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building2 } from 'lucide-react';
import useAuth from '@/lib/hooks/useAuth';
import { useImageUpload } from '@/lib/hooks/useImageUpload';
import { useState, useEffect } from "react";
import UserAuthForm from "./_authComponents/UserAuthForm";
import ProfessionalAuthForm from './_authComponents/ProfessionalAuthForm';
import MigrationForm from './_authComponents/MigrationForm';
import { useToast } from "@/hooks/use-toast";


const AuthModal = ({ 
  isOpen, 
  onClose,  
  onSuccessfulAuth,
  currentUser = null,
  trigger = null 
}) => {
  const login = useAuth(state => state.login);
  const register = useAuth(state => state.register);
  const isLoading = useAuth(state => state.isLoading);
  const error = useAuth(state => state.error);
  const authModalConfig = useAuth(state => state.authModalConfig);
  const { uploadImage, isUploading } = useImageUpload();
  const migrateUserToProfessional = useAuth(state => state.migrateUserToProfessional);
  const setError = useAuth(state => state.setError);
  const [activeTab, setActiveTab] = useState(authModalConfig.initialTab);
  const [view, setView] = useState(authModalConfig.initialView);
  const [step, setStep] = useState(1);
  const { toast } = useToast()


  // Update internal state when props change
  useEffect(() => {
    setActiveTab(authModalConfig.initialTab);
    setView(authModalConfig.initialView);
  }, [authModalConfig]);
  
  const [formData, setFormData] = useState({
    email: currentUser?.email || '',
    password: '',
    name: '',
    phone: '',
    profession: '',
    bio: '',
    profileImage: null,
    business_address: '',
    experience_years: '',
    terms_accepted: false
  });

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      profession: '',
      bio: '',
      profileImage: null,
      business_address: '',
      experience_years: '',
      terms_accepted: false  // Added this field
    });
    setStep(1);
    setView('login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for experience_years to ensure it's a number
    if (name === 'experience_years') {
      const numValue = value === '' ? '' : parseInt(value);
      setFormData(prev => ({ ...prev, [name]: numValue }));
      return;
    }
    
    // Special handling for business_address from LocationSelect
    if (name === 'business_address') {
      console.log('Location update:', value);
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log(`Field ${name} updated:`, value); // Debug log
  };

  const handleFileChange = (file) => {
    setFormData(prev => ({ ...prev, profileImage: file }));
  };

  const handleLocationChange = (value) => {
  console.log('Location selected:', value);
  setFormData(prev => ({
    ...prev,
    business_address: value
  }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Handle migration case
      if (currentUser && currentUser.role === 'user' && activeTab === 'professional') {
        const validationErrors = validateProfessionalData(formData, step);
        if (validationErrors.length > 0) {
          setError(validationErrors.join('. '));
          return;
        }
  
        // Step 1 progression
        if (step === 1) {
          setStep(2);
          return;
        }
  
        // Step 2 validation and submission
        if (step === 2) {
          // Upload image if provided
          let imageUrl = null;
          if (formData.profileImage) {
            imageUrl = await uploadImage(formData.profileImage);
          }
  
          // Prepare professional data
          const professionalData = {
            professional_name: formData.name,
            phone: formData.phone,
            profession: formData.profession,
            bio: formData.bio,
            profile_image: imageUrl,
            business_address: formData.business_address,
            business_email: formData.email, // Add this
            experience_years: formData.experience_years ? parseInt(formData.experience_years) : null,
            terms_accepted: formData.terms_accepted,
            terms_accepted_at: formData.terms_accepted ? new Date().toISOString() : null // Add this
          };
          console.log('Migration Data:', {
            formData,
            professionalData,
            currentUser
          });
  
          // Call migration instead of register
          const user = await migrateUserToProfessional(currentUser.id, professionalData);
          if (user) {
            toast({
              title: "Επιτυχής Αναβάθμιση!",
              description: "Ο λογαριασμός σας αναβαθμίστηκε επιτυχώς σε επαγγελματικό.",
              className: "bg-green-50 border-green-200 text-green-900",
              duration: 5000,
            });
            onSuccessfulAuth?.();
            onClose();
            resetForm();
          }
          return;
        }
      }
  
      // Handle regular login
      if (view === 'login') {
        if (!formData.email || !formData.password) {
          setError('Please enter both email and password');
          return;
        }
        const user = await login(formData.email, formData.password);
        if (user) {
          onSuccessfulAuth?.();
          onClose();
          resetForm();
        }
        return;
      }
  
      // Handle regular registration
      if (view === 'register') {
        // For professional registration
        if (activeTab === 'professional') {
          const validationErrors = validateProfessionalData(formData, step);
          if (validationErrors.length > 0) {
            setError(validationErrors.join('. '));
            return;
          }
  
          // Step 1 progression
          if (step === 1) {
            setStep(2);
            return;
          }
  
          // Step 2 submission
          if (step === 2) {
            let imageUrl = null;
            if (formData.profileImage) {
              imageUrl = await uploadImage(formData.profileImage);
            }
  
            const userData = {
              email: formData.email,
              password: formData.password,
              professional_name: formData.name,
              phone: formData.phone,
              profession: formData.profession,
              bio: formData.bio,
              profile_image: imageUrl,
              business_address: formData.business_address,
              business_email: formData.email, // Add this
              experience_years: formData.experience_years ? parseInt(formData.experience_years) : null,
              terms_accepted: formData.terms_accepted,
              terms_accepted_at: formData.terms_accepted ? new Date().toISOString() : null // Add this
            };
  
            const user = await register(userData);
            if (user) {
              onSuccessfulAuth?.();
              onClose();
              resetForm();
            }
            return;
          }
        }
  
        // For regular user registration
        if (!formData.email || !formData.password || !formData.name) {
          setError('Please fill in all required fields');
          return;
        }
  
        const userData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          terms_accepted: formData.terms_accepted,
          terms_accepted_at: formData.terms_accepted ? new Date().toISOString() : null // Add this
        };
  
        const user = await register(userData);
        if (user) {
          onSuccessfulAuth?.();
          onClose();
          resetForm();
        }
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'An unexpected error occurred');
    }
  };
  const validateProfessionalData = (data, step) => {
    const errors = [];
    
    if (step === 1) {
      if (!data.email?.trim()) errors.push('Το email είναι υποχρεωτικό');
      if (!data.name?.trim()) errors.push('Το όνομα είναι υποχρεωτικό');
      if (!data.phone?.trim()) errors.push('Το τηλέφωνο είναι υποχρεωτικό');
    }
    
    if (step === 2) {
      if (!data.profession?.trim()) errors.push('Το επάγγελμα είναι υποχρεωτικό');
      if (!data.bio?.trim()) errors.push('Η περιγραφή είναι υποχρεωτική');
      if (!data.profileImage) errors.push('Η φωτογραφία προφίλ είναι υποχρεωτική');
      if (!data.business_address?.trim()) errors.push('Η διεύθυνση είναι υποχρεωτική');
      if (!data.experience_years && data.experience_years !== 0) errors.push('Τα χρόνια εμπειρίας είναι υποχρεωτικά');
      if (!data.terms_accepted) errors.push('Πρέπει να αποδεχτείτε τους όρους χρήσης');
    }
    
    return errors;
  };

  // Ensure error is a string
  const errorMessage = error && typeof error === 'object' ? error.message || 'Παρουσιάστηκε ένα σφάλμα' : error;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-center">
            {trigger === 'booking'
              ? 'Σύνδεση για Κράτηση'
              : view === 'migrate'
              ? 'Αναβάθμιση σε Επαγγελματικό Λογαριασμό'
              : activeTab === 'user'
              ? (view === 'login' ? 'Σύνδεση' : 'Εγγραφή')
              : (view === 'login' ? 'Σύνδεση Επαγγελματία' : 'Εγγραφή Επαγγελματία')}
          </DialogTitle>
        </DialogHeader>

        {trigger !== 'booking' && (
          <Tabs 
            defaultValue={activeTab} 
            value={activeTab} 
            onValueChange={(value) => {
              // Only allow tab change if user is not logged in
              if (!currentUser || currentUser.role !== 'user') {
                setActiveTab(value);
              }
            }} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger 
                value="user" 
                className="flex items-center gap-2"
                disabled={currentUser && currentUser.role === 'user'} // Disable if user is logged in
              >
                <User className="w-4 h-4" />
                Χρήστης
              </TabsTrigger>
              <TabsTrigger 
                value="professional" 
                className="flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                Επαγγελματίας
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="mt-2">
              <UserAuthForm
                view={view}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                error={errorMessage}
                isLoading={isLoading}
                setView={setView}
              />
            </TabsContent>

            <TabsContent value="professional" className="mt-2">
              {currentUser && currentUser.role === 'user' ? (
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      Έχετε ήδη λογαριασμό χρήστη. Συμπληρώστε τα παρακάτω στοιχεία για να αναβαθμίσετε 
                      τον λογαριασμό σας σε επαγγελματικό.
                    </p>
                  </div>
                  
                  <MigrationForm
                    formData={formData}
                    setFormData={setFormData} 
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    handleFileChange={handleFileChange}
                    handleLocationChange={handleLocationChange}
                    error={errorMessage}
                    isLoading={isLoading}
                    isUploading={isUploading}
                    currentUser={currentUser}
                    step={step}
                    setStep={setStep}
                  />
                </div>
              ) : (
                <ProfessionalAuthForm
                  view={view}
                  step={step}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  handleFileChange={handleFileChange}
                  handleLocationChange={handleLocationChange}
                  error={errorMessage}
                  isLoading={isLoading}
                  setView={setView}
                  setStep={setStep}
                  isUploading={isUploading}
                />
              )}
            </TabsContent>
          </Tabs>
        )}

        {trigger === 'booking' && (
          <div className="mt-2">
            <UserAuthForm
              view={view}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              error={errorMessage}
              isLoading={isLoading}
              setView={setView}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;