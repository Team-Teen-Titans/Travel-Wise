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

const globalCovidOptions = {
  method: 'GET',
  url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world',
  headers: {
    'x-rapidapi-host': VACCOVID_API_HOST,
    'x-rapidapi-key': process.env.VACCOVID_API_KEY,
  }
};

const flightKey = process.env.FLIGHT_API_KEY;

const getFlightsList = (api) => {
  const flightList = [];

  for (let i = 0; i < 30; i++) {
    const flight = {
      id: api.trips[i].id,
      code: api.trips[i].code,
      legIdOne: api.trips[i].legIds[0],
      legIdTwo: api.trips[i].legIds[1],
      total: api.fares[i].price.totalAmountUsd,
      remainingSeatsCount: api.fares[i].remainingSeatsCount,
      refundable: api.fares[i].refundable,
      exchangeable: api.fares[i].exchangeable,
      handoffUrl: api.fares[i].handoffUrl,
    };

    api.legs.forEach((leg) => {
      if (leg.id === flight.legIdOne) {
        const {
          duration,
          departureAirportCode,
          arrivalAirportCode,
          airlineCodes,
          stopoverAirportCodes,
          stopoversCount,
          departureDateTime,
          arrivalDateTime,
          stopoverDurationMinutes,
          durationMinutes,
          overnight,
          segments,
        } = leg;
        flight.legOneInfo = {
          duration,
          departureAirportCode,
          arrivalAirportCode,
          airlineCodes,
          stopoverAirportCodes,
          stopoversCount,
          departureDateTime,
          arrivalDateTime,
          stopoverDurationMinutes,
          durationMinutes,
          overnight,
          segments,
        };
      } else if (leg.id === flight.legIdTwo) {
        const {
          duration,
          departureAirportCode,
          arrivalAirportCode,
          airlineCodes,
          stopoverAirportCodes,
          stopoversCount,
          departureDateTime,
          arrivalDateTime,
          stopoverDurationMinutes,
          durationMinutes,
          overnight,
          segments,
        } = leg;
        flight.legTwoInfo = {
          duration,
          departureAirportCode,
          arrivalAirportCode,
          airlineCodes,
          stopoverAirportCodes,
          stopoversCount,
          departureDateTime,
          arrivalDateTime,
          stopoverDurationMinutes,
          durationMinutes,
          overnight,
          segments,
        };
      }
    });

    flightList.push(flight);
  }
  return flightList;
};

export {
  VACCOVID_API_HOST,
  VACCINATION_API_HOST,
  vaccinationOptions,
  covidOptions,
  countryCodeToName,
  countryNameToCode,
  flightKey,
  getFlightsList,
  globalCovidOptions
};
