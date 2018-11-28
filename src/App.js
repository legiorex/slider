import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {

  componentDidMount(){
    axios
    .get('http://5bf26792a60fe600134cdf1a.mockapi.io/photoArray')
    .then(({ data }) => {
      this.setState({
        images: data,
        selectedImageId: '5bfd3b13dcda9d41848224f4',
      });
    });
  }

  state = {
    images: [
     { id: '', src: '' }, // 0    
    ],
    selectedImageId: '', // ←
    
  };

  _selectPrevImage = () => {
    const { images, selectedImageId } = this.state;
    console.log(images);
    console.log(this.state);

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
      selectedImageId: id,
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
      selectedImageId: id,
    });
  };

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
