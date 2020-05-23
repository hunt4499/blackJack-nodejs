
const category = require('./category.model');
const product = require('./product.model');
const productDetails = require('./productDetails.model');
const userInfo = require('./userInfo.model');
const axios = require('axios');
const fs = require('fs');
const util = require("util");
const appendFile = util.promisify(fs.appendFile);

//Question ------1

const firstPromise = function () {
  return new Promise(async (resolve, reject) => {
    console.log('Inside 1st Promise');
    resolve(true);
  });
};

const fourthPromise = function () {
  return new Promise(async (resolve, reject) => {
    console.log('Inside 4th Promise');
    resolve(true);
  });
};

const fifthPromise = function () {
  return new Promise(async (resolve, reject) => {
    console.log('Inside 5th Promise');
    setTimeout(() => {
      if (Math.random(1) > 0.5) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};

async function testing(thirdResult, fifthPromise) {
  if (thirdResult) {
    let answer = await fifthPromise();
    if (answer) {
      console.log('Execution has been completed');
    } else {
      testing(thirdResult, fifthPromise);
    }
  } else {
    console.log('3rd result could not satisfy');
  }
}

(async function testingPromises() {
  let firstResult = await firstPromise();
  console.log('====================================');
  console.log({ firstResult });
  console.log('====================================');
  let secondResult = firstResult && (await Promise.allSettled([Promise.resolve(true), Promise.resolve(true)]));
  console.log('====================================');
  console.log({ secondResult });
  console.log('====================================');
  let thirdResult =
    secondResult.every((Element) => {
      if (Element.value == true) {
        return true;
      }
    }) && (await fourthPromise());
  console.log('====================================');
  console.log({ thirdResult });
  console.log('====================================');
  testing(thirdResult, fifthPromise);
})();

//Question ------2

async function fetchDataAndWrite() {
  try {
    let urlArray = [
      'https://api.github.com/users/mralexgray/repos',
      'https://data.townofcary.org/api/v2/catalog/datasets/rdu-weather-history',
      'https://data.ct.gov/api/views/rybz-nyjw/rows.json?accessType=DOWNLOAD',
    ];
    urlArray.forEach(async (element) => {
      console.log('====================================');
      console.log({ element });
      console.log('====================================');
      let response = await axios.get(element);
      if (response) {
        await appendFile('./mynewfile2.txt', `\n\n${element}`);
        await appendFile('./mynewfile2.txt', ' \n \n w');
        await appendFile('./mynewfile2.txt', JSON.stringify(response.data));
        console.log('Done');
      }
    });
  } catch (error) {
    console.log('====================================');
    console.log({ error });
    console.log('====================================');
  }
}

//Question ------3

async function dataAddition(){
  let user={
    name: "Ajay",
    category: [{
        products:["phones","OtherGadgets"]
      }],
  }
}
