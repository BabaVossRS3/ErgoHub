import { Label } from '@radix-ui/react-label';
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from './ImageUpload';
import ProfessionSelect from '../../ProfessionSelect';
import LocationSelect from '../../LocationSelect';

const ProfessionalStep2 = ({ formData, handleInputChange, handleFileChange, handleLocationChange, isUploading }) => {
    return (
      <>
        <ImageUpload
          profileImage={formData.profileImage}
          onImageChange={handleFileChange}
          isUploading={isUploading}
        />
  
        <div className="space-y-2">
          <Label htmlFor="profession">Επάγγελμα</Label>
          <ProfessionSelect
            value={formData.profession}
            onChange={(value) => handleInputChange({ target: { name: 'profession', value } })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="business_address">Τοποθεσία</Label>
          <LocationSelect
            value={formData.business_address}
            onChange={(value) => handleInputChange({ target: { name: 'business_address', value } })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience_years">Χρόνια Εμπειρίας</Label>
          <input
            type="number"
            id="experience_years"
            name="experience_years"
            min="0"
            max="99"
            className="w-full p-3 rounded-md border"
            placeholder="π.χ. 5"
            value={formData.experience_years}
            onChange={handleInputChange}
          />
        </div>

  
        <div className="space-y-2">
          <Label htmlFor="bio">Περιγραφή</Label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="w-full min-h-[100px] p-3 rounded-md border"
            placeholder="Γράψε λίγα λόγια για την εμπειρία σου..."
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center space-x-2 mt-4">
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
      </>
    );
  };
  
  export default ProfessionalStep2;