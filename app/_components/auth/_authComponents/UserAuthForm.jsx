import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import AuthFormField from './AuthFormField';
import AuthToggle from './AuthToggle';

const UserAuthForm = ({ view, formData, handleInputChange, handleSubmit, error, isLoading, setView }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {view === 'register' && (
        <>
          <AuthFormField
            id="name"
            name="name"
            label="Ονοματεπώνυμο"
            placeholder="π.χ. Γιάννης Παπαδόπουλος"
            value={formData.name}
            onChange={handleInputChange}
          />
        </>
      )}
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <AuthFormField
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="name@example.com"
        value={formData.email}
        onChange={handleInputChange}
      />
      
      <AuthFormField
        id="password"
        name="password"
        type="password"
        label="Κωδικός"
        value={formData.password}
        onChange={handleInputChange}
      />

      {view === 'register' && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            name="terms_accepted"
            checked={formData.terms_accepted}
            onCheckedChange={(checked) => 
              handleInputChange({ 
                target: { 
                  name: 'terms_accepted', 
                  value: checked 
                } 
              })
            }
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Αποδέχομαι τους <a href="/terms" className="text-primary hover:underline">όρους χρήσης</a> και την <a href="/privacy" className="text-primary hover:underline">πολιτική απορρήτου</a>
          </label>
        </div>
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
          view === 'login' ? 'Σύνδεση' : 'Εγγραφή'
        )}
      </Button>

      <AuthToggle view={view} setView={setView} />
    </form>
  );
};

export default UserAuthForm;