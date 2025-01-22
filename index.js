const http = require('node:http');
const path = require('node:path');
const rl = require('node:readline/promises');


const foo = async () => {
//HTTP
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n2222');
// })
// server.listen(3000);

//Path
// console.log(path.basename(__filename));
// console.log(path.dirname(__filename));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));
// console.log(path.normalize('/home/maksym///////\/////WORK////\///Lessons/jan-2024-nodejs/index.js'));
// console.log(path.isAbsolute('/home/maksym/WORK/Lessons/jan-2024-nodejs/index.js'));
// console.log(path.isAbsolute('./home/maksym/WORK/Lessons/jan-2024-nodejs/index.js'));

// Readline
    const rlInstance = rl.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const name = await rlInstance.question('Enter your name: ');
    console.log(`Hello, ${name}!`);


}

void foo()

