import React, { Component } from 'react';
import './Wall_Next.css';
import { idGen } from "./instruments";
import PagePhoto from "./PagePhoto";

class Wall extends Component {
  componentDidMount() {
    this._addNextPhoto();
  }

 

  state = {
    photos: [],
    imgWight: ''
  };

  _checkScroll = event => {    
    // event.preventDefault();
    // window.scrollBy(0, 100);

    const imgBlock = this._divContent.childNodes;
    const test = event.target.parentNode;

    const endWindow = this._divContent.scrollHeight - document.body.clientHeight;
    
    // console.log(document.body.clientHeight);
    // console.log("текущий скролл   ", window.pageYOffset + document.body.clientHeight);
    
    const currentScroll = window.pageYOffset + document.body.clientHeight;
    const hundredScroll = currentScroll - currentScroll % 100;
    
    const endPage = this._divContent.scrollHeight - 500;
    console.log(endPage);
    console.log("текущий скролл   ", hundredScroll);   
 

    if (hundredScroll === endPage) {
      console.log("true");
      this._addNextPhoto();
    }

    
  };

  _addNextPhoto = () => {
    const { photos } = this.state;

    photos.push(idGen());

    // console.log(photos.length);

    this.setState({ photos });
    
  };
  _checkArray = () => {
    // const { photos } = this.state;
    // if (photos.length > 2) {
    //   photos.shift();
    // }
    
    this.setState({ wightBlock: document.body.clientWidth});
  }

  render() {
    const { photos, wightBlock } = this.state;

    const photosJSX = photos.map((block, index) => {
      return <PagePhoto key={index} wightBlock={wightBlock} />;
    });

    return (
      <>
        <div
          className="content"
          onWheel={this._checkScroll}
          ref={ref => (this._divContent = ref)}
          onLoad={this._checkArray}
        >
          {photosJSX}
        </div>
      </>
    );
  }
}
export default Wall;
