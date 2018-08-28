import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

    state = {
        fishes: {},
        order: {}
    }

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
        if(localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
       
        const fishes = {...this.state.fishes};
        
        fishes[`fish${Date.now()}`] = fish;
        
        this.setState({
            fishes: fishes
        })
    }

    loadingSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    }

    addToOrder = key => {
        
        const order = {...this.state.order};
        
        order[key] = order[key] + 1 || 1;
        
        this.setState({
            order: order
        })
    }

    updateFish = (key, updatedFish) => {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes: fishes});
    }

    deleteFish = key => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes: fishes});
    }

    removeFromOrder = key => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({order: order})
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className='fishes'>
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} removeFromOrder={this.removeFromOrder} order={this.state.order}/>
                <Inventory storeId={this.props.match.params.storeId} deleteFish={this.deleteFish} updateFish={this.updateFish} fishes={this.state.fishes} addFish={this.addFish} loadingSampleFishes={this.loadingSampleFishes}/>
            </div>  
        )
    }
}

export default App;