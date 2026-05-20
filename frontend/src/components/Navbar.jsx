import { useLocation } from 'react-router-dom';

import '../styles/navbar.css';

function Navbar() {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Analytics';

      case '/inventory':
        return 'Inventory';

      default:
        return 'Analytics';
    }
  };

  return (
    <header className='navbar'>
      <h1 className='navbar-title'>{getPageTitle()}</h1>
    </header>
  );
}

export default Navbar;
