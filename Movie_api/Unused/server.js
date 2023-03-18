
import { createServer, Server } from 'http';
import { appendFile, readFile } from 'fs';
import { parse } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

createServer((request, response) => {

    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello Node!" \n')
    console.log('My fist sever is running on: Port 8080 ')

    let addr = request.url,
        q = parse(addr, true),
        filePath = '';

    appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Added to log.txt file');
        }
    });

    if (q.pathname.includes('documentation')) {
        filePath = (__dirname + '/documentation.html');
    } else {
        filePath = '/index.html';
    }

    readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });
}).listen(8080);
console.log('Sever Running on port: 8080');