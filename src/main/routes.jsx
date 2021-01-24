import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import Accueil from '../accueil/accueil'
import Personne from '../personne/personne'
import PersonneBatch from '../personne/personneBatch'
import PersonneUpload from '../personne/personneUpload'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={Accueil} />
        <Route path='/personne' component={Personne} />
        <Route path='/personne/upload' component={PersonneUpload} />
        <Route path='/personne/batch' component={PersonneBatch} />
        <Redirect from='*' to='/' />
    </Router>
)