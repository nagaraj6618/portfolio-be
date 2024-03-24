const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 4000; 
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
// const ContactSchema = require('./model/contact.js');
const contactRoute = require('./route/contactRoute.js');
const authRoute = require('./route/authRoute.js');
const cors = require('cors')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
const corsOptions = {
    origin: true,
    credentials: true,
 
  }


//middleware
app.use(express.json())
app.use(cors(corsOptions))


app.use(cookieParser());
connection.once('open', () => {
    console.log("MongoDB Connected");
    connection.useDb('portfolio'); 
});
connection.on('error', (error) => console.log("MongoDB Connection Error:", error));

app.get('/', (req, res) => {
    res.json({ message: "Server Working.." });
});


app.use('/api/v1/contact',contactRoute);

app.use('/api/v1/auth',authRoute);
app.listen(PORT, () => console.log(`Server working at http://localhost:${PORT}`));
