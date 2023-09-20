import { format } from "date-fns";

const WorkoutDetails = ({ workout }) => {
  // Parse the ISO date string into a Date object
  const createdAtDate = new Date(workout.createdAt);
  const formattedDate = format(createdAtDate, "MMM dd, yyyy hh:mmaa");

 

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formattedDate}</p>
    </div>
  )
}

export default WorkoutDetails