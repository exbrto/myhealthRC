import mongoose from 'mongoose'

// Schema is like a blueprint for one worklout session. enum: [] --> says these are the only values allowd for this feild.
// lowercase: true ==> turn the value into lowercase before saging it. 
const medsSchema =  new mongoose.Schema({
    dateReceived: {type: Date, required: true},
    name: {type: String, required: true},    // option value must in the select must be the same as the string must lowercased
    instructions: {type: String, required: true},
    quantity: {type: String, required: true},
    expiration: {type: Date, required: true},
    refills: {type: String, required: true},
   
    completed: {type: Boolean, default: false}
})

// The model is what we use to Create, Read, Update, and Delete workout sessions
// Workouts is what becomes the collection 'workouts' in the mongodb database
const Medications = mongoose.model('Medications', medsSchema)

export default Medications   // exports the model so that workoutsContoler.js can usse it