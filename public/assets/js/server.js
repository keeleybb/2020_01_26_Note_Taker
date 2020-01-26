const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve('../../'))); //To make static css and js work

//allowing express to use json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//File Paths
const filePath = (path.resolve('../../../db/db.json'));

var obj = []; //Temp Holder

//API
app.get("/api/notes", function (req, res) {
    return res.json(JSON.parse(require('fs').readFileSync(filePath, 'utf8')));
})


app.post("/api/notes", function (req, res) {
    //How to push to an outside file with no name
    const newNotes = req.body;
    console.log(newNotes);

    fs.readFile(filePath, 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now filePath is an object
            obj.push(newNotes); //add some data
            let json = JSON.stringify(obj); //convert it back to json
            fs.writeFile(filePath, json, 'utf8', function (err) {
                if (err) throw err;
                console.log('done!');
            });// write it back 
        }
    });
    return res.json(JSON.parse(require('fs').readFileSync(filePath, 'utf8')));

})


//Do I need to create a page for ID and then iterate through to find a match
app.delete("/api/notes/:id", function (req, res) {
    const dbFile = JSON.parse(require('fs').readFileSync('../../../db/db.json', 'utf8'));

    console.log(req.params.id);
    const result = dbFile.filter(note => note.id != req.params.id);
    fs.writeFile(filePath, JSON.stringify(result), 'utf8', function (err) {
        if (err) throw err;
        console.log('done!');
    });// write it back 
    console.log(result);
    return res.json(true);
});

//Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/../../index.html'));
})

app.get("/notes", function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../notes.html'));
})


// Displays a single note 
// app.get("/api/notes/:id", function (req, res) {
//     var note = req.params.id;
//     var dbFile = JSON.parse(require('fs').readFileSync('../../../db/db.json', 'utf8'));
//     console.log(note);
//     for (var i = 0; i < dbFile.length; i++) {
//         if (note === dbFile[i].id) {
//             return res.json(dbFile[i]);
//         }
//     }
//     return res.json(false);
// });

// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

