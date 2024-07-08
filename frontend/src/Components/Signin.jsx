import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from "react-router-dom";
import {z} from 'zod'
import { useNavigate } from "react-router-dom";
import actionCreators from '../../state';

import {useDispatch} from 'react-redux'
import LoginSchema from '../../schemas/LoginSchema'
// import actionCreators from '../../state';

export default function SignIn() {
  const navigate=useNavigate()
  const [formdata, setFormdata] = useState({email:"",password:""})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch= useDispatch()

  const [error, setError] = useState([])
  function ValidateBtn(){
    try{
      let result=LoginSchema.parse({email:email,password:password})
      if(result){
        fetch('http://localhost/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email:email,
            password:password,
          })
        })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data)
    if (data.type === 'success') {
      dispatch(actionCreators.showNotification({ type: 'success', msg: data.msg }));
      dispatch(actionCreators.changeUser({ token:data.data.token,username:data.data.username,email:data.data.email,isAdmin:data.data.isAdmin,activationStatus:data.data.activationStatus }));
      console.log("Data here")
      console.log({ token:data.data.token,username:data.data.username,email:data.data.email })
      navigate('/shop')
    } else {
      dispatch(actionCreators.showNotification({ type: 'alert', msg: data.msg }));
      
    }
  })
  .catch(error => {
    dispatch(actionCreators.showNotification({type:'alert',msg:error.msg}))
    console.error('Error:', error);
  });
      }
    }catch(e){
      // console.log(Object.keys(e))
      console.log(e.issues)
      setError(Array.from(e.issues))
      
    }
  }
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      onChange={(e)=>{setEmail(e.target.value)}}
                      autoComplete={'current-password'}
                    ></input>
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error.map(e=>e.path[0]=='email'?e.message:"")}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      {' '}
                      Password{' '}
                    </label>
                    <Link
                      to="/forgetpassword"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      {' '}
                      Forgot password?{' '}
                    </Link>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      onChange={(e)=>{setPassword(e.target.value)}}
                      autoComplete={'current-password'}
                    ></input>
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error.map(e=>e.path[0]=='password'?e.message:"")}</span>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={ValidateBtn}
                  >
                    Get started <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign in with Google
              </button>
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-[#2563EB]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </span>
                Sign in with Facebook
              </button>
            </div>
          </div>
        </div>
        <div className="h-full w-full flex items-center">
          <img
            className="mx-auto h-[90vh] w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}
