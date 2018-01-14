import React, { Component } from 'react';
import PlacesIndex from './places_index';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: {lat: 37.773972, lng: -122.431297},
            places: [],
        };
        this.markers = [];
    }

    componentDidMount() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                this.setState({position: pos});
            }, (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            });
        }

        /**
         * loading map to div-id = map
         */
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: this.state.position,
            mapTypeControl: false
        });

        /**
         * input connect google-inner searchBox function
         */
        const input = document.getElementById('google-input');
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        /**
         * @type {*} open the infoWindow service
         */
        const infoWindow = new google.maps.InfoWindow();
        let service = new google.maps.places.PlacesService(map);

        /**
         * create marker
         */
        let createMarker = (place) => {
            const placeLocation = place.geometry.location;
            const marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'mouseover', function() {
                infoWindow.setContent(place.name);
                infoWindow.open(map, this);
            });
            return marker;
        };
        /**
         * delete marker
         */
        let deleteMarkers = () => {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.markers = [];
        }

        /**
         * buildMakers
         */
        let buildMakers = (places) =>{
            let resPlaces = [];
            if (places.length == 0) return;
            let bounds = new google.maps.LatLngBounds();
            places.forEach((place) =>{
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                let marker = createMarker(place);
                this.markers.push(marker);

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }

                resPlaces.push({
                    place: place,
                    marker: marker
                });

            }); // end of places for each
            this.setState({
                places: resPlaces,
            });

            map.fitBounds(bounds);
        }
        /**
         *  add Event Listener bounds_changed, dragend, places_changed
         */

        map.addListener('bounds_changed', () => {
            searchBox.setBounds(map.getBounds());
        });

        map.addListener('dragend',()=>{
            searchBox.setBounds(map.getBounds());
            map.setCenter(map.getBounds().getCenter());
            this.setState({
                position: {lat:map.getCenter().lat(), lng:map.getCenter().lng()},
                places:[]
            });
            deleteMarkers();
            // when
            let request = {
                location: this.state.position,
                radius: '500',
                query: this.refs.googleInput.value
            }
            if(this.refs.googleInput.value) {
                service.textSearch(request, (result,status) =>{
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        buildMakers(result);
                    }
                });
            }
        });

        searchBox.addListener('places_changed',()=>{
            let places = searchBox.getPlaces();
            buildMakers(places);
        });

    }// end of Component did mount


    render() {
        return(
            <div className="">
                <div>
                    <input id="google-input" ref = "googleInput" className="search-box" type="text"/>
                    <div id='map' style={{width: "100%", height: "100%"}}></div>
                </div>
                <PlacesIndex
                    places = {this.state.places}
                />
            </div>
        );
    }
}

export default Map;
