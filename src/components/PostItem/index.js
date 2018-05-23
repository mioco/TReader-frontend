import { Card } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

function PostItem({ data: { title, content, fromUrl, keywords }, loading }) {
  console.log(title, keywords)
  const keywordsComponents = keywords && keywords.map(kw => <a>{kw}&nbsp;</a>);

  return (
    <Card loading={loading} style={{ marginBottom: '1em' }}>
      <div>
        <div>来自关键字: {keywordsComponents}</div>
        <h2>{title}</h2>
      </div>  
      <div>{content}</div>
      <small className={styles.foot}>from: <a>{fromUrl}</a></small>
    </Card>
  );
}

PostItem.propTypes = {
};

export default connect()(PostItem);
