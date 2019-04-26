var http = require('http');
var https = require('https');
var request = require('request');
var formidable = require('formidable');
var busboy = require('connect-busboy')
var bodyParser = require('body-parser');
const google = require('googleapis');
var fs = require("fs");
var googleDrive = require('google-drive');
var XLSX = require('xlsx');
var assert = require('assert');
var express = require('express');
var url = require('url');
var promise = require('bluebird');
var multiparty = require('multiparty');
var app = express();
var builder = require('xmlbuilder');

var sheetNames = ["АНОНС", "ВЕЛОСИПЕДЫ", "СПОРТ_ТУРИЗМ", "ЗАПЧАСТИ", "ИГРУШКА", "ИТОГ", "ОБЩИЙ_ЗАКАЗ", "наличие на складе"];


var dataExcel = null;

// drive = google.drive({version: 'v3'});
app.use('/page', express.static('page'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(busboy());



app.get("/", function(request, response){
// compleateJson();
    // отправляем ответ

    response.send('param');
});
const jsonParser = express.json();
app.post('/get_file', jsonParser, function (req, res) {
        var dataEx = {};
// console.log(req);
    req.on('data', function(data)
    {
        dataEx = JSON.parse(data);
    });
    console.log(dataExcel[0]);
var tmpAr = [];
console.log(req.body.length + "  == length");

    console.log("req.body["+ j + "] = " + dataExcel[2034]);
    console.log("req.body["+ j + "] = " + dataExcel[2033]);
    console.log("req.body["+ j + "] = " + dataExcel[2035]);
    for(var i = 0; i < req.body.length; i++){
        for (var j = 0; j < dataExcel.length; j++){
            // console.log("req.body["+ j + "] = " + typeof (dataExcel[j]['АРТИКУЛ']));

            if( dataExcel[j] === undefined) {
                console.log("__________________________-------------------------------");
                continue;
            }

                if (req.body[i] == dataExcel[j]['АРТИКУЛ']){
                    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
                    // console.log(dataExcel[j]);
                tmpAr.push(dataExcel[j]);
                    // console.log(tmpAr[0]);
                break;
            }
        }
    }
    // console.log(req.body + 'пришло');
    // console.log(dataEx + 'пришло2');
    // console.log(tmpAr[0]['ССЫЛКА'] + '  пришло2');

    for(var i = 0; i < tmpAr.length; i++) {
        (function (i, elem) {
            setTimeout(function () {
                download('https://drive.google.com/uc?export=download&confirm=no_antivirus&id=' + elem['ССЫЛКА'], './uploads/testImage/' + elem['АРТИКУЛ'] + '.jpg', function () {
                    return true;
                });
                console.log(i);
                console.log(elem);
            }, 1500 * (i + 1));
        })(i, tmpAr[i]);
    }

    var xml = builder.create('price-list', {version: '1.0', encoding: 'UTF-8', standalone: true});
    xml.ele('item-list').up();
    for(var i = 0; i < tmpAr.length; i++) {
        xml.ele('item')
            .ele('ID', tmpAr[i]['ID']).up()
            .ele('price', tmpAr[i][9]).up()
            .ele('articul', tmpAr[i]['АРТИКУЛ']).up()
            .ele('currency', tmpAr[i]['ЦЕНА С НДС - предоплата, BYN']).up()
            .ele('name', tmpAr[i]['НАИМЕНОВАНИЕ']).up()
            .ele('picture', 'URLPICTURE/' + tmpAr[i]['АРТИКУЛ'] + '.jpg').up()
            .ele('barcode', tmpAr[i]['ШТРИХКОД']).end();
    }
    xml.ele('item-list').end();

    // fs = require('fs');
   // http://programmerblog.net/generate-xml-with-nodejs-and-mysql/
   //     http://www.curtismlarson.com/blog/2018/10/03/edit-xml-node-js/
    var xmldoc = xml.toString({ pretty: true });

    fs.writeFile('./uploads/testImage/booksxml.xml', xmldoc, function(err) {
        if(err) { return console.log(err); }
        console.log("The file was saved!");

        // res.render('index');
    });

    res.status(200).json(dataEx);
});

/*(function(i, elem) {
    setTimeout(function(){
        download('https://drive.google.com/uc?export=download&confirm=no_antivirus&id='+ elem, './uploads/testImage/toy' + i + '.jpg', function(){
            return true;
        });
        console.log(i);
        console.log(elem);
    }, 1000);
})(i, dataTest[i],);*/

app.post('/file_upload', function (req, res) {
    console.log('=========================================');
    var contentType = req.headers['content-type'];
    var form = new formidable.IncomingForm();
    var result;
    // console.log(trtr.fields.name);
    form.parse(req, function (err, fields, files) {
        var oldpath = files.file.path;
        var newpath = 'uploads/' + files.file.name;
        var nameW = files.file.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;

        });
        console.log(fields['sheet']);
        // parce12(newpath, sheetNames[fields['sheet']]);
        // res.writeHead(200, {"Content-Type": "text/json"});
        // res.setHeader('Content-Type', 'application/json');

        dataExcel = parce12(newpath, sheetNames[fields['sheet']]);
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        // res.json(data);
        // JSON.parse(data);
        // res.json({'name':12});
        // res.status(200).end(JSON.stringify(data));
        console.log(dataExcel[28]);
        res.status(200).json(dataExcel);
    });
    console.log('=========================================');
    // console.log(result);
    // req.pipe(req.busboy);
    // req.busboy.on('file', function(fieldname, file, filename) {
    //     // console.log(fieldname);
    //     // var testFile = fs.read(file);
    //     var fstream = fs.createWriteStream('./uploads/' + filename);
    //     // console.log(parce12('./uploads/' + filename));
    //     file.pipe(fstream);
    //     fstream.on('close', function () {
    //         // res.send("'test': 10");
    //         var tets = parce12('./uploads/' + filename);
    //         // res.send('jr');
    //         console.log(tets);
    //         res.json(tets);
    //     });
    // });
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});

const io = require('socket.io')();
io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

var XLSX = require('xlsx');


// console.log(workbook.Sheets[sheet_name_list[4]]["!cols"][0]);
function parce12(path, sheetName1) {
    var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    var sheets12 = {};
    var data = [];
//готовая функция
//     sheet_name_list.forEach(function (sheetName1) {
        console.log(sheetName1);
        var worksheet = workbook.Sheets[sheetName1];
        var headers = {};

        // console.log(worksheet["!cols"]);
        // console.log('rows = ' + worksheet["!rows"]);
        for (z in worksheet) {
            // console.log(z);
            if (z[0] === '!') continue;
            //parse out the column, row, and value
            var tt = 0;
            for (var i = 0; i < z.length; i++) {
                // console.log(z[i]);
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            }
            ;
            var col = z.substring(0, tt);
            // console.log(col);
            var row = parseInt(z.substring(tt));
            // console.log(row);
            var value = worksheet[z].v;
            // console.log('col  = ' + col + 'row = ' + row + 'value = ' + value);
            //store header names
            if (row == 5 && value) {
                headers[col] = value;
                continue;
                // continue;
            }

            if (!data[row]) data[row] = {};
            data[row][headers[col]] = value;
        }

        data.shift();
        data.shift();
        data.shift();
        data.shift();
        data.shift();
        data.shift();
        data.shift();
        // sheets12 = data;
        // console.log(sheets);
        // fs.writeFile(sheetName1 + "new.json", JSON.stringify(data));
    // });
    // console.log(sheets12['ССЫЛКА']);
    console.log(data[35]['ССЫЛКА'] + '  info');
    var sheet122 = compleateJson(data);

    return sheet122;

    // return sheets12;
}

function compleateJson(sheetReplace) {
    var i = 0;
             for (var row in sheetReplace){
                 var tmpId = '';
                 if (sheetReplace[row]['ССЫЛКА']){
                     sheetReplace[row]['ССЫЛКА'] = sheetReplace[row]['ССЫЛКА'].replace('/view', '');
                     if (sheetReplace[row]['ССЫЛКА'].lastIndexOf('=') > 0) {
                         tmpId = sheetReplace[row]['ССЫЛКА'].slice(sheetReplace[row]['ССЫЛКА'].lastIndexOf('=') + 1);
                         sheetReplace[row]['ССЫЛКА'] = tmpId;
                         // console.log('id = ' + sheetReplace[row]['ССЫЛКА'].slice(sheetReplace[row]['ССЫЛКА'].lastIndexOf('=') + 1));
                     } else {
                         tmpId = sheetReplace[row]['ССЫЛКА'].slice(sheetReplace[row]['ССЫЛКА'].lastIndexOf('/') + 1);
                         sheetReplace[row]['ССЫЛКА'] = tmpId;
                         // console.log('id = ' + sheetReplace[row]['ССЫЛКА'].slice(sheetReplace[row]['ССЫЛКА'].lastIndexOf('/') + 1));
                     }

                 }

                 i++;
             }
    return sheetReplace;
}

// https://drive.google.com/open?id=0B5mDNI2flaG1MnJWc2xkOVBKMDA
// fs.writeFile("hello.json", JSON.stringify(sheets12));
// console.log(sheet_name_list);
/**
 * Скачивание файла
 * @param uri
 * @param filename
 * @param callback
 */
function download(uri, filename, callback){
    request.head(uri, function(err, res, body){
         // console.log('content-type:', res.headers['content-type']);
         // console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', function (stat) {
            callback(true);
        });
    });
    // setTimeout(download(uri, filename, callback), 5000);
}
console.log('test');
var dataTest = ['1oH7bAqTj1fS_qFFlOufBcRICN8MMz0FP', '1oH7bAqTj1fS_qFFlOufBcRICN8MMz0FP', '1oH7bAqTj1fS_qFFlOufBcRICN8MMz0FP'];


/*function download12(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest, { flags: "wx" });

        const request = https.get(url, response => {
            if (response.statusCode === 200) {
                response.pipe(file);
            } else {
                file.close();
                fs.unlink(dest, () => {}); // Delete temp file
                reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
            }
        });

        request.on("error", err => {
            file.close();
            fs.unlink(dest, () => {}); // Delete temp file
            reject(err.message);
        });

        file.on("finish", () => {
            resolve();
        });

        file.on("error", err => {
            file.close();

            if (err.code === "EEXIST") {
                reject("File already exists");
            } else {
                fs.unlink(dest, () => {}); // Delete temp file
                reject(err.message);
            }
        });
    });
}*/
// download12('https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1oH7bAqTj1fS_qFFlOufBcRICN8MMz0FP', './uploads/testImage/sdfghj.jpg')
//     .then( ()=> console.log('downloaded file no issues...'))
//     .catch( e => console.error('error while downloading', e));
// for (var z = 0; z < dataTest.length; z++){
//        setTimeout(download, 7000, 'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=' + dataTest[z], './uploads/testImage/toy' + z + '.jpg', function () {
//            console.log('done');
//        }
//     );
// }

for(var i = 0; i < dataTest.length; i++){
    (function(i, elem) {
        setTimeout(function(){
            download('https://drive.google.com/uc?export=download&confirm=no_antivirus&id='+ elem, './uploads/testImage/toy' + i + '.jpg', function(){
                return true;
            });
            console.log(i);
            console.log(elem);
        }, 1000 * (i + 1));
    })(i, dataTest[i],);
}

for(var zx = 0; zx < 5; zx++){
    (function(zx) {
        setTimeout(function(){
            console.log(zx);
        }, 1000 * (zx + 1));
    })(zx);
}

// download('https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1oH7bAqTj1fS_qFFlOufBcRICN8MMz0FP', './uploads/testImage/toy2.jpg', function(){
//     return true;
// });



// var downloadcv = (url, path) => new Promise((resolve, reject) => {
//     https.get(url, response => {
//         const statusCode = response.statusCode;
//
//         if (statusCode !== 200) {
//             return reject('Download error!');
//         }
//
//         const writeStream = fs.createWriteStream(path);
//         response.pipe(writeStream);
//
//         writeStream.on('error', () => reject('Error writing to file!'));
//         writeStream.on('finish', () => writeStream.close(resolve));
//     });}).catch(err => console.error(err));
//
// downloadcv('https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1oH7bAqTj1fS_qFFlOufBcRICN8MMz0FP', './uploads/testImage/sdfghj.jpg');



// var downloadnew = function(uri, filename, callback) {
//     console.log(uri, filename);
//
//     // make the filename not need a directory
//     // var file = 'image123.jpg';
//
//     request.head(uri, function(err, res, body) {
//
//         // console.log('content-type:', res.headers['content-type']);
//         // console.log('content-length:', res.headers['content-length']);
//
//         var r = request(uri).pipe(fs.createWriteStream('./uploads/testImage/' + filename));
//         r.on('close', callback);
//         r.on('error', error);
//     });
// };
//
//     // var directory = _.initial(filename.split('/')).join('/');
//     // fs.mkdir(directory);
//
//
// // handle errors
// var error = function(message) {
//     console.log(message);
// };


/*function someAsyncOperation (tmpId, i, callback) {
    // Предположим, это завершится через 95мс
    var source = request('https://drive.google.com/uc?export=download&confirm=no_antivirus&id=' + tmpId);
    var dest = source.pipe(fs.createWriteStream('./uploads/testImage/newteststst' + i + '.jpg'));
    var promise = new Promise((resolve, reject) => {
        dest.on('finish', resolve);
        source.on('error', reject);
        dest.on('error', reject);
    }).catch(e => new Promise((_, reject) => {
        dest.end(() => {
            fs.unlink('./uploads/testImage/newteststst' + i + '.jpg', () => reject(e));
        });
    }));
    return callback;
}*/



// download('https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1oH7bAqTj1fS_qFFlOufBcRICN8MMz0FP', './uploads/testImage/teststst1.jpg');