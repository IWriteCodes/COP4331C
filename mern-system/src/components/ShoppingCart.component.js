import React, {Component} from 'react';
import axios from 'axios';

const Item = props => (
    <tr>
        <td>{props.item.name}</td>
        <td>{props.item.description}</td>
        <td>{props.item.cost}</td>
    </tr>
)

export default class ShoppingCart extends Component
{
    constructor(props)
    {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = 
        {
            orderID: '',
            items: [],
            username: '',
            itemList: [],
            cost: 0,
            isReady: false,
            status: ''
        };
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/items/')
            .then(response => 
            {
                this.setState({items: response.data})
            })
            .catch((error) => 
            {
                console.log(error);
            })
        this.setState({username: localStorage.getItem("Username")})
        axios.get('http://localhost:5000/itemOrders')
            .then(response =>
            {
                for (var i = 0; i < response.data.length; i++)
                {
                    if (response.data[i].username.localeCompare(this.state.username) === 0)
                    {
                        if(response.data[i].isReady)
                        {
                            break;
                        }
                        this.setState({itemList: response.data[i].itemList})
                        this.setState({orderID: response.data[i]._id})
                        this.setState({cost: response.data[i].cost})
                        this.setState({isReady: response.data[i].isReady})
                        this.setState({status: response.data[i].status})
                        console.log(this.state.cost);
                    }

                }
            })
            .catch((error) =>
            {
                console.log(error);
            })
        
    }

    onSubmit(e)
    {
        e.preventDefault();

        const itemOrder = 
        {
            username: this.state.username,
            itemList: this.state.itemList,
            cost: this.state.cost,
            isReady: true,
            status: 'Order Recieved'
        }
        
        axios.post('http://localhost:5000/itemOrders/update/'+this.state.orderID, itemOrder)
            .then(res => {console.log(res.data)});

    }

    itemList()
    {
            return this.state.itemList.map(currentitem => 
                {
                    return <Item item = {currentitem}/>;
                })
    }

    render()
    {
        return (
            <div>
                <h3>Shopping Cart</h3>
                <table className = "table">
                    <thead className = "thead-dark">
                        <tr>
                            <th>Item Name</th>
                            <th>Item Description</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.itemList()}
                    </tbody>
                </table>
                <h4>Subtotal</h4>
                <ul>${this.state.cost.toFixed(2)}</ul>
                <h4>Total</h4>
                <ul>${(this.state.cost * 1.065).toFixed(2)}</ul>
                <form onSubmit = {this.onSubmit}>
                <div className = "form-group">
                        <input type = "submit" value = "Pay for Order" className = "btn btn-light"/>
                    </div>
                </form>
            </div>
        );
    }
}