const serverless = require("serverless-http");
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const { generateText } = require("./api_interface.js");
const { search } = require("./vectordb.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/token", async (req, res, next) => {

  try {
    const response = await axios.post(
      "https://iam.cloud.ibm.com/identity/token",
      {
        grant_type: "urn:ibm:params:oauth:grant-type:apikey",
        apikey: process.env.IBM_API_KEY
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error calling IBM Watson API:", error);
    return res.status(500).json({
      message: "Error processing your request",
      error: error.message
    });
  }
});


app.post("/chat", async (req, res, next) => {
  try {

    // get access token from header
    const ACCESS_TOKEN = req.headers.authorization.split(" ")[1];

    const response = await generateText(ACCESS_TOKEN, req.body.input);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error calling IBM Watson ML API:", error);
    return res.status(500).json({
      message: "Error processing your request",
      error: error.message
    });
  }
});

app.post("/search", async (req, res, next) => {
  try {
    const response = await search(req.body.query);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error searching VectorDB:", error);
    return res.status(500).json({
      message: "Error processing your request",
      error: error.message
    });
  }
});


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
