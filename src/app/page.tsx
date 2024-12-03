import { promises as fs } from 'fs';
import Country from './components/country';

import CountryList from './components/countryList';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/app/data.json' , 'utf8')
  const countries : Country[] = JSON.parse(file)
  return (
    <>
      <main className=' bg-background  pt-10'>
          <div className='container mx-auto'>
            <CountryList countries={countries}/>
          </div>
      </main>
    </>
  );
}
