import { Upload } from 'lucide-react';
import { Label } from "@/components/ui/label";

const ImageUpload = ({ profileImage, onImageChange, isUploading }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="profileImage">Φωτογραφία Προφίλ</Label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {profileImage ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Preview"
                className="mx-auto h-32 w-32 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() => onImageChange(null)}
                className="absolute top-0 right-0 rounded-full bg-red-500 text-white p-1"
              >
                ×
              </button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-[#974dc6] hover:text-[#8a45b5]"
                >
                  <span>Ανέβασε μια φωτογραφία</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => onImageChange(e.target.files[0])}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;