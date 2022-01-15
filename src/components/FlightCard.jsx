import React from 'react';

const FlightCard = ({flightInfo}) => {
  const {
    providerId,
    seatAvailability,
    taxesAndFees,
    totalPrice,
    totalPricePerPassenger,
  } = flightInfo;
  return (
    <div>
      {/* add button at the top to save a flight? */}
      <ul>
        <li>Airline: {providerId}</li>
        <li>Available Seats: {seatAvailability}</li>
        <li>Price per Passenger: ${totalPricePerPassenger}</li>
        <li>Taxes and Fees: ${taxesAndFees}</li>
        <li>Total Price: ${totalPrice}</li>
      </ul>
    </div>
  );
};

export default FlightCard;
