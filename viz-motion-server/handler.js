const serverless = require("serverless-http");
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/token", async (req, res, next) => {

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

    const response = await axios.post(
      "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29",
      {
        input: req.body.input || "",
        parameters: {
          decoding_method: "greedy",
          max_new_tokens: 500,
          min_new_tokens: 0,
          stop_sequences: [],
          repetition_penalty: 1
        },
        model_id: req.body.model_id || "codellama/codellama-34b-instruct-hf",
        project_id: "5b52165b-bda4-4880-8178-3b2fb9f5289f"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error calling IBM Watson ML API:", error);
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
