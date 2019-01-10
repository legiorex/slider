import React, { Component } from 'react';
import './PagePhoto.css';
import { api } from './API';

class PagePhoto extends Component {
  componentDidMount() {
    this._fetchPhotoAsync();
  }

  state = {
    photoArray: [],
    addPage: false,
  };

  _fetchPhotoAsync = async () => {
    const photoArray = await api.fetchPhotos();
    

    this.setState({ photoArray });
  };

  render() {
    const { photoArray } = this.state;

    const imgJSX = photoArray.map(photo => {
      const imgUrl = `https://farm${photo.farm}.staticflickr.com/${
        photo.server
      }/${photo.id}_${photo.secret}.jpg`;

      return (
        <section className="imgWrapper" key={photo.id}>
          <img src={imgUrl} alt="" />
        </section>
      );
    });

    return imgJSX;
  }
}
export default PagePhoto;
