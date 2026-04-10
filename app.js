//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];

app.get("/", function(req, res) {

  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-us", options);
  res.render("list", { listTitle: day,newListItems:items});
});


app.post("/", function(req, res) {
  // res.send("thanks for posting");
  //console.log(req.body);
    let item = req.body.newitem;
  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  }else {
      items.push(item);
    res.redirect("/");
  }

  // console.log(item);

  // res.redirect("/");
});
app.get("/work",function(req,res) {
  res.render("list",{listTitle:"Work List",newListItems:"workItems"})
});
app.post("/work",function(req,res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");

})

app.listen("4050", function() {
  console.log("Server started on port 4050");
})
