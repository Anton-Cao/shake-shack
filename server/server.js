import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { Dataset } from './db.js';

const app = express();

app.get('/ping', function (req, res) {
    return res.send('pong');
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('listening on port', port);
