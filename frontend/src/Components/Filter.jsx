import React,{useState,useEffect} from 'react'
import { ChevronDown } from 'lucide-react'
import Shop from '../Components/Shop.jsx'



export default function Filter({products=[],filters=[],cart}) {
  const [activeFilters, setActiveFilters] = useState([])
  // let setCart=cart[1]
  // let cart1=cart[0]
  // cart=cart1
  console.log(cart)
  useEffect(() => {
   console.log(filters)
   let s1= new Set(filters)
   filters=[s1]
   console.log(products)
  }, [])
  return (
    <section className="w-full h-[100vh] ">
      <div className="mx-auto  px-8 py-10 lg:px-10">
        {/* Top */}
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div className="hidden  left-0 top-0 h-[100vh] overflow-y-scroll space-y-6  divide-y lg:col-span-2 lg:block">
            {filters.map((filter) => (
              <div key={filter.id} className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900">{filter.name}</h3>
                <ul className="mt-2">
                  {filter.options.map((option) => (
                    <li key={option.label} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <input
                          id={`${filter.id}-${option.value}`}
                          name={`${filter.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                          onChange={(e)=>{e.target.checked?activeFilters.push(option.value):setActiveFilters(activeFilters.filter((a)=>a!=option.value));console.log(activeFilters);}}
                        />
                        {console.log(activeFilters)}
                        <label
                          htmlFor={`${filter.id}-${option.value}`}
                          className="ml-3 text-sm font-medium text-gray-900"
                        >
                          {option.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="h-[400px] w-full rounded-lg border-2 border-dashed px-2 lg:col-span-10 lg:h-full">
            <Shop products={products} filters={activeFilters}/>
          </div>
        </div>
      </div>
    </section>
  )
}
