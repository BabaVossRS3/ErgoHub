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
      if (view === 'migrate' && currentUser) {
        // Handle step progression for migration
        if (step === 1) {
          if (!formData.name || !formData.phone || !formData.password) {
            setError('Παρακαλώ συμπληρώστε όλα τα απαραίτητα πεδία');
            return;
          }
          setStep(2);
          return;
        }
  
        // Only proceed with migration on step 2
        if (!formData.profession || !formData.bio) {
          setError('Παρακαλώ συμπληρώστε όλα τα απαραίτητα πεδία');
          return;
        }
      
        try {
          const professionalData = {
            email: currentUser.email, // Include the current user's email
            password: formData.password, // Include the password for verification
            professional_name: formData.name,
            phone: formData.phone,
            profession: formData.profession,
            bio: formData.bio,
            profile_image: formData.profileImage ? await uploadImage(formData.profileImage) : null
          };
      
          const user = await migrateUserToProfessional(currentUser.id, professionalData);
          if (user) {
            onSuccessfulAuth?.();
            onClose();
            resetForm();
          }
        } catch (error) {
          console.error('Migration error:', error);
          setError(error.message || 'Σφάλμα κατά την αναβάθμιση του λογαριασμού');
        }
      } else if (view === 'login') {
        const user = await login(formData.email, formData.password);
        if (user) {
          onSuccessfulAuth?.();
          onClose();
          resetForm();
        }
      } else if (view === 'register') {
        if (activeTab === 'professional' && step === 1) {
          setStep(2);
          return;
        }
  
        let imageUrl;
        if (activeTab === 'professional' && formData.profileImage) {
          imageUrl = await uploadImage(formData.profileImage);
        }
  
        const userData = activeTab === 'user' 
          ? {
              email: formData.email,
              password: formData.password,
              name: formData.name
            }
          : {
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
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'Παρουσιάστηκε ένα απρόσμενο σφάλμα');
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