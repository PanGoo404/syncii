import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export default () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
