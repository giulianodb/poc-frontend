import React, { Component } from 'react'
import axios from 'axios'
// import {toastr} from 'react-redux-toastr'


import PersonneCreate from './personneCreate'
import PersonneList from './personneList'
import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'
import Message from '../common/msg/messages'

// const URL = 'http://ec2-3-16-152-3.us-east-2.compute.amazonaws.com/personnes'
const URL = 'http://localhost:8081/personnes/uploadFile'

export default class PersonneUpload extends Component {
   
constructor(props) {
   super (props)

   this.onFileChange = this.onFileChange.bind(this)
   this.onFileUpload = this.onFileUpload.bind(this)
   this.fileData = this.fileData.bind(this)
   this.handleMostrarMessages = this.handleMostrarMessages.bind(this)

   this.state = {selectedFile: null,mostrarMessage:false,classeDivMsg:'' , message: '',iconeMessage:''}
  
}
onFileChange (event) { 
     
   // Update the state 
   this.setState({ selectedFile: event.target.files[0] }); 
  
 }

 onFileUpload () { 
   const self = this
   // Create an object of formData 
   const formData = new FormData(); 
  
   // Update the formData object 
   formData.append( 
     "file", 
     this.state.selectedFile, 
     this.state.selectedFile.name 
   ); 
  
   // Details of the uploaded file 
   console.log(this.state.selectedFile); 
  
   // Request made to the backend api 
   // Send formData object 
   axios.post(URL, formData).then(resp=>{ 
      this.setState({...this.state, classeDivMsg:'alert alert-info alert-dismissible',  
      mostrarMessage:true, message:'Fichier envoyé avec succès', iconeMessage: 'con fa fa-info'})

   }).catch(function (error) {
      var message = "Erreur"
      if(error !== undefined && error.response !== undefined && error.response.data.message != null){
         message = error.response.data.message
      }
      self.setState({...self.state, classeDivMsg:'alert alert-danger alert-dismissible',  mostrarMessage:true, message:message, iconeMessage: 'con fa fa-danger'})
   }); 
 }

 handleMostrarMessages(e){
   this.setState({...this.state, mostrarMessage: e})
 }
   
 fileData () { 
     
   if (this.state.selectedFile) { 
       
     return ( 
       <div> 
         <h2>File Details:</h2> 
         <p>File Name: {this.state.selectedFile.name}</p> 
         <p>File Type: {this.state.selectedFile.type}</p> 
         <p> 
           Last Modified:{" "} 
           {this.state.selectedFile.lastModifiedDate.toDateString()} 
         </p> 
       </div> 
     ); 
   } else { 
     return ( 
       <div> 
         <br /> 
         <h4>Choose before Pressing the Upload button</h4> 
       </div> 
     ); 
   } 
 }; 
  
   render() { 
     
      return ( 
            
         <Content>
       { this.state.mostrarMessage && 
            
            <Message classeDivMsg={this.state.classeDivMsg} 
                  message={this.state.message} 
                  handleMostrarMessages={this.handleMostrarMessages}
                  iconeMessage={this.state.iconeMessage}                      />}
         <div className="box box-primary">  
            <ContentHeader title='Upload Fichier' small='Versão 1.0' />
               <br></br>
               <div className="box-body">  
                     <div className="col-xs-12 col-sm-9 col-md-10"> 
                        <label htmlFor="file">Sélectionnez le fichier</label>
                        <input type="file" id='file' onChange={this.onFileChange} className="form-control"/> 
                     </div>
               </div> 
            <div className='box-footer'>

                <button onClick={this.onFileUpload} className='btn btn-primary'> 
                  Upload
                </button> 
             </div> 

         </div>
         </Content>
      ); 
    } 
  } 
