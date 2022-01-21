import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import SubmitSearchButton from './SubmitSearchButton';

const TripCard = ({ savedTripInfo }) => {
  const {
    originAirport,
    destinationAirport,
    departureDate,
    returnDate,
    oneWayOrRound,
    numOfAdults,
    numOfChildren,
    numOfInfants,
    cabinClass,
  } = savedTripInfo;

  //this is top level state that will be used to fetch flight results
  const [tripInfo, setTripInfo] = useState({
    originAirport: originAirport,
    destinationAirport: destinationAirport,
    departureDate: departureDate,
    returnDate: returnDate,
    oneWayOrRound: oneWayOrRound,
    numOfAdults: numOfAdults,
    numOfChildren: numOfChildren,
    numOfInfants: numOfInfants,
    cabinClass: cabinClass
  });

  const [submitDisabled, setSubmitDisabled] = useState(true);

  // update trip info when fields changed
  const handleChange = (type) => (e) => {
    let removedText;
    switch (type) {
    case "onewaytrip":
      setTripInfo({ ...tripInfo, oneWayOrRound: type });
      break;
    case "roundtrip":
      setTripInfo({ ...tripInfo, oneWayOrRound: type });
      break;
    case "originAirport":
      setTripInfo({ ...tripInfo, originAirport: e.target.value });
      break;
    case "destinationAirport":
      setTripInfo({ ...tripInfo, destinationAirport: e.target.value });
      break;
    case "departureDate":
      setTripInfo({ ...tripInfo, departureDate: e.target.value });
      break;
    case "returnDate":
      setTripInfo({ ...tripInfo, returnDate: e.target.value });
      break;
    case "numOfAdults":
      removedText = e.target.value.replace(/\D+/g, "");
      if (removedText === "") removedText = 0;
      setTripInfo({ ...tripInfo, numOfAdults: removedText });
      break;
    case "numOfChildren":
      removedText = e.target.value.replace(/\D+/g, "");
      if (removedText === "") removedText = 0;
      setTripInfo({ ...tripInfo, numOfChildren: removedText });
      break;
    case "numOfInfants":
      removedText = e.target.value.replace(/\D+/g, "");
      if (removedText === "") removedText = 0;
      setTripInfo({ ...tripInfo, numOfInfants: removedText });
      break;
    case "cabinClass":
      setTripInfo({ ...tripInfo, cabinClass: e.target.value });
      break;
    default:
      console.log("handleChange ran", type);
    }
  };

  // enable submit if there are no null fields
  useEffect(() => {
    console.log('checking fields');
    console.log(Object.values(tripInfo));
    if (submitDisabled && Object.values(tripInfo).every(field => field !== null)) {
      setSubmitDisabled(false);
    }
  }, [tripInfo]);

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("trip info on submit: ", tripInfo);
    navigate("/flights-display", {
      state: {
        ...tripInfo,
      },
    });
  };

  //sets minimum departure date to today
  const minDate = new Date().toLocaleDateString("en-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  //sets minimum return date to today+1
  const findRoundTripMinDate = (date) => {
    const minDate = date.split("");
    const changeDay = +minDate[minDate.length - 1] + 1;
    minDate[minDate.length - 1] = changeDay;
    return minDate.join("");
  };

  return (
    <div>
      {/* trip type */}
      <div className="place-center bg-gray-200">
        <h3 className="text-base font-semibold text-xl tracking-tight">
        {` ${tripInfo.originAirport} to ${tripInfo.destinationAirport} Trip`}
        </h3>
        <span>
          <button
            onClick={handleChange("onewaytrip")}
            className="rounded-md py-2.5 px-2.5 m-1 text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-600 shadow-md scale-90 focus:outline-none focus:ring focus:ring-blue-300"
            id="one-way"
          >
				One Way
          </button>
          {" or "}
          <button
            onClick={handleChange("roundtrip")}
            className="rounded-md py-2.5 px-2.5 m-1 text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-600 shadow-md scale-90 focus:outline-none focus:ring focus:ring-blue-300"
            id="round-trip"
          >
				Round Trip
          </button>
        </span>
        <br />
        <br />

        {/* dates */}
        <span>
          <label
            htmlFor="departure-date"
            className="text-base font-semibold text-xl tracking-tight"
          >
				Departure Date:{" "}
          </label>
          <input
            type="date"
            name="departure"
            className="border 1px rounded"
            min={minDate}
            onChange={handleChange("departureDate")}
          ></input>{" "}
          <label
            htmlFor="return-date"
            className="text-base font-semibold text-xl tracking-tight"
          >
				Return Date:{" "}
          </label>
          <input
            type="date"
            name="return"
            className="border 1px rounded"
            min={findRoundTripMinDate(minDate)}
            onChange={handleChange("returnDate")}
          ></input>
        </span>
        <br />
        <br />

        {/* flight class */}
        <label
          htmlFor="cabinClass"
          className="text-base font-semibold text-xl tracking-tight"
        >
			Cabin Class:{" "}
        </label>
        <span>
          <select
            onChange={handleChange("cabinClass")}
            className="border 1px rounded"
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
            <option value="Premium_Economy">Premium Economy</option>
          </select>
        </span>
        <br />
        <br />

        {/* passengers */}
        <span>
          <h3 className="text-lg font-semibold text-xl tracking-tight">
				Passenger Information:{" "}
          </h3>
        </span>
        <span>
          <label
            htmlFor="numOfAdults"
            className="text-base font-semibold text-xl tracking-tight"
          >
				Adults:{" "}
          </label>
          <input
            htmlFor="numOfAdults"
            // type="number"
            defaultValue="1"
            name="number of adults"
            className="border 1px rounded w-8"
            onChange={handleChange("numOfAdults")}
          ></input>{" "}
          <label
            htmlFor="numOfChildren"
            className="text-base font-semibold text-xl tracking-tight"
          >
				Children:{" "}
          </label>
          <input
            htmlFor="numOfChildren"
            defaultValue="0"
            name="number of children"
            className="border 1px rounded w-8"
            onChange={handleChange("numOfChildren")}
          ></input>{" "}
          <label
            htmlFor="numOfInfants"
            className="text-base font-semibold text-xl tracking-tigh"
          >
				Infants:{" "}
          </label>
          <input
            htmlFor="numOfInfants"
            // type="number"
            defaultValue="0"
            name="number of infants"
            className="border 1px rounded w-8"
            onChange={handleChange("numOfInfants")}
          ></input>
        </span>
        <br />
        <br />
        <SubmitSearchButton handleSubmit={handleSubmit} submitDisabled={submitDisabled}/>
        <button
          className="rounded-md py-2.5 px-2.5 m-1 bg-red-500 text-white hover:bg-opacity-75 active:shadow-md scale-90"
        >
			Delete
        </button>
      </div>
      <br></br>
    </div>
  );
};

export default TripCard;