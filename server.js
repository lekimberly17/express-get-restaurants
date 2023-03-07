const express = require('express')
const app = express()
const { Restaurant } = require('./models/index')
const { sequelize } = require('./db')

const port = 3000

// Middleware to parse the request body as JSON
app.use(express.json())

// Get all restaurants
app.get('/restaurants', async (req, res) => {
    const data = await Restaurant.findAll()
    res.send(data)
})

// Get a restaurant by id
app.get('/restaurants/:id', async (req, res) => {
    const id = await Restaurant.findByPk(req.params.id)
    res.json(id)
})

// Create a new restaurant
app.post('/restaurants', async (req, res) => {
    const { name, address, cuisine } = req.body;
    const newRestaurant = await Restaurant.create({
        name,
        address,
        cuisine
    })
    res.json(newRestaurant)
})

// Update an existing restaurant by ID
app.put('/:id', async (req, res) => {
      const { id } = req.params;
      const { name, address, cuisine } = req.body
      const restaurant = await Restaurant.findByPk(id)
  
    
      restaurant.name = name
      restaurant.address = address
      restaurant.cuisine = cuisine
  
      const updatedRestaurant = await restaurant.save()
  
      res.json(updatedRestaurant)
  })

  // Delete a restaurant by ID
app.delete('/:id', async (req, res) => {
      const { id } = req.params;
      const restaurant = await Restaurant.findByPk(id);
  
      await restaurant.destroy();
      res.json({ message: 'Restaurant deleted successfully' });
  })

app.listen(port, () => {
    sequelize.sync()
    console.log("Your server is listening on port " + port)
})
