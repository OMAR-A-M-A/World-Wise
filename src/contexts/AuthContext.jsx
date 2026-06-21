import { createContext, useContext, useReducer } from "react";

const initObj = {
  user: null,
  isAuth: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const AuthContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuth: true };
    case "logout":
      return { ...state, user: null, isAuth: false };
    default:
      throw new Error("Unknowen Action");
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initObj);
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) return;
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
