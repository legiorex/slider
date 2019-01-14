import React, { Component } from 'react';
import './Wall.css';
// import { api } from './API';
import PrevBlock from './PrevBlock';
import NextBlock from './NextBlock';

class Wall extends Component {
  componentDidMount() {
    this._addNewPage();
  }

  // shouldComponentUpdate(){
  //   this.setState({scrollStart: false})
  // }

  state = {
    pages: [],
    heightBlock: ""
  };

  _scrollStart = () => {
    const { pages } = this.state;

    return pages.length === 1 ? window.scrollTo(1000, 0) : null;
  };

  _scrollEvent = () => {
    document.body.onwheel = event => {
      event.preventDefault();

      this._checkScroll(event);

      if (event.deltaY > 0) {
        window.scrollBy(100, 0);
      } else {
        window.scrollBy(-100, 0);
      }
    };
  };

  _checkScroll = event => {
    const { pages } = this.state;

    const contentWrapper = event.target.parentNode.parentNode;
    const endWindow = contentWrapper.scrollWidth - document.body.clientWidth;

    // console.log('ширина блока   ', endWindow);
    // console.log("текущий скролл   ", window.pageXOffset);

    if (endWindow <= window.pageXOffset && pages.length < 3) {
      // this._addNewPage();
      // console.log("true");
    } else if (window.pageXOffset < 150) {
      this._addNewPagePrev();
      // console.log("false");
    }
  };
  _addNewPage = () => {
    const { pages } = this.state;

    pages.push(this._idGen());

    this.setState({ pages: pages });
  };
  _addNewPagePrev = () => {
    const { pages } = this.state;
    

    pages.unshift(this._idGen());

    this.setState({ pages: pages });
  };

  _idGen = () => {
    return Math.random()
      .toString(36)
      .substring(2, 7);
  };

  _centerScreen = () => {
    const { pages } = this.state;
   
    
    if (pages.length === 1){
      window.scrollTo(3000, 0);
    }
  };

  render() {
    const { pages } = this.state;
    const heightPage = window.innerHeight;

  

    return (
      <>
        <div
          className="contentWight"
          onWheel={this._scrollEvent}
          ref={ref => (this._divContent = ref)}
          onLoad={this._centerScreen}
          style={{ height: heightPage }}
        >
          {/* <PrevBlock /> */}
          <NextBlock pages={pages} />
          {/* <NextBlock pages={pages} /> */}
        </div>
      </>
    );
  }
}
export default Wall;
