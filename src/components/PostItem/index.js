import { Card } from 'antd';
import React from 'react';
import { connect } from 'dva';

function PostItem({ title, content, fromUrl, loading }) {
  return (
    <Card loading={loading} title={title} style={{ marginBottom: '1em' }}>
      {content}
      <div><small>{fromUrl}</small></div>
    </Card>
  );
}

PostItem.propTypes = {
};

export default connect()(PostItem);
