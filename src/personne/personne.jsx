import React, { Component } from 'react'
import axios from 'axios'
// import {toastr} from 'react-redux-toastr'

import { cpfMask }  from '../common/utils/mask'
import PersonneCreate from './personneCreate'
import PersonneList from './personneList'
import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'
import Row from  '../common/layout/row'
import Message from '../common/msg/messages'

const URL = 'http://ec2-3-16-152-3.us-east-2.compute.amazonaws.com:81/personnes'
// const URL = 'http://localhost:8081/personnes'

export default class Personne extends Component {
   
constructor(props) {
   super (props)

   this.state = {nom:'',cpf:'',id:'',valorBotao:'Salvar', events:[],classeDivMsg:'alert alert-info alert-dismissible',classeBotao:'btn btn-primary'}
   
   this.handleAdd = this.handleAdd.bind(this)
   this.handleChangeCpf = this.handleChangeCpf.bind(this)
   this.handleChangeNom = this.handleChangeNom.bind(this)
   this.refresh = this.refresh.bind(this)
   this.iniciarUpdate = this.iniciarUpdate.bind(this)
   this.iniciarDelete = this.iniciarDelete.bind(this)
   this.handleMostrarMessages = this.handleMostrarMessages.bind(this)
   this.refresh()
}

   refresh(){
      var self = this;
      axios.get(URL)
       .then(function (response) {
         self.setState({events: response.data, id:'', cpf:'', nom:'', valorBotao:'Salvar', classeBotao:'btn btn-primary',displayMessage:'display: none;'})
       })
      .catch(function (error) {
         console.log(error);
      });
   }

   handleAdd(){
      const self = this
      if(this.state.id !== '' && this.state.valorBotao !== 'Deletar'){
         console.log(`${URL}/${this.state.id}`)
         axios.put(`${URL}/${this.state.id}`, {'nom':this.state.nom,'cpf':this.state.cpf})
         .then (resp => {
            this.refresh() 
            this.setState({...this.state, classeDivMsg:'alert alert-info alert-dismissible',  mostrarMessage:true, message:'Succès en modifiant', iconeMessage: 'con fa fa-info'})

            this.refresh() 
         })
         .catch(function (error) {
            var message = "Erreur lors du changement"
            if(error !== undefined && error.response !== undefined && error.response.data.message != null){
               message = error.response.data.message
            }
            self.setState({...self.state, classeDivMsg:'alert alert-danger alert-dismissible',  mostrarMessage:true, message:message, iconeMessage: 'con fa fa-danger'})
         });
   
      } else if(this.state.id !== '' && this.state.valorBotao === 'Deletar'){
         console.log(`${URL}/${this.state.id}`)
         axios.delete(`${URL}/${this.state.id}`)
         .then (resp => {
            this.refresh() 
            this.setState({...this.state, classeDivMsg:'alert alert-info alert-dismissible',  mostrarMessage:true, message:'Succès lors de la suppression', iconeMessage: 'con fa fa-info'})
            this.refresh() 
         })
         .catch(function (error) {
            var message = "Erreur lors de la suppression"
            if(error !== undefined && error.response !== undefined && error.response.data.message != null){
               message = error.response.data.message
            }

            self.setState({...self.state, classeDivMsg:'alert alert-danger alert-dismissible',  mostrarMessage:true, message:message, iconeMessage: 'con fa fa-danger'})
         });
      }
      else {
         axios.post(URL, {'nom':this.state.nom,'cpf':this.state.cpf})
         .then (resp => {
            this.refresh() 
            this.setState({...this.state, classeDivMsg:'alert alert-info alert-dismissible',  mostrarMessage:true, message:'Réussite à l’insertion', iconeMessage: 'con fa fa-info'})
   
         })
         .catch(function (error) {
            var message = "Erreur lors de l’insertion"
            if(error !== undefined && error.response !== undefined && error.response.data.message != null){
               message = error.response.data.message
            }
            self.setState({...self.state, classeDivMsg:'alert alert-danger alert-dismissible',  mostrarMessage:true, message:message, iconeMessage: 'con fa fa-danger'})
         });
      }


     
   }
   iniciarUpdate(teste){
      this.setState({...this.state, nom:teste.nom, cpf:teste.cpf, id:teste.id, valorBotao:'Alterar', classeBotao:'btn btn-primary'})
   }

   iniciarDelete(teste){
      this.setState({...this.state, nom:teste.nom, cpf:teste.cpf, id:teste.id, valorBotao:'Deletar', classeBotao:'btn btn-danger'})
   }

  

   handleChangeNom(e){
      this.setState({...this.state, nom: e.target.value})
   }

   handleChangeCpf(e){
      this.setState({...this.state, cpf: cpfMask(e.target.value)})
   }

   handleMostrarMessages(e){
      this.setState({...this.state, mostrarMessage: e})
   }

  
   render (){

         return (
            <Content>
               
            { this.state.mostrarMessage && 
            
               <Message classeDivMsg={this.state.classeDivMsg} 
                     message={this.state.message} 
                     handleMostrarMessages={this.handleMostrarMessages}
                     iconeMessage={this.state.iconeMessage}                      />}

         <div className="box box-primary">  
            <ContentHeader title='Personnes' small='Versão 1.0' />
                     <PersonneCreate handleAdd={this.handleAdd} classeBotao={this.state.classeBotao} nom={this.state.nom} handleChangeCpf={this.handleChangeCpf} handleChangeNom={this.handleChangeNom} cpf={this.state.cpf} valorBotao={this.state.valorBotao}/>
         </div>
         <div className="box">  
                      <PersonneList list={this.state.events} iniciarUpdate={this.iniciarUpdate} iniciarDelete={this.iniciarDelete}/>
               </div>
               </Content>
         )
   }

}