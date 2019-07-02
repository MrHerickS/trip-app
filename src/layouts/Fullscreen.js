import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';

import styles from '../scss/base.scss';

class FullscreenLayout extends React.Component {

  render() {

    return (
      <div>

        <AppBar className={styles.mainNavigation} position="static">
          <Toolbar>
            {this.props.onBack && (
              <IconButton onClick={this.props.onBack} edge="start" className={styles.menuButton} color="inherit" aria-label="Menu">
                <BackIcon />
              </IconButton>
            )}

            <Typography variant="h6" className={styles.title}>
              Trip Planner
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={styles.app}>
          {this.props.children}
        </div>
      </div>
    );

  }

}

FullscreenLayout.propTypes = {
  onBack: PropTypes.func
};

// set redux state to props
function mapStateToProps(state) {
  return { core: state.core };
}

export default connect(mapStateToProps)(FullscreenLayout);
