const fs = require('fs');

// ? creating files
// readfile takes two args : string of the relative path, A function that fires once successful

// fs.readFile('./names.txt', (err, data) => {
//     if(err){
//         console.log(err);
//     }
//     console.log(data.toString());
// });

// console.log('last line')

// the readFile is a asynchronous function


// ? deleting files

if (fs.existsSync('./deleteme.txt')){
    fs.unlink('./deleteme.txt', (err)=> {
        if(err){
            console.log(err);
        }
        console.log('file deleted')
    })
}else{
    console.log('No such file')
}


// ? writing files
// when writing files if the path doesn't exist, then a new file will be created and written
// fs.writeFile('./names.txt', 'This will be the new text', () => {
//     console.log('file written')
// })



// ? directories
// check whether the folder exists first

if (!fs.existsSync('./assets')){
    fs.mkdir('./assets', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('folder created')
    })
}else{
    fs.rmdir('./assets', (err)=> {
        if(err){
            console.log(err);
        }
        console.log('folder deleted')
    })
}