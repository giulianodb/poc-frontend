import React ,{Component} from 'react'


class PersoneForm extends Component {

    render(){
        return (
            <form role='form'> 
                <div className='box-body'></div>


                <div className='box-footer'>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </form>
        )
    }
}

export default PersoneForm