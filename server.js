const express = require('express')
const cors = require('cors')
const router = require('./routes/index');
const helmet = require('helmet');
const xss = require('xss-clean');

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Demo API User Store',
      version: '1.1.2',
    },
    servers : [
        {
            url: 'http://localhost:5000'
        }
    ], 
  },
  apis: ['./routes/users.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);



const PORT = process.env.PORT || 5000

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(xss());

app.use("/", router)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use((_, res) => {
    res.status(404).send("Sorry, can't find that!")
})

app.listen(PORT, () => {
    console.log(`Express App listening on port : ${PORT}`)
})