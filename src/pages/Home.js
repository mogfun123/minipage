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

const separator = (sectionID, rowID) => (
  <div
    key={`${sectionID}-${rowID}`}
    style={{
      backgroundColor: "#F5F5F9",
      height: 8,
      borderTop: "1px solid #ECECED",
      borderBottom: "1px solid #ECECED",
    }}
  />
);
const data = [
  {
    img: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",
    title: "Meet hotel",
    des: "不是所有的兼职汪都需要风吹日晒",
  },
  {
    img: "https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png",
    title: "McDonald's invites you",
    des: "不是所有的兼职汪都需要风吹日晒",
  },
  {
    img: "https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png",
    title: "Eat the week",
    des: "不是所有的兼职汪都需要风吹日晒",
  },
];
const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0, items) {
  console.log("item", items);
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = pIndex * NUM_SECTIONS + i;
    const sectionName = `Section ${ii}`;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = items[jj];
    }
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
}
class Lists extends Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      imgHeight: "69vw",
      page: 0,
      dataSource,
      isLoading: true,
      height: (document.documentElement.clientHeight * 3) / 4,
    };
  }
  componentDidMount() {
    this.fetchList();
    const hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    this.setState({ height: hei });
  }
  fetchList() {
    let page = this.state.page;
    queryGoodList({
      main_page: "products",
      cid: "43",
      limit: "5",
      offset: page,
    }).then((res) => {
      if (res.code == 0) {
        genData(page, res.data);
        console.log(dataBlobs, sectionIDs, rowIDs);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(
            dataBlobs,
            sectionIDs,
            rowIDs
          ),
          isLoading: false,
        });
      } else {
        Toast.fail(res.msg);
      }
    });
  }
  onEndReached = (event) => {
    let page = this.state.page;
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    // this.setState({ isLoading: true, page: page + 1 });
    // this.fetchList();
  };
  render() {
    const row = (rowData, sectionID, rowID) => {
      console.log("rowData", rowID, rowData);
      return (
        <div key={rowID} className="list_item">
          <WingBlank size='lg' className="pd">
            <Carousel autoplay={false} infinite>
              {rowData.image.map((imgurl) => (
                <a
                  key={rowID}
                  className="carousel_item"
                  style={{ height: this.state.imgHeight }}
                >
                  <img
                    src={path + imgurl}
                    alt=""
                    className="carousel_item_img"
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event("resize"));
                      this.setState({ imgHeight: "auto" });
                    }}
                  />
                </a>
              ))}
            </Carousel>
          </WingBlank>
          <div className="good_title"> {rowData.title}</div>
          <div className="good_price"> {rowData.price}</div>
          {rowData.paypal_code ? (
            <div className="good_btns_style1">
              <Button type="primary" inline size="small">
                {rowData.paypal_code}
              </Button>
              <Button type="primary" inline size="small">
                <a href={rowData.buy_now}>buy_now</a>
              </Button>
            </div>
          ) : (
            <div className="good_btns_style2">
              <Button type="primary" size="small">
                <a href={rowData.buy_now}>buy_now</a>
              </Button>
            </div>
          )}
        </div>
      );
    };
    return (
      <Fragment>
        <ListView
          ref={(el) => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderHeader={() => <span>HiLouis</span>}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: "center" }}>
              {this.state.isLoading ? "Loading..." : "Loaded"}
            </div>
          )}
          renderRow={row}
          renderSeparator={separator}
          style={{
            height: this.state.height,
            overflow: "auto",
          }}
          pageSize={4}
          onScroll={() => {
            console.log("scroll");
          }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </Fragment>
    );
  }
}
export default Lists;
