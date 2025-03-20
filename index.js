const express = require('express')
const app = express()
const categoryRoutes = require('./routes/categoryRoutes') 
const movieRoutes = require('./routes/movieRoutes.js')
const searchRoutes = require('./routes/searchRoutes.js')

// Middleware for parsing JSON 
app.use(express.json()) 

// Connect category routes
app.use('', categoryRoutes) 
app.use('', movieRoutes)
app.use('/search', searchRoutes)

// The port on which the server will run 
const PORT = process.env.PORT || 3000 

// Start the server 
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); }) 