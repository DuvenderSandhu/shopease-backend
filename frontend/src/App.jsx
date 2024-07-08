import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import Navbar from '../src/Components/Navbar.jsx';
import Hero from '../src/Components/Hero.jsx';
import Signup from '../src/Components/Signup.jsx';
import Signin from '../src/Components/Signin.jsx';
import About from '../src/Components/About.jsx';
import Category from '../src/Components/Category.jsx';
import Footer from '../src/Components/Footer.jsx';
import Filter from '../src/Components/Filter.jsx';
import Faq from './Components/Faq.jsx';
import Shop from './Components/Shop.jsx';
import AdminOrder from './Components/AdminOrder.jsx';
import AdminProduct from './Components/adminProduct.jsx';
import AdminUser from './Components/adminUser.jsx';
import User from './Components/User.jsx';
import Item from './Components/Item.jsx';
import Error from './Components/Error.jsx';
import Cart from './Components/Cart.jsx';
import TableFormat from './Components/Table.jsx';
import Statistics from './Components/Statistics';
import './App.css';
import Checkout from './Components/Checkout.jsx';
import { useState ,useEffect} from 'react';
import { store } from '../state/store.js';
import { Provider } from 'react-redux';
import OrderManagement from './Components/Order.jsx';
import AdminDashboard from './Components/Admin.jsx';
import actionCreators from '../state/index.js';
import Profile from './Components/Profile.jsx';
import AddProduct from './Components/AddProduct.jsx';
import EditProduct from './Components/EditProduct.jsx';
import FakePaymentApp from './Components/FakePayment.jsx';
import { RotatingSquare } from 'react-loader-spinner'
import UpdateProduct from './Components/UpdateProduct.jsx';
import DeleteProduct from './Components/DeleteProduct.jsx';
import DeleteUser from './Components/DeleteUser.jsx';
import RaiseQuery from './Components/RaiseQuery.jsx';
import ForgetPassword from './Components/ForgetPassword.jsx';




function App() {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState([])
  
  useEffect(()=>{
    fetch(`http://localhost/api/products`).then((e)=>e.json()).then(data=>setProducts(data.products))
    setFilters([
        {
          id: 'category',
          name: 'Category',
          options: Array.from(new Set(products.flatMap((product) => ({ value: product.category, label: product.category.toUpperCase() }))))
        },
        {
          id: 'color',
          name: 'Color',
          options: Array.from(new Set(products.flatMap((product) => product.availableColors.map((color) => color.toLowerCase())))).map((color) => ({ value: color, label: color.toUpperCase() })),
        },
        
        {
          id: 'sizes',
          name: 'Sizes',
          options:  Array.from(new Set(products.flatMap((product) => product.sizes.map((size) => size.toLowerCase())))).map((size) => ({ value: size, label: size.toUpperCase() })),
            // {value:"yellow",label:"Blue"}
        
        },
      ]
    )
  },[])

  console.log(products)
  return (
    <Provider store={store}>
<BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Hero /><Category /><Faq/></>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/order" element={<OrderManagement />} />
        <Route path="/user" element={<User />} />
        <Route path="/updateproduct" element={<UpdateProduct />} />
        <Route path="/deleteproduct" element={<DeleteProduct />} />
        <Route path="/deleteuser" element={<DeleteUser />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}

        <Route path="/profile" element={<Profile />} />
        <Route path="/raisequery" element={<RaiseQuery />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/adminorder" element={<AdminOrder />} />
        <Route path="/adminproduct" element={<AdminProduct />} />
        <Route path="/adminuser" element={<AdminUser />} />
        <Route path="/shop" element={<Filter products={products} filters={filters}/>}  cart={"HI"}/> {/* ! Endpoint is shop and Component is Filter */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart cart={[cart,setCart]}/>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/table" element={<TableFormat />} />
        <Route path="/shop/:productID" element={<Item products={products} cart={[cart,setCart]}/>} />
        <Route path="/admin" element={<Statistics/>} />
        <Route path="/addproduct" element={<AddProduct/>} />
        <Route path="/editproduct" element={<EditProduct/>} />
        <Route path="/payment" element={<FakePaymentApp/>} />
        <Route path="/*" element={<Error />} />
      </Routes>
      
      <Footer/>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
