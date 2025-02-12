// MigrationForm.jsx
import React, { useEffect } from 'react';
import MigrationStep1 from './MigrationStep1';
import MigrationStep2 from './MigrationStep2';

const MigrationForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  handleFileChange,
  error,
  isLoading,
  isUploading,
  currentUser,
  step,
  setStep
}) => {
  // Only set email once when component mounts and if it's not already set
  useEffect(() => {
    if (currentUser?.email && !formData.email) {
      handleInputChange({
        target: {
          name: 'email',
          value: currentUser.email
        }
      });
    }
  }, []); // Empty dependency array to run only once on mount

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {step === 1 ? (
        <>
          <MigrationStep1 
            formData={formData}
            handleInputChange={handleInputChange}
            currentUser={currentUser}
          />
          
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button 
            type="submit" 
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            disabled={isLoading}
          >
            Επόμενο
          </button>
        </>
      ) : (
        <>
          <MigrationStep2
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            isUploading={isUploading}
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="flex gap-3">
            <button 
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Πίσω
            </button>
            
            <button 
              type="submit" 
              className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              disabled={isLoading || isUploading}
            >
              {isLoading ? 'Αναβάθμιση...' : 'Αναβάθμιση σε Επαγγελματία'}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default MigrationForm;