import { Link } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';

const Sidebar = () => {
  const [user] = useUserContext();

  return (
    <nav className="navbar">
      <h1 className="text-3xl hover:text-cyan-400">
        <Link to="/">Workout Tracker</Link>
      </h1>
      <ul>
        {user ? (
          <>
            <li className="link">
              <Link to="/create">New Workout</Link>
            </li>
            <li className="link">
              <Link to="/workouts">List</Link>
            </li>
            <li className="link logout">
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/login">Login</Link>
            </li>
            <li className="link">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
