const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let YmlSchema = new Schema(
    {
        item: {
            type: String,
            required: true
        },
        ymlDoc : {
            type: Array,
            of: Object,
            required: false
        }
    }, {
	timestamps: true
});

const HistYml = mongoose.model('table', YmlSchema);
console.log("THIS IS THE HistYml -------->", HistYml);
module.exports = mongoose.model('historyTrials', HistYml);
