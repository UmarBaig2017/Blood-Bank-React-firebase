import React, { Component } from 'react';
import { Router as Router, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Donation from './Donation'
import Thanks from './thanks'
import createBrowserHistory from "history/createBrowserHistory"

const customHistory =createBrowserHistory();


 
class Routing extends Component {
    render() {
        return (
            <div >
                <Router history={customHistory}> 
                    <div>
                        <Route exact path="/" component={Dashboard} />
                       <Route path="/donation" component={Donation} />
                       <Route path="/Thanks" component={Thanks} />
                         
                    </div>

                </Router>

            </div>
        );
    }
}

export default Routing;