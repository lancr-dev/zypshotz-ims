import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';

import InventoryPage from './pages/InventoryPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard' />} />

      <Route path='/dashboard' element={<DashboardPage />} />

      <Route path='/inventory' element={<InventoryPage />} />
    </Routes>
  );
}

export default App;
