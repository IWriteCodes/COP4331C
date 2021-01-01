  
const mongoose = require('mongoose');
const Item = mongoose.model('Item');

const Schema = mongoose.Schema;

const orderSchema = new Schema 
(
    {
        username: {type: String, unique: true, required: true},
        itemList: [{type: Item.schema}],
        cost: {type: Number, required: true},
        isReady: {type: Boolean},
        status: {type: String}
    },
    {
        timestamps: true,
    }
);

const ItemOrder = mongoose.model('Order', orderSchema);

module.exports = ItemOrder;