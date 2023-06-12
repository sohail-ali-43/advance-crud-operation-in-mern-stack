const express = require("express");
const router = new express.Router();
const users = require("../model/userSchema");
const crudusers = require("../model/cruduserSchema");

// for user registration
router.post("/register", async (req, res) => {
  const { name, email, password, job, mobile } = req.body;
  if (!name || !email || !password || !job || !mobile) {
    return res.status(422).json({ error: "please fill all the fields" });
  }
  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "email already exist" });
    }
    const adduser = new users({ name, email, password, job, mobile });
    await adduser.save();
    console.warn(adduser);
    res.status(201).json({ congrats: "user seccessfully registerd" });
  } catch (error) {
    res.status(422).json({ error: "something went wrong" });
  }
});

//for cruduser addition

router.post("/signin", async (req, res) => {
  const { name, email, password, job, mobile } = req.body;
  if (!name || !email || !password || !job || !mobile) {
    return res.status(422).json({ error: "please fill all the fields" });
  }
  try {
    const preuser = await crudusers.findOne({ email: email });
    if (preuser) {
      return res.status(422).json({ error: "email already exist" });
    }
    const adduser = new crudusers({ name, email, password, job, mobile });
    await adduser.save();
    console.warn(adduser);
    res.status(201).json({ congrats: "user seccessfully user added" });
  } catch (error) {
    res.status(422).json({ error: "something went wrong" });
  }
});

// for all users

router.get("/alluser", async (req, res) => {
  try {
    const userdata = await crudusers.find();
    res.status(201).json(userdata);
    console.warn(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

//for login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "plz fill all the fields" });
  }
  const userlogin = await users.findOne({ email: email });
  if (userlogin) {
    res.status(201).json(userlogin);
  } else {
    return res.status(422).json({ error: "something went wrong" });
  }
});

// for individual

router.get("/indi/:id", async (req, res) => {
  try {
    console.warn(req.params);
    const { id } = req.params;

    const individual = await crudusers.findById({ _id: id });
    if (individual) {
      res.status(201).json(individual);
      console.warn(individual);
    }
  } catch (error) {
    res.status(422).json("something went wrong", error);
  }
});

//for delete

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await crudusers.deleteOne({ _id: id });
    res.status(201).json(result);
    console.warn(result);
  } catch (error) {
    res.status(422).json(error);
  }
});

// for update
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateuser = await crudusers.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.warn(updateuser);
    res.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
