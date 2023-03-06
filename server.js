const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 
app.get('/restaurant', async (req, res) => {
    const data = await Restaurant.findAll()
    res.send(data);
})

app.get('/restaurants/:id', async (req, res) => {
    const id = await Restaurant.findByPk(req.params.id)
    res.json(id);
})
  
  


app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})