// const chalk = require("chalk");
// const axios = require("axios");
import chalk from "chalk";
import axios from "axios";

export const baseURL = "http://api.weatherstack.com/current";
export const params = {
    access_key: "485cfb140e0d1c46f4cf35acf543311f",
    query: "fez",
};

export const fetchData = async (url, params) => {
    try {
        let response = await axios.get(url, { params });
        console.log(chalk.blue("data fetched successfully"));
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// module.exports = fetchData;
