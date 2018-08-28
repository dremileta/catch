import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {

    static propTypes = {
        addFish: PropTypes.func
    }

    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();


    createFish = event => {
        event.preventDefault();

        const fish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        }
        this.props.addFish(fish);

        // refresh the FORM 
        event.currentTarget.reset();
    }

    render() {
        return (
            <form className='fish-edit' onSubmit={this.createFish}>
                <input ref={this.nameRef} placeholder='Name' name="name" type="text"/>
                <input ref={this.priceRef} placeholder='Price' name="price" type="text"/>
                <select ref={this.statusRef} name="status">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea ref={this.descRef} placeholder='Desc' name="desc"></textarea>
                <input ref={this.imageRef} placeholder='Image' name="image" type="text"/>
                <button type='submit'>+ Add Fish</button>
            </form>
        )
    }
}

export default AddFishForm;