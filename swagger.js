const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Drugstore Management API',
        description: 'This API is the final project for BYU-I class CSE341 and is intended to manage a drugstore storing data from drugs, vendors, clients, and users'
    }, 
    host: 'cse341-6f28.onrender.com',
    schemes: ['https']
}; 

const outputfile = './swagger-document.json'
const endpointsFiles = ['./routes/index.js']

// this will generate swagger.json
swaggerAutogen(outputfile, endpointsFiles, doc); 