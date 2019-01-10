import React, { Component } from 'react';
import './Wall.css';
// import { api } from './API';
import PagePhoto from './PagePhoto';

class Wall extends Component {
  componentDidMount() {
    this._addNewPage();
   
    // console.log(document.body.children.root.children[0].scrollWidth)
  }

  _test = () => {
    console.log('test');

    // document.body.scrollTo(500, 0);
  };

  state = {
    pages: [],
  };

  _addNewPage = () => {
    const { pages } = this.state;
    
    // console.log(document.body.clientWidth)

     this.setState({ pages: pages.concat(this._idGen()) });
     
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

    // if (event.deltaY > 0) {
    //   window.scrollBy(100, 0);
    // } else {
    //   this._addNewPage();
    // }

    if (endWindow <= window.pageXOffset && pages.length < 2) {
      this._addNewPage();
      console.log("true");
      // this.setState({ pages: pages.concat(1) });
    } else {
      console.log("false");
    }
  };

  _idGen = () => {
    return Math.random()
      .toString(36)
      .substring(2, 7);
  };

  render() {
    const { pages } = this.state;

    const pagesJSX = pages.map((page, index) => {
      // console.log(page);
      // console.log(index);

      return <PagePhoto key={index} />
      
    });

    return (
      <>
        <div className="content" onWheel={this._scrollEvent}>
          {pagesJSX}
        </div>
      </>
    );
  }
}
export default Wall;
