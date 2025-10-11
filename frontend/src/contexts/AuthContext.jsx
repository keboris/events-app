import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialAuth = [];
function reducer(state, action) {}

export default function AuthContextProvider({ children }) {
  const [authState, dispatch] = useReducer(reducer, initialAuth);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
