import React from 'react'
import google from '../../assets/googleLogo1.png';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useForm, ValidationError } from '@formspree/react';
function SignedOut() {
    //form
    const [state, handleSubmit] = useForm("mkgwnpgd");
    if (state.succeeded) {
      alert("Thanks for joining! You will receive a mail within 12 hours");
      
        
        <div>
          <p className='text-4xl'></p>
          <p className='text-lg text-gray-400 my-3'>Thanks for joining! You will receive a mail within 12 hours</p>
          <p className='text-lg text-gray-200 my-10'>If Mail is already received then sign in and use the app for free</p>
          <button id="signIn" className='shadow-lg shadow-blue-500/50 flex justify-center items-center px-2 mx-auto' onClick={() => googleSignIn() }>
        <img src={google} alt="g" className='h-8 w-8 mx-3' /> Sign in with Google</button>
          
        </div>;
    }

    //sign in 
    const supabase = useSupabaseClient(); // talk to supabase
    async function googleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            scopes: 'https://www.googleapis.com/auth/calendar',
          },
        });
        if (error) {
          alert("Error logging in to Google provider with supabase");
          console.log(error);
        }
      }

  return (
      <div>
        <h1>Join the WaitList:</h1>
        <p className='text-md text-gray-400 my-3'>You will receive a mail within 12 hours once you are allowed to use this app</p>
        <form onSubmit={handleSubmit} className='flex justify-center items-center gap-5 mb-16'>
          
          <input
            id="email"
            type="email" 
            name="email"
            placeholder='Enter your email'
            className='text-xl p-2 rounded my-3 shadow-sm  shadow-green-500/25 w-80'
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
          />
          
          <button type="submit" disabled={state.submitting} className='shadow-md shadow-green-500/25'>
            Submit
          </button>
        </form>
        
        <h2 className='text-2xl font-semibold my-5'>Once verified You can sign in from the link below:</h2>
        <button id="signIn" className='shadow-lg shadow-blue-500/50 flex justify-center items-center px-2 mx-auto' onClick={() => googleSignIn() }>
        <img src={google} alt="g" className='h-8 w-8 mx-3' /> Sign in with Google</button>
      </div>
      
      

  )
}

export default SignedOut
