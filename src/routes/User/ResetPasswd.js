import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Button, Checkbox, Col, Row, Icon } from 'antd';

const FormItem = Form.Item;

@Form.create()
@connect(({ user }) => ({
  user,
}))
export default class ResetPasswd extends React.Component {
  state = {
    loading: false,
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
          type: 'user/user',
          payload: values,
        });
        this.setState({
          loading: false,
        });
      }
    });
  }
  componentWillMount() {
    const captchaImg = this.state.captchaImgUrl + Math.random();
    this.setState({ captchaImg });
  }
  getCaptchaImgUrl = () => {
    this.setState({
      captchaImg: this.state.captchaImgUrl + Math.random(),
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入确认密码!' }],
          })(
            <Input type="password" placeholder="确认密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={this.state.loading}>
            确定
          </Button>
        </FormItem>
      </Form>
    );
  }
}
