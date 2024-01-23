#!/usr/bin/env bash;
import inquirer from "inquirer";
import chalk from "chalk";
let apilink = "https://v6.exchangerate-api.com/v6/3fd78a6341a168ddf6863092/latest/PKR";
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apilink);
let countries = Object.keys(data);
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting from",
    choices: countries
});
let userMoney = await inquirer.prompt({
    type: "number",
    name: "rupee",
    message: `Please enter amount in ${chalk.greenBright.bold(firstCountry.name)}`
});
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting to",
    choices: countries
});
let conversionData = `https://v6.exchangerate-api.com/v6/3fd78a6341a168ddf6863092/pair/${firstCountry.name}/${secondCountry.name}`;
let conversion = async (data) => {
    let conversion = await fetch(data);
    let res = await conversion.json();
    return res.conversion_rate;
};
let conversionRate = await conversion(conversionData);
let convertedRate = userMoney.rupee * conversionRate;
console.log(`Your ${chalk.greenBright.bold(firstCountry.name)} ${chalk.greenBright.bold(userMoney.rupee.toLocaleString())} in ${chalk.greenBright.bold(secondCountry.name)} is ${chalk.greenBright.bold(convertedRate.toLocaleString())}`);
