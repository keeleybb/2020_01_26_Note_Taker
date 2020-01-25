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
    // var dbFile = JSON.parse(require('fs').readFileSync('../../../db/db.json', 'utf8'));
    console.log("Is API actually getting called?");
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

// app.delete("/api/notes/:id", function (req, res) {
//Read the file, rewrite variable with data.. Iterate through it to find the ID, then pop it out , then rewrite the file and reload page
//     var indexOfCouseInJson = filePath.map(function (item) { return item.id; }).indexOf(req.params.id); //find the index of :id
//     if (indexOfCouseInJson === -1) {
//         res.statusCode = 404;
//         return res.send('Error 404: No quote found');
//     }

//     var result = json.splice(indexOfCouseInJson, 1);
//     fs.writeFile(jsonFilePath, JSON.stringify(result), function (err) {
//         if (err) throw err;
//         res.json(true);
//     });
// }
// );

//Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/../../index.html'));
})

app.get("/notes", function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../notes.html'));
})


// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    // console.log(path.resolve('../../'));
    // console.log(path.resolve(__dirname + '/../../notes.html'));
})


