import React from 'react';
import qs from 'query-string';
import { connect } from 'dva';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { GoogleMap, withGoogleMap, DirectionsRenderer } from "react-google-maps"

import styles from '../scss/base.scss';
import Fullscreen from "../layouts/Fullscreen";

class Home extends React.Component {

  onGoBack() {

    // push adding the props
    this.props.history.push(`/${this.props.history.location.search}`);

  }

  render() {

    const Map = withGoogleMap(props =>
      <GoogleMap
        defaultZoom={8}
      >
        {props.children}
      </GoogleMap>
    );

    const tripInfo = qs.parse(this.props.history.location.search);

    return (
      <Fullscreen onBack={this.onGoBack.bind(this)}>

        {!tripInfo.from || !tripInfo.to || !tripInfo.date || !tripInfo.passengers ? (
          <p>Invalid input!</p>
        ) : (

          <React.Fragment>

            <div className={styles.tripInfo}>

              <Grid container spacing={1}>

                <Grid item xs={3}>
                  <Typography variant="h4">From</Typography>
                  <Typography>{tripInfo.from}</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography variant="h4">To</Typography>
                  <Typography>{tripInfo.to}</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography variant="h4">Date</Typography>
                  <Typography>{tripInfo.date}</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography variant="h4">Passengers</Typography>
                  <Typography>{tripInfo.passengers}</Typography>
                </Grid>

              </Grid>

            </div>

            {this.props.core.ready && (
              <Map
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                >

                <DirectionsRenderer
                  directions={this.props.core.directions}
                  />
              </Map>
            )}

          </React.Fragment>

        )}

      </Fullscreen>
    );


  }

}

//       <button onClick={() => { props.dispatch({type: 'core/add'}); }}>+</button>

Home.propTypes = {
};

function mapStateToProps(state) {
  return { core: state.core };
}

export default connect(mapStateToProps)(Home);
