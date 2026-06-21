# 🌍 WorldWise

**🔗 [View Live Demo](https://world-wise-seven-iota.vercel.app)** > **⚠️ Important Note Regarding the Live Demo:** > The application UI and routing are fully deployed and accessible via the live link above. However, because this project relies on a local mock API (`json-server`) for data persistence, features like fetching, adding, or deleting visited cities will only work fully when the project is run **locally**. Please follow the local setup instructions below to experience the complete functionality.

---

## 📝 About The Project

WorldWise is an interactive web application that allows users to track their travels and document the cities and countries they have visited around the world. It features an interactive map and a user-friendly interface to log travel memories.

This project was built to master advanced React concepts, focusing heavily on state management, routing, and integrating third-party libraries.

## ✨ Key Features

* **Interactive World Map:** Visualize visited cities on a map built with React Leaflet.
* **Geolocation:** Automatically fetch and navigate to the user's current GPS location.
* **Advanced State Management:** Efficient data flow and state handling using Context API combined with the `useReducer` hook.
* **Dynamic Routing:** Seamless Single Page Application (SPA) experience with nested routes using React Router.
* **Data Fetching:** Integration with a mock API (JSON Server) to fetch, add, and delete visited cities.
* **Component Styling:** Scoped and modular styling using CSS Modules.

## 🛠️ Tech Stack

* **Frontend:** React.js, HTML5, CSS3 (CSS Modules)
* **Routing:** React Router DOM
* **State Management:** Context API & `useReducer`
* **Map Integration:** React Leaflet & Leaflet.js
* **Backend (Mock):** JSON Server

---

## 💻 Running Locally (Full Experience)

To test the application with full API functionality (data fetching and mutations), you need to run it on your local machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/OMAR-A-M-A/World-Wise.git](https://github.com/OMAR-A-M-A/World-Wise.git)
   cd World-Wise
   npm install
   npm run server
   npm run dev
   ```
   (Note: Ensure your `package.json` has the correct script setup to run the json-server).
