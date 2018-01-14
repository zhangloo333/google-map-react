# Google Map using React

### This application is used Google Places API and React technologies.

#### Run Locally
1. `npm install` to install dependencies
2. `npm start` to run application
3. Open up `http://localhost:9000/` in your browser and you should see the application


#### Function:
* Used the navigator.geolocation to build a google map instance.
* The input box support querry request, the results will mark at google map
* the list will show the details of the search result including (Name, Ratting star, address,image).


#### Component:
 1. Map component
 2. PlacesIndex component
 3. PlacesItem component

 1. Map component: After the component is mount, the google map instance and search box will rendered.
 The gelocation will require by the browser.

```js
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

```


  2. placesIndex component: component will receive the result place from parent component.
  the renderPlaces function is to build list item.

  ```js
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
                  <ul className="list-group places-container">
                      {this.renderPlaces()}
                  </ul>
              </div>
          )
      }
  ```

 3. PlacesItem: component will build a item detail including Name, Ratting star, address,image.

 ```js
 const {place} = this.props.place;
         const  img = place.photos ? place.photos[0].getUrl(this.config().itemPhotoSize) : './assets/no_image.png';

         return(
             <div className="item-box" onMouseOver = {this.startBounce} onMouseOut={this.endBounce}>
                 <div className="item-text">
                     <strong>{place.name}</strong>
                     { place.rating ?<p>{this.rateStars(place.rating)}<span>&nbsp;&nbsp;&nbsp;{'$'.repeat(place.price_level)}</span></p> : <p>{'$'.repeat(place.price_level)}</p>
                     }
                     <p>{place.formatted_address}</p>
                     <p>{place.opening_hours && place.opening_hours.open_now ? "Open" :"Closed"}</p>
                 </div>
                 <img className='item-image' src={img} />
             </div>
 ```