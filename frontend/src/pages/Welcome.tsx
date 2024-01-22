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

  // useEffect(() => {
  //   (async () => {
  //     const data = await fetch('/api/workout').then(
  //       async (res) => await res.json()
  //     );
  //     if (!user) return;
  //     setWorkouts(data);
  //   })();
  // }, []);

  // useEffect(() => {
  //   const;
  // });

  return (
    <div className="flex flex-col items-start pt-12 text-center w-max">
      {user ? (
        <>
          <h1 className="text-3xl">Welcome {user.login}!</h1>
          {
            <ul className="text-xl">
              {Array.isArray(workouts) &&
                workouts.map((workout) => (
                  <li key={workout._id}>
                    {`${workout.name} (${workout.reps} x ${workout.sets}) - ${workout.description}`}
                  </li>
                ))}
            </ul>
          }
          <li className="workout-list"></li>
        </>
      ) : (
        <>
          <h1 className="text-3xl">Welcome to Workout Tracker!</h1>
          <p className="text-xl">
            Please{' '}
            <Link className="frontlink" to="/login">
              login
            </Link>{' '}
            or{' '}
            <Link to="/register" className="frontlink">
              register
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Welcome;
