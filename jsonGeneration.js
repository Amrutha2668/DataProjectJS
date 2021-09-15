// eslint-disable-next-line no-undef
const fs = require("fs");
// eslint-disable-next-line no-undef
const csv = require("csvtojson");
const file_path = "C:/Users/Ammu/Downloads/Maharashtra.csv";
const JSON_OUTPUT_FILE_PATH1 = "./js/jOne.json";
const JSON_OUTPUT_FILE_PATH2 = "./js/jTwo.json";
const JSON_OUTPUT_FILE_PATH3 = "./js/jThree.json";
const JSON_OUTPUT_FILE_PATH4 = "./js/jFour.json";

function main() {
  csv()
    .fromFile(file_path)
    .then((data) => readData(data));
}

main();

function readData(entries) {
  // Creating 4 objects w.r.t each data problem.
  // 1st object
  let authorizedCapital = {
    ["<=1L"]: 0,
    ["1L to 10L"]: 0,
    ["10L to 1Cr"]: 0,
    ["1Cr to 10Cr"]: 0,
    [">10Cr"]: 0,
  };
  // 2nd object
  let registeredYears = {};
  for (let year = 2000; year < 2019; year++) registeredYears[year] = 0;
  // 3rd Object
  let principalActivity = {};
  // 4th Object
  let companyGrouped = {};

  // Looping through entries and fetching the required data fields.
  for (let index = 0; index < entries.length; index++) {

    // Authorized capital entry
    let capital = parseFloat(entries[index].AUTHORIZED_CAP);

    // Adding entries to object upon checking condition
    if (capital <= 100000) authorizedCapital["<=1L"]++;
    else if (capital >= 100000 && capital <= 1000000)
      authorizedCapital["1L to 10L"]++;
    else if (capital >= 1000000 && capital <= 10000000)
      authorizedCapital["10L to 1Cr"]++;
    else if (capital >= 10000000 && capital <= 100000000)
      authorizedCapital["1Cr to 10Cr"]++;
    else if (capital >= 10000000) authorizedCapital[">10Cr"]++;

    // Registered year entry
    let year = entries[index].DATE_OF_REGISTRATION.includes("NA")
      ? "00"
      : entries[index].DATE_OF_REGISTRATION;
    year = parseInt(
      parseInt(year.slice(-2)) <= 20
        ? "20" + year.slice(-2)
        : "19" + year.slice(-2)
    );

    // Adding entries to Registered year object
    if (year >= 2000 && year <= 2019) registeredYears[year]++;

    // Principal business activity in 2015's entry
    let principal = entries[index].PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN;

    //Adding entries to principalActivity object
    if (principal in principalActivity) principalActivity[principal] += 1;
    else principalActivity[principal] = 1;

    // Companies grouped both on registered year and pba entry
    if (principal != "NA" && year >= 2000 && year <= 2019) {
      // If year is not present in object then add year along with pba and count
      if (year in companyGrouped === false) {
        companyGrouped[year] = {};
        companyGrouped[year][principal] = 1;
        // console.log(principal in companyGrouped[year]);
      }
      // If year is already present then check for pba and add value
      else {
        if (principal in companyGrouped[year] === false) {
          companyGrouped[year][principal] = 1;
        } else companyGrouped[year][principal] += 1;
      }
    }
  }

  // console.log(companyGrouped);

  // Storing objects and json file path in a array, since json object conversion statements are repetitive.
  const objectAndFile = [
    authorizedCapital,
    JSON_OUTPUT_FILE_PATH1,
    registeredYears,
    JSON_OUTPUT_FILE_PATH2,
    principalActivity,
    JSON_OUTPUT_FILE_PATH3,
    companyGrouped,
    JSON_OUTPUT_FILE_PATH4,
  ];
  save(objectAndFile);
  console.log("success");
}

function save(objectAndFile) {
  let jsonString;
  let jsonData;

  for (let index = 0; index <= objectAndFile.length; index++) {
    let obj = objectAndFile[index];
    // let str = objectAndFile[index]+"";
    jsonData = {
      // str : obj,
      Object: obj,
    };
    jsonString = JSON.stringify(jsonData);
    let path = objectAndFile[index + 1] + "";
    fs.writeFile(path, jsonString, "utf-8", (err) => {
      if (err) {
        console.log(err);
      }
    });
    index += 1;
  }
}
