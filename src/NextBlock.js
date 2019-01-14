import React, { Component } from "react";
import PagePhoto from "./PagePhoto";

class NextBlock extends Component {
  
 

  render() {
    const { nextBlocks } = this.props;   

    const blockJSX = nextBlocks.map((block, index) => {
      return <PagePhoto key={index} />;
    });

      return <div className="nextBlock">{blockJSX}</div>;
  }
}

export default NextBlock;