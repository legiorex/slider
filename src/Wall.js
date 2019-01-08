import React, { Component } from 'react';
import './Wall.css';
import { api } from './API';

// dateadded: "1546798179"

// farm: 8

// id: "31692078507"

// isfamily: 0

// isfriend: 0

// ispublic: 1

// owner: "42187767@N07"

// ownername: "Martial Soula"

// secret: "059ddca6dd"

// server: "7833"

// title: "L'argentique est toujours vivant"

class Wall extends Component {

  componentDidMount() {
      this._fetchPhotoAsync();
    };


  state = {
    photoArray: [],
  };


    _fetchPhotoAsync = async () => {
        const photoArray = await api.fetchPhotos();

        this.setState({ photoArray });
    };
    
  _scrollEvent = () => {  
  
    document.body.onwheel = event => {
      event.preventDefault();
      const test = event.target.parentNode.parentNode;
      
      const endWindow = test.scrollWidth - document.body.clientWidth;
      
      if (endWindow === window.pageXOffset) {
        console.log("true");
      } else {
        console.log("false");
      }


      if (event.deltaY > 0){
        window.scrollBy(100, 0);
      } else {
        window.scrollBy(-100, 0);
      } 
    };
  };

  

  render() {


    const { photoArray } = this.state;
    
    const imgJSX = photoArray.map((photo) => {

      const imgUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      
      return <section className="imgWrapper" key={photo.id}>
          <img src={imgUrl} alt="" />
        </section>;      
      
    })



    return (
    <>
        <div className="content" onWheel={this._scrollEvent}>
          {imgJSX}
        </div>
    </> 
     )
  }
}
export default Wall;