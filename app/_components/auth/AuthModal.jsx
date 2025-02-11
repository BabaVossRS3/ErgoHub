'use client'

// AuthModal.jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building2 } from 'lucide-react';
import useAuth from '../../../lib/hooks/useAuth';
import { useImageUpload } from '../../../lib/hooks/useImageUpload';
import { useState } from "react";
import UserAuthForm from "./_authComponents/UserAuthForm";
import ProfessionalAuthForm from './_authComponents/ProfessionalAuthForm';

const AuthModal = ({ 
  isOpen, 
  onClose, 
  initialTab = 'user',  
  initialView = 'login', 
  onSuccessfulAuth,
  trigger = null 
}) => {
  const login = useAuth(state => state.login);
  const register = useAuth(state => state.register);
  const isLoading = useAuth(state => state.isLoading);
  const error = useAuth(state => state.error);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [view, setView] = useState(initialView);
  const [step, setStep] = useState(1);
  const { uploadImage, isUploading } = useImageUpload();
  
  const [formData, setFormData] = useState({
    email: '',
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
      if (view === 'login') {
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
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-center">
            {trigger === 'booking'
              ? 'Σύνδεση για Κράτηση'
              : activeTab === 'user'
                ? (view === 'login' ? 'Σύνδεση' : 'Εγγραφή')
                : (view === 'login' ? 'Σύνδεση Επαγγελματία' : 'Εγγραφή Επαγγελματία')}
          </DialogTitle>
        </DialogHeader>

        {trigger !== 'booking' && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="user" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Χρήστης
              </TabsTrigger>
              <TabsTrigger value="professional" className="flex items-center gap-2">
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
                error={error}
                isLoading={isLoading}
                setView={setView}
              />
            </TabsContent>

            <TabsContent value="professional" className="mt-2">
              <ProfessionalAuthForm
                view={view}
                step={step}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleFileChange={handleFileChange}
                error={error}
                isLoading={isLoading}
                setView={setView}
                setStep={setStep}
                isUploading={isUploading}
              />
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
              error={error}
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