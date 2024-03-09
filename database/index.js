const mongoose = require('mongoose');

const dbConnection = async() =>{

    try {
       await mongoose.connect(process.env.DB_CNN,{
            // userNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        });

        console.log('DB_Online');
    } catch (error) {
        console.log(error);
        throw new Error('error a la hora de iniciar la base de datos');
    }
}

module.exports ={
    dbConnection
}