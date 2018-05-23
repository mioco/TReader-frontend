import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;

@connect((data) => {
  return data
})
@Form.create()
export default class Register extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    countdown: 5,
    getCaptchaLock: false,
    buttonText: '获取验证码',
    checkCaptcha: true,
    loading: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { form, dispatch, history } = this.props;
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({
          loading: true,
        });
        const payload = form.getFieldsValue(['email', 'captcha', 'password']);
        await dispatch({
          type: 'user/register',
          payload,
        });
        this.setState({
          loading: false,
        });
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('密码不一致!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  getCaptcha = () => {
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      const errkey = Object.keys(err);
      if (!err || (errkey.length === 1 && errkey[0] === 'captcha')) {
        const { form, dispatch } = this.props;
        const email = form.getFieldValue('email');
        this.setState({
          getCaptchaLock: true,
          checkCaptcha: true,
        });
        const countdown = (num) => setTimeout(() => {
          if (!this.state.getCaptchaLock) {
            return;
          }
          if (!num) {
            this.setState({
              getCaptchaLock: false,
              buttonText: '重新获取',
            });
            return;
          }
          this.setState({
            buttonText: `重新获取(${num})`,
          });
          return countdown(num - 1);
        }, 1000);
        countdown(60);
        const res = await dispatch({
          type: 'user/sendCaptchaCode',
          payload: { email },
        });
        if (res === 'Error') {
          this.setState({
            getCaptchaLock: false,
            buttonText: '重新获取',
          });
        }
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { getCaptchaLock, buttonText, checkCaptcha, loading } = this.state;
    const agreement = getFieldValue('agreement');

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '请输入有效邮箱',
            }, {
              required: true, message: '邮箱不能为空',
            }],
          })(
            <Input style={{ width: '100%' }} placeholder="邮箱" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" style={{ width: '100%' }} placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认密码!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} style={{ width: '100%' }} placeholder="确认密码" />
          )}
        </FormItem>
        <FormItem>
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: checkCaptcha, message: '验证码不能为空!' }],
              })(
                <Input placeholder="验证码" />
              )}
            </Col>
            <Col span={12}>
              <Button onClick={this.getCaptcha} disabled={getCaptchaLock} loading={loading}>
                { buttonText }
              </Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem style={{ marginBottom: 0 }}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>我已阅读并同意 <a href="">用户条款</a></Checkbox>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={!agreement}>注册</Button>
          <Link to="/user/login">已有账号</Link>
        </FormItem>
      </Form>
    );
  }
}
