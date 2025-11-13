import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { meUsuario } from '../../api/usuarioApi';

export const ProtectedRoute: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [authed, setAuthed] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const user = await meUsuario();
      if (!mounted) return;
      setAuthed(!!user);
      setLoading(false);
    })();
    return () => { mounted = false };
  }, []);

  if (loading) return <div>Carregando...</div>;
  return authed ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
