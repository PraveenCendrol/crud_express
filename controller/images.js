const fs = require("fs");
const { uploadMany } = require("../app");
const loginInfo = JSON.parse(fs.readFileSync("assets/login.json"));
const productsInfo = JSON.parse(fs.readFileSync("assets/products.json"));
const productIds = productsInfo.map((e) => e._id);
exports.uploadUserProfileAvatar = (req, res) => {
  const username = req.body.username;

  if (!username) {
    return res.status(400).json({ error: "Username field is required." });
  }

  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const fileName = uploadedFile.filename;

  if (Object.keys(loginInfo).includes(username)) {
    console.log(loginInfo);

    if (loginInfo[username].profile) {
      console.log(">>>>>>>>>>>>>>>>");
      fs.unlink(`./uploads/${loginInfo[username].profile}`, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err.message}`);
        } else {
          console.log(
            `File ${__dirname}/./uploads/${loginInfo[username].profile} deleted successfully`
          );
        }
      });
    }

    loginInfo[username].profile = fileName;
    fs.writeFile(`./assets/login.json`, JSON.stringify(loginInfo), (err) => {});
  } else {
    fs.unlink(`./uploads/${fileName}`, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
      } else {
        console.log(
          `File ${__dirname}/uploads/${fileName} deleted successfully`
        );
      }
    });
    return res.status(404).json({
      message: "User name not found",
      fileName,
      username,
    });
  }

  return res
    .status(200)
    .json({ message: "Image uploaded successfully.", fileName, username });
};

exports.uploadProductImages = (req, res) => {
  console.log(req.body);
  // const filePath = `uploads/${req.files[0].originalname}`;
  // fs.writeFileSync(filePath, req.files[0].buffer);
  if (req.body.product_id && req.files.length) {
    let product_id = req.body.product_id;
    let isAvilable = productIds.includes(product_id);

    if (isAvilable) {
      let imagesList = req.files.map((e, i) => {
        const fileName = `${Date.now()}-${i}-${e.originalname}`;
        const filePath = `uploads/${fileName}`;
        fs.writeFileSync(filePath, e.buffer);
        return fileName;
      });
      // console.log(req.files);
      // console.log(res.file);
      let newArry = productsInfo.map((e) => {
        let isThatProduct = e._id === product_id;
        if (isThatProduct) {
          let oldImages = e.imagesUrl;
          return { ...e, imagesUrl: [...oldImages, ...imagesList] };
        }
        return e;
      });
      fs.writeFileSync(
        "assets/products.json",
        JSON.stringify(newArry),
        (err) => {}
      );

      return res.status(200).json({
        success: true,
        message: `Images uploaded successfully to product : ${product_id}`,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Product Id",
      });
    }
  }

  return res.status(400).json({
    success: false,
    message:
      "No files were uploaded something went wrong check product_id and image",
  });
};
