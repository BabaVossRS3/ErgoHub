const { default: AuthFormField } = require("./AuthFormField");

const ProfessionalStep1 = ({ formData, handleInputChange }) => {
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
        required
      />
      
      <AuthFormField
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      
      <AuthFormField
        id="name"
        name="name"
        type="text"
        label="Professional Name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      
      <AuthFormField
        id="phone"
        name="phone"
        type="tel"
        label="Phone Number"
        value={formData.phone}
        onChange={handleInputChange}
        required
      />
    </>
  );
};

export default ProfessionalStep1;