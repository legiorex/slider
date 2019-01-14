import React, { Component } from "react";
import PagePhoto from "./PagePhoto";

class PrevBlock extends Component {
    _test = () => {

        this._divPrevBlock.scrollIntoView(false);
        console.log(this._divPrevBlock);
    }

  render() {
      const { id } = this.props;
      console.log(id);
      
    //   const blockJSX = prevBlocks.map((block, index) => {
    //       return <div className="prevBlock" key={index}>
    //         <PagePhoto  />
    //       </div>;
    //   });

      return <div className="prevBlock" key={id} ref={ref => (this._divPrevBlock = ref)} onLoad={this._test}>
          <PagePhoto />
      </div>;
  }
}

export default PrevBlock;
