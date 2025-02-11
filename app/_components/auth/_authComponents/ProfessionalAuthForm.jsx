import { Alert, AlertDescription } from '@/components/ui/alert';
import ProfessionalStep1 from './ProfessionalStep1';
import ProfessionalStep2 from './ProfessionalStep2';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import AuthToggle from './AuthToggle';
import ProfessionalLoginForm from './ProfessionalLoginForm';

const ProfessionalAuthForm = ({ 
    view, 
    step, 
    formData, 
    handleInputChange, 
    handleSubmit, 
    handleFileChange,
    error, 
    isLoading, 
    setView, 
    setStep, 
    isUploading 
  }) => {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {view === 'register' ? (
          <>
            {step === 1 ? (
              <ProfessionalStep1
                formData={formData}
                handleInputChange={handleInputChange}
              />
            ) : (
              <ProfessionalStep2
                formData={formData}
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
                isUploading={isUploading}
              />
            )}
          </>
        ) : (
          <ProfessionalLoginForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
  
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
  
        <Button
          type="submit" 
          className="w-full bg-[#974dc6] hover:bg-[#8a45b5]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Παρακαλώ περιμένετε...
            </>
          ) : (
            view === 'login' 
              ? 'Σύνδεση' 
              : step === 1 
                ? 'Επόμενο' 
                : 'Ολοκλήρωση Εγγραφής'
          )}
        </Button>
  
        {view === 'register' && step === 2 && (
          <Button 
            type="button" 
            variant="outline" 
            className="w-full mt-2"
            onClick={() => setStep(1)}
          >
            Προηγούμενο
          </Button>
        )}
  
        <AuthToggle view={view} setView={setView} onRegisterClick={() => setStep(1)} />
      </form>
    );
  };

  export default ProfessionalAuthForm;