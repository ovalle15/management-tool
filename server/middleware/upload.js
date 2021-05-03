// const util = require("util");
// const multer = require('multer');
// const GridStorage = require('multer-gridfs-storage');


// var storage = new GridStorage({
//     url: 'mongodb://127.0.0.1:27017/management',
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {

//         return {
//             bucketName: "historyTrials",
//             filename : `${Date.now()}-${req.body.item}-${file.clientReportedExtension}`
//         }
//     }

// }) ;

// var uploadFile = multer({storage: storage}).single("file")
// var uploadFilesMiddleWare = util.promisify(uploadFile)
// module.exports = { 
//     uploadFilesMiddleWare 
// }