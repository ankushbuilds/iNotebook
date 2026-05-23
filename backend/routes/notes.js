const express = require('express'); //importing express module or library so i can use it in this file to create routes and handle requests and responses
const router = express.Router(); //creating a router object using express.Router() method which will be used to define routes for this module
const Note = require('../models/Note');//importing the Note model from the models directory so i can interact with the note data in the database
const fetchUser = require('../middleware/fetchUser'); //importing the fetchUser middleware from the middleware directory which will be used to authenticate users before allowing them to access certain routes
const { body, validationResult } = require('express-validator'); //importing the body and validationResult functions from the express-validator library which will be used to validate incoming request data for certain routes

// Route 1 : Get all the notes using: GET "/api/notes/fetchnotes". Login required
router.get('/fetchnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }); //finding all the notes in the database that belong to the authenticated user and storing them in the notes variable
        res.json(notes); //sending the notes as a JSON response to the client
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2 : Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchUser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }), // validating that the title field has a minimum length of 3 characters
        body("description", "Enter a valid description").isLength({ min: 5 }), // validating that the description field has a minimum length of 5 characters
    ],
    async (req, res) => {
        //  checking for validation errors and if there are any, returning a 400 Bad Request response with the error details in JSON format
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, description, tag, date } = req.body; // destructuring the title, description, tag, and date fields from the request body
            const note = new Note({
                title, description, tag, date, user: req.user.id
            });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }

    });

// Route 3 : Update an existing note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchUser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body; // destructuring the title, description, and tag fields from the request body

            // creating a newNote object and adding the fields that are present in the request body
            const newNote = {};
            if (title) { newNote.title = title }; // if the title field is present in the request body, adding it to the newNote object
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };


            // FIND THE NOTE TO BE UPDATED AND UPDATE IT
            let note = await Note.findById(req.params.id); // finding the note in the database using the id parameter from the request URL
            if (!note) { return res.status(404).send("Not Found") }; // if the note is not found, returning a 404 Not Found response

            // Allow update only if user owns this Note
            if (note.user.toString() !== req.user.id) { // if the user who is trying to update the note is not the owner of the note

                return res.status(401).send("Not Allowed");
            }
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({ note }); // sending the updated note as a JSON response to the client
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    });


//  Route 4 : Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // FIND THE NOTE TO BE DELETED AND DELETE IT
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
