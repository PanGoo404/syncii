import { Outlet } from 'react-router-dom';
import Sidebar from './pages/components/Sidebar.tsx';
import UserProvider from './context/userContext.tsx';

function App() {
  return (
    <>
      <UserProvider>
        <main>
          <Sidebar />
          <Outlet />
        </main>
      </UserProvider>
    </>
  );
}

export default App;
