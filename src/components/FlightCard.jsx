import React from 'react';

const FlightCard = ({ flightInfo }) => {
  const {
    legOneInfo: { airlineCodes },
    remainingSeatsCount,
    taxesAndFees,
    total,
    totalPricePerPassenger,
  } = flightInfo;
  console.log('flightInfo',flightInfo)
  return (
    <div>
      {/* add button at the top to save a flight? */}
      <ul>
        <li>Airline: {airlineCodes[0]}</li>
        <li>Available Seats: {remainingSeatsCount}</li>
        <li>Price per Passenger: ${totalPricePerPassenger}</li>
        <li>Taxes and Fees: ${taxesAndFees}</li>
        <li>Total Price: ${total}</li>
      </ul>
    </div>
  );
};

export default FlightCard;
