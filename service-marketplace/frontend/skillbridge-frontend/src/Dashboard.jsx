import { useContext } from 'react';


import CustomerDashboard from './components/Dashboard/CustomerDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ProviderDashboard from './components/Dashboard/ProviderDashboard';
import { useAuth } from './context/AuthContext'; // ✅ correct hook

export default function Dashboard() {
  const { user } = useAuth(); // ✅ use the custom hook

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'provider':
      return <ProviderDashboard />;
    default:
      return <CustomerDashboard />;
  }
}
