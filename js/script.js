//function to fetch json file
function dataFormat() {
  fetch("http://127.0.0.1:5500/./js/jOne.json")
    .then((r) => r.json())
    .then(plot);
  fetch("http://127.0.0.1:5500/./js/jTwo.json")
    .then((r) => r.json())
    .then(plot2);
  fetch("http://127.0.0.1:5500/./js/jThree.json")
    .then((r) => r.json())
    .then(plot3);
  fetch("http://127.0.0.1:5500/./js/jFour.json")
    .then((r) => r.json())
    .then(plot4);
}

dataFormat();
// 1st problem solution
function plot(data) {
  console.log(data["Object"]);
  const seriesData = [];
  for (let i in data["Object"]) {
    seriesData.push([i, data["Object"][i]]);
    console.log([i, data["Object"][i]]);
  }
  console.log(data);
  console.time("line");
  // 1st plotting
  // eslint-disable-next-line no-undef
  Highcharts.chart("container1", {
    chart: {
      type: "column",
    },
    title: {
      text: "Authorized capitals in different ranges",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Companies authorized capitals",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "<b>{point.y:.1f} Authorized capital</b>",
    },
    series: [
      {
        name: "Authorized capital",
        data: seriesData,
      },
    ],
  });
}

// 2nd solution
function plot2(data) {
  const seriesData = [];
  for (let i in data["Object"]) {
    seriesData.push([i, data["Object"][i]]);
    console.log(i, data["Object"][i]);
  }
  console.log(data);

  // 2nd plotting
  // eslint-disable-next-line no-undef
  Highcharts.chart("container2", {
    chart: {
      type: "column",
    },
    title: {
      text: "No. of registrations in each year from 2000-2021",
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Companies (Registrations)",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: ": <b>{point.y:.1f} Registrations</b>",
    },
    series: [
      {
        name: "Registrations per year",
        data: seriesData,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: "#FFFFFF",
          align: "right",
          format: "{point.y:.1f}", // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  });
}

//3rd solution
function plot3(data) {
  const seriesData = [];
  const labelData = [];
  for (let i in data["Object"]) {
    labelData.push(i);
    seriesData.push([i, data["Object"][i]]);
    console.log(i, data["Object"][i]);
  }

  // 3rd plotting
  // eslint-disable-next-line no-undef
  Highcharts.chart("container3", {
    chart: {
      type: "bar",
    },
    title: {
      text: "No. of pba registrations in 2015",
    },
    xAxis: {
      type: "category",
      title: {
        text: null,
      },
      labels: {
        overflow: "justify",
      },
    },
    yAxis: {
      // type: "category",
      min: 0,
      title: {
        text: "pba regs in 2015",
        // align: 'high'
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " No. of registrations",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        // eslint-disable-next-line no-undef
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        data: seriesData,
      },
    ],
  });
}

//4th solution
function plot4(data) {
  var seriesData = [];
  for (let i in data["Object"]) {
    let num = parseInt(i);

    // restricting the years
    if (num >= 2000 && num <= 2005) {
      seriesData.push(i, data["Object"][i]);
    }
  }
  console.log(seriesData);

  // Statically storing the required string
  let str1 = "Agriculture, hunting and related service activities";
  let str2 = "Forestry, logging and related service activities";
  let str3 = "Manufacture of food products and beverages";
  let str4 = "Manufacture of chemicals and chemical products";
  let str5 = "Manufacture of basic metals";
  let str6 = "Financial intermediation";

  //creating a array to store the iterated data
  let nestedData = [];

  //fetching only the required strings from series data
  for (let i = 0; i < seriesData.length; i++) {
    //since years are stored first followed by dictionary.
    //dictionaries are stored in odd positions so accessing the odd positions and fetching the required strings
    if (i % 2 == 1) {
      nestedData.push(str1, seriesData[i][str1]);
      nestedData.push(str2, seriesData[i][str2]);
      nestedData.push(str3, seriesData[i][str3]);
      nestedData.push(str4, seriesData[i][str4]);
      nestedData.push(str5, seriesData[i][str5]);
      nestedData.push(str6, seriesData[i][str6]);
    }
  }

  // console.log(nestedData);

  //creating 6 different arrays to store the required data
  var data1 = [],
    data2 = [],
    data3 = [],
    data4 = [],
    data5 = [],
    data6 = [];

  // since I have strings along with its count, array will have 12 positions dedicated to a single year.
  let j = 0,
    l = 12;
  for (j = 0; j < l; j++) {
    data1.push(nestedData[j]);
    console.log(nestedData[j] + " ***");
  }

  // array starts from the previously stopped position and goes till 12 position ahead.
  (j = l), (l += 12);
  for (j = l; j < l + 12; j++) {
    data2.push(nestedData[j]);
    console.log(nestedData[j]);
  }
  (j = l), (l += 12);
  for (j = l; j < l + 12; j++) {
    data3.push(nestedData[j]);
    console.log(nestedData[j]);
  }
  (j = l), (l += 12);
  for (j = l; j < l + 12; j++) {
    data4.push(nestedData[j]);
    console.log(nestedData[j]);
  }
  (j = l), (l += 12);
  for (j = l; j < l + 12; j++) {
    data5.push(nestedData[j]);
    console.log(nestedData[j]);
  }
  j = l;
  // used reverse accessing method to fetch the last 12 positions data
  for (j = l; j < nestedData.length; j++) {
    data6.push(nestedData[j]);
    console.log(nestedData[j]);
  }

  // High chart plotting for 4th problem
  // eslint-disable-next-line no-undef
  Highcharts.chart("container4", {
    chart: {
      type: "bar",
    },
    title: {
      text: "Populating pba registrations from 2000-05",
    },
    xAxis: {
      categories: [str1, str2, str3, str4, str5, str6],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "no. of registrations in different years",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " Registrations",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        // eslint-disable-next-line no-undef
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Year 2000",
        data: [data1[1], data2[1], data3[1], data4[1], data5[1], data6[1]],
      },
      {
        name: "Year 2001",
        data: [data1[3], data2[3], data3[3], data4[3], data5[3], data6[3]],
      },
      {
        name: "Year 2002",
        data: [data1[5], data2[5], data3[5], data4[5], data5[5], data6[5]],
      },
      {
        name: "Year 2003",
        data: [data1[7], data2[7], data3[7], data4[7], data5[7], data6[7]],
      },
      {
        name: "Year 2004",
        data: [data1[9], data2[9], data3[9], data4[9], data5[9], data6[9]],
      },
      {
        name: "Year 2005",
        data: [
          data1[11],
          data2[11],
          data3[11],
          data4[11],
          data5[11],
          data6[11],
        ],
      },
    ],
  });
}
