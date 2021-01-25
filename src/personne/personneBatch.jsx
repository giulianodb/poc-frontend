import React, { Component } from 'react'
import axios from 'axios'
// import {toastr} from 'react-redux-toastr'
import Message from '../common/msg/messages'

import PersonneCreate from './personneCreate'
import PersonneList from './personneList'
import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'

const URL = 'http://ec2-3-16-152-3.us-east-2.compute.amazonaws.com:81/personnes/batch'
// const URL = 'http://localhost:8081/personnes/batch'

export default class PersonneUpload extends Component {
 
  constructor(props) {
    super (props)
 
    this.state = {batch: {quantiteErreurs:0,quantiteNonInseree: 0,quantiteOk:0,date: 0,lignesTraitees: 0},
      mostrarMessage:false,classeDivMsg:'' , message: '',iconeMessage:'' }
    
    this.iniciarBatch = this.iniciarBatch.bind(this)
    this.prendreDernierBatch = this.prendreDernierBatch.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.handleMostrarMessages = this.handleMostrarMessages.bind(this)
    
    this.prendreDernierBatch()
 }


 iniciarBatch() { 
  const self = this
    axios.post(URL).then(respo => {
      this.setState({...this.state, classeDivMsg:'alert alert-info alert-dismissible',  
          mostrarMessage:true, message:'Batch a été exécuté avec succès', iconeMessage: 'con fa fa-info'})
      this.prendreDernierBatch()
      this.fermerMessage()
    }) .catch(function (error) {
      var message = "Erreur"
      if(error !== undefined && error.response !== undefined && error.response.data.message != null){
         message = error.response.data.message
      }
      self.setState({...self.state, classeDivMsg:'alert alert-danger alert-dismissible',  mostrarMessage:true, message:message, iconeMessage: 'con fa fa-danger'})
      self.fermerMessage()
   });
 }

 prendreDernierBatch(){
    axios.get(URL).then(respo => { 
      var dataR = respo.data
      this.setState({batch:dataR})
  
  }) 
 }

 formatDate(){
  let data = new Date(this.state.batch.date);
  let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear() +" - "+data.getHours()+":"+data.getMinutes()+":"+data.getSeconds();                  
 return dataFormatada
 }

 fermerMessage(){
  const self = this
setTimeout( function() {
   self.setState({...this.state,mostrarMessage:false})
 }, 3000 );
}

 handleMostrarMessages(e){
  this.setState({...this.state, mostrarMessage: e})
}
  
   render() { 
     
      return ( 


        <Content>
           { this.state.mostrarMessage && 
            
            <Message classeDivMsg={this.state.classeDivMsg} 
                  message={this.state.message} 
                  handleMostrarMessages={this.handleMostrarMessages}
                  iconeMessage={this.state.iconeMessage}                      />}

        <div className="box box-primary">  
           <ContentHeader title='Démarrer batch' small='Versão 1.0' />
              <br></br>
              <div className='box-footer'>
                    <button className='btn btn-primary' onClick={this.iniciarBatch}>Démarrer batch</button>
                </div>

        </div>


        <div className="box box-primary">  
            <h3 className="box-title">Dernier Batch executé</h3>
            
            <div>Date: {this.formatDate()}</div> 
            <div>Quantité d'erreurs: {this.state.batch.quantiteErreurs} </div>
            <div>Quantité Ok : {this.state.batch.quantiteOk} </div>
            <div>Quantité non insérée: {this.state.batch.quantiteNonInseree} </div>
            <div>Lignes traitées : {this.state.batch.lignesTraitees} </div>
 
        </div>         


        </Content>

      ); 
    } 
  } 
