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
    wightBlock: ""
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
    } else if (window.pageXOffset > 600 && window.pageXOffset <= 700) {
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
    console.log(pages.length);
    pages.unshift(this._idGen());

    this.setState({ 
      pages: pages,
      wightBlock: this._divBlock.scrollWidth 
    });
    
  };

  _idGen = () => {
    return Math.random()
      .toString(36)
      .substring(2, 7);
  };

  _centerScreen = () => {
    const { pages, wightBlock } = this.state;

    

    

    if (pages.length === 1) {
      window.scrollTo(3000, 0);
      
      // console.log('test')
    } else {
      window.scrollTo(this._divBlock.scrollWidth , 0);
      this._divBlock.scrollIntoView(false);
    }
  };

  render() {
    const { pages, wightBlock } = this.state;
    const heightPage = window.innerHeight;

    const block = pages.reverse().map((item, index) => {
      return (
        <div
          className="nextBlock"
          ref={ref => (this._divBlock = ref)}
          onLoad={this._checkSize}
          style={{ width: wightBlock }}
          key={item}
        >
          <NextBlock pages={pages} />
        </div>
      );
    });

    return (
      <>
        <div
          className="contentWight"
          onWheel={this._scrollEvent}
          ref={ref => (this._divContent = ref)}
          onLoad={this._centerScreen}
          style={{ height: heightPage }}
        >
          {block}

          {/* <PrevBlock pages={pages} /> */}
          {/* <NextBlock pages={pages} /> */}
        </div>
      </>
    );
  }
}
export default Wall;
