import React, { useState } from 'react';
function Category() {
  const [list,setlist]=useState([
    {
      category:"Electronics",
      img:"https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      slug:"/ecommerce"
    },
    {
      category:"Men's Fasion",
      img:"https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      slug:"/ecommerce"
    },
    {
      category:"Grocery",
      img:"https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      slug:"/grocery"
    },
    {
      category: "Women's Fashion",
      img: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      slug: "/womens-fashion"
    },
    {
      category: "Home Appliances",
      img: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      slug: "/home-appliances"
    },
    {
      category: "Books",
      img: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      slug: "/books"
    }
    
  ])
  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      <h1 className='text-2xl font-bold underline'>Categories</h1>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {list.map((_, i) => (
          <div key={i} className="mx-auto w-[300px] rounded-md border cursor-pointer">
            <img
              src={_.img}
              alt="Laptop"
              className="h-[200px] w-full rounded-t-md object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold">{_.category}</h1>
             
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
