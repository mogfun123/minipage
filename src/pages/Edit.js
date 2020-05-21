import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { createForm } from "rc-form";
import { uploadImages, uploadGoodsInfo } from ".././utils/api";
import { path } from ".././utils/request";
import { withRouter } from "react-router";

import {
  List,
  ListView,
  Button,
  InputItem,
  Carousel,
  WingBlank,
  Flex,
  TextareaItem,
  ImagePicker,
  WhiteSpace,
  Toast,
} from "antd-mobile";

class Editpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      files: [],
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
  onSubmit = () => {
    const form = this.props.form;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      //   this.readyUpLoadImage().then((files) => {
      //     this.readyUploadGoodsInfo();
      //   });
      this.readyUpLoadImage();
    });
  };
  readyUpLoadImage = () => {
    // let { files } = this.state;
    // let file = files[0].file;
    // let formData = new FormData();
    // formData.append('file', file);
    // uploadImages(formData).then((res) => {
    //   if (res.code == 0) {
    //     console.log("res", res);
    //     this.readyUploadGoodsInfo();
    //     return res;
    //   }
    // });
     this.readyUploadGoodsInfo();
  };
  readyUploadGoodsInfo = (data) => {
    const form = this.props.form;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      uploadGoodsInfo({
        images:'20200520/xcv.jpg',
        ...fieldsValue
      }).then((res) => {
        if (res.code == 0) {
        }
      });
    });
   
  };
  onFilesChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  };
  render() {
    const { getFieldProps } = this.props.form;
    const { files } = this.state;
    return (
      <Fragment>
        <List renderHeader={() => "文案"}>
          <WingBlank size="lg">
            <TextareaItem
              {...getFieldProps("description")}
              autoHeight
              placeholder="文案"
            />
            <WhiteSpace size="sm" />
          </WingBlank>
        </List>

        <List renderHeader={() => "选择图片"}>
          <WingBlank>
            <ImagePicker
              files={files}
              onChange={this.onFilesChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 15}
              multiple={true}
            />
            <WhiteSpace size="sm" />
          </WingBlank>
        </List>
        <WhiteSpace size="sm" />
        <List renderHeader={() => "价格/buyNow/paypal"}>
          <WingBlank size="lg">
            <InputItem {...getFieldProps("price")} placeholder="价格">
              价格
            </InputItem>
          </WingBlank>
          <WingBlank size="lg">
            <InputItem {...getFieldProps("buyNow")} placeholder="buyNow">
            buyNow
            </InputItem>
          </WingBlank>
          <WingBlank size="lg">
            <TextareaItem
              title="paypalCode"
              {...getFieldProps("paypalCode")}
              placeholder="paypalCode"
            ></TextareaItem>
          </WingBlank>
        </List>
        <List>
          <WhiteSpace size="lg" />
          <Flex justify="center">
            <Button type="primary" onClick={this.onSubmit} inline>
              primary
            </Button>
          </Flex>
          <WhiteSpace size="lg" />
        </List>
      </Fragment>
    );
  }
}
const EditCom = withRouter(createForm()(Editpage));
export default EditCom;
