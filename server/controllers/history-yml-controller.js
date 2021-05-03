
const HistYml = require('../models/history-yml-model')
const uploadFilesMiddleWare = require('../middleware/upload');

const fs = require('fs');
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline)


uploadYml = async (req, res) => {
    console.log("=================files uploaded============")
    console.log(req.body)
    console.log("=================files uploaded============")
    console.log(req.file)
    const File = fs.readFileSync(req.file.path)

    const fileToInsert = {
        ymlDoc: JSON.parse(File)
    }
  
    // const {
    //     file,
    //     body :{ item }
    // } = req;
    
    // function todayDate(){
    //     const date = new Date();
    //     console.log("This is date", date)
    //     const day = "0" + date.getDate()
    //     const month = '' + ("0" + (date.getMonth() + 1)).slice(-2);
    //     const year = date.getFullYear();
    //     const finalDate = [month, day, year].join("-")
    //     return finalDate
    // }
    

    // const filename = item + "_" +  todayDate() + file.clientReportedFileExtension  
    // await pipeline(
    //     file.stream, 
    //     fs.createWriteStream(`${__dirname}/../uploads/${filename}`)
    // );
    // res.send("File uploaded as "+ filename)

    
    console.log("This is the file To Insert ========> ", fileToInsert.ymlDoc)
    const yml = HistYml(fileToInsert)
    console.log('----------------------- createItem: yml-----------------------')
    console.log(yml)

    return yml
        .save()
        .then((saved) => {
            console.log(saved);
            if (saved) {
                console.error(`201 in 'createItem': Item created!`);
                return res
                    .status(201)
                    .json({
                        success: true,
                        id: yml,
                        message: 'Item created!',
                    });
            };
        })
        .catch(err => {
            console.error(`caught error in 'createItem': ${err}`);
            Object.keys(err.errors).forEach(errorKey => {
                console.error(`ERROR for: ${errorKey}`);
                console.error(`=> ${((err.errors[errorKey] || {}).properties || {}).message}`);
            })
            return res
                .status(400)
                .json({
                    success: false,
                    error: err,
                    message: err,
                });
        });
};
module.exports = {
    uploadYml
};