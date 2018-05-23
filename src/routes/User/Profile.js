import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Button, Checkbox, Card, Divider, Select, List } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@connect(({ user }) => ({
  user,
}))
@Form.create()
export default class Profile extends React.Component {
  state = {
    loading: false,
  }
  componentWillMount() {
    const { user: { status }, history } = this.props;
    !status && history.push("/");
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const { form, dispatch, user } = this.props;
    form.validateFields(async (err, values) => {
      console.log(err)
      if (!err) {
        this.setState({
          loading: true,
        });
        await dispatch({
          type: 'user/addSubscriptionUrl',
          payload: { ...values, userId: user.id },
        });
        this.setState({
          loading: false,
        });
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const urlError = isFieldTouched('userName') && getFieldError('userName');

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div>
        <Card>
          <List
            dataSource={this.props.user.urls}
            renderItem={item => (
              <List.Item>{item}</List.Item>
            )}
          />
          <Divider />
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              validateStatus={urlError ? 'error' : ''}
              help={urlError || ''}
              label="订阅列表"
              {...formItemLayout}
            >
              {getFieldDecorator('url', {
                rules: [{ message: '请输入列表链接' }],
              })(
                <Input placeholder="https://www.v2ex.com/recent" />
              )}
            </FormItem>
            <FormItem
              validateStatus={urlError ? 'error' : ''}
              help={urlError || ''}
              label="内容链接示例一"
              {...formItemLayout}
            >
              {getFieldDecorator('tempItem1', {
                rules: [{ message: '请输入任意内容链接一' }],
              })(
                <Input placeholder="https://www.v2ex.com/t/443334" />
              )}
            </FormItem>
            <FormItem
              validateStatus={urlError ? 'error' : ''}
              help={urlError || ''}
              label="内容链接示例二"
              {...formItemLayout}
            >
              {getFieldDecorator('tempItem2', {
                rules: [{ message: '请输入任意内容链接二' }],
              })(
                <Input placeholder="https://www.v2ex.com/t/443452" />
              )}
            </FormItem>
            <FormItem
              validateStatus={urlError ? 'error' : ''}
              help={urlError || ''}
              label="订阅关键字"
              {...formItemLayout}
            >
              {getFieldDecorator('keywords')(
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="JavaScript, JAVA"
                  tokenSeparators={[',', ' ', '，']}
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                添加
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
