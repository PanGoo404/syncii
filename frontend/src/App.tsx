import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import { Outlet } from 'react-router-dom';
import Sidebar from './pages/components/Sidebar.tsx';
import UserProvider from './context/userContext.tsx';

function App() {
  return (
    <MantineProvider>
      <UserProvider>
        <div className="grid grid-cols-2 gap-0">
          <Sidebar />
          <Outlet />
        </div>
      </UserProvider>
    </MantineProvider>
  );
}

export default App;
