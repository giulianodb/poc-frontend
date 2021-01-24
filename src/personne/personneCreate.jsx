import React ,{Component} from 'react'
import Form from './personneForm'

class PersoneCreate extends Component {

    render(){
        return (
           <div>
               
                <div className='box-body'>

                    <div className="col-xs-12 col-sm-9 col-md-10">
                        <label htmlFor="nom">Nom</label>
                        <input id="nom" type="input" className="form-control" value={this.props.nom}
                            onChange={this.props.handleChangeNom} maxLength='50'/>
                    </div>
                        
                    <div className="col-xs-12 col-sm-6 col-md-6">
                        <label htmlFor="cpf">CPF: </label> 
                        <input id="cpf" type="input" className="form-control" value={this.props.cpf}
                            onChange={this.props.handleChangeCpf} maxLength='14'/>
                    </div>
                </div>

                <div className='box-footer'>
                    <button type='submit' className={this.props.classeBotao} onClick={this.props.handleAdd}>{this.props.valorBotao}</button>
                </div>
           </div>
        )
    }
}

export default PersoneCreate