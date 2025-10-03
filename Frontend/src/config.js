let API;

if (process.env.NODE_ENV === "development") {
  API = "https://shopease-app-fvn8.onrender.com/api/v1";
} else {
  API = "/api/v1";
}

export const server = API;



