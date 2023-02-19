import { useState } from "react";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext();
  
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
  
    const handleSubmit = async (e) => {
      e.preventDefault()

      if (!user) {
        setError('You must be logged in')
        return 
      }
  
      const workout = {title, load, reps}
      
      const response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
  
      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);

      }
      if (response.ok) {
        setError(null)
        setTitle('')
        setLoad('')
        setReps('')
        setEmptyFields([]);
        dispatch({type: 'CREATE_WORKOUT', payload: json})
      }
  
    }
  
    return (
      <form className="mt-3" onSubmit={handleSubmit}> 
        <h3 className="text-sky-600 font-semibold text-lg">Add a New Workout</h3>

        <div>
          <label>Excersize Title:</label>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
            className={ emptyFields.includes('title') ? 'error' : 'my-1 rounded-md'}
          />
        </div>        

        <div>
          <label>Load (in kg):</label>
          <input 
            type="number" 
            onChange={(e) => setLoad(e.target.value)} 
            value={load}
            className={ emptyFields.includes('load') ? 'error' : 'my-1 rounded-md'}
          />
        </div>        
  
        <div>
          <label>Number of Reps:</label>
          <input 
            type="number" 
            onChange={(e) => setReps(e.target.value)} 
            value={reps} 
            className={ emptyFields.includes('reps') ? 'error' : 'my-1 rounded-md'}
          />
        </div>        
  
        <button className="bg-sky-600 text-white p-2 rounded-lg mt-2">Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    )
  }
  
  export default WorkoutForm