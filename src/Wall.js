import React, { Component } from 'react';
import './Wall.css';
// import { api } from './API';
import PagePhoto from './PagePhoto';

class Wall extends Component {
  // componentDidMount() {
  //   this._fetchPhotoAsync();
  // }

  // _fetchPhotoAsync = async () => {
  //   const photoArray = await api.fetchPhotos();

  //   this.setState({ photoArray });
  // };

  state = {
    pages: [0],
    addPage: false,
  };

  _scrollEvent = () => {
    document.body.onwheel = event => {
      event.preventDefault();

      this._test(event);

      if (event.deltaY > 0) {
        window.scrollBy(100, 0);
      } else {
        window.scrollBy(-100, 0);
      }
    };
  };

  _test = event => {
    const contentWrapper = event.target.parentNode.parentNode;

    const endWindow = contentWrapper.scrollWidth - document.body.clientWidth;

    if (endWindow <= window.pageXOffset) {
      console.log('true');
      this.setState({ addPage: true });
    } else {
      console.log('false');
    }
  };

  render() {
    const { pages } = this.state;
    console.log(pages);

    const pagesJSX = pages.map((page, index) => {
      // console.log(page);
      // console.log(index);

      return <PagePhoto key={index} />;
    });

    return (
      <>
        <div className="content" onWheel={this._scrollEvent}>
          {/* <PagePhoto /> */}
          {pagesJSX}
        </div>
      </>
    );
  }
}
export default Wall;
