const VACCOVID_API_HOST =
  'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com';
const VACCINATION_API_HOST = 'covid-19-world-vaccination-data.p.rapidapi.com';

const vaccinationOptions = {
  method: 'GET',
  url: process.env.VACCINATION_API_ENDPOINT,
  params: { iso: 'USA' },
  headers: {
    'x-rapidapi-host': VACCINATION_API_HOST,
    'x-rapidapi-key': process.env.VACCINATION_API_KEY,
  },
};

const covidOptions = {
  method: 'GET',
  url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries', // example uses Asia only, need to update .env to include different endpoints
  headers: {
    'x-rapidapi-host': VACCOVID_API_HOST,
    'x-rapidapi-key': process.env.VACCOVID_API_KEY,
  },
};

const countryCodeToName = {
  UK: 'United Kingdom',
  USA: 'United States',
};

const countryNameToCode = {
  'United Kingdom': 'UK',
  'United States': 'USA',
};


export {
  VACCOVID_API_HOST,
  VACCINATION_API_HOST,
  vaccinationOptions,
  covidOptions,
  countryCodeToName,
  countryNameToCode,
};
