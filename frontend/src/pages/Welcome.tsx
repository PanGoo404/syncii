import { useEffect, useState } from 'react';
import useUserContext from '../hooks/useUserContext';
import { Link } from 'react-router-dom';

export interface Workout {
  _id: string;
  title: string;
  description?: string;
  sets: number;
  reps: number;
  rest: number;
}

const Welcome = () => {
  const [user] = useUserContext();
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const data = await fetch('/api/workout').then(
        async (res) => await res.json()
      );
      if (!user) return;
      setWorkouts(data);
    };
    fetchWorkouts();
  }, []);

  const workoutList = workouts.length ? (
    <div className="grid grid-cols-4 gap-8">
      {Array.isArray(workouts) &&
        workouts.map((workout) => (
          <div key={workout._id}>
            <Link to={`/workout/${workout._id}`} className="card">
              <h2 className="title">{workout.title}</h2>
              <p className="text-lg">{workout.description}</p>
              <div className="stats">
                <p>Sets: {workout.sets}</p>
                <p>Reps: {workout.reps}</p>
                <p>Rest: {workout.rest}</p>
              </div>
            </Link>
          </div>
        ))}
    </div>
  ) : (
    <p className="text-xl">No workouts yet!</p>
  );

  return (
    <article className={user ? 'top' : ''}>
      {user ? (
        <>
          <h1 className="text-3xl title">Welcome {user.login}!</h1>
          {workoutList}
        </>
      ) : (
        <>
          <h1 className="text-3xl">Welcome to Workout Tracker!</h1>
          <p className="text-xl">
            Please{' '}
            <Link className="link" to="/login">
              login
            </Link>{' '}
            or{' '}
            <Link to="/register" className="link">
              register
            </Link>
          </p>
        </>
      )}
    </article>
  );
};

export default Welcome;
