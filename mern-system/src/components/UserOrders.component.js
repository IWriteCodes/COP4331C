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
                        this.setState({status: response.data[i].status})
                        console.log(this.state.cost);
                        break;
                    }
                }
            })
            .catch((error) =>
            {
                console.log(error);
            })
        
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
                <h3>Orders</h3>
                <h4 className = "btn btn-light">Status: {this.state.status}</h4>
                <table className = "table">
                    <thead className = "thead-dark">
                    </thead>
                    <tbody>
                        {this.itemList()}
                    </tbody>
                </table>
            </div>
        );
    }
}