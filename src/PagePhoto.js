import React, { Component } from 'react';
import './PagePhoto.css';
import { api } from './API';


class PagePhoto extends Component {
  componentDidMount() {
    this._fetchPhotoAsync();
    
  }

  state = {
    photoArray: [],
    photoUrl: [],    
    dataFinish: false,
    colons: 5
  };

  _widthImg = () => {
    const { wightBlock } = this.props;
    const { colons } = this.state;

    return wightBlock / colons;
  };

  _fetchPhotoAsync = async () => {
    const photoArray = await api.fetchPhotos();

    this.setState({ photoArray });

    this._createImgUrl();
  };

  _createImgUrl = () => {
    const { photoArray, colons } = this.state;

    const photoUrl = photoArray.map((photo, index) => { 

      const flag = () => {
        let i = photoArray.length - colons;

        if (index === i) {
          return true;
        }

        // for (i; i < photoArray.length; i++) {

        //   if (index === i) {
        //     return true;
        //   }

        // }
        return false;
      }

      return { src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`, id: photo.id, flag: flag() };
    });
    this.setState({ photoUrl });
  };

  render() {
    const { photoUrl} = this.state;    

    const imgJSX = photoUrl.map(url => {

      return <section className="imgWrapper" key={url.id} style={{ width: this._widthImg() }} data-finish={url.flag}>
          <img src={url.src} alt="" />
        </section>;
    });

    return  imgJSX 
  }
}
   
export default PagePhoto;
