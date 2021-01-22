import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='#' label='Accueil' icon='dashboard' />
        <MenuTree label='Cadastro' icon='edit'> 
             <MenuItem path='#personne' 
                 label='Personnes' icon='usd' /> 
         </MenuTree>
    </ul>
)