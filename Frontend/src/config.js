// src/config.js
let API;

if (process.env.NODE_ENV === "development") {
  // local dev backend
  API = "http://localhost:5000/api/v1";
} else {
  // deployed backend
  API = "https://shopease-app-fvn8.onrender.com/api/v1";
}

export const server = API;
