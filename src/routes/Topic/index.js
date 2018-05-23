import React from 'react';
import { connect } from 'dva';
import { Tag, Input, Tooltip, Icon, Card, Divider } from 'antd';
import PostItem from '../../components/PostItem';
import styles from './index.less';

const data = [
  {
    title: 'Title1',
    content: 'this is a post',
    fromUrl: 'douban.com'
  },
  {
    title: 'Title2',
    content: 'this is a post',
    fromUrl: 'douban.com'
  }
];

class Topic extends React.Component {
  state = {
    tags: ['Unremovable', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => this.setState({
      data,
      loading: false
    }), 500)
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue, loading } = this.state;
    const postList = data.map(item => {
      return (
        <PostItem data={item} loading={loading} key={item.title} />
      )
    })
    return (
      <div>
        <Card className={styles.tagBar}>
          {tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)} className={styles.tag}>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
          })}
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag
              onClick={this.showInput}
              style={{ background: '#fff', borderStyle: 'dashed' }}
            >
              <Icon type="plus" /> New Tag
            </Tag>
          )}
        </Card>
        {postList}
      </div>
    );
  }
}

Topic.propTypes = {
};

export default connect(({ topic }) => ({
  topic,
}))(Topic);
