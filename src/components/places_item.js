import React, { Component } from 'react';

export default class PlacesItem extends  Component {

    constructor(props) {
        super(props);
        this.config = this.config.bind(this);
        this.rateStars = this.rateStars.bind(this);
        this.startBounce = this.startBounce.bind(this);
        this.endBounce = this.endBounce.bind(this);
    }

    config() {
        return {
            itemPhotoSize : {
                maxWidth: 80,
                maxHeight: 91
            }
        }
    }

    startBounce() {
        this.props.place.marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    endBounce() {
        this.props.place.marker.setAnimation(null);
    }


    // build rate starts
    rateStars(num) {
        let stars = [];
        for(let i = 0; i < num; i++) {
            stars.push(
                <span><img key={i} src='./assets/star.png' /></span>
            )
        }
        return stars
    }

    render() {
        const {place} = this.props.place;
        const  img = place.photos ? place.photos[0].getUrl(this.config().itemPhotoSize) : './assets/no_image.png';

        return(
            <div className="item-box" onMouseOver = {this.startBounce} onMouseOut={this.endBounce}>
                <div className="item-text">
                    <strong>{place.name}</strong>
                    { place.rating ?<p>{this.rateStars(place.rating)}<span>&nbsp;&nbsp;&nbsp;{'$'.repeat(place.price_level)}</span></p> : <p>{'$'.repeat(place.price_level)}</p>
                    }
                    <p id="item-address">{place.formatted_address}</p>
                    <p>{place.opening_hours && place.opening_hours.open_now ? "Open" :"Closed"}</p>
                </div>
                <img className='item-image' src={img} />
            </div>
        )
    }
}