import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Dashboard from './Dashboard';
import SurveyNew from './SurveyNew';
import Landing from './Landing';

class App extends React.Component {
    componentDidMount(){
        this.props.fetchUser();
    }
  render() {

    return (
        <BrowserRouter>
        <div className="container">
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/surveys" exact component={Dashboard} />
            <Route path="/survey_new" exact component={SurveyNew} />
            
            </div>
        </ BrowserRouter>
    );
  }
}

export default connect(null,  actions )(App);
