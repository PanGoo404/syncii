import { useEffect, useState } from 'react';
import useUserContext from '../hooks/useUserContext';
import { Link } from 'react-router-dom';

export interface Workout {
  _id: string;
  name: string;
  description?: string;
  sets: number;
  reps: number;
  rest: number;
  rapsInSecs: boolean;
}

const Welcome = () => {
  const [user] = useUserContext();
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetch('/api/workout').then(
        async (res) => await res.json()
      );
      if (!user) return;
      setWorkouts(data);
    })();
  }, []);

  // useEffect(() => {
  //   const;
  // });

  const workoutList = workouts.length ? (
    <ul className="text-xl">
      {Array.isArray(workouts) &&
        workouts.map((workout) => (
          <li key={workout._id}>
            <Link to={`/workout/${workout._id}`} className="card">
              {`${workout.name} (${workout.reps} x ${workout.sets}) - ${workout.description}`}
            </Link>
          </li>
        ))}
    </ul>
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
