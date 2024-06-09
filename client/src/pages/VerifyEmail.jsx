import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { MdMarkEmailUnread } from "react-icons/md";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LuPartyPopper } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";


export default function VerifyEmail() {
    const [auth, setAuth] = useAuth();
    const { width, height } = useWindowSize();
    const [count, setCount] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
      if(auth.user?.isActive)
      {
        toast.success("Email Verification Success", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        const interval = setInterval(() => {
          setCount((currentCount) => --currentCount);
        }, 1000);

        count === 0 && navigate('/tasks');

        return clearInterval(interval);
      }
    }, [count])
    

    useEffect(() => {

    })

    // * EMAIL
    const email = auth?.user?.email;
    console.log(email)

    async function resendEmail() {
      try {
        const { data } = await axios.get(`resend-verification?email=${email}`);

        if (data?.message) {
          toast.error(data.message,{                   
              style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                  }
          });                
        } else {
          localStorage.setItem('auth', JSON.stringify(data));
          setAuth({ ...auth, user: data.user, token: data.token });
          toast.success('Email Sent',{
              style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                }
          }) 
        }
      } catch (err) {
        console.error(`Error re-sending verification: ${err}`)
      }
    }

  return (
    <>
        <div className='bg-[#2b2839] p-5 rounded-md text-white'>
          {auth?.user?.isActive === true ? (
            <>
              <Confetti 
                width={width}
                height={height}
                numberOfPieces={200}
              />
              <div>
                <LuPartyPopper size={100} className='mx-auto my-5'/>
              </div>
              <div className='text-center space-y-5 pt-6'>
                  <div className='flex items-center gap-2 text-green-500 p-0.5 px-1 rounded-sm'>
                    <FaCheckCircle className='text-green-500'/>
                    <p>
                      Email Verification Successful!
                    </p>
                  </div>
                  <div className='bg-green-500 py-2 px-3 w-full rounded-sm'>
                    Redirecting you to login in {count}
                  </div>
                  <p onClick={() => navigate('/login')} className='text-xs cursor-pointer hover:underline'>return to login</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <MdMarkEmailUnread size={100} className='mx-auto my-4'/>
              </div>
              <div className='text-center'>
                <p className='text-[30px] font-black'>Verify your email address</p>
                <p className='py-6'>We have sent a verification link to <a href="http://gmail.com" className='hover:underline text-yellow-600'>{auth?.user?.email}</a> </p>
                <p className='font-thin'>Click on the link to complete the verification process.</p>
                <p className='font-thin'>You might also need to <span className='font-bold'>check your spam folder.</span></p>
                <button onClick={resendEmail} className='button-style p-4 mx-auto flex mt-5'>Resend Email</button>
              </div>        
            </>
          )}
        </div>
      {/* <div>Please check your email <a className='text-white hover:underline' href='https://mail.google.com/'>{auth.user.newUser.email}</a> to verify your account</div> */}
    </>
  )
}
