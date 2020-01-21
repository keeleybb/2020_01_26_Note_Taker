const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

//allowing express to use json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const filePath = (path.resolve('../../../db/db.json'));
// var file2 = fs.readFile('../../../db/db.json')



var obj = []; //Temp Holder

//Routes
app.get("/", function (req, res) {
    res.sendFile(path.resolve('../../index.html'));
})

app.get("/notes", function (req, res) {
    res.sendFile(path.resolve('../../notes.html'));
})

//API
app.get("/api/notes", function (req, res) {
    return res.sendFile(path.resolve('../../../db/db.json'));
})
// app.post("/api/tables", function (req, res) {
//     const newTable = req.body;
//     console.log(newTable);

//     });


//     // if (tables.length >= 5) {
//     //   waitlist.push(newTable);
//     //   res.json(false)
//     // } else {
//     //   tables.push(newTable);
//     //   console.log(tables);
//     //   res.json(true) //Getting on Postman side
//     // }

//     // res.json(tables);

// });


app.post("/api/notes", function (req, res) {
    //How to push to an outside file with no name
    const newNotes = req.body;
    console.log(newNotes);
    // obj.push(newNotes);
    // var json = JSON.stringify(obj);
    // console.log(req);
    // filePath.push(JSON.stringify(newNotes));

    fs.readFile(filePath, 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it's an object
            obj.push(newNotes); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile(filePath, json, 'utf8', function (err) {
                if (err) throw err;
                console.log('done!');
            });// write it back 
        }
    });

    // fs.appendFile((path.resolve('../../../db/db.json')), ', ' + JSON.stringify(newNotes) + ']', function (err) {
    //     if (err) throw err;
    //     console.log('done!');
    //     // const filename = (path.resolve('../../../db/db.json'));
    //     // filename.push(newNotes)
    // })

    //push newNotes to file
    // console.log();
    // return fs.readFile('../../../db/db.json', JSON.strigify(jsonData));
})

// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})