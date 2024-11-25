import { promises as fs } from 'fs';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/app/data.json' , 'utf8')
  const countries = JSON.parse(file)
  return (
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
      <main className='dark bg-background  pt-10'>
          <div className='container mx-auto'>
            <div className='flex justify-between font-Nunito'>
              <div className='relative w-full'>
                <input type="text" className='inputBack px-12 py-4 rounded w-2/6 text-sm outline-none' placeholder='Search for a country...'/>
                <div className='absolute inset-y-3 left-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-text">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
              </div>
              <select name="region" id="region" className='select text-text w-1/6 px-4 rounded'>
                <option value="" className='hidden'>Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
          </div>
      </main>
    </>
  );
}
