// Imagine you have a very large amount of data that you need to read.. using readFile (async) makes stuff a little bit slow. ..Instead we use streams, to sent small chunks of data at a time and use before the data is completely received ('something like Netflix, u watch before u have completely downloaded the whole video')

const fs = require('fs')

const readStream = fs.createReadStream('./bigdata.txt', { encoding: 'utf8' });
// encoding allows us to access human readable format of data without using toString

const writeStream = fs.createWriteStream('./copyBigData.txt');

// readStream.on('data', (chunk)=> {
//     console.log('----NEW CHUNK------');
//     console.log(chunk);

//     writeStream.write('\n DUPLICATE NEW CHUNK \n');
//     writeStream.write(chunk)
// })


// ? Piping
// piping does the above in a neat way
readStream.pipe(writeStream);
