import { Link, useLocation } from 'react-router-dom';

import { LayoutDashboard, Boxes } from 'lucide-react';

import '../styles/sidebar.css';

function Sidebar() {
  const location = useLocation();

  return (
    <aside className='sidebar'>
      <div className='sidebar-logo'>
        <h2>Zypshotz IMS</h2>
      </div>

      <nav className='sidebar-nav'>
        <Link
          to='/dashboard'
          className={
            location.pathname === '/dashboard'
              ? 'sidebar-link active'
              : 'sidebar-link'
          }
        >
          <LayoutDashboard size={18} />

          <span>Dashboard</span>
        </Link>

        <Link
          to='/inventory'
          className={
            location.pathname === '/inventory'
              ? 'sidebar-link active'
              : 'sidebar-link'
          }
        >
          <Boxes size={18} />

          <span>Inventory</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
