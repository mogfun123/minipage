import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { createForm } from "rc-form";
import { uploadImages, getGoodData, uploadGoodsInfo } from ".././utils/api";
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
      goodInfo: {},
    };
  }
  componentDidMount() {
    this.fetchData();
    console.log(this.props.location);
  }
  fetchData() {
    let state = this.props.location.state;
    let id = state ? state.id : "";
    if (!id) return;
    getGoodData({
      pid: id,
    }).then((res) => {
      if (res.code == 0) {
        let images = res.data.image || [];
        let files = images.map((item) => {
          return {
            dataurl:item,
            url: path + "/images/" + item,
          };
        });
        this.setState({ goodInfo: res.data, files });
      } else {
        Toast.fail(res.msg);
      }
    });
  }
  onSubmit = () => {
    const form = this.props.form;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);

      this.readyUploadGoodsInfo();
    });
  };

  readyUploadGoodsInfo = () => {
    const form = this.props.form;
    let files = this.state.files;
    let state = this.props.location.state;
    let id = state ? state.id : "";
    let images = "";
    let urls = files.map((item) => item.dataurl);
    images = urls.join("|");
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let data = { ...fieldsValue };
      data.images = images;
      data.status = 1;
      if (id) {
        data.type = "update";
        data.pid = id;
      }
      uploadGoodsInfo({
        ...data,
      }).then((res) => {
        if (res.code == 0) {
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
      });
    });
  };
  onFilesChange = (files, type, index) => {
    console.log(files, type, index);
    let len = files.length - 1;
    let file = files[len];
    if (type == "add" && !file.dataurl) {
      let formData = new FormData();
      formData.append("file", file.file);
      uploadImages(formData).then((res) => {
        if (res.code == 0) {
          file["dataurl"] = res.src;
          this.setState({
            files,
          });
        } else {
          Toast.fail("图片上传失败");
        }
      });
    } else {
      this.setState({
        files,
      });
    }
  };
  onImageClick = (index, fs) => {
    console.log(index, fs);
  };
  render() {
    const { getFieldProps } = this.props.form;
    const { files, goodInfo } = this.state;
    return (
      <Fragment>
        <List renderHeader={() => "文案"}>
          <WingBlank size="lg">
            <TextareaItem
              {...getFieldProps("title", {
                initialValue: goodInfo.title,
              })}
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
              onImageClick={this.onImageClick}
              selectable={files.length <= 15}
              multiple={false}
            />
            <WhiteSpace size="sm" />
          </WingBlank>
        </List>
        <WhiteSpace size="sm" />
        <List renderHeader={() => "价格"}>
          <WingBlank size="lg">
            <InputItem
              {...getFieldProps("price", {
                initialValue: goodInfo.price,
              })}
              placeholder="价格"
            >
             
            </InputItem>
          </WingBlank>
        
         
        </List>
        <List renderHeader={() => "buyNow"}>
        <WingBlank size="lg">
            <InputItem
              {...getFieldProps("buyNow", {
                initialValue: goodInfo.buyNow,
              })}
              placeholder="buyNow"
            >
              
            </InputItem>
          </WingBlank>
          </List>
          <List renderHeader={() => "paypalCode"}>
          <WingBlank size="lg">
            <TextareaItem
             
              {...getFieldProps("paypalCode", {
                initialValue:goodInfo.paypalCode,
              })}
              autoHeight
              placeholder="paypalCode"
            ></TextareaItem>
          </WingBlank>
            </List>
        <List>
          <WhiteSpace size="lg" />
          <Flex justify="center">
            <Button type="primary" onClick={this.onSubmit} inline>
              发布
            </Button>
          </Flex>
          <WhiteSpace size="lg" />
        </List>
      </Fragment>
    );
  }
}
let EditCom = withRouter(createForm()(Editpage));
export default EditCom;
