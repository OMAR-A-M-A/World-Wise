import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:8000";
const initObj = {
  cities: [],
  isLoading: false,
  currentCity: {},
  erorr: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
        isLoading: false,
      };
    case "rejected":
      return { erorr: action.payload, isLoading: false };
    default:
      throw new Error("Unknowen Action");
  }
}
const CityContext = createContext();
function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity, erorr }, dispatch] = useReducer(
    reducer,
    initObj,
  );
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        console.log(data);
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
      }
    },
    [currentCity.id],
  );

  async function createCity(cityObj) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(cityObj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        erorr,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}
function useCity() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("you calling the usecity outside it`s scope");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CityProvider, useCity };
