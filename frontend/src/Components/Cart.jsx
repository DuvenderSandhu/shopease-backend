import React, { useEffect ,useState} from 'react'
import { Trash, Heart } from 'lucide-react'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import actionCreators from '../../state'

// const products = [
//   {
//     id: 1,
//     name: 'Nike Air Force 1 07 LV8',
//     href: '#',
//     price: '₹47,199',
//     originalPrice: '₹48,900',
//     discount: '5% Off',
//     color: 'Orange',
//     size: '8 UK',
//     imageSrc:
//       'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
//   },
//   {
//     id: 2,
//     name: 'Nike Blazer Low 77 SE',
//     href: '#',
//     price: '₹1,549',
//     originalPrice: '₹2,499',
//     discount: '38% off',
//     color: 'White',
//     leadTime: '3-4 weeks',
//     size: '8 UK',
//     imageSrc:
//       'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png',
//   },
//   {
//     id: 3,
//     name: 'Nike Air Max 90',
//     href: '#',
//     price: '₹2219 ',
//     originalPrice: '₹999',
//     discount: '78% off',
//     color: 'Black',
//     imageSrc:
//       'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png',
//   },
// ]


export default function Cart({cart}) {
  let products=useSelector(state=>state.addCart)
  const [reload,SetReload]= useState(false)
  console.log(products)
  // useEffect(()=>products=useSelector(state=>state.addCart),[products])
  // const NotificationState=useSelector(state=>state.showNotification)
  const dispatch = useDispatch()
  let sum = products.length !== 0 ? products.reduce((acc, product) => acc + parseInt(product.price), 0) : 0;
  async function RemovefromCart(id){
    console.log("TO DO ")
  
  }
  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <h2 className="text-3xl font-bold">Your cart</h2>
      {products.length !=0?<ul className="flex flex-col divide-y divide-gray-200">
        {products.map((product) => (
          <div to={"/shop/"+product.id} key={product.id} className="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                src={product.imageSrc}
                alt={product.name}
              />
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">{product.name}</h3>
                    <p className="text-sm">{product.color}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{product.price}</p>
                  </div>
                </div>
                <div className="flex divide-x text-sm">
                  <button type="button" onClick={()=>RemovefromCart(product.id)} className="flex items-center space-x-2 px-2 py-1 pl-0">
                    <Trash size={16} />
                    <span>Remove</span>
                  </button>
                  <button type="button" className="flex items-center space-x-2 px-2 py-1">
                    <Heart size={16} />
                    <span>Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>:<div><h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
              Your Cart Seems to be Empty
            </h1>
            <p className="mt-4 text-gray-500">
              Kindly Add Some Products to cart
            </p></div>}
      <div className="space-y-1 text-right">
      {products.length!=0?
        <p>
          Total amount:
          <span className="font-semibold"> ₹{sum}</span>
        </p>:""}
      </div>
      <div className="flex justify-end space-x-4">
        <Link 
        to="/shop"
          type="button"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Back to shop
        </Link>
        {products.length!=0?<Link
            to="/checkout"
          type="button"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Checkout
        </Link>:""}
      </div>
    </div>
  )
}
