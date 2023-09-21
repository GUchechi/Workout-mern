import { useState, useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import Spinner from "../components/Spinner";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: data });
        }
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <>
      <h2>Welcome to the Workout Tracker!</h2>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="home">
          <div className="workouts">
            {workouts &&
              workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
          </div>
          <WorkoutForm />
        </div>
      )}
    </>
  );
};

export default Home;
