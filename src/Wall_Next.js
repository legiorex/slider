import React, { Component } from 'react';
import './Wall_Next.css';
import PagePhoto from './PagePhoto';

class Wall extends Component {
  
  componentDidMount () {
    this._addNewPage();
      
  }

  
  state = {
    pages: [],    
  };

  _scrollStart = () => {

    const {pages} = this.state;

    return pages.length === 1 ? window.scrollTo(0, 1000) : null    
    
  }

 

  

  _checkScroll = event => {
    const { pages } = this.state;

    // const contentWrapper = event.target.parentNode.parentNode;
    
    const endWindow = window.pageYOffset + document.body.clientHeight;

    // console.log('высота обоих блоков', this._divContent.scrollHeight)
    // console.log('высота блока   ', endWindow);
    // console.log(document.body.clientHeight);
    
    // console.log("текущий скролл   ", window.pageYOffset + document.body.clientHeight);

    if (endWindow >= this._divContent.scrollHeight) {
      // this._addNewPage();
      console.log("вниз"); 
    } else if ( window.pageYOffset <= 120 ) {
      console.log('вверх')
    }
      
      // console.log("false");
    
  };

  _addNewPage = () => {

    const { pages } = this.state;

    pages.push(this._idGen());

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
     

      return <PagePhoto key={index} />
      
    });

    return <>
        <div className="content" onWheel={this._checkScroll} ref={ref => (this._divContent = ref)} onLoad = {this._scrollStart} >
            <div className = 'prevBlock'>
                {pagesJSX}
            </div>
            <div className = 'nextBlock'>
                {pagesJSX}
            </div>          
        </div>
      </>;
  }
}
export default Wall;
