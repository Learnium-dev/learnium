const testControl = (req, res) => {
  console.log("testControl");
  console.log(req.body);
  res.json({ message: "testControl" });
};

module.exports = testControl;
