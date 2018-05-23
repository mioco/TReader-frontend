import React from 'react';
import { connect } from 'dva';
import PostItem from '../../components/PostItem';
import styles from './index.css';

class HomePage extends React.Component {
  state = {
    data: [{}, {}],
    loading: true,
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      data: [
        {
          title: 'Title1',
          content: 'this is a post',
          fromUrl: 'douban.com',
          keywords: ['a', 'b']
        },
        {
          title: 'Title2',
          content: 'this is a post',
          fromUrl: 'douban.com',
          keywords: ['c']
        }
      ],
      loading: false
    }), 500)
  }

  render() {
    const { data, loading } = this.state;
    const postList = data.map(item => {
      return (
        <PostItem 
          data={item}
          loading={loading}
          key={item.title}
        />
      )
    })
    return (
      <div className={styles.normal}>
        <div className={styles.left}>
          {postList}
        </div>
        <div className={styles.right}>
          aa
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
};

export default connect()(HomePage);
