import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Spinner";
import { useNavigate } from "react-router-dom";

const FlightResults = () => {
  const { state } = useLocation();
  const [tripInfo, setTripInfo] = useState(state);
  const [loading, setLoading] = useState(true);
  console.log("state:", state);
  console.log("tripInfo:", tripInfo);
  const navigate = useNavigate();

  //function requests the airport codes from the backend by referencing the city name
  //backend hits the API and returns the airport codes
  const getAirportCode = async (originCity, destinationCity) => {
    try {
      const originUrl = originCity.replace(/\s/g, "%20");
      const destinationUrl = destinationCity.replace(/\s/g, "%20");
      const originRes = await axios.get(`/api/flights/airport/${originUrl}`);
      const destinationRes = await axios.get(
        // `/api/flights/airport/${destinationUrl}`
        `/api/flights/airport/HNL`
      );
      setTripInfo({
        ...tripInfo,
        originAirport: originRes.data,
        destinationAirport: destinationRes.data,
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAirportCode(state.originAirport, state.destinationAirport);
  }, []);

  return (
    <div className="flex">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div>Origin Airport: {tripInfo.originAirport}</div>
          <div>Destination Airport: {tripInfo.destinationAirport}</div>
          <button
            onClick={() => {
              navigate("/test", {
                state: {
                  ...tripInfo,
                },
              });
            }}
          >
            See Flights
          </button>
        </div>
      )}
    </div>
  );
};

export default FlightResults;

/* Change the flight selector so that it will pop open a modal to flight results (name TBD) component and drill state
when the origin/destination/roundtrip/date info is all selected. 

Move the cabin class and passenger count info into the current flight results component that's becoming a modal, and add that info
to the drilled in state. On initial mount, the existing functionality will still get the airport codes from backend. 

Once the user enters all relevant info and it's added to state, we will route to a new component and path that renders the feed
with all the flight info cards once the API data comes back from the backend. 

TO-DO's:
change modal name and move code around
change back-end code getting so that it returns all airport names and IATA codes instead of just first
add a drop down menu for each origin and destination so the user can select which airport is preferred
set that selection in the state to be passed to true flights view component on new page
change backend path info? 
add modal render option true/false value to state so that it pops open after the first section is all selected
still set up flight options back-end API hitting to render with all relevant state



*/
