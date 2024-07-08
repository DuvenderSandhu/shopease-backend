import { Link } from "react-router-dom";

import React from 'react'

export default function Hero() {
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">

          <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
          Simplify Your Shopping with ShopEase!
          </h1>
          <p className="mt-8 text-lg text-gray-700">
          ShopEase brings convenience to your fingertips, offering a seamless shopping experience tailored to your needs. Discover a world of effortless browsing and quick purchases, all in one place.
          </p>
          <div action="" className="mt-8 flex justify-around  items-start space-x-2">
            <div>
            <Link
            to="/signin"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
           Sign in 
          </Link>
            </div>
            <div>
              <Link
                to="/shop"
                className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                 Let's Shop
              </Link>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
          <img
            className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[90vh] xl:aspect-[16/9]"
            src="https://images.pexels.com/photos/8311902/pexels-photo-8311902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
