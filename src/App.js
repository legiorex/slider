import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import photoArrayLocal from './data.json';
import {Transition, CSSTransition, TransitionGroup} from 'react-transition-group';

class App extends Component {
  state = {
    images: photoArrayLocal,
    selectedImageId: photoArrayLocal[0].id,
    nextImageId: photoArrayLocal[1].id,
    prevImageId: photoArrayLocal[photoArrayLocal.length - 1].id,    
  };

  _selectPrevImage = () => {
    const { images, selectedImageId } = this.state;

    const selectedImageIndex = images.findIndex(
      image => image.id === selectedImageId // предикат (predicate)
    );

    let currentImageIndex = selectedImageIndex - 1;

    if (currentImageIndex === -1) {
      currentImageIndex = images.length - 1;
    }

    let prevImageIndex = currentImageIndex - 1;

    if (prevImageIndex === -1) {
      prevImageIndex = images.length - 1;
    }

    const { id } = images.find((image, index) => index === currentImageIndex);

    const prevImg = images.find((image, index) => index === prevImageIndex);

    this.setState({
      selectedImageId: id,
      nextImageId: selectedImageId,
      prevImageId: prevImg.id
    });

    // 1. перебрать images
    // 2. сравнить каждый элемент с selectedImageId
    // 3. выбрать предыдущий
  };

  // componentDidMount() {
  //   this._timer = setTimeout(
  //     (this.tick = () => {
  //       this._nextPrevImage();

  //       this._timer = setTimeout(this.tick, 5000);
  //     }),
  //     5000
  //   );
  // }

  // componentWillUnmount() {
  //   clearTimeout(this._timer);
  //   this._animateImg(0);
  // }

  _animateImg(n) {
    this.setState({
      animate: n
    })
  }

  _nextPrevImage = async () => {
    const { images, selectedImageId } = this.state;    
    const selectedImageIndex = await images.findIndex(
      image => image.id === selectedImageId
    );

    let currentImageIndex = selectedImageIndex + 1;

    if (currentImageIndex === images.length) {
      currentImageIndex = 0;
    }

    let nextImageIndex = currentImageIndex + 1;

    if (nextImageIndex === images.length) {
      nextImageIndex = 0;
    }

    const { id } = images.find((image, index) => index === currentImageIndex);

    const nextImg = images.find((image, index) => index === nextImageIndex);

    this.setState({
      selectedImageId: id,
      nextImageId: nextImg.id,
      prevImageId: selectedImageId,      
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
      } else if (event.deltaY < 0) {
        this._selectPrevImage();
      }
    };
  };

  render() {
    const {
      images,
      selectedImageId,
      prevImageId,
      nextImageId,
      animate
    } = this.state;

    // Через id
    const selectedImage = images.find(image => image.id === selectedImageId);

    const prevImage = images.find(image => image.id === prevImageId);
    const nextImage = images.find(image => image.id === nextImageId);
    return (
      <div
        className="app"
        onKeyDown={this._handleKeyDown}
        onWheel={this._scrollEvent}
      >
        <div className="Image__section">
        <CSSTransition 
              classNames = {{
              enter: 'inStart',
              enterActive: 'inEnd',
              exit: 'outStart',
              exitActive: 'outEnd',
              }}
              timeout = {{
                enter: 5000,
                exit: 4000,
              }}>
                  {/* <img src={prevImage.src} /> */}
                  <img src={selectedImage.src} />
                  {/* <img src={nextImage.src} /> */}
        </CSSTransition>
         
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
