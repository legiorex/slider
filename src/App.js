import React, { Component } from 'react';
import './App.css';

import image1 from './assets/crs.jpg';
import image2 from './assets/jellyfish.jpg';
import image3 from './assets/observatory.jpg';

class App extends Component {
  state = {
    images: [
      // error
      { id: "123", src: image1 }, // 0
      { id: "456", src: image2 }, // 1 ←
      { id: "678", src: image3 } // 2
    ],
    selectedImageId: "456" // ←
    // selectedImageIndex: 1,
  };

  _selectPrevImage = () => {
    const { images, selectedImageId } = this.state;

    const selectedImageIndex = images.findIndex(
      image => image.id === selectedImageId // предикат (predicate)
    );

    let prevImageIndex = selectedImageIndex - 1;

    // if (prevImageIndex === -1) {
    //     return null;
    // }

    if (prevImageIndex === -1) {
      prevImageIndex = images.length - 1;
    }

    const { id } = images.find((image, index) => index === prevImageIndex);

    this.setState({
      selectedImageId: id
    });

    // 1. перебрать images
    // 2. сравнить каждый элемент с selectedImageId
    // 3. выбрать предыдущий
  };

  _nextPrevImage = () => {
      
      const { images, selectedImageId } = this.state;
      const selectedImageIndex = images.findIndex(
          image => image.id === selectedImageId 
      );

      let nextImageIndex = selectedImageIndex + 1;
      
      if (nextImageIndex === images.length) {
        nextImageIndex = 0;
      }

      const { id } = images.find((image, index) => index === nextImageIndex);

      this.setState({
          selectedImageId: id
      });


  }

  render() {
    const { images, selectedImageId } = this.state;

    // Через id
    const selectedImage = images.find(image => image.id === selectedImageId);

    // Через index
    // const selectedImage = images.find(
    //     (image, index) => index === selectedImageId,
    // );

    return (
      <div className="app">
        <img src={selectedImage.src} />
        <div className="control">
          <button onClick={this._selectPrevImage}>←</button>
          <button onClick={this._nextPrevImage}>→</button>
        </div>
      </div>
    );
  }
}

export default App;
