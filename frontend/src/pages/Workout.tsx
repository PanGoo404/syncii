import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useUserContext from '../hooks/useUserContext';
import { Workout } from './Welcome';
import Card from './components/Card';
import { Link } from 'react-router-dom';

export default () => {
  const [user] = useUserContext();
  const { id: workoutId } = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkout = async () => {
      const data = await fetch(`/api/workout/${workoutId}`).then(
        async (res) => await res.json()
      );
      return data;
    };
    fetchWorkout()
      .then((data) => setWorkout(data))
      .catch((err) => {
        alert(err);
        navigate('/');
      });
  }, []);

  const handleDelete = async () => {
    await fetch(`/api/workout/${workoutId?.toString()}`, {
      method: 'DELETE',
    });
    navigate('/');
  };

  return (
    <article>
      {workout ? (
        <>
          <Link to={`/workout/${workout._id}`} className="card">
            <h2 className="title">{workout.title}</h2>
            <p className="text-lg">{workout.description}</p>
            <div className="stats">
              <p>Sets: {workout.sets}</p>
              <p>Reps: {workout.reps}</p>
              <p>Rest: {workout.rest}</p>
            </div>
          </Link>
          {user && (
            <button className="delete" onClick={() => handleDelete()}>
              Delete
            </button>
          )}
        </>
      ) : (
        <>
          <h1 className="title">Loading...</h1>
        </>
      )}
    </article>
  );
};
