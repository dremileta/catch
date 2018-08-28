import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends Component {

    static propTypes = {
        loadingSampleFishes: PropTypes.func,
        fishes: PropTypes.object,
        deleteFish: PropTypes.func,
        updateFish: PropTypes.func,
        addFish: PropTypes.func,
        storeId: PropTypes.string
    }

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user});
                console.log(user)
            }
        });
    }

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }

    authHandler = async (authData) => {

        const store = await base.fetch(this.props.storeId, {context: this});

        if(!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }

        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    }

    logout = async () => {
        console.log("Log out")
        await firebase.auth().signOut();
        this.setState({
            uid: null
        })
    }
    
    render() {

        const logout = <button onClick={this.logout}>Log out</button>

        // check if they log in
        if(!this.state.uid) {
            return <Login authenticate={this.authenticate}/>
        }

        // check if they owner of the store
        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you're not the owner!</p>
                    {logout}
                </div>
            )
        }

        return (
            <div className='inventory'>
                <h2>Inventory</h2>  
                {logout}
                {Object.keys(this.props.fishes).map(key => <EditFishForm deleteFish={this.props.deleteFish} updateFish={this.props.updateFish} index={key} key={key} fish={this.props.fishes[key]} />)}
                <AddFishForm  addFish={this.props.addFish}/>
                <button onClick={this.props.loadingSampleFishes}>Loading Some Fishes</button>
            </div>
        );
    }
}

export default Inventory;