export const saveRetailerLogin = (data) => {
  localStorage.setItem("retailerToken", data.token);
  localStorage.setItem("retailerId", data.customerId);
};

export const getRetailerToken = () => {
  return localStorage.getItem("retailerToken");
};

export const logoutRetailer = () => {
  localStorage.removeItem("retailerToken");
  localStorage.removeItem("retailerId");
};

export const isRetailerLoggedIn = () => {
  return !!localStorage.getItem("retailerToken");
};

