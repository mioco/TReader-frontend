import React from 'react';
import { connect } from 'dva';

function Topic() {
  return (
    <div>
      Topic
    </div>
  );
}

Topic.propTypes = {
};

export default connect()(Topic);
