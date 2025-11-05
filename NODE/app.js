const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const Feedback = require('./models/Feedback');


const jwt = require("jsonwebtoken");


mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
    }).then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));

  
require("./userDetails");

const User = mongoose.model("UserInfo");

// Feedback submission route
app.post('/api/feedbacks', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      const newFeedback = new Feedback({ name, email, subject, message });
      await newFeedback.save();
      res.status(201).send("Feedback submitted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
  
  // Feedback retrieval route
  app.get('/api/feedbacks', async (req, res) => {
    try {
      const feedbacks = await Feedback.find();
      res.json(feedbacks);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

app.post("/register", async (req, res) => {
    const { fname, lname, email, password, userType } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.send({ error: "User Exists " });
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
            userType,
        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.send({ error: "User Not Found " });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: 120,
        });
        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ status: "error" });
        }
    }
    res.json({ status: "error", error: "InvAlid password" });
});

app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
        console.log(user);
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }
        const useremail = user.email;
        User.findOne({ email: useremail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) { }
});


app.listen(3000, () => {
    console.log("server started");
});

app.get("/getAllUser", async (req, res) => {
    try {
        const allUser = await User.find({});
        res.send({ status: "ok", data: allUser });
    } catch (error) {
        console.log(error);
    }
});


app.post("/deleteUser", async (req, res) => {
    const { userid } = req.body;
    try {
        User.deleteOne({ _id: userid }) .then(function (err, res) {
                console.log(err);
            });
        res.send({ status: "ok", data: "Deleted" });
      } catch (error) {
        console.log(error);
    }
});