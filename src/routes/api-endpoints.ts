import express from "express";
import country, {UpdatePopulations, UpdateCountries, DeleteCountries} from "../api/country";
import auth from "../api/authenticate";

const apiRoutes = express.Router({ strict: true });


/**
 * List Countries
 *
 */
apiRoutes.get("/countries", async (req, res) => {
    try {
        const listOfCountries = await country();
        res.status(200).send(listOfCountries)
    } catch (err) {
        res.status(400).send(err)
    }   
})


/**
 * List Countries by Population (highest to lowest)
 *
 */
apiRoutes.get("/countries-populations", async (req, res) => {
    try {
        let countriesWithPopulation: any[] = [];
        let countriesWithOutPopulation: any[] = [];
        const listOfCountries = await country();
        listOfCountries.map(country => {
            if (country.hasOwnProperty("population")) {
               countriesWithPopulation.push(country)
            } else {
               countriesWithOutPopulation.push(country) 
            }
        })
        
        countriesWithPopulation.sort((a, b) => {
            return b.population - a.population
        })

        const sortedListOfCountries = countriesWithPopulation.concat(countriesWithOutPopulation)
     
        res.status(200).send(sortedListOfCountries)
    } catch (err) {
        res.status(400).send(err)
    }   
})


/**
 * Update Populations
 * 
 *     body - array of (sample) {
                                  "code": "alb",
                                  "population": 20000000
                                }
 *  must be with authentication credentials in headers
 */
apiRoutes.put("/populations", async (req, res) => {
    try {
       const username = String(req.headers.username)
       const password = String(req.headers.password)
       const isAuthenticated = await auth(username, password)
       if (isAuthenticated) {
          const countries = req.body 
          UpdatePopulations(countries);
          res.status(200).send("Population(s) Updated")
       } else {
          res.status(401).send("Unauthorized")
       }
      
    } catch (err) {
        res.status(400).send(err)
    }   
})


/**
 * Update Countries
 * 
 *    body - array of (sample) {
                                  "code": "alb",
                                  "newName": "ALBA-ALBA",
                                  "newCode": "alb2"
                               }
 * 
 *  must be with authentication credentials in headers
 */
apiRoutes.put("/countries", async (req, res) => {
    try {
       const username = String(req.headers.username)
       const password = String(req.headers.password)
       const isAuthenticated = await auth(username, password)
       if (isAuthenticated) {
          const countries = req.body 
          UpdateCountries(countries);
          res.status(200).send("Countrie(s) Updated")
       } else {
          res.status(401).send("Unauthorized")
       }
      
    } catch (err) {
        res.status(400).send(err)
    }   
})


/**
 * Delete Countries
 * 
 *    body - array of (sample) {
                                  "code": "alb",
                               }
 * 
 *  must be with authentication credentials in headers
 */
apiRoutes.delete("/countries", async (req, res) => {
    try {
        const username = String(req.headers.username)
        const password = String(req.headers.password)
        const isAuthenticated = await auth(username, password)
        if (isAuthenticated) {
            const countries = req.body 
            DeleteCountries(countries);
            res.status(200).send("Countrie(s) Deleted")
        } else {
            res.status(401).send("Unauthorized")
        }
      
    } catch (err) {
        res.status(400).send(err)
    }   
})

export default apiRoutes;