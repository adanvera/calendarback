const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const mongoClient = new MongoClient(MONGO_URI, {
    serverApi:{
        version: '1',
        strict: true,
        deprecationErrors: true
    }
});

const dbConnection = async () => {
    try {
        await mongoClient.connect();
        console.log('MongoDB conectada exitosamente');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    } 
    
    // finally{
    //     await mongoClient.close();
    // }
};

module.exports = {
    dbConnection
}