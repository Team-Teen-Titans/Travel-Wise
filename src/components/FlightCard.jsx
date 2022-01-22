import React from "react";

const FlightCard = ({ flightInfo }) => {
  const { legOneInfo, legTwoInfo, remainingSeatsCount, total, handoffUrl } =
    flightInfo;

  return (
    <div className="flex space-x-5 space-y-5 px-5 bg-gradient-to-br from-blue-200 to-blue-200 via-blue-300 box-content border-2 border-indigo-700 rounded-md py-3 my-3">
      <div>
        <h2 className="font-bold underline">
          Airline: {legOneInfo.airlineCodes[0]}
        </h2>
      </div>
      <br />

      <div>
        <ul>
          <div className="flex justify-left">
            <h3 className="font-bold">Outbound Trip </h3>
          </div>
          <li>Departure Time: {legOneInfo.departureTime}</li>
          <li>Arrival Time: {legOneInfo.arrivalTime}</li>
          <li>Total Duration: {legOneInfo.duration}</li>
          <li>Layovers: {legOneInfo.segments.length - 1}</li>
        </ul>
      </div>

      <br />
      {legTwoInfo && (
        <div>
          <div className="flex justify-center">
            <h3 className="font-bold">Return Trip </h3>
          </div>
          <ul>
            <li>Departure Time: {legTwoInfo.departureTime}</li>
            <li>Arrival Time: {legTwoInfo.arrivalTime}</li>
            <li>Total Duration: {legTwoInfo.duration}</li>
            <li>Layovers: {legTwoInfo.segments.length - 1}</li>
          </ul>
        </div>
      )}

      <div className="flex flex-col justify-end pl-5">
        <h3>
          Total Price <h3 className="font-bold">{total}</h3>
        </h3>

        <br />
        {remainingSeatsCount !== 0 ? (
          <>
            <h3>Available Seats: {remainingSeatsCount}</h3>
            <a
              href={handoffUrl}
              className="font-bold underline hover:font-extrabold hover:text-green-300"
            >
              Purchase now
            </a>
          </>
        ) : (
          <>
            <h3>Fully Booked</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default FlightCard;
