import React, {Component} from 'react';
import axios from 'axios';



export default class ItemsList extends Component
{
    constructor(props)
    {
        super(props);
        
        this.addItem = this.addItem.bind(this);
        this.updateSearch = this.updateSearch.bind(this);

        this.state = 
        {
            orderID: '',
            items: [],
            username: '',
            itemList: [],
            cost: 0,
            search: '',
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
                        this.setState({itemList: response.data[i].dishList})
                        this.setState({cost: response.data[i].cost})
                        this.setState({orderID: response.data[i]._id})
                    }
                }
                console.log(this.state.orderID)
                
            })
            .catch((error) =>
            {
                console.log(error);
            })
        
    }

    updateSearch(e)
    {
        this.setState({search: e.target.value});
    }

    addItem(id)
    {

        axios.get('http://localhost:5000/items/'+id)
            .then(response =>
            {
                this.state.itemList.push(response.data);
                this.setState({cost: this.state.cost + response.data.cost})
            })


        const itemOrder = 
        {
            username: this.state.username,
            itemList: this.state.itemList,
            cost: this.state.cost,
            isReady: this.state.isCompleted,
            status: this.state.status
        }
        
        axios.post('http://localhost:5000/itemOrders/update/'+this.state.orderID, itemOrder)
            .then(res => {console.log(res.data)});
    }

    itemList()
    {
        let filteredItems = this.state.items.filter(
            (currentItem) => {
                return currentItem.name.indexOf(this.state.search) !== -1;
            }
        );
        return filteredItems.map(currentitem => 
            {
                return <Item item = {currentitem} adItem = {this.addItem} key = {currentitem._id}/>;
            })
    }

    render()
    {
        return (
            <div>
                <input type = "text"
                    defaultValue = {this.state.search}
                    onChange = {this.updateSearch}/>
                <h3>Select items to add to your shopping cart</h3>
                <table className = "table">
                    <thead className = "thead-dark">
                        <tr>
                            <th>Item Name</th>
                            <th>Item Description</th>
                            <th>Cost</th>
                            <th>Add to Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.itemList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const Item = props => (
    <tr>
        <td>{props.item.name}</td>
        <td>{props.item.description}</td>
        <td>{props.item.cost}</td>
        <td>
              <a href = "#add" onClick = {() => {props.addItem(props.item._id)}} >Purchase</a>
             
        </td>
    </tr>
    
)
