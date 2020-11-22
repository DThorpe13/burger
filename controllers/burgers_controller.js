var express = require("express");

var router = express.Router();

//Import the model to use it DB functions
var burger = require("../models/burger.js");

//create all routes and set up logic within routes where required
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
        //send back the ID of the new quote
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
            //If no rows were changed, then ID must not Exist, throw 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//Export route for server.js
module.exports = router;