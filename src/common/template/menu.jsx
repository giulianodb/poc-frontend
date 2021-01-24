import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='#' label='Accueil' icon='dashboard' />
        <MenuTree label='Personne' icon='child'> 
            <MenuItem path='#/personne' 
                 label='Lister' icon='list-alt' /> 
             <MenuItem path='#/personne/upload' 
                 label='Fichier' icon='file-text-o' /> 
                 <MenuItem path='#/personne/batch' 
                 label='Batch' icon='hourglass-start' />
         </MenuTree>
    </ul>
)