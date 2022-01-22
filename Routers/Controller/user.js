const userModel = require("./../../db/Models/user");
const roleModel = require("./../../db/Models/Role");

//backeges
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
  const { userName, email, password, password2, role, avatar, bio, status } =
    req.body;

  if (!userName && !email && !password && !password2) {
    res.json("رجاءا اكمل جميع الحقول");
  }

  if (password != password2) {
    res.json("كلمات السر لا تتطابق");
  }

  if (password.length < 8) {
    res.json("الرجاء كتابة 8 أحرف وأرقام");
  }
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("معرف البريد الإلكتروني مسجل بالفعل");
    } else {
      const OAuth = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URL
      );

      OAuth.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
      });
      const accessToken = OAuth.getAccessToken();

      const token = jwt.sign(
        { userName, email, password, avatar, bio, status, role },
        secret,
        {
          expiresIn: "1h",
        }
      );

      const output = `
              <h2>الرجاء الضغط على الرابط أدناه لتفعيل حسابك</h2>
              <p>${valid}/activate/${token}</p>
              <p><b>:ملاحظة </b>.رابط التفعيل أعلاه تنتهي صلاحيته خلال ساعة واحدة</p>
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
        from: '"ًًWmeedh" <wmeedh@gmail.com>',
        to: email,
        subject: " :التحقق من الحساب ",
        generateTextFromHTML: true,
        html: output,
      };

      transport.sendMail(mailOptions, (error, mail) => {
        if (error) {
          console.log(error);
          res.status(200).json({
            error: "خطأ ، يرجى التسجيل مرة أخرى",
          });
        } else {
          res.status(200).json({
            message: "✅ تم إرسال رابط التفعيل بنجاح ",
          });
        }
      });
    }
  });
};
// active email
const activEmail = async (req, res) => {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.json({
          error: "⛔️ رابط غير صحيح أو منتهي الصلاحية! الرجاء التسجيل مرة أخرى",
        });
      } else {
        const { userName, email, password, avatar, bio, status, role } =
          decodedToken;
        userModel.findOne({ email: email }).then((user) => {
          if (user) {
            res.json({
              error:
                "معرف البريد الإلكتروني موجود بالفعل! الرجاء الدخول تسجيل الدخول",
            });
          } else {
            const newUser = new userModel({
              userName,
              email,
              password,

              status,
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
    console.log("!!!لا يوجد حساب نشط");
  }
};

// login
const login = (req, res) => {
  const { email, password } = req.body;

  userModel
    .findOne({ email })
    .then(async (result) => {
      if (result) {
        if (result.email == email) {
          const hashedPass = await bcrypt.compare(password, result.password);
          console.log(hashedPass);

          const payload = {
            id: result._id,
            email,
          };

          if (hashedPass) {
            const token = await jwt.sign(payload, secret);
            console.log(hashedPass);

            res.status(200).json({ result, token });
          } else {
            res.status(400).json("البريد الإلكتروني أو كلمة السر خاطئة");
          }
        } else {
          res.status(400).json("البريد الإلكتروني أو كلمة السر خاطئة");
        }
      } else {
        res.status(404).json("!!!البريد الإلكتروني غير موجود");
      }
    })
    .catch((err) => res.status(400).json(err));
};

//forgotPass
const forgotPass = (req, res) => {
  const { email } = req.body;
  // let errors = [];
  if (!email) {
    res.json("الرجاء إدخال معرف البريد الإلكتروني");
  }
  userModel.findOne({ email: email }).then((user) => {
    if (!user) {
      res.json("!المستخدم مع معرف البريد الإلكتروني غير موجود");
    } else {
      const OAuth = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URL
      );
      OAuth.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
      });

      const accessToken = OAuth.getAccessToken();

      const token = jwt.sign({ _id: user._id }, secret, {
        expiresIn: "1h",
      });
      const output = `
                <h2>الرجاء الضغط على الرابط أدناه لإعادة تعيين كلمة مرور حسابك</h2>
                <p>${valid}/reset/${token}</p>
                <p><b>:ملاحظة </b> .تنتهي صلاحية رابط التفعيل خلال ساعة واحدة</p>
                `;

      userModel.updateOne({ resetLink: token }, (err, success) => {
        if (err) {
          res.json("!خطأ في إعادة تعيين كلمة المرور");
        } else {
          const transporter = nodemailer.createTransport({
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
            from: '"wmeedh" <wmeedh@gmail.com>',
            to: email,
            subject: " :إعادة تعيين كلمة مرور الحساب",
            html: output,
          };

          transporter.sendMail(mailOptions, (error) => {
            if (error) {
              res.json(".حدث خطأ من جانبنا ، يرجى المحاولة مرة أخرى لاحقًا");
            } else {
              res.json({
                success:
                  " .تم إرسال رابط إعادة تعيين كلمة المرور إلى معرف البريد الإلكتروني الخاص بك يرجى اتباع التعليمات ",
              });
            }
          });
        }
      });
    }
  });
};

const funcReset = (req, res) => {
  const { token } = req.params;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.json("رابط غير صحيح أو منتهي الصلاحية! حاول مرة اخرى");
      } else {
        const { _id } = decodedToken;
        userModel.findById(_id, (error) => {
          if (error) {
            res.json(
              "المستخدم مع معرف البريد الإلكتروني غير موجود! حاول مرة اخرى"
            );
          } else {
            res.json({ success: _id });
          }
        });
      }
    });
  } else {
    console.log("!خطأ في إعادة تعيين كلمة المرور");
  }
};

const resetPass = (req, res) => {
  var { password, password2 } = req.body;
  const id = req.params.id;

  if (!password || !password2) {
    res.json("الرجاء إدخال كافة الحقول");
  } else if (password.length < 8) {
    res.json("⛔️ يجب أن تكون كلمة المرور 8 أحرف على الأقل");
  } else if (password != password2) {
    res.json("كلمة المرور غير مطابقة");
  } else {
    bcrypt.hash(password, SALT, (error, hash) => {
      if (error) throw error;
      password = hash;
      userModel.findByIdAndUpdate({ _id: id }, { password }, (err) => {
        if (err) {
          res.json("!خطأ في إعادة تعيين كلمة المرور");
        } else {
          res.json("!إعادة تعيين كلمة المرور بنجاح");
        }
      });
    });
  }
};

//get all users
const getAllUsers = (req, res) => {
  userModel
    .find({ isDel: false })
    .populate("role")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getAUsers = (req, res) => {
  userModel
    .find({ isDel: true })
    .populate("role")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// profile
const getOneUser = (req, res) => {
  const { _id } = req.params;
  userModel
    .find({ _id, isDel: false })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json("user not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getUsers = (req, res) => {
  userModel
    .find({ role: "61c05adf3708bf224ada4794" })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
// get users....
const getServiceProvider = (req, res) => {
  userModel
    .find({ role: "61c4375564bde5690cdb68d0" , isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateUser = (req, res) => {
  const { userName, bio, specialty, Email, Phone_Number , city, status , avatar } =
    req.body;
  // console.log("status", req.token.id,avatar,"avatar");
  userModel
    .findByIdAndUpdate(
      { _id: req.token.id, isDel: false },
      { userName, bio, specialty, Email, Phone_Number , city, status , avatar }
      // {upsert:true},
    )
    .then((result) => {
      // if (result) {
      res.status(200).json(result);
      // }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const delUser = (req, res) => {
  const { _id } = req.params;
  // console.log( "hhh", id);
  userModel
    .findOneAndUpdate(
      { _id, isDel: false},
      { isDel: true },
      { new: true }
    )
    .then((result) => {
      if (result) {
        // if (user.role?.role == "admin"){
        res.status(200).json("deleted");
        // }
      } else {
        res.status(404).json("already deleted");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const reUser = (req, res) => {
  const { _id } = req.params;
  // console.log( "hhh", id);
  userModel
    .findOneAndUpdate(
      { _id, isDel: true},
      { isDel: false },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json("return");
        // }
      } else {
        res.status(404).json("already return");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  register,
  activEmail,
  login,
  forgotPass,
  funcReset,
  resetPass,
  getAllUsers,
  getAUsers,
  getOneUser,
  getServiceProvider,
  getUsers,
  updateUser,
  delUser,
  reUser,
};
