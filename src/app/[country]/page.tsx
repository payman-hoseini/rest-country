import { promises as fs } from 'fs';
import Country from '../components/country';
import Link from 'next/link';
import Image from 'next/image';

export default async function CountryPage({ params } : { params : Promise<{ country: string }> }){ 
     const file = await fs.readFile(process.cwd() + '/src/app/data.json' , 'utf8')
     const countrieslist = JSON.parse(file)

     let countryNameParam = decodeURI((await params).country)
     // countryNameParam = countryNameParam.replace("%20" , " ")
     const countryInfo : Country =  countrieslist.find(( country : Country ) =>{
          if(country.name == countryNameParam){
               return country
          }
     })
     let borderCountry : Country[]  = [];
     if(Array.isArray(countryInfo?.borders)){
          for( let i =0 ; i< countryInfo?.borders.length ; i++){
               borderCountry.push(countrieslist.find(( country : Country ) => {
                    if(country.alpha3Code == countryInfo.borders[i]){
                         return country.name
                    }
               })) 
          }
     }
     console.log(borderCountry)
     return(
          <>
               <main className='bg-background h-screen'>
                    <div className='container mx-auto pt-10'>
                         <Link href='/' className='bg-elements inline-block px-8 py-[10px] rounded drop-shadow-md'>
                              <div className='flex items-center gap-2 font-Nunito text-sm'>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 stroke-text">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                   </svg>
                                   <p className='text-text'>Back</p>
                              </div>
                         </Link>
                         <div className='mt-16 flex items-center'>
                              <div>
                                   <Image src={countryInfo?.flags?.svg} alt={countryInfo?.name} width={600} height={500} className='object-cover'/>
                              </div>
                              <div className='ml-36 font-Nunito text-text'>
                                   <p className='text-text font-bold text-3xl'>{countryInfo?.name}</p>
                                   <div className='mt-8 font-semibold flex'>
                                        <div className='space-y-2'>
                                             <p>Native Name: <span className='font-light'>{countryInfo?.nativeName}</span></p>
                                             <p>Population: <span className='font-light'>{countryInfo?.population}</span></p>
                                             <p>Region: <span className='font-light'>{countryInfo?.region}</span></p>
                                             <p>Sub Region: <span className='font-light'>{countryInfo?.subregion}</span></p>
                                             <p>Capital: <span className='font-light'>{countryInfo.capital==undefined ? "No Capital" : countryInfo?.capital}</span></p>
                                        </div>
                                        <div className='ml-36 space-y-2'>
                                             <p>Top Level Domain: <span className='font-light'>{countryInfo?.topLevelDomain[0]}</span></p>
                                             <p>Currencies: <span className='font-light'>{!Array.isArray(countryInfo?.currencies) ? "no" : countryInfo.currencies?.map(curr => curr?.name)}</span></p>
                                             <div className='flex'>Languages: <span className='font-light flex space-x-1'>{countryInfo?.languages?.map(lang => <p key={lang.name}>{lang.name}</p>)}</span></div>
                                        </div>
                                   </div>
                                   <div className='mt-16 flex items-center space-x-2'>
                                        <p className='font-semibold text-nowrap'>Border Countries:</p>
                                        <div className='flex space-x-3'>
                                             {
                                                  Array.isArray(countryInfo?.borders) ?  borderCountry.map(border => <p className='bg-elements px-5 py-1 text-sm rounded shadow text-nowrap' key={border.alpha3Code}>{border.name}</p>)  : <p className='bg-elements px-5 py-1 text-sm rounded shadow'>No Country</p>
                                                  // countryInfo.borders.map(border => <p className='bg-elements px-5 py-1 text-sm rounded shadow' key={border}>{border}</p>)
                                             }
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </main>
          </>
     )
}