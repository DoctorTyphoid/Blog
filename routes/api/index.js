const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
router.get("/", function(req, res) {
    res.send("API");
})
router.get("/users/:id", function(req, res) {
    fetch('https://jsonplaceholder.typicode.com/users/' + req.params.id)
    .then(response => response.json())
    .then(json => res.send(json))
    
})
router.get("/posts", function(req, res) {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => res.send(json))
})
router.get("/posts/:id", function(req, res) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + req.params.id)
    .then(response => response.json())
    .then(json => res.send(json))
})
router.post("/users", function(req, res) {
    res.send("Post Users");
})
router.post("/posts", function(req, res) {
    res.send("Post Posts");
})

module.exports = router; 