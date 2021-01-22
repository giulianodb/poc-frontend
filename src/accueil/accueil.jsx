import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'

class Accueil extends Component {
   render(){
      return (
         <div>
            <ContentHeader title="Accuiel" small="Version 1.0" />
            <Content>
               Accueil
            </Content>

         </div>

      )
   }
}

export default Accueil
