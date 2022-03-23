const axios = require("axios");
const api = axios.create({
  baseURL: "http://34.125.97.36:5000",
});

module.exports = api;
