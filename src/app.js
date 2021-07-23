// import Express from "express";
// const path = require("path");
import path from "path";
const __dirname = path.resolve();
// const chalk = require("chalk");
import chalk from "chalk";
// const Express = require("express");
import Express from "express";
// const hbs = require("hbs");
import hbs from "hbs";
// const weather = require * as weather ("./utils/weather.js");
import * as weather from "./utils/weather.js";

const baseURL = weather.baseURL;
// console.log(weather.baseURL);
const params = weather.params;
const fetchData = weather.fetchData;

// express server configuration
const app = Express();
const port = 3000;
console.log(__dirname);
// Define paths for Express config
const publicDirectory = "public";
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// console.log(`\n\n the views location is ${app.get("views")}\n\n`);
// setup static directory to serve
app.use(Express.static(publicDirectory));

app.get("", (req, res) => {
    res.render("index", {
        title: "weather app",
        name: "el moutaouakkil",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "about section",
        name: "el moutaouakkil",
    });
});

app.get("/", (req, res) => {
    res.send("<h2>bonjour tout le monde</h2>");
});

app.use(Express.static(publicDirectory));

/* app.get("/users", (req, res) => {
    // res.send("all users ");
});
app.get("/help", (req, res) => {
    res.send({
        name: "el moutaouakkil",
        age: 30,
    });
}); */

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must provide an address",
        });
    }

    fetchData(baseURL, {
        ...params,
        query: req.query.address,
    }).then((data) => {
        res.send({
            address: req.query.address,
            forecast: data.current.temperature,
        });
    });
});
app.get("/users/:userid(\\d{2})", (req, res) => {
    res.send(`User with ID : ${req.params.userid}`);
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must rovide a search term",
        });
    }
    res.send({
        products: [],
    });
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(port, () => {
    // console.log(`Example app listening at http://localhost:${port}`);
});
