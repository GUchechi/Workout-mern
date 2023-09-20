import { useState, useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";

const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <>
      <h2>Welcome to the Workout Tracker!</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="home">
          <div className="workouts">
            {workouts &&
              workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
