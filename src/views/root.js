// react
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import axios from 'axios';

class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      weather: {}
    }
  }

  componentWillMount() {
    const url = `
    https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%202487889&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
    `
    axios.get(url)
      .then((res) => {
        this.setState({
          weather: res.data.query.results.channel.item.condition
        })
      });
  }

  changeClimate() {
    let text = this.state.weather.text === 'Sunny' ? 'Cloudy' : 'Sunny';
    let state = Object.assign(this.state.weather, { text });
    this.setState(state);
  }

  render() {
    const changeClimate = this.changeClimate.bind(this);
    return (
      <section className={`section ${this.state.weather.text ? this.state.weather.text.toLowerCase() : ''}`}>
        <div className='weather'>
          Weather today in San Deigo, {`${this.state.weather.temp} degrees`} {this.state.weather.text}
        </div>
        <hr style={{'opacity': '0'}} />
        <button className='btn' onClick={changeClimate}>Change Climate</button>
      </section>
    );
  }
};

// redux
import { Provider } from 'react-redux';

export default class Root extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  }
  
  render() {
    const { history, store } = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={Home} />
        </Router>
      </Provider>
    )
  }
}