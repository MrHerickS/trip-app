import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import GooglePlacesAutocomplete from "../GooglePlacesAutocomplete";

import styles from '../../scss/base.scss';

class TripForm extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      errors: [],
      values: {
        from: (props.defaultValues.from) ? props.defaultValues.from : "",
        to: (props.defaultValues.to) ? props.defaultValues.to : "",
        date: (props.defaultValues.date) ? props.defaultValues.date : moment().format("YYYY-MM-DD"),
        passengers: (props.defaultValues.passengers) ? props.defaultValues.passengers : 1,
      }
    }

  }

  onSubmit(e) {

    e.preventDefault();
    e.stopPropagation();

    // handle validation
    const {values} = this.state;
    let errors = [];

    if(values.from === "") {
      errors.push("from");
    }

    if(values.to === "") {
      errors.push("to");
    }

    if(moment(values.date) && moment(values.date).isBefore(moment().startOf("day"))) {
      errors.push("date");
    }

    if(values.passengers === "" || Number(values.passengers) < 1) {
      errors.push("passengers");
    }

    // no errors, submit
    if(errors.length === 0) {

      this.setState({
        errors: []
      })

      if(this.props.onFormFilled) {
        this.props.onFormFilled(values);
      }

    } else {

      this.setState({
        errors: errors
      })

    }

  }

  onInputChange(name, e) {

    const {value, type} = e.target;

    this.setState((state) => {

      // prevent negative values
      if(type === "number" && Number(value) < 1) return state;

      state.values[name] = value;

      return state;

    })

  }

  onPlaceChange(name, value) {

    this.setState((state) => {

      state.values[name] = value;

      return state;

    })

  }

  render() {

    const {values, errors} = this.state;

    return (
      <div className={styles.floatingBar}>

        <form onSubmit={this.onSubmit.bind(this)}>

          <Grid container spacing={1} alignItems="flex-end">

            <Grid item>
              <GooglePlacesAutocomplete error={(errors.indexOf("from") > -1)} onChange={this.onPlaceChange.bind(this, "from")} defaultValue={values.from}  placeholder={"Where do you are?"} />
            </Grid>

            <Grid item>
              <GooglePlacesAutocomplete error={(errors.indexOf("to") > -1)} onChange={this.onPlaceChange.bind(this, "to")} defaultValue={values.to} placeholder={"End Point"} />
            </Grid>

            <Grid item>
              <TextField error={(errors.indexOf("date") > -1)} onChange={this.onInputChange.bind(this, "date")} value={values.date} type="date" label={"Date"} margin="normal" />
            </Grid>

            <Grid item>
              <TextField error={(errors.indexOf("passengers") > -1)} onChange={this.onInputChange.bind(this, "passengers")} value={values.passengers} type="number" label={"Passengers"} margin="normal" />
            </Grid>

            <Grid item>
              <Button type="submit" variant="contained" color="primary">Calculate Trip</Button>
            </Grid>

          </Grid>

        </form>

      </div>
    );

  }
};

TripForm.propTypes = {
  onFormFilled: PropTypes.func,
  defaultValues: PropTypes.object,
};

export default TripForm;
