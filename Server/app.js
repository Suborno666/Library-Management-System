require('dotenv').config();
const express = require('express');
const app = express()
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
const bookRoutes = require("./routes/bookRoutes")
const authorRoutes = require("./routes/authorRoutes")
const path = require('path')
const filepath = path.join(__dirname,"/../Client")

app.use(express.json())
app.set('view engine','hbs')

app.use('/users',userRoutes)
app.use('/book',bookRoutes)
app.use('/author',authorRoutes)
app.use('/admin',adminRoutes)

app.listen(3000);


