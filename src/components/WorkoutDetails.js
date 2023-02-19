import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date library
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  
  const handleClick = async () => {
    if (!user) {
      return 
    }

    const response = await fetch(`api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="bg-white my-3 p-4 rounded-xl">
      <h4 className="text-sky-600 font-semibold text-xl">{workout.title}</h4>
      <p>Load (kg): {workout.load}</p>
      <p>Number of reps: {workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt))} ago</p>
      <button className="rounded-lg bg-red-600 p-1.5 mt-2 text-white text-xs" onClick={handleClick}>
        delete
      </button>
    </div>
  )
}
  
  export default WorkoutDetails