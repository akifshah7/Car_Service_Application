import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, useLocation } from "react-router";

// Create a Context to share auth state
const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Only redirect if on the login page ("/") and user is authenticated
      if (currentUser && location.pathname === "/") {
        navigate("/car-selection", { replace: true });
      }
      // Otherwise, let the user stay on the route they navigated to.
    });

    return () => unsubscribe();
  }, [navigate, location]);

  if (loading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use auth state
export const useAuth = () => useContext(AuthContext);
