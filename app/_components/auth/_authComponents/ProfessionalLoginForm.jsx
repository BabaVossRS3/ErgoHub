// ProfessionalLoginForm.jsx
const ProfessionalLoginForm = ({ formData, handleInputChange }) => {
    return (
      <>
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
      </>
    );
  };
  