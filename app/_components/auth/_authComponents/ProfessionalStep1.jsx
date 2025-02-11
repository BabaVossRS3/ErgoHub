import AuthFormField from './AuthFormField';


const ProfessionalStep1 = ({ formData, handleInputChange }) => {
    return (
      <>
        <AuthFormField
          id="name"
          name="name"
          label="Επαγγελματικό Όνομα"
          placeholder="π.χ. Δρ. Γιάννης Παπαδόπουλος"
          value={formData.name}
          onChange={handleInputChange}
        />
        
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
          id="phone"
          name="phone"
          type="tel"
          label="Τηλέφωνο"
          placeholder="+30 123 456 7890"
          value={formData.phone}
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
      </>
    );
  };

export default ProfessionalStep1;