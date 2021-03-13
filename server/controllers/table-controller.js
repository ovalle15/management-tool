
const { response } = require('express');
const Table = require('../models/table-model');

getItems =  async(req, res) => {
    await Table.find({}, (err, items) => {
        if (err) {
            console.error(`400 in 'getItems': ${err}`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: err,
                });
        }
        if (!items.length) {
            console.error(`404 in 'getItems': Items not found`);
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'Items not found',
                });
        }
        console.log(`200 in 'getItems': Items fetched!`);

        return res.format({

            "application/json": () => {
              res.json({
                  succes: true,
                  items: items
              });
            },

            "application/xml": () => {
              const zipXml = `
              <?xml version="1.0"?>
              ${items.map((c) => `
            <items>
                <itemId> ${c._id} </itemId>
                <title>${c.title}</title>
                <createdDate>${c.createdAt}</createdDate>
                <updatedDate>${c.updatedAt}</updatedDate>
            </items>
                `)}
              `;
              res.type("application/xml");
              res.send(zipXml);
            }
        })
    });
};
getItemsById = async(req, res) => {
    await Table.find({ _id: req.params.id }, (err, Items) => {
        if (err) {
            console.error(`400 in 'getTreeById': ${err}`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: err,
                });
        }
        if (!items.length) {
            console.error(`404 in 'getItemsId': Item not found`);
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'Item not found',
                });
        }
        console.log(`200 in 'getItemsById': Item fetched!`);
        return res
            .status(200)
            .json({
                success: true,
                item: items[0],
            });
    }).catch(err => {
        console.error(`caught error in 'getItemsById': ${err}`);
        console.error(err);
        return err;
    });
};
createItem = (req, res) => {
    const body = req.body;
    console.log('----------------------- createItem: req -----------------------')
    console.log(req);
    console.log('----------------------- createItem: body -----------------------')
    console.log(body);
    if (!body) {
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide an item.',
            });
    }

    const item = new Table(body);

    if (!item) {
        console.error(`400 in 'createItem': 'Item' is malformed.`);
        return res
            .status(400)
            .json({
                success: false,
                message: "'Tree' is malformed"
            });
    }

    return item
        .save()
        .then((saved) => {
            console.log(saved);
            if (saved) {
                console.error(`201 in 'createItem': Item created!`);
                return res
                    .status(201)
                    .json({
                        success: true,
                        id: item._id,
                        message: 'Tree created!',
                    });
            };
        })
        .catch(err => {
            console.error(`caught error in 'createITree': ${err.errors.name}`);
            Object.keys(err.errors).forEach(errorKey => {
                console.error(`ERROR for: ${errorKey}`);
                console.error(`=> ${((err.errors[errorKey] || {}).properties || {}).message}`);
            })
            return res
                .status(400)
                .json({
                    success: false,
                    error: err.errors,
                    message: err.errors.name,
                });
        });
};
updateItem = (req, res) => {

    console.log("This is the body ---->", req.body)
    const body = req.body;
    // console.log('----------------------- updateItem: req -----------------------');
    // console.log(req);
    // console.log('----------------------- updateItem: body -----------------------');
    // console.log(body);
    if (!body) {
        console.error(` 400 in 'updateTree': You must provide an Tree to update.`);
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide an item to update.',
            });
    }

    const itemForUpdate = {
        _id: req.params.id,
        title: body.title,
        children: body.children
    };

    // console.log('----------------------- updateItem: res -----------------------');
    // console.log(res);

    return Table.updateOne({ _id: req.params.id }, itemForUpdate, (err, writeOpRes) => {
        console.log("This is the item to be updated ->", req.params.id);
        if (err) {
            console.error(`'updateItem': Item not found!`);
            console.error(err);
            return res
                .status(404)
                .json({
                    success: false,
                    error: err,
                    message: 'Item not found!',
                });
        };

        console.log('----------------------- updateItem: item -----------------------');
        console.log(writeOpRes);
        return writeOpRes;
    })
    .then(result => {
        console.log('----------------------- updateItem - findOne: result -----------------------');
        console.log(result);
        console.log('----------------------- updateItem - findOne: res -----------------------');
        console.log(res);
        console.log(` 200 in 'updateItem': Item updated!`);
        return res
            .status(200)
            .json({
                success: true,
                id: req.params.id,
                message: 'Item updated!',
                writeOpResult: result
            });
    }).catch(err => {
        console.error(`caught error in 'updateTree': ${err}`);
        console.error(err);
        return err;
    });
};
deleteItem = async (req, res) => {
    await Table.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) {
            console.error(`400 in 'deleteTree': ${err}`);
            return res
                .status(400)
                .json({
                    succes: false,
                    error: err,
                });
        }

        if (!item) {
            console.error(` 400 in 'deleteTree': Item not found!`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: 'Tree not found!',
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                item: item,
            });
    }).catch(err => {
        console.error(`caught error in 'deleteItem': ${err}`);
        console.error(err);
        return err;
    });
};
module.exports = {
    getItems,
    getItemsById,
    createItem,
    updateItem,
    deleteItem
};