export const saveCustomerLogin = (data) => {
  localStorage.setItem("customerToken", data.token);
  localStorage.setItem("customerId", data.customerId);
};

export const getCustomerToken = () => {
  return localStorage.getItem("customerToken");
};

export const getCustomerId = () => {
  return localStorage.getItem("customerId");
};

export const isCustomerLoggedIn = () => {
  return !!localStorage.getItem("customerToken");
};

export const logoutCustomer = () => {
  localStorage.removeItem("customerToken");
  localStorage.removeItem("customerId");
};

