import React from 'react';
import { connect } from 'dva';

function _404() {
  return (
    <div>
      _404
    </div>
  );
}

_404.propTypes = {
};

export default connect()(_404);
