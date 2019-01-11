import React, { Component } from 'react';
import './Wall.css';
// import { api } from './API';
import PagePhoto from './PagePhoto';

class Wall extends Component {
  
  componentDidMount () {
    this._addNewPage();
      
  }

  // shouldComponentUpdate(){
  //   this.setState({scrollStart: false})
  // }

  
  state = {
    pages: [],    
  };

  _scrollStart = () => {

    const {pages} = this.state;

    return pages.length === 1 ? window.scrollTo(1000, 0) : null    
    
  }

 

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
    console.log("текущий скролл   ", window.pageXOffset);

    if (endWindow <= window.pageXOffset && pages.length < 3) {
      this._addNewPage();
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

  

  render() {
    const { pages } = this.state;

    const pagesJSX = pages.map((page, index) => {
      // console.log(page);
      // console.log(index);

      return <PagePhoto key={index} />
      
    });

    return <>
        <div className="content" onWheel={this._scrollEvent} ref={ref => (this._div = ref)} onLoad = {this._scrollStart} >
          {pagesJSX}
        </div>
      </>;
  }
}
export default Wall;
