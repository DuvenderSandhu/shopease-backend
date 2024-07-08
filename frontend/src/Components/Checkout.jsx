import React,{useEffect} from 'react'
import { DatePicker, Space } from 'antd';
import { X } from 'lucide-react'
import { Link, useNavigate, useRouteError } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {useState} from 'react'
import CheckoutSchema from '../../schemas/Checkout'
import actionCreators from '../../state';

export default function Checkout() {
  const onChange = (date, dateString) => {

    if(date){
      const expiry = {
        month: date.$M + 1, // months are zero-based
        year: date.$y
      };
      setExpiry(expiry)
    }
  };
  const [name, setName] = useState("")
  const [card, setCard] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCVC] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPinCode] = useState("")
  const [error, setError] = useState([])
  const products= useSelector(state=>state.addCart)
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const user= useSelector(state=>state.changeUser)
  function ValidateActivation(){
    dispatch(actionCreators.showNotification({type:"error",msg:"Your Account is Deactivate"}))
    dispatch(actionCreators.changeUser({username:"",email:"",token:""}))
    navigate('/signup')
  }
  useEffect(()=>{
    user.token?"":navigate('/signin')
    user.token?user.activationStatus?"":ValidateActivation():""
  },[])
  function ValidateBtn() { 
    
    try {
      let result = CheckoutSchema.parse({ name, card, expiry, cvc, address, city, state, pincode });
      if (result) {
        fetch('http://localhost/api/addorder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            customerName: user.username,
            email: user.email,
            address,
            city,
            state,
            zipCode: pincode,
            paidAmount: products.reduce((total, product) => total + parseFloat(product.price), 0),
            products:products.map(product => ({
              productName: product.name,  // Assuming product name is stored in `name` property
              productColor: product.color ||"Undefined",  // Assuming product color is stored in `color` property
              productSize: product.size,  // Assuming product size is stored in `size` property
              productId: product.id  // Assuming product ID is stored in `id` property
            }))
          })
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('Payment request failed');
            // Dispatch action for failure notification
            // dispatch(actionCreators.showNotification({type: 'alert', msg: "Payment Couldn't Be Done"}));
          }
        })
        .then(data => {
          if (data) {
            console.log(data);
            // Dispatch action for success notification
            dispatch(actionCreators.showNotification({type: 'success', msg: "Payment Done"}));
            navigate('/profile ')
          }
        })
        .catch(error => {
          // If Zod validation fails
          setError(error.issues ? Array.from(error.issues) : []);
          console.error('Validation error:', error);
        });
      }
    } catch (error) {
      // If Zod validation fails
      setError(error.issues ? Array.from(error.issues) : []);
      console.error('Validation error:', error);
    }
  }
  

  let sum = products.length !== 0 ? products.reduce((acc, product) => acc + parseInt(product.price), 0) : 0;

  return (
    <div className="mx-auto my-4 max-w-4xl md:my-6">
      <div className="overflow-hidden  rounded-xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Contact Info */}
          <div className="px-5 py-6 text-gray-900 md:px-8">
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="py-6">
                  <form>
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                      <div>
                        <h3
                          id="contact-info-heading"
                          className="text-lg font-semibold text-gray-900"
                        >
                          Contact information
                        </h3>

                        <div className="mt-4 w-full">
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="name"
                          >
                            Full Name
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            onChange={(e)=>setName(e.target.value)}
                            value={user.username}
                            placeholder="Enter your name"
                            id="name"
                          ></input>
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error.map(e=>e.path[0]=='username'?e.message:"")}</span>
                        </div>
                      </div>
                      <hr className="my-8" />
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">Payment details</h3>

                        <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                          <div className="col-span-3 sm:col-span-4">
                            <label
                              htmlFor="cardNum"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Card number
                            </label>
                            <div className="mt-1">
                              <input
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                            onChange={(e)=>setCard(e.target.value)}
                                placeholder="4242 4242 4242 4242"
                                id="cardNum"
                              ></input>
                              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error.map(e=>e.path[0]=='card'?e.message:"")}</span>
                            </div>
                          </div>
                          <div className="col-span-2 sm:col-span-3">
                            <label
                              htmlFor="expiration-date"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Expiration date (MM/YY)
                            </label>
                            <div className="mt-1">
                            <Space direction="vertical">
    <DatePicker onChange={onChange} picker="month" className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" />
  </Space>
                              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error.map(e=>e.path[0]=='expiry'?e.message:"")}</span>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="cvc"
                              className="block text-sm font-medium text-gray-700"
                            >
                              CVC
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="cvc"
                            onChange={(e)=>setCVC(e.target.value)}
                                id="cvc"
                                autoComplete="csc"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error.map(e=>e.path[0]=='cvc'?e.message:"")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-8" />
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>

                        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Address
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="address"
                                name="address"
                            onChange={(e)=>setAddress(e.target.value)}
                                autoComplete="street-address"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error.map(e=>e.path[0]=='address'?e.message:"")}</span>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              City
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                            onChange={(e)=>setCity(e.target.value)}
                                id="city"
                                name="city"
                                autoComplete="address-level2"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error.map(e=>e.path[0]=='city'?e.message:"")}</span>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium text-gray-700"
                            >
                              State / Province
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="region"
                            onChange={(e)=>setState(e.target.value)}
                                name="region"
                                autoComplete="address-level1"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error.map(e=>e.path[0]=='state'?e.message:"")}</span>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Postal code
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                            onChange={(e)=>setPinCode(e.target.value)}
                                id="postal-code"
                                name="postal-code"
                                autoComplete="postal-code"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error.map(e=>e.path[0]=='pincode'?e.message:"")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-8" />
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">Billing information</h3>

                        <div className="mt-6 flex items-center">
                          <input
                            id="same-as-shipping"
                            name="same-as-shipping"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                          />
                          <div className="ml-2">
                            <label
                              htmlFor="same-as-shipping"
                              className="text-sm font-medium text-gray-900"
                            >
                              Same as shipping information
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                        <button
                          type="button"
                          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                          onClick={ValidateBtn}
                        >
                          Make payment
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Product List */}
          <div className="bg-gray-100 px-5 py-6 md:px-8">
            <div className="flow-root">
              <ul className="-my-7 divide-y divide-gray-200">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-stretch justify-between space-x-5 py-7"
                  >
                    <div className="flex flex-1 items-stretch">
                      <div className="flex-shrink-0">
                        <img
                          className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                          src={product.imageSrc}
                          alt={product.imageSrc}
                        />
                      </div>
                      <div className="ml-5 flex flex-col justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold">{product.name}</p>
                          <p className="mt-1.5 text-sm font-medium text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <p className="mt-4 text-xs font-medium ">x 1</p>
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col items-end justify-between">
                      <p className="text-right text-sm font-bold text-gray-900">{product.price}</p>
                      <button
                        type="button"
                        className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      >
                        <span className="sr-only">Remove</span>
                        <Link to="/cart"><X className="h-5 w-5" /></Link>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="mt-6 border-gray-200" />
            <form action="#" className="mt-6">
              <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                <div className="flex-grow">
                  <input
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter coupon code"
                  />
                </div>
                <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>
            </form>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center justify-between text-gray-600">
                <p className="text-sm font-medium">Sub total</p>
                <p className="text-sm font-medium">₹{sum}</p>
              </li>
              <li className="flex items-center justify-between text-gray-900">
                <p className="text-sm font-medium ">Total</p>
                <p className="text-sm font-bold ">₹{sum}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
