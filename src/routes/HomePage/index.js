import React from 'react';
import { connect } from 'dva';
import PostItem from '../../components/PostItem';
import styles from './index.css';

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

function HomePage() {
  const postList = data.map(item => {
    return (
      <PostItem title={item.title} content={item.content} fromUrl={item.fromUrl} loading={true} key={item.title} />
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

HomePage.propTypes = {
};

export default connect()(HomePage);
