"use client"

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Pencil, User, Mail, Phone, MapPin, Save, X } from 'lucide-react';
import useAuth from '@/lib/hooks/useAuth';
import ProfileField from './ProfileField';

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/profile', {
          headers: {
            'Authorization': `Bearer ${user.id}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        setProfileData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user) {
      fetchProfile();
    }
  }, [isAuthenticated, user]);

  const handleEdit = (field, value) => {
    setEditingField(field);
    setEditedValue(value);
  };

  const handleSave = async (field) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({
          field,
          value: editedValue
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setProfileData(prev => ({
        ...prev,
        [field]: editedValue
      }));
      setEditingField(null);
      setError(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditedValue('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#edecf4] flex items-center justify-center">
        <Card className="p-6">
          <p className="text-lg text-gray-600">Please log in to view your profile</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#edecf4] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#974EC3]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#edecf4] flex items-center justify-center">
        <Card className="p-6">
          <p className="text-lg text-red-600">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edecf4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Το προφίλ μου</h1>
        
        <Card className="mb-8">
          <div className="p-6 flex items-center gap-6 border-b border-gray-100">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#974EC3] text-white flex items-center justify-center">
                {profileData?.profileImage ? (
                  <img 
                    src={profileData.profileImage} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                <Pencil className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{profileData?.name}</h2>
              <p className="text-gray-500">{user?.role === 'professional' ? 'Επαγγελματίας' : 'Χρήστης'}</p>
            </div>
          </div>

          <ProfileField
            label="Όνομα"
            value={profileData?.name || ''}
            isEditing={editingField === 'name'}
            onEdit={() => handleEdit('name', profileData?.name)}
            onSave={() => handleSave('name')}
            onCancel={handleCancel}
            editedValue={editedValue}
            onChange={setEditedValue}
          />

          <ProfileField
            label="Email"
            value={profileData?.email || ''}
            isEditing={editingField === 'email'}
            onEdit={() => handleEdit('email', profileData?.email)}
            onSave={() => handleSave('email')}
            onCancel={handleCancel}
            editedValue={editedValue}
            onChange={setEditedValue}
          />

          <ProfileField
            label="Τηλέφωνο"
            value={profileData?.phone || ''}
            isEditing={editingField === 'phone'}
            onEdit={() => handleEdit('phone', profileData?.phone)}
            onSave={() => handleSave('phone')}
            onCancel={handleCancel}
            editedValue={editedValue}
            onChange={setEditedValue}
          />

          <ProfileField
            label="Διεύθυνση"
            value={profileData?.address || ''}
            isEditing={editingField === 'address'}
            onEdit={() => handleEdit('address', profileData?.address)}
            onSave={() => handleSave('address')}
            onCancel={handleCancel}
            editedValue={editedValue}
            onChange={setEditedValue}
          />

          {user?.role === 'professional' && (
            <>
              <ProfileField
                label="Επαγγελματική Διεύθυνση"
                value={profileData?.businessAddress || ''}
                isEditing={editingField === 'businessAddress'}
                onEdit={() => handleEdit('businessAddress', profileData?.businessAddress)}
                onSave={() => handleSave('businessAddress')}
                onCancel={handleCancel}
                editedValue={editedValue}
                onChange={setEditedValue}
              />

              <ProfileField
                label="Επαγγελματικό Email"
                value={profileData?.businessEmail || ''}
                isEditing={editingField === 'businessEmail'}
                onEdit={() => handleEdit('businessEmail', profileData?.businessEmail)}
                onSave={() => handleSave('businessEmail')}
                onCancel={handleCancel}
                editedValue={editedValue}
                onChange={setEditedValue}
              />

              <ProfileField
                label="Βιογραφικό"
                value={profileData?.bio || ''}
                isEditing={editingField === 'bio'}
                onEdit={() => handleEdit('bio', profileData?.bio)}
                onSave={() => handleSave('bio')}
                onCancel={handleCancel}
                editedValue={editedValue}
                onChange={setEditedValue}
              />
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;