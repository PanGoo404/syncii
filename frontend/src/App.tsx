import { Outlet } from 'react-router-dom';
import Sidebar from './pages/components/Sidebar.tsx';
import UserProvider from './context/userContext.tsx';

function App() {
  return (
    <>
      <UserProvider>
        <div className="grid grid-cols-2">
          <Sidebar />
          <Outlet />
        </div>
      </UserProvider>
    </>
  );
}

export default App;
