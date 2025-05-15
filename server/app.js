require('dotenv').config();
const express = require('express');
const app = express()
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
const bookRoutes = require("./routes/bookRoutes")
const authorRoutes = require("./routes/authorRoutes")

app.use(express.json())

app.use('/users',userRoutes)
app.use('/book',bookRoutes)
app.use('/author',authorRoutes)
app.use('/admin',adminRoutes)

app.listen(3020);


