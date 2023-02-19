
import { useState } from "react"
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <div className="flex justify-center">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 signup max-w-md w-full" onSubmit={handleSubmit}>
    <h3 className="text-2xl font-bold mb-6">Sign Up</h3>    
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
        Email address:
        </label>
        <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        id="email"
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        />
    </div>
    
    <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
        Password:
        </label>
        <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
        id="password"
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        />
    </div>

    <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isLoading}>
        Sign up
        </button>
    </div>
    {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default Signup;