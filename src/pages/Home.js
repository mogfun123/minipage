import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router";
import { queryGoodList, uploadGoodsInfo } from ".././utils/api";
import { path } from ".././utils/request";
import top from ".././top.png";
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
import { getToken } from "../utils";

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
const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0, items) {
  const ii = pIndex;

  for (let jj = 0; jj < items.length; jj++) {
    const rowName = `S${ii}, R${jj}`;

    dataBlobs[rowName] = items[jj];
  }
}
class Lists extends Component {
  constructor(props) {
    super(props);
    // const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    // const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      imgHeight: "69vw",
      page: 0,
      limit: 5,
      showTop: false,
      dataSource,
      vision: getToken(),
      isLoading: true,
      hasMore: true,
      // height: (document.documentElement.clientHeight * 3) / 4,
    };
  }
  componentDidMount() {
    this.fetchList();
    // const hei =
    //   document.documentElement.clientHeight -
    //   ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    // this.setState({ height: hei });
  }
  fetchList() {
    let page = this.state.page;
    let limit = this.state.limit;
    queryGoodList({
      main_page: "products",
      cid: "43",
      limit: limit,
      offset: page,
    }).then((res) => {
      if (res.code == 0) {
        if (this.state.limit > res.data.length) {
          this.setState({ hasMore: false });
        }
        genData(page, res.data);
        console.log(dataBlobs, sectionIDs, rowIDs);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(dataBlobs),
          isLoading: false,
        });
      } else {
        this.setState({ isLoading: false, hasMore: false });
        // Toast.fail(res.msg);
      }
    });
  }
  editAction = (row) => {
    this.props.history.push({
      pathname: "/edit",
      state: { id: row.id },
    });
  };
  releaseAction = () => {
    this.props.history.push({
      pathname: "/edit",
      state: {},
    });
  };
  toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  pageScroll = () => {
    if (
      document.documentElement.scrollTop >
      2 * document.documentElement.clientHeight
    ) {
      this.setState({ showTop: true });
    } else {
      this.setState({ showTop: false });
    }
  };

  deleteAction = (row) => {
    uploadGoodsInfo({
      pid: row.id,
      status: 0,
      type: "update",
    }).then((res) => {
      if(res.code==0){
        Toast.success(res.msg)
      }else{
        Toast.fail(res.msg)
      }
    });
  };
  onEndReached = (event) => {
    let page = this.state.page;
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true, page: page + 1 });
    this.fetchList();
  };
  render() {
    let { vision, showTop } = this.state;
    const row = (rowData, sectionID, rowID) => {
      // console.log("rowData", rowID, rowData);
      return (
        <div key={rowID} className="list_item">
          <WingBlank size="lg">
            <Carousel autoplay={false} infinite>
              {rowData.image.map((imgurl) => (
                <a
                  key={rowID}
                  className="carousel_item"
                  style={{ height: this.state.imgHeight }}
                >
                  <img
                    src={path + "/images/" + imgurl}
                    alt=""
                    className="carousel_item_img"
                    onLoad={() => {
                      // fire window resize event to change height
                      // window.dispatchEvent(new Event("resize"));
                      // this.setState({ imgHeight: "auto" });
                    }}
                  />
                </a>
              ))}
            </Carousel>
            {vision ? (
              <div className="opreate">
                <Button
                  type="primary"
                  onClick={() => {
                    this.editAction(rowData);
                  }}
                  style={{ marginRight: "4px" }}
                  inline
                  size="small"
                >
                  编辑
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    this.deleteAction(rowData);
                  }}
                  style={{ marginRight: "5px" }}
                  inline
                  size="small"
                >
                  删除
                </Button>
              </div>
            ) : (
              ""
            )}
          </WingBlank>
          <WingBlank size="lg">
            <div className="good_title">
            
              {rowData.title}
            </div>
            <div className="good_price"> {rowData.price}</div>
            {rowData.paypal_code ? (
              <div className="good_btns_style1">
                <Button type="primary" inline size="small">
                  <div dangerouslySetInnerHTML={ {__html:rowData.paypal_code}}></div>
                </Button>
                <Button
                  href={rowData.buy_now}
                  type="primary"
                  inline
                  size="small"
                >
                  Buy
                </Button>
              </div>
            ) : (
              <div className="good_btns_style2">
                <Button href="http://baidu.com" type="primary" size="small">
                  Buy
                </Button>
              </div>
            )}
          </WingBlank>
        </div>
      );
    };
    return (
      <Fragment>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={() => <span>HiLouis</span>}
          renderFooter={() => (
            <div style={{ padding: 20, textAlign: "center" }}>
              {this.state.isLoading ? "Loading..." : "Loaded"}
            </div>
          )}
          renderRow={row}
          useBodyScroll
          renderSeparator={separator}
          pageSize={5}
          onScroll={() => {
            this.pageScroll();
          }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />

        <div className="release_btn">
          {vision ? (
            <Button
              type="primary"
              onClick={() => {
                this.releaseAction();
              }}
              style={{ marginBottom: "5px" }}
              inline
              size="small"
            >
              发布
            </Button>
          ) : (
            ""
          )}
          {showTop ? (
            <div
              className="top_btn"
              onClick={() => {
                this.toTop();
              }}
            >
              <img src={top} alt="top"></img>
            </div>
          ) : (
            ""
          )}
        </div>
      </Fragment>
    );
  }
}
const ListsCom = withRouter(Lists);
export default ListsCom;
