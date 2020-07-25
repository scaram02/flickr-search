import React, { Component } from 'react'
import '../stylesheets/styles.css'

export default class Search extends Component {


state = {
    query: '',
    photos: []
}

handleChange = event => {
    this.setState({
        query: event.target.value
    })
}


handleSubmit = event => {
    if (this.state.query){
    event.preventDefault()
    this.getPhotos(this.state.query)
    } else {
        alert(`Enter a term in the search bar!`)

    }
}

handleKeyPress = event => {
    if ((event.charCode === 13) && (this.state.query)){
        event.preventDefault();
        this.getPhotos(this.state.query)
    } 
    if ((event.charCode === 13) && (!this.state.query)){
        alert(`Enter a term in the search bar!`)
    }
}


getPhotos = search => {
    var key = process.env.REACT_APP_FLICKR_KEY
    var flickrApi = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&per_page=25&tags=${this.state.query}&safe_search=1&per_page=25&page=1&format=json&nojsoncallback=1&extras=url_o`
    fetch(flickrApi)
    .then(response => {
        return response.json()})
    .then(data => {
        console.log("This be the data", data)
        let photos = data.photos.photo.map((indPhoto) => {
            // seems to be phased out?
            // let path = `https://farm${indPhoto.farm}.staticflicker.com/${indPhoto.server}/${indPhoto.id}_${indPhoto.secret}_[mstzb].jpg`
            // console.log("THE path", path)
            return (
                <div   
                key={indPhoto.id}
                className="photo"
                >
                   <img 
                   src={indPhoto.url_o || `https://forums.codemasters.com/uploads/monthly_2020_03/image.png.f8c83b98a2250b117a112bcfb92ca287.png`} 
                   alt={indPhoto.title}/>
                </div>
            )
        })
        this.setState({
            photos: photos
        })
      }
        )
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        let photos = this.state.photos
        return (
            <div className="content-container">
                <div className="search">
                <input name="text" 
                onChange={event => this.handleChange(event)} 
                type="text" 
                value={this.state.query} 
                placeholder="search tags"
                onKeyPress={this.handleKeyPress} />
                <button
                onClick={this.handleSubmit}>
                Find a Photo!
                </button>
                </div>
            <div className='photo-container'>

            {photos}

            </div>
            </div>
        )
    }
}


