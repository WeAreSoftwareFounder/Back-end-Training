import { createServer } from 'http';
import { appendFile, readFile } from 'fs';
import { parse } from 'url';

createServer((request, response) => {
    let addr = request.url,
        q = parse(addr, true),
        filePath = '';

    appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Added to log.');
        }
    });

    if (q.pathname.includes('documentation')) {
        filePath = (__dirname + '/documentation.html');
    } else {
        filePath = 'index.html';
    }

    readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
        console.log('Server created')


    })
}).listen(8080);