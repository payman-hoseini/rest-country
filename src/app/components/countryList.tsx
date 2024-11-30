'use client'
import Country from "./country";
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from "react";
import { separate } from "./shared/seprate";

export default function CountryList({ countries } : {countries : Country[]}){
    const inputRef = useRef(null)
    const [inputCountryName , setInputCountryName] = useState("")
    let findCountry : Country | undefined
    function inputCountryNameHandler(inputCountry : React.ChangeEvent<HTMLInputElement>){
        setInputCountryName(inputCountry.target.value)
    }
    findCountry = countries.find((country : Country) =>{
        if(country.name.toUpperCase() == (inputCountryName.toUpperCase())){
            // console.log(inputCountryName)
            return country
        }
        
    })  
    
    
    return(
        <>
            <div className='flex justify-between font-Nunito'>
              <div className='relative w-full'>
                <input onChange={inputCountryNameHandler} ref={inputRef} type="text" className='inputBack px-12 py-4 rounded w-2/6 text-sm outline-none' placeholder='Search for a country...'/>
                <div className='absolute inset-y-3 left-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-text">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
              </div>
              <select name="region" id="region" className='select text-text w-1/6 px-4 rounded outline-none'>
                <option value="" className='hidden'>Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
            <div className='bg-background mt-10 grid grid-cols-4 gap-16 font-Nunito'>
              {
                inputCountryName == "" ?
                countries.map((country : Country) => (
                  <Link href={`/${country.name}`} key={country.name} className='bg-elements rounded drop-shadow-md flex flex-col hover:drop-shadow-2xl'>
                    <div className='w-full'>
                      <Image src={country.flags.svg} alt={country.name} width={340} height={100} className='rounded-t object-cover xl:h-[200px] lg:h-[150px]'/>
                    </div>
                    <div className='pb-5 px-5 text-text space-y-1'>
                      <p className='font-semibold py-5 text-lg'>{country.name}</p>
                      <p className='font-semibold'>Population:<span className='font-light'> {separate(country.population)}</span></p>
                      <p className='font-semibold'>Region:<span className='font-light'> {country.region}</span></p>
                      <p className='font-semibold'>Capital:<span className='font-light'> {country.capital==undefined ? "No Capital"  : country.capital}</span></p>
                    </div>
                  </Link>
                ))
                :
                findCountry != undefined ?
                    <Link href={`/${findCountry?.name}`} key={findCountry?.name} className='bg-elements rounded drop-shadow-md flex flex-col hover:drop-shadow-2xl'>
                        <div className='w-full'>
                        <Image src={findCountry?.flags.svg} alt={findCountry?.name} width={340} height={100} className='rounded-t object-cover xl:h-[200px] lg:h-[150px]'/>
                        </div>
                        <div className='pb-5 px-5 text-text space-y-1'>
                        <p className='font-semibold py-5 text-lg'>{findCountry?.name}</p>
                        <p className='font-semibold'>Population:<span className='font-light'> {separate(findCountry?.population)}</span></p>
                        <p className='font-semibold'>Region:<span className='font-light'> {findCountry?.region}</span></p>
                        <p className='font-semibold'>Capital:<span className='font-light'> {findCountry?.capital==undefined ? "No Capital"  : findCountry?.capital}</span></p>
                        </div>
                    </Link>
                :
                <p className="font-black text-text text-center text-4xl text-nowrap">Country Not found</p>
              }
            </div>
        </>
    )
}