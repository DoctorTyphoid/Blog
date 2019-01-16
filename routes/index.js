const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/", function(req, res) {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
        // var posts = {

        // }
        // json.forEach((post)=>{
        //     fetch('https://jsonplaceholder.typicode.com/users/')
        //     .then(response => response.json())
        //     .then(json => {
                
        //     })
        // })
        res.render("home", { 
            title : "Homepage", 
            posts: json });
    }) 
})

router.get("/blog/:id", function(req, res) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + req.params.id)
    .then(response => response.json())
    .then(json => {
        
            fetch('https://jsonplaceholder.typicode.com/users/' + json.userId)
            .then(response => response.json())
            .then(json2 => {
                var post = {
                    title : json.title,
                    user : json2.name,
                    body : json.body
                }
            res.render("post", {
                post : post
            })
        
        
        
    })
})
    
})
router.get("/users/:id", function(req, res) {
    fetch('https://jsonplaceholder.typicode.com/users/' + req.params.id)
    .then(response => response.json())
    .then(json => res.send(json))
})
module.exports = router;