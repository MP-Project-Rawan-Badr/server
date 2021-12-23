const userModel = require("./../../db/Models/user");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const SALT = Number(process.env.SALT);
const secret = process.env.SECRET_KEY;
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;
const valid = process.env.VALID_MAIL;

//create users
const register = async (req, res) => {
  const { userName, email, password, password2, role } = req.body;

  if (!userName && !email && !password && !password2) {
    res.json("Please complete all fields");
  }

  if (password != password2) {
    res.json("The passwords do not match");
  }

  if (password.length < 8) {
    res.json("Please type 8 letters and numbers");
  }
  userModel.findOne({ email: email })
  .then((user) => {
    if (user) {
      res.json("Email ID already registered");
    } else {
      const OAuth = new OAuth2(
        process.env.CLIENT_ID, 
        process.env.CLIENT_SECRET, 
        process.env.REDIRECT_URL 
      );

      OAuth.setCredentials({
        refresh_token:
        process.env.REFRESH_TOKEN,
      });
      const accessToken = OAuth.getAccessToken();

      const token = jwt.sign({ userName, email, password, role }, secret, {
        expiresIn: "1h",
      });

      const output = `
              <h2>Please click on below link to activate your account</h2>
              <p>${valid}/activate/${token}</p>
              <p><b>Note: </b> The above activation link expires in 1 hour.</p>
              `;

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "nodejsa@gmail.com",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
           accessToken: accessToken,
        },
      });

      const mailOptions = {
        from: '"Auth Admin" <nodejsa@gmail.com>', 
          to: email, 
          subject: "Account Verification: NodeJS Auth ", 
          generateTextFromHTML: true,
          html: output, 
      };

      transport.sendMail(mailOptions, (error, mail) => {
        if (error) {
          console.log(error);
          res.status(200).json({
            err: "Something went wrong on our end. Please register again.",
          });
        } else {
          console.log("Mail sent : %s", mail.response);
          res.status(200).json({
            message:
              "Successfully Activation link sent.",
          });
        }
      });
    }
  });
};
//
const activate = async (req, res) => {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.json({ error: "Incorrect or expired link! Please register again." });
      } else {
        const {
          userName,
          email,
          password,
          role,
        } = decodedToken;
        userModel.findOne({ email: email })
        .then((user) => {
          if (user) {
            res.json({ error: "Email ID already exist! Please go log in." });
          } else {
               const newUser = new userModel({
              userName,
              email,
              password,
              role,
            });
              bcrypt.hash(newUser.password, SALT, (error, hash) => {
                if (error) throw error;
                newUser.password = hash;
                newUser
                  .save()
                  .then((user) => {
                    res.json({ success: user });
                  })
                  .catch((error) => console.log(error));
              });
          }
        });
      }
    });
  } else {
    console.log("No Active Account");
  }
};



module.exports = { register,  activate };
