const express = require("express");
const PORT = 8080;
const app = express();
const path = require("path");
const login = require("./routers/loginRouter");
const multer = require("multer");
const bodyParser = require("body-parser");
const productRouter = require("./routers/productsRouter");

const imagesController = require("./controller/images");

app.use("/images", express.static(path.join(__dirname, "uploads")));

function getFileExtension(fileName) {
  const dotIndex = fileName.lastIndexOf(".");

  if (dotIndex !== -1 && dotIndex !== 0 && dotIndex !== fileName.length - 1) {
    return fileName.substring(dotIndex + 1);
  } else {
    return "";
  }
}

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${new Date().getTime()}.${getFileExtension(file.originalname)}`);
  },
});

const storage1 = multer.memoryStorage();
exports.uploadMany = multer({ storage: storage1 });

exports.upload = multer({ storage: storage });

app.post(
  "/uploadImage",
  this.upload.single("image"),
  imagesController.uploadUserProfileAvatar
);

app.post(
  "/uploadProductImages",
  this.uploadMany.array("images", 10),
  imagesController.uploadProductImages
);

app.use(bodyParser.json());
app.use("/login", login);

app.use("/products", productRouter);
app.use("/", (req, res) => {
  return res.status(200).json({
    message:
      "Welcome to the CRUD API Demo,Sorry to tell you you reached Wrong path kindly check for any spelling mistake or re check the path you want to access default / will also get you here",
    success: true,
  });
});
app.listen(PORT, () => console.log("serverInitiated", PORT));
