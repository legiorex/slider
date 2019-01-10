import React, { Component } from 'react';
import './Wall.css';
// import { api } from './API';
import PagePhoto from './PagePhoto';

class Wall extends Component {
  componentDidMount() {

    this._test();
    
    // setTimeout(() => {
      
    //   console.log('scroll after page load');
    //   window.scrollBy(1000, 0);
    // }, 2000);
   
    // console.log(document.body.children.root.children[0].scrollWidth)
  }

  _test = async () => {
    
    await this._addNewPage();
    // await window.scrollBy(1000, 0);
    await this._scroll();
    

    // document.body.scrollTo(500, 0);
  };

  _scroll = () => {
    // this._div.scrollLeft = 1000;
    window.scrollTo(100, 0);
    console.log(this._div); 
  }
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

    return <>
        <div className="content" onWheel={this._scrollEvent} ref={ref => (this._div = ref)} onLoad = {this._scroll} >
          {pagesJSX}
        </div>
      </>;
  }
}
export default Wall;
