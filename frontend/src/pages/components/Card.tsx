import { useParams } from 'react-router';
import useUserContext from '../../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';

export default () => {
  const [user] = useUserContext();
  const { title, description, sets, reps, rest, _id } = useParams<{
    title: string;
    description: string;
    sets: string;
    reps: string;
    rest: string;
    _id: string;
  }>();

  const navigate = useNavigate();

  const handleDelete = async () => {
    await fetch(`/api/workout/${_id}`, {
      method: 'DELETE',
    });
    navigate('/');
  };

  return (
    <div className="card">
      <h2 className="title">{title}</h2>
      {description && <p className="text-lg">{description}</p>}
      <div className="stats">
        <p>Sets: {sets}</p>
        <p>Reps: {reps}</p>
        <p>Rest: {rest}</p>
      </div>
      {user && (
        <button className="delete" onClick={() => handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};
