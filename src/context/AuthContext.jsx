import { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, getUserApi, logoutApi } from '../api/auth';

// 1. Buat context
const AuthContext = createContext();

// 2. Custom hook untuk akses context
export const useAuth = () => useContext(AuthContext);

// 3. Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // data user (role, nama, dsb)
  const [loading, setLoading] = useState(true); // untuk loading state

  // 4. Fetch user saat pertama kali load (cek login)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await getUserApi();
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // 5. Fungsi login
  const login = async (username, password) => {
    await loginApi(username, password);
    const res = await getUserApi();
    setUser(res.data.user);
  };

  // 6. Fungsi logout
  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  // 7. Value context
  const value = { user, setUser, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
