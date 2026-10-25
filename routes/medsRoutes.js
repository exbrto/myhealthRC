import express from 'express'

import {postMed, updateMed, deleteMed} from '../controllers/medsController.js'  // this imports the function from workoutsController which handles workoout sessions beig saved to the databse.

const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        msg: 'Hello World'
    })
})

router.post('/', postMed)

router.put('/:id', updateMed)

router.delete('/:id', deleteMed)

export default router   // exports router to app.js