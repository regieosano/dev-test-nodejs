import countries from "../configs/country";
import { Country } from "../types";


let currentCountries = countries;

const updateCountriesList = (updatedList: any) => {
  currentCountries = updatedList
}

/**
 * API to get the countries, sometimes this fails.
 *
 */
export default (): Promise<Array<Country>> =>
  new Promise((resolve, reject) => {
    setTimeout(
      () => (Math.round(Math.random()) === 0 ? resolve(currentCountries) : reject("Resource Failed")),
      100,
    );
 });


/**
 * Methods to Update - Populations and Countries and Delete Countries
 *
 */
 export const UpdatePopulations = (countries: any[]) => {
   countries.map(country => {
    const object = currentCountries.find(c => c.code === country.code);
    if (object) {
      Object.assign(object, {population: country.population});
      updateCountriesList(currentCountries)
    }
   })
   
  
 }


 export const UpdateCountries = (countries: any[]) => {
   countries.map(country => {
     const object = currentCountries.find(c => c.code === country.code);
     if (object) {
      Object.assign(object, {name: country.newName, code: country.  newCode});
      updateCountriesList(currentCountries)
     }
   })
  
  
 }

 export const DeleteCountries = (countries: any[]) => {
  let filteredCountries: any[] = [];
  countries.map(country => {
    filteredCountries = currentCountries.filter(c => c.code !== country.code);
    updateCountriesList(filteredCountries)
  })
 
 
}