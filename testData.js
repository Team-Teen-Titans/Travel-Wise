const apiQuery =
  "https://api.flightapi.io/roundtrip/61e77e0013b15b74ee7b9a23/LAX/SEA/2022-02-10/2022-02-17/1/0/0/Economy/USD";

const data = {
  legs: [],
  tags: [],
  search: {
    id: "6b407f45ed6a0fd7msr",
    cabin: "economy",
    adultsCount: 1,
    childrenCount: 0,
    infantsCount: 0,
    siteCode: "US",
    currencyCode: "USD",
    locale: "en",
    deviceType: "desktop",
    appType: "WEB_APP",
    createdAt: "2022-01-20T02:05:34.665Z",
    key: "[LAX:SEA:2022-02-10-SEA:LAX:2022-02-17]~1~0~0~US~economy~desktop~WEB_APP",
    userCountryCode: "IT",
    legs: [
      {
        id: "LAX:SEA:2022-02-10",
        outboundDate: "2022-02-10",
        departureAirportCode: "LAX",
        arrivalAirportCode: "SEA",
        departureCity: {
          code: "LAX",
          name: "Los Angeles",
          enName: "Los Angeles",
          countryCode: "US",
          countryName: "United States",
          countryEnName: "United States",
          worldRegionCode: "n",
          worldRegionName: "North America",
          worldRegionEnName: "North America",
        },
        arrivalCity: {
          code: "SEA",
          name: "Seattle",
          enName: "Seattle",
          countryCode: "US",
          countryName: "United States",
          countryEnName: "United States",
          worldRegionCode: "n",
          worldRegionName: "North America",
          worldRegionEnName: "North America",
        },
        departureAirport: {
          name: "Los Angeles International Airport",
          code: "LAX",
          cityCode: "LAX",
        },
        arrivalAirport: {
          name: "Seattle/Tacoma International Airport",
          code: "SEA",
          cityCode: "SEA",
        },
      },
      {
        id: "SEA:LAX:2022-02-17",
        outboundDate: "2022-02-17",
        departureAirportCode: "SEA",
        arrivalAirportCode: "LAX",
        departureCity: {
          code: "SEA",
          name: "Seattle",
          enName: "Seattle",
          countryCode: "US",
          countryName: "United States",
          countryEnName: "United States",
          worldRegionCode: "n",
          worldRegionName: "North America",
          worldRegionEnName: "North America",
        },
        arrivalCity: {
          code: "LAX",
          name: "Los Angeles",
          enName: "Los Angeles",
          countryCode: "US",
          countryName: "United States",
          countryEnName: "United States",
          worldRegionCode: "n",
          worldRegionName: "North America",
          worldRegionEnName: "North America",
        },
        departureAirport: {
          name: "Seattle/Tacoma International Airport",
          code: "SEA",
          cityCode: "SEA",
        },
        arrivalAirport: {
          name: "Los Angeles International Airport",
          code: "LAX",
          cityCode: "LAX",
        },
      },
    ],
  },
  airlines: [],
  airports: [],
  cities: [],
  providers: [],
  countries: [],
  trips: [],
  fares: [],
  routeSponsors: [],
  scores: {},
  paymentMethods: [],
  fareConditions: [],
  faresCount: {},
  promosCount: {},
  count: 0,
  sponsors: [],
};

const getFlightsList = (api, roundTrip = true) => {
  console.log("running processing algo");
  const flightList = [];
  let i = 0;
  // console.log(api.trips[i], "api.trips[0]");
  // console.log(api.fares[i], "api.fares[0]");
  // console.log(
  //   "api.trips[i].id: ",
  //   api.trips[i].id,
  //   "api.trips[i].code: ",
  //   api.trips[i].code,
  //   "api.trips[i].legIds[0]: ",
  //   api.trips[i].legIds[0],
  //   "api.fares[i].price.totalAmountUsd: ",
  //   api.fares[i].price.totalAmountUsd,
  //   "api.fares[i].remainingSeatsCount: ",
  //   api.fares[i].remainingSeatsCount,
  //   "api.fares[i].refundable: ",
  //   api.fares[i].refundable,
  //   "api.fares[i].exchangeable: ",
  //   api.fares[i].exchangeable,
  //   "api.fares[i].handoffUrl: ",
  //   api.fares[i].handoffUrl
  // );

  while (i < 30) {
    // while (i < 30 && api.trips[i].id !== undefined) {
    // console.log("inside while loop");
    const flight = {};
    flight.id = api.trips[i].id;
    flight.code = api.trips[i].code;
    flight.legIdOne = api.trips[i].legIds[0];
    flight.total = api.fares[i].price.totalAmountUsd;
    flight.remainingSeatsCount = api.fares[i].remainingSeatsCount;
    flight.refundable = api.fares[i].refundable;
    flight.exchangeable = api.fares[i].exchangeable;
    flight.handoffUrl = api.fares[i].handoffUrl;

    if (roundTrip) flight.legIdTwo = api.trips[i].legIds[1];

    // console.log(flight, "flight before api.legs mapping");
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
      } else if (flight.legIdTwo) {
        if (leg.id === flight.legIdTwo) {
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
      }
    });

    flightList.push(flight);
    i++;
  }
  return flightList;
};

console.log(getFlightsList(data, true));
