import React, { Component, Fragment } from "react";
import { List, Button,InputItem, WhiteSpace ,Toast } from "antd-mobile";
import { createForm } from "rc-form";
import { login } from ".././utils/api";
import { setToken } from ".././utils/index";
import { withRouter } from "react-router";
// import { browserHistory } from 'react-router'
class GoodsList extends Component {
  state = {
    uname: "admin",
    pwd: "2c1be7c6b94cd14c0b855a38900047a2",
    sign:'28fe4e8be969958ec956e3b7537a9cde',
  };
  componentDidMount() {}
  handleClick = () => {
    let { uname, pwd,sign } = this.state;
    login({
      uname,
      sign,
      pwd,
    }).then((res)=>{
      if(res.code==0){
        setToken(res.data.token)
        setTimeout(()=>{
          console.log(this.props)
          this.props.history.push('/')
         
        },100)
      }
    })
    
  };
  onUserChange = (value) => {
    value = value.replace(/\s/g, "");
    this.setState({
      uname: value,
    });
  };
  onPassChange = (value) => {
    value = value.replace(/\s/g, "");
    this.setState({
      pwd: value,
    });
  };
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Fragment>
        <List renderHeader={() => "管理员登录"}>
        <WhiteSpace size="xl" />
          <InputItem
            {...getFieldProps("uname")}
            clear
            placeholder="用户名"
            value={this.state.uname}
            onChange={this.onUserChange}
           
          >
            用户名
          </InputItem>
          <WhiteSpace size="xl" />
          <InputItem
            {...getFieldProps("pwd")}
            clear
            placeholder="密码"
            value={this.state.pwd}
            onChange={this.onPassChange}
           
          >
            密码
          </InputItem>
          <List.Item>
          <WhiteSpace size="xl" />
            <Button type="primary"  onClick={this.handleClick}> 登录</Button>
          </List.Item>
        </List>
      </Fragment>
    );
  }
}
const Home = withRouter(createForm()(GoodsList));

export default Home;
