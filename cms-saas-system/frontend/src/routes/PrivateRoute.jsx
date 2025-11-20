import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('genesis_token');
  
  // Se tem token, deixa entrar (children). Se não, chuta pro Login (Navigate to /)
  return token ? children : <Navigate to="/" />;
}