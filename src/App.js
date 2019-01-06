import React, { Component } from 'react';
import './App.css';
import photoArrayLocal from './data.json';
import { Transition, animated } from "react-spring";

class App extends Component {
  state = {
    images: photoArrayLocal,
    selectedImageId: photoArrayLocal[0].id,   
    direction: true
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

    const { id } = images.find((image, index) => index === currentImageIndex);
  
    this.setState({
      selectedImageId: id,
     
      direction: false
    });

    // 1. перебрать images
    // 2. сравнить каждый элемент с selectedImageId
    // 3. выбрать предыдущий
  };

  // componentDidMount() {
  //   this._timer = setTimeout(
  //     (this.tick = () => {
  //       this._nextPrevImage();

  //       this._timer = setTimeout(this.tick, 1000);
  //     }),
  //     1000
  //   );
  // }

  // componentWillUnmount() {
  //   clearTimeout(this._timer);    
  // }

  _nextPrevImage = () => {
    const { images, selectedImageId } = this.state;

    const selectedImageIndex = images.findIndex(
      image => image.id === selectedImageId
    );

    let currentImageIndex = selectedImageIndex + 1;

    if (currentImageIndex === images.length) {
      currentImageIndex = 0;
    }
   
    const { id } = images.find((image, index) => index === currentImageIndex);

    this.setState({
      selectedImageId: id,    
      direction: true
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
    const { images, selectedImageId, direction } = this.state;

    // Через id
    const selectedImage = images.find(image => image.id === selectedImageId);
    

    return (
      <div
        className="app"
        onKeyDown={this._handleKeyDown}
        onWheel={this._scrollEvent}
      >
        <div className="Image__section">
          <Transition
            native
            reset
            unique
            items={selectedImage.id}
            from={ direction ? { opacity: 0, transform: "translate3d(100%,0,0)" } : { opacity: 0, transform: "translate3d(-50%,0,0)" }}
            enter={{ opacity: 1, transform: "translate3d(0%,0,0)" }}
            leave={direction ? { opacity: 0, transform: "translate3d(-50%,0,0)" } : { opacity: 0, transform: "translate3d(100%,0,0)" }}
            
          >
            {item => props => (
              <animated.div
                style={props}
                className="mainImg"
                children={<img src={selectedImage.src} />}
              />
            )}
          </Transition>
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
