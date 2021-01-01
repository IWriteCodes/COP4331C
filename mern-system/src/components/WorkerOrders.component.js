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
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.onSubmit3 = this.onSubmit3.bind(this);
        this.onSubmit4 = this.onSubmit4.bind(this);


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
                    if (response.data[i].isReady)
                    {
                        this.setState({itemList: response.data[i].itemList})
                        this.setState({orderID: response.data[i]._id})
                        this.setState({cost: response.data[i].cost})
                        this.setState({isReady: response.data[i].isReady})
                        this.setState({status: response.data[i].status})
                        this.setState({username: response.data[i].username})
                        console.log(this.state.cost);
                        console.log(this.state.itemList);
                        console.log(this.state.orderID);
                        console.log(this.state.isReady);
                        console.log(this.state.status);
                        console.log(this.state.username);
                        break;
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
            

        axios.get('http://localhost:5000/itemOrders')
            .then(response => 
            {
                console.log(response.data[0]);
                console.log(this.state.cost);
                console.log(this.state.itemList);
                console.log(this.state.orderID);
                console.log(this.state.isReady);
                console.log(this.state.status);
                console.log(this.state.username);
            })

        const itemOrder = 
        {
            username: this.state.username,
            itemList: this.state.itemList,
            cost: this.state.cost,
            isReady: true,
            status: 'Recieved Order'
        }
        
        axios.post('http://localhost:5000/itemOrders/update/'+this.state.orderID, itemOrder)
            .then(res => {console.log(res.data)});
    }

    onSubmit2(e)
    {
        e.preventDefault();

        const itemOrder = 
        {
            username: this.state.username,
            itemList: this.state.itemList,
            cost: this.state.cost,
            isReady: true,
            status: "Preparing Order"
        }
        
        axios.post('http://localhost:5000/itemOrders/update/'+this.state.orderID, itemOrder)
            .then(res => {console.log(res.data)});
    }

    onSubmit3(e)
    {
        e.preventDefault();

        const itemOrder = 
        {
            username: this.state.username,
            itemList: this.state.itemList,
            cost: this.state.cost,
            isReady: true,
            status: "Order Done" 
        }
        
        axios.post('http://localhost:5000/itemOrders/update/'+this.state.orderID, itemOrder)
            .then(res => {console.log(res.data)});
    }

    onSubmit4(e)
    {
        e.preventDefault();

        const itemOrder = 
        {
            username: this.state.username,
            itemList: this.state.itemList,
            cost: this.state.cost,
            isReady: true,
            status: "Picked Up"
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
                <h3>Finished Orders</h3>
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
                <form onSubmit = {this.onSubmit2}>
                <div className = "form-group">
                        <input type = "submit" value = "Preparing Order" className = "btn btn-light"/>
                    </div>
                </form>
                <form onSubmit = {this.onSubmit3}>
                <div className = "form-group">
                        <input type = "submit" value = "Order Done" className = "btn btn-light"/>
                    </div>
                </form>
                <form onSubmit = {this.onSubmit4}>
                <div className = "form-group">
                        <input type = "submit" value = "Picked Up" className = "btn btn-light"/>
                    </div>
                </form>
                <form onSubmit = {this.onSubmit}>
                <div className = "form-group">
                        <input type = "submit" value = "Recieved Order" className = "btn btn-light"/>
                    </div>
                </form>
            </div>
        );
    }
}