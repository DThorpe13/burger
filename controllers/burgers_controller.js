var express = require("express");

var router = express.Router();

//requiring in our burger.js(model)
var burger = require("../models/burger.js");

//creating our routes for each page using our router
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    console.log(req.body);
    burger.create([
        "burger_name"
    ], [
        req.body.name
    ], function(result) {
        
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = `id = ${req.params.id}`;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devour
    }, condition, function(result) {
        if (result.changedRows == 0) {
            
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//Exporting our route for our server
module.exports = router;