import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

export default function LoginForm() {
    const [auth, setAuth] = useAuth(); 

    const navigate = useNavigate();

    // api
    const api = import.meta.env.VITE_REACT_APP_API;
    

    // states
    const [state, setState] = useState({
        usrml: '',
        password: ''
    });

    const { usrml, password } = state;

    function handleInputChange(e) {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    }

    //Login User
    async function loginUser (e) {
        e.preventDefault();

        try {
            const { data } = await axios.post('/login', {
                ...state
            });

            console.log(data);

            if (data?.error) {
                toast.error(data.error,{                   
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        }
                });                
              } else {
                localStorage.setItem('auth', JSON.stringify(data));
                setAuth({ ...auth, user: data.user, token: data.token });
                toast.success('Login Success',{
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      }
                }) 
                navigate('/tasks');
              }
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <form
      onSubmit={loginUser}
      className="h-[250px] flex flex-col gap-12 items-center justify-center"
    >
      <h1 className="text-center font-bold">User Login</h1>

      <div className="space-y-3 text-center w-[550px]">
        {/* Username or Email */}
        <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <svg className="absolute left-7 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="0" x2="12" y2="24" />
            </svg>
            <input
                type="text"
                name="usrml"
                id="usrml"
                value={usrml}
                onChange={handleInputChange}
                placeholder="USERNAME OR EMAIL"
                className='input-style'
            />
        </div>

        {/* Password */}
        <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 11c0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.2-.53 2.27-1.35 2.94M12 11c0-1.66-1.34-3-3-3s-3 1.34-3 3c0 1.2.53 2.27 1.35 2.94M15 12h.01M12 17h0M9 12h.01M12 21v-6m0 0H8.5M12 15h3.5M7 4h10m2 2H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2z" />
            </svg>
            <svg className="absolute left-7 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="0" x2="12" y2="24" />
            </svg>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleInputChange}
            placeholder="******"
            className='input-style'
          />
        </div>
      </div>

      <button className='button-style'>Login</button>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </form>
    

  );
}
