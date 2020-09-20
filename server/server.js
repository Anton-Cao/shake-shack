import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
// import busboy from 'connect-busboy';
import multer from 'multer';
import csv from 'fast-csv';
import fs from 'fs';
import { Dataset } from './db.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: 'tmp/csv/' });

// app.use(busboy());

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/api/data/:key', function (req, res) {
    Dataset.findById(req.params.key, function (err, ds) {
        if (ds) {
            res.send(ds.data);
        } else {
            res.send([])
        }
    });
});

app.post('/api/uploadfile', upload.any('file'), function (req, res) {
    const path = req.files[0].path;
    // const path = req.file.path;
    console.log('received file', path);
    const fileRows = [];
    csv.parseFile(path)
        .on("data", function (data) {
            fileRows.push(data); // push each row
        })
        .on("end", function () {
            fs.unlinkSync(path);   // remove temp file
            //process "fileRows" and respond
            const keys = fileRows[0];
            const data = [];
            for (let i = 1; i < fileRows.length; i++) {
                const row = {};
                for (let j = 0; j < keys.length; j++) {
                    row[keys[j]] = fileRows[i][j];
                }
                data.push(row);
            }
            const ds = new Dataset({
                data: data
            });
            ds.save();
            const key = ds._id;
            console.log(key.toString());
            res.send(key.toString());
        });
});

// app.post('/api/uploadfile', async function (req, res) {
//     req.pipe(req.busboy);
//     req.busboy.on('file', async function (fieldname, file, filename) {
//         console.log("got file", filename);
//         const chunks = [];
//         const contents = await new Promise((resolve, reject) => {
//             file.on('data', chunk => chunks.push(chunk));
//             file.on('error', (error) => {
//                 console.log(error)
//                 reject();
//             });
//             file.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
//         });
//         console.log('contents', contents);
//         const lines = contents.split("\n");
//         console.log(lines.length);
//     });

//     return res.send('success');
// });

const port = process.env.PORT || 8080;
app.listen(port);
console.log('listening on port', port);
