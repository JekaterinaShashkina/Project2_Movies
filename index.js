const express = require('express')
const app = express()
const categoryRoutes = require('./routes/categoryRoutes') 
const movieRoutes = require('./routes/movieRoutes.js')
const searchRoutes = require('./routes/searchRoutes.js')
const actorRoutes = require('./routes/actorRoutes.js')
const languageRoutes = require('./routes/languageRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const authMiddleware = require('./middleware/authMiddleware.js')

// Middleware for parsing JSON 
app.use(express.json()) 

// Connect category routes
app.use('', categoryRoutes) 
app.use('/movies', authMiddleware, movieRoutes)
app.use('', actorRoutes)
app.use('', languageRoutes)
app.use('/search', searchRoutes)
app.use('/auth', authRoutes)

// The port on which the server will run 
const PORT = process.env.PORT || 3000 

// Start the server 
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); }) 