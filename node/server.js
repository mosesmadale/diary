const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const PORT = process.env.PORT || 8080;
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000
};
const server = http.createServer((req, res) => {
    const myUrl = new URL(`http://localhost:${PORT}${req.url}`);
    let entry = {},
        hugeObject = {};
    myUrl.searchParams.forEach((value, key) => {

            if (key == 'delete') {
                //get file contents
                fs.readFile(path.join(__dirname, '../', 'assets', 'entries', 'store.json'), 'utf8', (err, data) => {
                    if (err) throw err;
                    prevFileContent = data;
                    hugeObject.v = JSON.parse(prevFileContent)
                    let deleted = hugeObject.v.splice(eval(value), 1)
                    hugeObject.v.forEach((e, i) => {
                            e['ID'] = i;
                        })
                        //adding data back to the file

                    //read the recovery file
                    fs.readFile(path.join(__dirname, '../', 'assets', 'entries', 'recover.json'), 'utf8', (err, data) => {
                        if (err) throw err;
                        let readyData = JSON.parse(data);
                        readyData.push(deleted[0]);
                        //write to the file to update the recovery file
                        fs.writeFile(path.join(__dirname, '../', 'assets', 'entries', 'recover.json'), JSON.stringify(readyData), err => {
                            if (err) throw err;
                        })
                    })
                    fs.writeFile(path.join(__dirname, '../', 'assets', 'entries', 'store.json'), JSON.stringify(hugeObject.v), err => {
                        if (err) throw err;
                        console.log('New Diary entry added successfully!');
                    })
                });
            }

            if (key == 'title') {
                entry.title = value;
            }

            if (key == 'date') {
                entry.date = value;
            }

            if (key == 'description') {
                entry.description = value;
                //getting data from file
                let prevFileContent;
                fs.readFile(path.join(__dirname, '../', 'assets', 'entries', 'store.json'), 'utf8', (err, data) => {
                    if (err) throw err;
                    prevFileContent = data;
                    hugeObject.v = JSON.parse(prevFileContent)
                    entry['ID'] = hugeObject.v.length;
                    hugeObject.v.push(entry);
                    //adding data back to the file
                    fs.writeFile(path.join(__dirname, '../', 'assets', 'entries', 'store.json'), JSON.stringify(hugeObject.v), err => {
                        if (err) throw err;
                        console.log('New Diary entry added successfully!');
                    })
                });
            }

        })
        //set to html the updated version of the diary
    fs.readFile(path.join(__dirname, '../', 'assets', 'entries', 'store.json'), 'utf8', (err, data) => {
        if (err) throw err;
        res.writeHead(200, headers);
        res.end(data)
    });




})

server.listen(PORT, () => console.log('server running on port 8080!'))