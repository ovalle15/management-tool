
const HistYml = require('../models/history-yml-model')


uploadYml = (req, res) => {
    const body = req.body; 

    console.log('----------------------- uploadItem: req -----------------------')
    console.log(req);
    console.log('----------------------- uploadItem: body -----------------------')
    console.log(body);

    if (!body) {
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide an item'
            });
    }
    
    const item = new HistYml(body);
    console.log('--------------- uploadItem: item ------------------------');
    console.log(item)

    if (!item) {
        console.error(`400 in 'uploadYml': 'Item' is malaformed`)
        return res 
            .status(400)
            .json({
                success: false, 
                message: "'item' is malformed"
            });
    }
    return item 
        .save()
        .then((saved) => {
            console.log(saved);
            if (saved) {
                console.error(`201 in 'uploadItem': Item uploaded`);
                return res 
                    .status(201)
                    .json({
                        success: true, 
                        id: item, 
                        message: 'Item created!',
                    });
            };
        })
        .catch(err => {
            console.error(`caught error in "uploadItem": ${err}`);
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
}
module.exports = {
    uploadYml
}