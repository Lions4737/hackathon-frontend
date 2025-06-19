import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  currentUser: string | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  logout: async () => {}, // 型エラー防止のダミー
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        console.log("🔁 running /api/checkSession fetch");
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/checkSession`, {
          credentials: 'include',
        });
        console.log("📥 checkSession response status:", res.status);

        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();
        setCurrentUser(data?.uid || null);
      } catch (err) {
        console.error("❌ checkSession error:", err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  const logout = async () => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/sessionLogout`, {
      method: 'POST',
      credentials: 'include',
    });
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
