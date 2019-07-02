import React from 'react';
import qs from 'query-string';
import { connect } from 'dva';

import Fullscreen from "../layouts/Fullscreen";
import TripForm from "../components/Forms/TripForm";

import CircularProgress from '@material-ui/core/CircularProgress';

import styles from '../scss/base.scss';

class Home extends React.Component {

  onFillTrip(values) {

    this.props.dispatch({type: 'core/fetchDirections', payload: values});

  }

  render() {

    const defaultValues = qs.parse(this.props.history.location.search);

    return (
      <Fullscreen>

        {this.props.loading.global ? (
          <div className={styles.loader}><CircularProgress /></div>
        ) : (
          <TripForm defaultValues={defaultValues} onFormFilled={this.onFillTrip.bind(this)} />
        )}

      </Fullscreen>
    );


  }

}

Home.propTypes = {
};

function mapStateToProps(state) {
  return { core: state.core, loading: state.loading };
}

export default connect(mapStateToProps)(Home);
