import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const EditWorkout = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();

  // Fetch the current workout data when the component mounts
  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await fetch("/api/workouts/" + id, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch workout data");
        }
        const data = await response.json();
        // Set the state with the current values
        setTitle(data.title);
        setLoad(data.load);
        setReps(data.reps);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchWorkoutData();
  }, [id, user.token]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedWorkout = { title, load, reps };

    const response = await fetch("/api/workouts/" + id, {
      method: "PATCH",
      body: JSON.stringify(updatedWorkout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([]);
      console.log("Workout Edited:", data);
      dispatch({ type: "EDIT_WORKOUT", payload: data });
      navigate(`/`);
    }
  };

  return (
    <form className="edit__create" onSubmit={handleEdit}>
      <h3>Edit Workout</h3>

      <label>Edit Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Edit Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default EditWorkout;
