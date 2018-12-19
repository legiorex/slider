import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    axios
      .get("http://5bf26792a60fe600134cdf1a.mockapi.io/photoArray")
      .then(({ data }) => {
        this.setState({
          images: data,
          selectedImageId: data[0].id,
          prevImageId: data[data.length - 1].id,
          nextImageId: data[1].id
        });
      });
  }

  state = {
    images: [
      {
        id: "",
        src: ""
      }
    ],
    selectedImageId: "",
    nextImageId: "",
    prevImageId: ""
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
  };

  _handleKeyDown = () => {
    document.body.onkeydown = event => {
      if (event.key === "ArrowRight") {
        this._nextPrevImage();
      } else if (event.key === "ArrowLeft") {
        this._selectPrevImage();
      }
    };
  };

  _scrollEvent = () => {
    document.body.onwheel = event => {
      event.preventDefault();
      if (event.deltaY > 0) {
        this._nextPrevImage();
      } else if (event.deltaY < 0 ) {
        this._selectPrevImage();
      }
      console.log(event.deltaY);
    };
  };

  render() {
    const { images, selectedImageId, prevImageId, nextImageId } = this.state;

    // Через id
    const selectedImage = images.find(image => image.id === selectedImageId);

    const prevImage = images.find(image => image.id === prevImageId);
    const nextImage = images.find(image => image.id === nextImageId);

    // console.log(prevImage);
    // console.log(nextImage);

    // Через index
    // const selectedImage = images.find(
    //     (image, index) => index === selectedImageId,
    // );

    return (
      <div
        className="app"
        onKeyDown={this._handleKeyDown}
        onWheel={this._scrollEvent}
      >
        <div className="Image__section">
          <img src={prevImage.src} />
          <img src={selectedImage.src} />
          <img src={nextImage.src} />
        </div>

        <div className="control">
          <div className="navigator">
            <button onClick={this._selectPrevImage}>←</button>
            <div className="authorTitle">{selectedImage.author}</div>
            <button onClick={this._nextPrevImage}>→</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
