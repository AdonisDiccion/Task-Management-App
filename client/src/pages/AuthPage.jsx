import { useState } from 'react';
import bg from '../assets/background/bg.png';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function LoginPage() {
  const buttonStyle ='bg-gradient-to-r from-blueGrad via-blueGrad to-violetGrad py-1 px-3 rounded-full text-sm'
  const [openForm, setOpenForm] = useState(true)

  return (
    <>
      <div className='w-[650px] flex flex-col items-center justify-center mx-auto font-JetBrains shadow-2xl hover:shadow-gray-600'>
        
        <div className='w-full'>
          <img src={bg} alt='img' className='object-cover h-[300px] w-full rounded-t-md' />
        </div>

        
        <div className='bg-[#2d3e50] text-white w-full rounded-b-md py-5'>
          
          <div className='flex justify-end w-[550px] mx-auto'>
            <button className={`${buttonStyle}`} onClick={() => setOpenForm(!openForm)}>{openForm ? 
          'Register >' : 'Login >'}</button>
          </div>
          
          {/* LOGIN FORM & REGISTRATION FORM */}
          {openForm ? <LoginForm /> : <RegisterForm />}
              
        </div>
      </div>
    </>
  );
}
