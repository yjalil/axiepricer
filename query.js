
//Imports
require('isomorphic-fetch');
const fs = require('fs');

//Function that appends fetched data to JSON file
function saveToFile(content) {
  fs.appendFile('axies.json', content, function (err) {
    if (err) throw err;

  });

}

//Overwrite old JSON file at every run

fs.truncate('axies.json', 0, function () { console.log('JSON file reset') })
// fs.open("axies.json", "w", function (err) {
//   if (err) {
//     console.log("An error occured while creating file JSON Object to File.");
//     return console.log(err);
//   }

//   console.log("JSON file has been created.");

// });


//Fetch 1000 last sold axies  from marketplace
//Asynchronous loop problem not fixed yet to correctly fetch 1000
//Request retrieves 20 max at a time, loop retrieves 20*10 => 200 at a time

for (let i = 0; i < 10/*change here*/; i++) {


    fetch('https://graphql-gateway.axieinfinity.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        "operationName": "GetRecentlyAxiesSold",
        "variables": {
          "from": 20*i + 1,
          "size": 20 // change here max is 20
        },
        //can clean up the data here, remove unecessary fields or later in excel
        // check https://axie-graphql.web.app/ for all available queries
        "query": "query GetRecentlyAxiesSold($from: Int, $size: Int) {\n  settledAuctions {\n    axies(from: $from, size: $size) {\n      total\n      results {\n        ...AxieSettledBrief\n        transferHistory {\n          ...TransferHistoryInSettledAuction\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AxieSettledBrief on Axie {\n  id\n  name\n  image\n  class\n  breedCount\n  __typename\n}\n\nfragment TransferHistoryInSettledAuction on TransferRecords {\n  total\n  results {\n    ...TransferRecordInSettledAuction\n    __typename\n  }\n  __typename\n}\n\nfragment TransferRecordInSettledAuction on TransferRecord {\n  from\n  to\n  txHash\n  timestamp\n  withPrice\n  withPriceUsd\n  fromProfile {\n    name\n    __typename\n  }\n  toProfile {\n    name\n    __typename\n  }\n  __typename\n}\n"

      }),
    })
      .then(res => res.json())
      .then(res => saveToFile(JSON.stringify(res.data.settledAuctions.axies.results)))
      .then(console.log("Data saved from" + 20*i +" to" + 20*(i+1)))
}
//convert axies.json to csv online and open it in excel