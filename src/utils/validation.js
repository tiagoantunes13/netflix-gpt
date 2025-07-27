export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) return "Invalid Email";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return "";
};

export const validateName = (name) => {
  const namePattern = /^[\p{Letter}\s\-.']+$/u;
  if (!namePattern.test(name)) return "Invalid Name";
  return "";
};
