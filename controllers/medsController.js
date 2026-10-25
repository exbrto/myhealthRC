import Meds from '../models/Meds.js'        // imports the model from Workouts.js so that it can be saved to the databse

export async function postMed(req, res, next) {       // this function runs when the form is submitted (the POST request)
                                                            // next passes errors to express 
    try {
        const { dateReceived, name, instructions, quantity, expiration, refills } = req.body    // pulls each field out and req.body holds the form data
                                                                                                                            // like a selection is held in req.body.sessionType
        const newMedsList = await Meds.create({     // creates a new wokrout in the database, await means mongoose checks every
            dateReceived,                                       // value first to make sure something that isnt allowd is wasnt entered, then   
            name,                                // it an erorr will occur and itll jump to catch.
            instructions, 
            quantity, 
            expiration,
            refills
    })
        // res.status(201).json({          // use to test and see fi a workout is savedin the databse
        //    success: true,
        //    msg: 'Medication list has been created',
        //    newWorkouts
        res.redirect('/medications')       
    
}   catch(error) {   // if the save attempt fails then an error is thrown.
        next(error)
    }
    
}

export async function updateMed(req, res, next) {

    try {
        const {id} = req.params

        const {quantity, refills} = req.body  // take the new value that was edited and saved

        const updatedMedsList = await Meds.findByIdAndUpdate(
            id,
            {quantity, refills},
            {new: true, runValidators: true}
        )

        res.status(200).json({
            success: true,
            msg: 'Medication list has been completed',
            updatedMedsList
        })
}   catch(error) {
        next(error)
    }

}

export async function deleteMed(req, res, next) {

    try {
        const {id} = req.params

        const deleteThisShi = await Meds.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            msg: 'Medication list session has been deleted',
            deleteThisShi
        })
}   catch(error) {
        next(error)
}

}