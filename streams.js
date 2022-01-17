// Start Using data before it has finished loading

const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding:'utf-8'});

const writeStream = fs.createWriteStream('./docs/blog4.txt');


readStream.on('data', (chunk)=>{
    console.log('-------- NEW CHUNK ---------');
    console.log(chunk);
    writeStream.write('\n NEW CHUNK \n')
    writeStream.write(chunk);
});

//Piping
// This does the same as the above code, it reads data and writes it to the writestream
 
readStream.pipe(writeStream);
