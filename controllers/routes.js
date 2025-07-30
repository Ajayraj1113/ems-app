const express = require("express");
const router = express.Router();
const Employee = require("../models/user");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/create-user", (req, res) => {
  res.render("addEmp");
});

router.post("/save-emp", async (req, res) => {
  // console.log("hiiii")
  // console.log(req.body)
  try {
    const employee = new Employee({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.mobile,
      city: req.body.city,
    });

    await employee.save();
    res.redirect("/emp");

    res.status(201).json({
      msg: "user created successfully!!",
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
});

router.get("/show-all-emp", async (req, res) => {
  try {
    const result = await Employee.find();
    res.render("showEmp", { list: result });
  } catch (error) {
    console.log("ERROR: ", error);
  }
});

router.get("/delete-all-emp", async (req, res) => {
  try {
    const result = await Employee.find();
    res.render("deleteEmp", { list: result });
  } catch (error) {
    console.log(error);
  }
});

router.get("/final-delete/:userId", async (req, res) => {
  try {
    const result = await Employee.findByIdAndDelete(req.params.userId)
    res.redirect("/emp")
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
