import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { meUsuario } from '../../api/usuarioApi';

interface Props {
  allowedRoles: string[];
}

export const RoleProtectedRoute: React.FC<Props> = ({ allowedRoles }) => {
  const [loading, setLoading] = React.useState(true);
  const [authorized, setAuthorized] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const user = await meUsuario();
      if (!mounted) return;
      if (user && allowedRoles.includes((user as any).tipo_usuario)) setAuthorized(true);
      setLoading(false);
    })();
    return () => { mounted = false };
  }, [allowedRoles]);

  if (loading) return <div>Carregando...</div>;
  return authorized ? <Outlet /> : <Navigate to="/" replace />;
};

export default RoleProtectedRoute;
