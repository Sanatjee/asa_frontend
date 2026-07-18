import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export default AuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('token')
  );
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedUser =
      localStorage.getItem('user');

    const storedToken =
      localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = (data) => {
    const normalizedUser = {
      ...data.user.info,
      roles: data.user.roles,
      permissions:
        data.user.permissions,
    };

    setUser(normalizedUser);
    setToken(data.token);

    localStorage.setItem(
      'user',
      JSON.stringify(normalizedUser)
    );

    localStorage.setItem(
      'token',
      data.token
    );
  };

  const logout = async() => {
    try {
        await authService.logout();
    } catch (e) {
        console.log(e);
    } finally {
        setUser(null);
        setToken(null);

        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
  };

  const hasRole = (role) => {
    return (
      user?.roles?.includes(role) ??
      false
    );
  };

  const hasAnyRole = (roles) => {
    return (
      roles.some((role) =>
        user?.roles?.includes(role)
      ) ?? false
    );
  };

  const hasPermission = (
    permission
  ) => {
    return (
      user?.permissions?.includes(
        permission
      ) ?? false
    );
  };

  const hasAnyPermission = (
    permissions
  ) => {
    return (
      permissions.some((permission) =>
        user?.permissions?.includes(
          permission
        )
      ) ?? false
    );
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,

      login,
      logout,

      hasRole,
      hasAnyRole,

      hasPermission,
      hasAnyPermission,

      isAuthenticated:
        !!token,
    }),
    [user, token, loading]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}