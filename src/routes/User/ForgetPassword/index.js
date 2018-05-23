import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Button, Checkbox, Col, Row, Icon } from 'antd';
import styles from './index.css';

const FormItem = Form.Item;

@Form.create()
@connect(({ user }) => ({
  user,
}))
export default class ForgetPassword extends React.Component {
  state = {
    loading: false,
    captchaImgUrl: '/api/kaptcha/getKaptchaImage?random=',
    captchaImg: '',
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
          type: 'user/getResetUrl',
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
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input placeholder="邮箱" />
          )}
        </FormItem>
        <FormItem>
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '验证码不能为空!' }],
              })(
                <Input placeholder="验证码" />
              )}
            </Col>
            <Col span={12}>
              <img src={this.state.captchaImg} className={styles.codeImg}/> 
              <a onClick={this.getCaptchaImgUrl}>换一张&nbsp;<Icon type="reload" /></a>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={this.state.loading}>
            发送到验证邮箱
          </Button>
        </FormItem>
      </Form>
    );
  }
}
