import React, { Component } from 'react';
import PlacesItem from './places_item';

export default class PlacesIndex extends Component {

    constructor(props) {
        super(props);
        this.renderPlaces = this.renderPlaces.bind(this);
    }

    renderPlaces() {
        return(
            this.props.places.map((place) => {
                return (
                        <li className="list-group-item" key={place.place.id}>
                            <PlacesItem place={place}/>
                        </li>
                    )
            })
        )
    } // end of renderPlaces

    render() {
        return(
            <div>
                <ul className="list-group places-box">
                    {this.renderPlaces()}
                </ul>
            </div>
        )
    }
}