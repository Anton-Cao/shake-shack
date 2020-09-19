import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import busboy from 'connect-busboy';
import { Dataset } from './db.js';

const app = express();

app.use(busboy());

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.post('/api/uploadfile', async function (req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', async function (fieldname, file, filename) {
        console.log("got file", filename);
        const chunks = [];
        const contents = await new Promise((resolve, reject) => {
            file.on('data', chunk => chunks.push(chunk))
            file.on('error', reject)
            file.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
        });
        console.log('contents', contents);
    });

    return res.send('success');
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('listening on port', port);
