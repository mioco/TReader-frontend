import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

@connect(({ login }) => ({
  login,
}))
@Form.create()
export default class Login extends React.Component {
  state = {
    loading: false,
  }
  componentWillMount() {
    const { login: { status }, history } = this.props;
    console.log(this.props)
    status && history.push("/");
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          loading: true,
        });
        await dispatch({
          type: 'login/login',
          payload: values,
        });
        this.setState({
          loading: false,
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input placeholder="手机号或邮箱" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a style={{ float: 'right' }} href="">忘记密码</a>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={this.state.loading}>
            登录
          </Button>
          <Link to="/user/register">现在注册!</Link>
        </FormItem>
      </Form>
    );
  }
}
