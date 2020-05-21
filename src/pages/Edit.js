import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import { queryGoodList } from ".././utils/api";
import { path } from ".././utils/request";
import {
  List,
  ListView,
  Button,
  InputItem,
  Carousel,
  WingBlank,
  WhiteSpace,
  Toast,
} from "antd-mobile";

class Editpage extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    
    // queryGoodList({
    //   main_page: "products",
    //   cid: "43",
    //   limit: "5",
    //   offset: page,
    // }).then((res) => {
    //   if (res.code == 0) {
    //     genData(page, res.data);
    //     console.log(dataBlobs, sectionIDs, rowIDs);
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRowsAndSections(
    //         dataBlobs,
    //         sectionIDs,
    //         rowIDs
    //       ),
    //       isLoading: false,
    //     });
    //   } else {
    //     Toast.fail(res.msg);
    //   }
    // });
  }

  render() {
    
    

    
    return (
      <Fragment>
        44
      </Fragment>
    );
  }
}
export default Editpage;
