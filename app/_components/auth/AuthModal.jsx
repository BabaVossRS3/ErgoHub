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
    email: currentUser?.email || '', // Initialize with current user's email
    password: '',
    name: '',
    phone: '',
    profession: '',
    bio: '',
    profileImage: null
  });

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      profession: '',
      bio: '',
      profileImage: null
    });
    setStep(1);
    setView('login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file) => {
    setFormData(prev => ({ ...prev, profileImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Handle migration case
      if (currentUser && currentUser.role === 'user' && activeTab === 'professional') {
        // Step 1 validation
        if (step === 1) {
          if (!formData.name || !formData.phone) {
            setError('Please fill in all required fields');
            return;
          }
          setStep(2);
          return;
        }
  
        // Step 2 validation and submission
        if (step === 2) {
          if (!formData.profession || !formData.bio) {
            setError('Please fill in all required fields');
            return;
          }
  
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
            profile_image: imageUrl
          };
  
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
        // For professional registration step 1
        if (activeTab === 'professional' && step === 1) {
          if (!formData.email || !formData.password || !formData.name) {
            setError('Please fill in all required fields');
            return;
          }
          setStep(2);
          return;
        }
  
        // For professional registration step 2
        if (activeTab === 'professional' && step === 2) {
          if (!formData.profession || !formData.bio) {
            setError('Please fill in all required fields');
            return;
          }
  
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
            profile_image: imageUrl
          };
  
          const user = await register(userData);
          if (user) {
            onSuccessfulAuth?.();
            onClose();
            resetForm();
          }
          return;
        }
  
        // For regular user registration
        const userData = {
          email: formData.email,
          password: formData.password,
          name: formData.name
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