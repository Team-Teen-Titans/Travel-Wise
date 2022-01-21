import React, { useState, useEffect } from "react";

const FlightCard = ({ flightInfo }) => {
  const {
    legOneInfo,
    legTwoInfo,
    remainingSeatsCount,
    total,
    handoffUrl,
    // taxesAndFees,
    // totalPricePerPassenger,
  } = flightInfo;
  console.log("flightInfo", flightInfo);

  return (
    <div className="border-solid rounded-sm">
      {/* add button at the top to save a flight? */}
      <ul>
        <li>Airline: {legOneInfo.airlineCodes[0]}</li>
        <>
          <h3>Outbound Trip: </h3>
          <li>Departure Time: {legOneInfo.departureTime}</li>
          <li>Arrival Time: {legOneInfo.arrivalTime}</li>
          <li>Total Duration: {legOneInfo.duration}</li>
          <li>Layovers: {legOneInfo.segments.length - 1}</li>
        </>
        <br />
        {legTwoInfo && (
          <>
            <h3>Return Trip: </h3>
            <li>Departure Time: {legTwoInfo.departureTime}</li>
            <li>Arrival Time: {legTwoInfo.arrivalTime}</li>
            <li>Total Duration: {legTwoInfo.duration}</li>
            <li>Layovers: {legTwoInfo.segments.length - 1}</li>
          </>
        )}

        {/* <li>Price per Passenger: ${totalPricePerPassenger}</li> */}
        {/* <li>Taxes and Fees: ${taxesAndFees}</li> */}
        <li>Total Price: ${total}</li>
        <br />
        {remainingSeatsCount !== 0 ? (
          <>
            <li>Available Seats: {remainingSeatsCount}</li>
            <a href={handoffUrl}>Purchase now</a>
          </>
        ) : (
          <>
            <li>Fully Booked</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default FlightCard;
