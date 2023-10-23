const fs = require("fs");

const catogoriesList = JSON.parse(fs.readFileSync("./categories.json"));
const contentList = JSON.parse(fs.readFileSync("./products.json"));
console.log(catogoriesList.categories.length, contentList.length);

const alteredData = contentList.map((e) => {
  return {
    ...e,
    imagesUrl: [],
  };
});

fs.writeFileSync("./products.json", JSON.stringify(alteredData));

// for (i of catogoriesList.categories) {
//   let a = 0;
//   for (j of contentList) {
//     if (i.id === j.category_id) {
//       a++;
//     }
//   }
//   console.log(`${i.name} ,${i.id} ,has ${a} products`);
// }
