
const HistYml = require('../models/history-yml-model')
const fs = require('fs');
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline)


uploadYml = async (req, res) => {
       console.log("=================files uploaded============")
       console.log(req.body)
       console.log("=================files uploaded req.file============")
       console.log(req.file)


       const {
           file, 
           body: { item }
       } = req;
    //    const todayYear = new Date().getFullYear()
       const filename = item +file.clientReportedFileExtension; 
       await pipeline(
           file.stream, 
           fs.createWriteStream(`${__dirname}/../../${filename}`)
       );
       res.send('File uploaded as' + filename)
    // const body = req.body; 


    // console.log('----------------------- uploadItem: req -----------------------')
    // console.log(req);
    // console.log('----------------------- uploadItem: body -----------------------')
    // console.log(body);

    // if (!body) {
    //     return res
    //         .status(400)
    //         .json({
    //             success: false,
    //             error: 'You must provide an item'
    //         });
    // }
    // const item = new HistYml(body);
    // console.log('--------------- uploadItem: item ------------------------');
    // console.log(item)

    // if (!item) {
    //     console.error(`400 in 'uploadYml': 'item' is malaformed`)
    //     return res 
    //         .status(400)
    //         .json({
    //             success: false, 
    //             message: "'item' is malformed"
    //         });
    // }
    // return item 
    //     .save()
    //     .then((saved) => {
    //         console.log(saved);
    //         if (saved) {
    //             console.error(`201 in 'uploadItem': Item uploaded`);
    //             return res 
    //                 .status(201)
    //                 .json({
    //                     success: true, 
    //                     id: item, 
    //                     message: 'Item created!',
    //                 });
    //         };
    //     })
    //     .catch(err => {
    //         console.error(`caught error in 'uploadItem': ${err}`);
    //         Object.keys(err.errors).forEach(errorKey => {
    //             console.error(`ERROR for: ${errorKey}`);
    //             console.error(`=> ${((err.errors[errorKey] || {}).properties || {}).message}`);
    //         })
    //         return res 
    //             .status(400)
    //             .json({
    //                 success: false, 
    //                 error: err, 
    //                 message: err,
    //             });
    //     });
}
module.exports = {
    uploadYml
}