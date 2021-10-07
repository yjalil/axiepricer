require('isomorphic-fetch');
const fs = require('fs');
function saveToFile(content) {
  fs.writeFile("outputAxieWorld.json", content, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  })
}

fetch('https://www.axieworld.com/api/marketplace/salesAxie?&bundle=0&market=axieMarketplace&sortBy=timestamp&sortOrder=-1&period=all&axie=[object%20Object]&checkpoint=1619610543', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  
})
  .then(res => res.json())
  .then(success => saveToFile(JSON.stringify(success)))

