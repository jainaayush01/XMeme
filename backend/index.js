const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const memes = require('./routes/memes');
const root = require('./routes/root');
require('dotenv').config();
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "XMeme-API",
            version: "0.1.0",
            description: "XMeme-API Information",
            contact: {
                name: "Aayush Jain"
            },        
            servers: [
                { url: "http://localhost:3000/", },]
        }
    },
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/', root);
app.use('/memes', memes);

//db connection
const URI = process.env.db;  
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  })
    .then(() => console.log('Connection to the database successful'))
    .catch((err) => console.log('Connection to the Database failed.\n' + URI + err));

const port = process.env.PORT;
app.listen(port,'0.0.0.0', () => {
    console.log('xmeme backend is up and running at ' + port);
})
