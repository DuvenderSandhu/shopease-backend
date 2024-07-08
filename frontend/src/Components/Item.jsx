import React,{useState,useEffect} from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import actionCreators from '../../state';
import { RotatingSquare } from 'react-loader-spinner'
import { Rate } from 'antd';
import Comment from './Comment';


export default function Item({ products }) {
  const [SelectedColor, setColor] = useState("")
  const [size, setSize] = useState("")
  const [visible, setVisible] = useState(false)

  const [product, setProduct] = useState({
    name:"Name",
    slug:"slug",
    price:"price",
    id:"id",
    originalPrice: "price",
      imageSrc: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
      discount:  0,
      sizes: ["XL"],
      stars:5,
      availableColors:["WHITE"],
  })
  const navigate= useNavigate()
  let dispatch = useDispatch();
  let cart = useSelector(state => state.addCart);
  let { productID } = useParams();
  useEffect(()=>{
    let a= fetch(`http://localhost/api/${productID}`).then(res=>res.json()).then(data=>setProduct(data.product));

    console.log(a)
    // !a?navigate('/product-not-found'):setProduct(a)
    
  },[])
  
  function AddtoCart(product) {
    console.log(product)
    let obj = {
      id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.price,
      color: SelectedColor || product.availableColors[0],
      imageSrc: product.img,
      discount: product.discount || 0,
      size: size|| product.sizes[0]
    };
  console.log(obj)
    // Dispatch the action to add the item to the cart
    dispatch(actionCreators.addCart(obj));
    dispatch(actionCreators.showNotification({type:'success',msg:"Product Added to Cart"}));
  }

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">

      {product.name==="Name"?<div className="flex justify-center items-center"><RotatingSquare
        visible={true}
        height="200"
        width="200"
        color="black"
        ariaLabel="rotating-square-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /></div>: <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
        <img
          alt={product.name}
          className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
          src={product.img } // Use the actual image source here
        />
        <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
          <h2 className="text-sm font-semibold tracking-widest text-gray-500">{product.brand}</h2>
          <h1 className="my-4 text-3xl font-semibold text-black">{product.name}</h1>
          <div className="my-4 flex items-center">
            <span className="flex items-center space-x-1">
            <Rate allowHalf={true} defaultValue={parseInt(product.stars)} disabled={true}/>
              <span className="ml-3 inline-block text-xs font-semibold">{product.stars} Stars</span>
            </span>
          </div>
          <p className="leading-relaxed">
            {product.description}
          </p>
          <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
            <div className="flex items-center">
              <span className="mr-3 text-sm font-semibold">Color</span>
              {product.availableColors.map((color, index) => {
console.log("Color:", color);
return (
  <button
    title={color}
    onClick={() => setColor(color)}
    key={index}
    className={`h-6 w-6 rounded-full border-2 ${
      SelectedColor === color ? 'border-gray-500' : ''
    } ${color.toLowerCase() === 'white' || color.toLowerCase() === 'black'
      ? `bg-${color.toLowerCase()}`
      : `bg-${color.toLowerCase()}-700`}
    `}
  ></button>
);
})}
            </div>
            <div className="ml-auto flex items-center">
              <span className="mr-3 text-sm font-semibold">Size</span>
              <div className="relative">
                <select onChange={(e)=>{setSize(e.target.value)}} className="appearance-none rounded border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black">
                  {product.sizes.map((size, index) => {return(
                    
                    <option key={index}>{size}</option>
                  )})}
                  {}
                </select>
                <span className="pointer-events-none absolute right-0 top-0 flex h-full w-10 items-center justify-center text-center text-gray-600">
                  <ChevronDown size={16} />
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="title-font text-xl font-bold text-gray-900">{product.price}</span>
            <button
              type="button"
              onClick={() => AddtoCart(product)}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <Comment/>  
      </div>     
       } 

        
      </div>
    </section>
  );
}
