import AuthFormField from './AuthFormField';

const MigrationStep1 = ({ formData, handleInputChange, currentUser }) => {
  return (
    <>
      {/* Hidden email field populated with current user's email */}
      <input 
        type="hidden" 
        name="email" 
        value={currentUser?.email || ''} 
      />
      
      <AuthFormField
        id="name"
        name="name"
        label="Επαγγελματικό Όνομα"
        placeholder="π.χ. Δρ. Γιάννης Παπαδόπουλος"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      
      <AuthFormField
        id="phone"
        name="phone"
        type="tel"
        label="Τηλέφωνο"
        placeholder="+30 123 456 7890"
        value={formData.phone}
        onChange={handleInputChange}
        required
      />
    </>
  );
};

export default MigrationStep1;