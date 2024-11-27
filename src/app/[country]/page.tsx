import { promises as fs } from 'fs';
import Country from '../components/country';
import Link from 'next/link';
import Image from 'next/image';

export default async function CountryPage({ params } : { params : Promise<{ country: string }> }){ 
     const file = await fs.readFile(process.cwd() + '/src/app/data.json' , 'utf8')
     const countrieslist = JSON.parse(file)

     const countryNameParam = (await params).country
     const countryInfo : Country =  countrieslist.find(( country : Country ) =>{
          if(country.name == countryNameParam){
               return country
          }
     })
     return(
          <>
               <div className="dark bg-elements font-Nunito py-5 drop-shadow-md">
                    <div className='container mx-auto flex justify-between items-centerd'>
                         <p className='font-black text-xl text-text'>Where in the world?</p>
                         <div className='flex items-center gap-3'>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-text fill-text">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                         </svg>
                         <button className='text-text font-semibold'>Dark Mode</button>
                         </div>
                    </div>
               </div>
               <main className='dark bg-background h-screen'>
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
                                   <Image src={countryInfo.flags.svg || countryInfo.flags.png} alt={countryInfo.name} width={600} height={500}/>
                              </div>
                              <div className='ml-36 font-Nunito text-text'>
                                   <p className='text-text font-bold text-3xl'>{countryInfo.name}</p>
                                   <div className='mt-8 font-semibold flex'>
                                        <div className='space-y-2'>
                                             <p>Native Name: <span className='font-light'>{countryInfo.nativeName}</span></p>
                                             <p>Population: <span className='font-light'>{countryInfo.population}</span></p>
                                             <p>Region: <span className='font-light'>{countryInfo.region}</span></p>
                                             <p>Sub Region: <span className='font-light'>{countryInfo.subregion}</span></p>
                                             <p>Capital: <span className='font-light'>{countryInfo.capital}</span></p>
                                        </div>
                                        <div className='ml-36 space-y-2'>
                                             <p>Top Level Domain: <span className='font-light'>{countryInfo.topLevelDomain[0]}</span></p>
                                             <p>Currencies: <span className='font-light'>{countryInfo.currencies.map(curr => curr.name)}</span></p>
                                             <div className='flex'>Languages: <span className='font-light flex space-x-1'>{countryInfo.languages.map(lang => <p key={lang.name}>{lang.name}</p>)}</span></div>
                                        </div>
                                   </div>
                                   <div className='mt-16 flex items-center space-x-2'>
                                        <p>Border Countries:</p>
                                        <div className='flex space-x-3'>
                                             {
                                                  countryInfo.borders.map(border => <p className='bg-elements px-5 py-1 text-sm rounded' key={border}>{border}</p>)
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