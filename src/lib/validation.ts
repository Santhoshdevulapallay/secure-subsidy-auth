// Form validation utilities for authentication

export interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Password strength validation
export const passwordRules: ValidationRule[] = [
  {
    test: (value) => value.length >= 8,
    message: "Password must be at least 8 characters long"
  },
  {
    test: (value) => /[A-Z]/.test(value),
    message: "Password must contain at least one uppercase letter"
  },
  {
    test: (value) => /[a-z]/.test(value),
    message: "Password must contain at least one lowercase letter"
  },
  {
    test: (value) => /\d/.test(value),
    message: "Password must contain at least one number"
  },
  {
    test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    message: "Password must contain at least one special character"
  }
];

// Email validation
export const validateEmail = (email: string): string => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};

// Phone number validation (Indian format)
export const validatePhone = (phone: string): string => {
  if (!phone) return "Mobile number is required";
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
    return "Please enter a valid 10-digit mobile number";
  }
  return "";
};

// Aadhaar validation
export const validateAadhaar = (aadhaar: string): string => {
  if (!aadhaar) return "Aadhaar/ID number is required";
  const cleanAadhaar = aadhaar.replace(/\s+/g, '');
  if (cleanAadhaar.length !== 12 || !/^\d{12}$/.test(cleanAadhaar)) {
    return "Please enter a valid 12-digit Aadhaar number";
  }
  return "";
};

// Registration number validation (for shops)
export const validateRegistrationNumber = (regNumber: string): string => {
  if (!regNumber) return "Registration number is required";
  if (regNumber.length < 6) return "Registration number must be at least 6 characters";
  return "";
};

// Password validation
export const validatePassword = (password: string): string => {
  if (!password) return "Password is required";
  
  const failedRules = passwordRules.filter(rule => !rule.test(password));
  if (failedRules.length > 0) {
    return failedRules[0].message;
  }
  
  return "";
};

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
};

// Username validation
export const validateUsername = (username: string): string => {
  if (!username) return "Username is required";
  if (username.length < 3) return "Username must be at least 3 characters long";
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "Username can only contain letters, numbers, and underscores";
  }
  return "";
};

// Full name validation
export const validateFullName = (name: string): string => {
  if (!name) return "Full name is required";
  if (name.trim().length < 2) return "Full name must be at least 2 characters long";
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return "Full name can only contain letters and spaces";
  }
  return "";
};

// Shop name validation
export const validateShopName = (name: string): string => {
  if (!name) return "Shop name is required";
  if (name.trim().length < 2) return "Shop name must be at least 2 characters long";
  return "";
};

// Generic required field validation
export const validateRequired = (value: string, fieldName: string): string => {
  if (!value || !value.trim()) return `${fieldName} is required`;
  return "";
};

// Comprehensive form validation
export const validateLoginForm = (username: string, password: string): ValidationResult => {
  const errors: Record<string, string> = {};
  
  const usernameError = validateUsername(username);
  if (usernameError) errors.username = usernameError;
  
  const passwordError = validateRequired(password, "Password");
  if (passwordError) errors.password = passwordError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateCitizenSignupForm = (data: {
  full_name: string;
  email: string;
  mobile: string;
  aadhaar_id: string;
  password: string;
  confirm_password: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};
  
  const nameError = validateFullName(data.full_name);
  if (nameError) errors.full_name = nameError;
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(data.mobile);
  if (phoneError) errors.mobile = phoneError;
  
  const aadhaarError = validateAadhaar(data.aadhaar_id);
  if (aadhaarError) errors.aadhaar_id = aadhaarError;
  
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(data.password, data.confirm_password);
  if (confirmPasswordError) errors.confirm_password = confirmPasswordError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateShopSignupForm = (data: {
  shop_name: string;
  email: string;
  mobile: string;
  registration_number: string;
  password: string;
  confirm_password: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};
  
  const nameError = validateShopName(data.shop_name);
  if (nameError) errors.shop_name = nameError;
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(data.mobile);
  if (phoneError) errors.mobile = phoneError;
  
  const regNumberError = validateRegistrationNumber(data.registration_number);
  if (regNumberError) errors.registration_number = regNumberError;
  
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(data.password, data.confirm_password);
  if (confirmPasswordError) errors.confirm_password = confirmPasswordError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};