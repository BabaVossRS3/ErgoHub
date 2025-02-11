import { Label } from '@radix-ui/react-label';
import ImageUpload from './ImageUpload';
import ProfessionSelect from '../../ProfessionSelect';

const ProfessionalStep2 = ({ formData, handleInputChange, handleFileChange, isUploading }) => {
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
      </>
    );
  };
  
  export default ProfessionalStep2;