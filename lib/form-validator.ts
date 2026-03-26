const ALLOWED_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "zoho.com"
];

const ALLOWED_DOMAINS_REGEX = new RegExp(`^(${ALLOWED_DOMAINS.join("|")})$`);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(09|\+639)\d{9}$/;
const NAME_REGEX = /^[\p{L}\s]+$/u;

const validateEmail = (email: string) => {
  return EMAIL_REGEX.test(email) && ALLOWED_DOMAINS_REGEX.test(email.split("@")[1]);
};

const validatePhone = (phone: string) => {
  return PHONE_REGEX.test(phone);
};

const validateName = (name: string) => {
  return NAME_REGEX.test(name);
};

export { validateEmail, validatePhone, validateName };