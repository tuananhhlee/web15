// const fs = require('fs');
// const http = require('http');

// const sever = http.createSever();

// sever.listen(3000);

// const objData={
//     name: 'T.A',
//     age: 18
// }

// console.log("Data: " + JSON.stringify(objData));

// console.log("Start write file");
// fs.writeFile('test.txt',JSON.stringify(objData), (err) =>{
// if(err) console.log(err)
// else console.log("succes");
// });
// console.log("End write file");

// console.log("Start read file");
// const fileData = fs.readFile('test.txt',(err,data) =>{
// if(err) console.log(err)
// else return data;
// });
// console.log(fileData);
// console.log("End read file");


// console.log("Start read file sync");
// const fileDataSync = fs.readFileSync('test.txt',{ encoding: 'utf-8'});
// const dataObj = JSON.parse(fileDataSync);
// console.log(dataObj.name + ' chua ' + dataObj.age);
// console.log("End read file");
// fs.writeFileSync