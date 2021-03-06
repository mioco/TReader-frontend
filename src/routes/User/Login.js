import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Button, Checkbox } from 'antd';
import './form.less';

const FormItem = Form.Item;

@connect(({ user }) => ({
  user,
}))
@Form.create()
export default class Login extends React.Component {
  state = {
    loading: false,
  }
  componentWillMount() {
    const { user: { status }, history } = this.props;
    status && history.push("/");
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const { form, dispatch, history } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          loading: true,
        });
        dispatch({
          type: 'user/login',
          payload: values,
        });
        this.setState({
          loading: false,
        });
        history.push("/");
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true }],
          })(
            <div>
              <label>邮箱</label>
              <Input />
            </div>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true }],
          })(
            <div>
              <label>密码</label>
              <Input type="password" />
            </div>
          )}
        </FormItem>
        <FormItem>
          <Link to="resetpwd" style={{ float: 'right' }} href="">忘记密码</Link>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={this.state.loading}>
            登录
          </Button>
          <Link to="/user/register">现在注册!</Link>
        </FormItem>
      </Form>
    );
  }
}
