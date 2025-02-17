import React from 'react';
import { Pencil, Save, X } from 'lucide-react';

const ProfileField = ({ 
  label, 
  value, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  editedValue, 
  onChange 
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100">
      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        {isEditing ? (
          <input
            type="text"
            value={editedValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#974EC3]"
          />
        ) : (
          <p className="text-gray-700">{value || ''}</p>
        )}
      </div>
      <div className="ml-4">
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
            >
              <Save className="w-5 h-5" />
            </button>
            <button
              onClick={onCancel}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-[#974EC3] hover:bg-gray-50 rounded-full transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileField;