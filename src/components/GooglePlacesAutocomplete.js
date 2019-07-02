import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import CircularProgress from '@material-ui/core/CircularProgress';
import PlaceIcon from '@material-ui/icons/Place';

import styles from '../scss/base.scss';

class GooglePlacesAutocomplete extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      loading: false,
      value: props.defaultValue,
      results: []
    }

    // timeout to prevent multiple useless requests
    this.timeout = null;

  }

  // call google maps api for autocomplete details
  async doAutocomplete(address) {

    // autocomplete service
    const service = new window.google.maps.places.AutocompleteService();

    service.getQueryPredictions({ input: address }, (predictions, status) => {

      this.setState({
        loading: false,
        results: predictions
      })

    });

  }

  onSearch(e) {

    const { value } = e.target;

    this.setState({
      loading: (value && value !== "") ? true : false,
      results: [],
      value: value
    })

    // clear interval
    clearTimeout(this.timeout);

    // check if field is not empty
    if(value && value !== "") {
      this.timeout = setTimeout(this.doAutocomplete.bind(this, value), 500)
    }

  }

  onBlur() {

    // clear interval
    clearTimeout(this.timeout);

    this.setState((state) => {

      // if user is searching yet
      if(state.loading) {
        state.results = [];
        state.value = "";

        if(this.props.onChange) {
          this.props.onChange("");
        }

      }

      state.loading = false;

      return state;

    })

  }

  onChooseOption(option) {

    this.setState({
      loading: false,
      value: option,
      results: []
    })

    if(this.props.onChange) {
      this.props.onChange(option);
    }

  }

  render() {

    return (
      <div className={styles.placeAutocomplete}>

      <Grid container spacing={1} alignItems="center">

        <Grid item className={styles.placeAutocompleteIcon}>

          {this.state.loading ? (
            <CircularProgress size={20} />
          ) : (
            <PlaceIcon />
          )}

        </Grid>

        <Grid item>

          <TextField
            label={this.props.placeholder}
            error={this.props.error}
            className={styles.placeAutocompleteInput}
            value={this.state.value}
            onChange={this.onSearch.bind(this)}
            onBlur={this.onBlur.bind(this)}
            margin="normal"
          />

        </Grid>

      </Grid>

      {this.state.results.length > 0 && (
        <Paper className={styles.placeAutocompleteDropdown}>
          <List>
            {this.state.results.map((item) => {
              return <ListItem button key={item.id} onClick={this.onChooseOption.bind(this, item.description)}><ListItemText>{item.description}</ListItemText></ListItem>;
            })}
          </List>
        </Paper>
      )}

      </div>
    )

  }

}

GooglePlacesAutocomplete.propTypes = {
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
};

GooglePlacesAutocomplete.defaultProps = {
  placeholder: "Enter a Address",
  defaultValue: "",
  error: false,
};

export default GooglePlacesAutocomplete;
