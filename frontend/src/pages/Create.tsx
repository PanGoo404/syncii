import React, { useEffect, useState } from 'react';
import { Workout } from './Welcome';
import { useNavigate } from 'react-router';
import useUserContext from '../hooks/useUserContext';

const CreateForm = () => {
  const [user] = useUserContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [rest, setRest] = useState(120);

  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const navigate = useNavigate();

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          reps,
          sets,
          rest,
        }),
      });

      if (!res.ok) {
        alert(`Something went wrong! Code ${res.status}`);
        return;
      }

      const workout = await res.json();
      console.debug(workout);
      setWorkouts([...workouts, workout]);
      navigate(`/workout/${workout._id}`);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (!user) navigate('/');
  });

  return (
    <article>
      <h1 className="title">Create Workout</h1>
      <form className="form" onSubmit={handleAdd}>
        <input
          required
          type="text"
          placeholder="Workout title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Workout Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="pair">
          <label title="Sets" htmlFor="Sets">
            Sets
          </label>
          <input
            title="Sets"
            type="number"
            required
            value={sets}
            onChange={(e) => setSets(parseInt(e.target.value))}
          />
        </div>
        <div className="pair">
          <label title="Reps" htmlFor="Reps">
            Reps
          </label>
          <input
            title="Reps"
            type="number"
            required
            value={reps}
            onChange={(e) => setReps(parseInt(e.target.value))}
          />
        </div>
        <div className="pair">
          <label title="Rest" htmlFor="Rest">
            Rest
          </label>
          <input
            title="Rest"
            type="number"
            required
            value={rest}
            onChange={(e) => setRest(parseInt(e.target.value))}
          />
        </div>
        <button>Add Workout</button>
      </form>
    </article>
  );
};

export default CreateForm;
