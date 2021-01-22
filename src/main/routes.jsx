import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import Accueil from '../accueil/accueil'
import Personne from '../personne/personne'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={Accueil} />
        <Route path='/personne' component={Personne} />
        
        <Redirect from='*' to='/' />
    </Router>
)