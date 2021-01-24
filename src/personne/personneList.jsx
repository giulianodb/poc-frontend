import React ,{Component} from 'react'
import { cpfMask }  from '../common/utils/mask'


class PersoneList extends Component {

    renderRows(){
        const list = this.props.list || []
        return list.map(todo => (
            
           <tr key={todo.id}>
                <td>{todo.nom}</td>
           
           
                 <td>{cpfMask(todo.cpf)}</td>

                 <td>
                     <button className='btn btn-warning' onClick={()=> this.props.iniciarUpdate(todo)}><i className='fa fa-pencil'/> </button>
                     <button className='btn btn-danger' onClick={()=> this.props.iniciarDelete(todo)}><i className='fa fa-trash'/> </button>
                 </td>
                 </tr>
            
        ))
    }

    render(){
        return (
            <div>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>Nom</th>
                        
                        
                            <th>Cpf</th>

                            <th className='table-actions'>Ações</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                    {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PersoneList