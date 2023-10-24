const fs = require("fs");
const catogoriesList = JSON.parse(
  fs.readFileSync(`${__dirname}/../assets/categories.json`)
);
const contentList = JSON.parse(
  fs.readFileSync(`${__dirname}/../assets/products.json`)
);

exports.getProducts = (req, res) => {
  let id = req.query.id;
  let search = req.query.search;
  if (!id && !search) {
    return res.status(200).json({
      success: true,
      message: "All data List",
      data: contentList,
    });
  }

  if (!id && search) {
    let filteredData = contentList.filter((e) => {
      return e.name.toLowerCase().includes(search.toLowerCase());
    });

    return res.status(200).json({
      success: true,
      length: filteredData.length,
      message: `Searched Products for ${search}`,
      data: filteredData,
    });
  }

  if (id && search) {
    let filteredData = contentList.filter((e) => {
      return (
        e.name.toLowerCase().includes(search.toLowerCase()) &&
        e.category_id === id
      );
    });
    return res.status(200).json({
      success: true,
      length: filteredData.length,

      message: `Searched Products for ${search} & id : ${id}`,
      data: filteredData,
    });
  }
  if (id && !search) {
    let filteredData = contentList.filter((e) => {
      return e.category_id === id;
    });

    return res.status(200).json({
      success: true,
      length: filteredData.length,

      message: `Searched Products for id : ${id}`,
      data: filteredData,
    });
  }

  return res.status(400).json({
    success: false,
    message: "Invalid Request",
  });
};
