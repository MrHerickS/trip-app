import { routerRedux } from 'dva/router';
import qs from 'query-string';

import getRoute from "../utils/gmaps";

export default {

  namespace: 'core',

  state: {
    ready: false,
    directions: false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line

      if(history.location.pathname === "/directions") {

        // once dom is loaded, get directions
        document.addEventListener("DOMContentLoaded", function(event) {
          dispatch({type: 'fetchDirections', payload: {...qs.parse(history.location.search), noRedirect: true}});
        });

      }

    },
  },

  // redux saga effects
  effects: {

    *fetchDirections({ payload }, { call, put }) {  // eslint-disable-line

      try {

        const directions = yield getRoute({
          origin: payload.from,
          destination: payload.to,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });

        yield put({ type: 'save', payload: { ready: true, directions: directions } });

        if(!payload.noRedirect) {

          yield put(routerRedux.push({
            pathname: `/directions?${qs.stringify(payload)}`,
          }));

        };

      } catch (e) {

        console.log(e);

        alert("Error calculating directions!");

      }

    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },

};
