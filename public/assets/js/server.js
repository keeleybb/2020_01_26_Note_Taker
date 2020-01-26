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

//API
app.get("/api/notes", function (req, res) {
    return res.json(JSON.parse(require('fs').readFileSync(filePath, 'utf8')));
})


app.post("/api/notes", function (req, res) {
    //How to push to an outside file with no name
    const newNote = req.body;
    const dbFile = JSON.parse(require('fs').readFileSync('../../../db/db.json', 'utf8'));
    dbFile.push(newNote);
    console.log(newNote);
    // write it back 
    fs.writeFile(filePath, JSON.stringify(dbFile), 'utf8', function (err) {
        if (err) throw err;
        console.log('done!');
    });
    return res.json(true);

})


//Delete Notes
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

app.get("/notes", function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../notes.html'));
})

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + '/../../index.html'));
})


// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

