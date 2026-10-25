import 'dotenv/config'              // get things from env file first or will be undefined
import mongoose from 'mongoose'     // mongoose library is like a brdge between JS and MongoDB

export async function connectDB(){     // exports to server.js and allows server.js to use this function
    
    await mongoose.connect(process.env.WUMBOLOGY)       // connects to MOngoDB using the variable made in env file 
    console.log('mongoDB.connected')                // MongoDb is also hidden in the env file 
}