import { useEffect, useState } from 'react';
import useUserContext, { UserI } from '../hooks/useUserContext';
import { Navigate, Link } from 'react-router-dom';

export interface WorkoutI {
  title: string;
  description: string;
  sets: number;
  reps: number;
  rest: number;
  rapsInSecs: boolean;
}

const Welcome = () => {
  const [user] = useUserContext();
  const [workouts, setWorkouts] = useState<UserI[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await fetch('/api/workouts').then(
        async (res) => await res.json()
      );
      setWorkouts(data);
    })();
  }, [workouts, user]);

  const handleAdd = async () => {
    const data = await fetch('/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'New Workout' }),
    }).then(async (res) => await res.json());
    setWorkouts([...workouts, data]);
  };

  return (
    <div className="w-max flex justify-around items-start pt-12 text-center flex-col">
      {user ? (
        <>
          <h1 className="text-3xl">Welcome {user.login}!</h1>
          <form className="form">
            <input required type="text" placeholder="Workout Name" />
            <input type="text" placeholder="Workout Description" />
            <input type="number" placeholder="Sets" required value="3" />
            <input type="number" placeholder="Reps" required value="10" />
            <input type="number" placeholder="Rest" required value="60" />
          </form>
          {
            <ul className="text-xl">
              {workouts.map((workout) => (
                <li key={workout.id}>
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
