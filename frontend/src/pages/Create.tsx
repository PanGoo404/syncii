import React, { useState } from 'react';
import { Workout } from './Welcome';

const CreateForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [rest, setRest] = useState(120);

  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetch('/api/workout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        reps,
        sets,
        rest,
      }),
    })
      .then(async (res) => await res.json())
      .catch((error) => {
        alert(error);
      });
    setWorkouts([...workouts, data]);
    setName('');
    setDescription('');
    setReps(10);
    setSets(3);
    setRest(120);
  };

  return (
    <form className="form" onSubmit={handleAdd}>
      <input
        required
        type="text"
        placeholder="Workout Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Workout Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Sets"
        required
        value={sets}
        onChange={(e) => setSets(parseInt(e.target.value))}
      />
      <input
        type="number"
        placeholder="Reps"
        required
        value={reps}
        onChange={(e) => setReps(parseInt(e.target.value))}
      />
      <input
        type="number"
        placeholder="Rest"
        required
        value={rest}
        onChange={(e) => setRest(parseInt(e.target.value))}
      />
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default CreateForm;
