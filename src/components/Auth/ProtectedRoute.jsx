import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, demoMode } = useAuth();

  if (!user && !demoMode) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute; 