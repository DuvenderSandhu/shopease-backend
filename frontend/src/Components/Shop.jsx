import React ,{useState,useEffect}from 'react'
import { Button, Skeleton, Space } from 'antd';
import { useDispatch,useSelector } from 'react-redux'
import { RotatingSquare } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import actionCreators from '../../state'
export default function Shop({products,filters}) {
  const dispatch=useDispatch()
  const cart = useSelector(state => state.addCart)
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false)
  console.log("Cart here")
  console.log(cart)



  return (
    <div className="mx-auto flex w-full h-[100vh] overflow-y-scroll items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4 flex-wrap">
      <Skeleton loading={loading}>
       {visible?<RotatingSquare
        visible={true}
        height="200"
        width="200"
        color="black"
        ariaLabel="rotating-square-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />:""        
       } 
      {products.map((_, i) => (
        <Link to={"/shop/"+_._id} key={i} className="rounded-md border cursor-pointer ">
          <img
            src={_.img}
            alt={_.name}
            className="aspect-[14/9] w-full rounded-md md:aspect-auto md:h-[250px] lg:h-[200px]"
          />
          <div className="p-4">
            <h1 className="inline-flex items-center text-lg font-semibold">{_.name}</h1>
            <p className="mt-3 text-sm text-gray-600">
              {_.description.substring(0,50)}...
            </p>
            <div className="mt-4">
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                #Sneakers
              </span>
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                #Nike
              </span>
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                #Airmax
              </span>
            </div>
            <div className="mt-3 flex items-center space-x-2">
              <span className="block text-sm font-semibold">Colors : </span>
              {
                _.availableColors.map((e)=> <span key={e} className={`block h-4 w-4 rounded-full border-2 border-gray-300 ${e==="White"||e==="Black"?`bg-${e.toLowerCase()}`:`bg-${e.toLowerCase()}-700`}`}></span>
                )
              }
            </div>
            <div className="mt-5 flex items-center space-x-2">
              <span className="block text-sm font-semibold">Size : </span>
              {
                _.sizes.map((e)=><span key={e} className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                {e}
              </span>
                )
              } 
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
           
            >
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
      </Skeleton>
    </div>
  )
}
