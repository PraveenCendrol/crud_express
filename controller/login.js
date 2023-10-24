const fs = require("fs");
const loginInfo = JSON.parse(fs.readFileSync("assets/login.json"));

exports.loginUser = (req, res) => {
  try {
    console.log(req.body);
    let password = req.body.password;
    let isValid = password === loginInfo[req.body.username].password;
    if (isValid) {
      res.status(200).json({
        success: true,
        message: "Username and password matched",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "wrong Data",
    });
  }
};

exports.getUserdetails = (req, res) => {
  try {
    const { username } = req.body;

    const { profile } = loginInfo[username];

    return res.status(200).json({
      success: true,
      profile,
      username,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Data error",
    });
  }
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  try {
    if (!newUser.username || !newUser.password) {
      return res.status(400).json({
        success: false,
        message: "Enter Valid Data",
      });
    }

    if (Object.keys(loginInfo).includes(newUser.username)) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    loginInfo[newUser.username] = {
      password: newUser.password,
      profile: "",
    };

    fs.writeFile("assets/login.json", JSON.stringify(loginInfo), (err) => {
      return res.status(200).json({
        success: true,
        message: "User added Successfully",
      });
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong try after some time",
    });
  }
};

exports.updatePassword = (req, res) => {
  const userDetails = req.body;
  try {
    if (!userDetails.username || !userDetails.password) {
      return res.status(400).json({
        success: false,
        message: "Enter Valid Data",
      });
    }

    if (!Object.keys(loginInfo).includes(userDetails.username)) {
      return res.status(400).json({
        success: false,
        message: "User not exist",
      });
    }

    loginInfo[userDetails.username] = {
      password: userDetails.password,
      profile: loginInfo[userDetails.username].profile,
    };

    fs.writeFile("assets/login.json", JSON.stringify(loginInfo), (err) => {
      return res.status(200).json({
        success: true,
        message: "User added Successfully",
      });
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong try after some time",
    });
  }
};
