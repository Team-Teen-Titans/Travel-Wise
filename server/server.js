const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = 3000;

app.use(cors());

/**
 * handle parsing request body
 */
app.use(express.json());


//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };  
  // change error of default error object
  const errorObj = {
    ...defaultErr,
    message: err.message
  };
  return res.status(errorObj.status).json(errorObj.message);
});

//handle page not found
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
