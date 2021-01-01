const router = require('express').Router();
let ItemOrder = require('../models/order.model');

router.route('/').get((req, res) => 
{
    ItemOrder.find()
        .then(itemOrders => res.json(itemOrders))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => 
{
    const username = req.body.username;
    const itemList = req.body.itemList;
    const cost = Number(req.body.cost);
    const isReady = req.body.isReady;
    const status = req.body.status;

    const newItemOrder = new ItemOrder
    ({
        username,
        itemList,
        cost,
        isReady,
        status
    });

    newItemOrder.save()
        .then(() => res.json('Item Order added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => 
{
    ItemOrder.findById(req.params.id)
        .then(itemOrder => res.json(itemOrder))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => 
{
    ItemOrder.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item Order deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => 
{
    ItemOrder.findById(req.params.id)
        .then(itemOrder => 
        {
            itemOrder.username = req.body.username;
            itemOrder.itemList = req.body.itemList;
            itemOrder.price = Number(req.body.cost);
            itemOrder.isReady = req.body.isReady;
            itemOrder.status = req.body.status;

            itemOrder.save()
                .then(() => res.json('Order Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;