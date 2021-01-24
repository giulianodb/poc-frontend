import React , { Component } from 'react'


export default class Message extends Component {
    
    render (){
       return (
       <div className={this.props.classeDivMsg}>
        <button type="button" className="close" data-dismiss="alert" aria-hidden="true" onClick={()=> this.props.handleMostrarMessages(false)}>×</button>
        <h4><i className={this.props.iconeMessage}></i> Alert!</h4>
                {this.props.message}
      </div>
       )

       }  

    }