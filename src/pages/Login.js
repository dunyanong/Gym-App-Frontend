import { useState } from "react";
 import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password);
  }

  return (
    <div className="flex justify-center">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 login max-w-md w-full" onSubmit={handleSubmit}>

      <h3 className="text-2xl font-bold mb-6">Log In</h3>
      
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
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
          id="password"
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
      </div>
  
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isLoading}>
          Log in
        </button>
        {error && <div className="bg-red-500">{error}</div>}
      </div>
    </form>
    </div>
  );
  
}

export default Login;