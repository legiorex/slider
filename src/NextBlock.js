import React, { Component } from "react";
import PagePhoto from "./PagePhoto";

class NextBlock extends Component {

  state = {
    wightBlock: '',
    heightBlock: '',
  }
  
  _checkSize = () => {
    
    this.setState(
      { wightBlock: this._divBlock.scrollWidth,
        heightBlock: window.innerHeight,
      });
  }

  render() {
    const { wightBlock, heightBlock } = this.state;
    const { pages } = this.props;
    

    const blockJSX = pages.map((block, index) => {
      
      
      
      return <PagePhoto key={block} heightBlock={heightBlock} />;

    });

    return blockJSX;
    
  }
}

export default NextBlock;
// (



//   <div className="nextBlock"
//     ref={ref => (this._divBlock = ref)}
//     onLoad={this._checkSize}
//     style={{ width: wightBlock }}
//     key={index}
//   >
//     {blockJSX}


//   </div>
// );