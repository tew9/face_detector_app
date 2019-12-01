import React from 'react';

const Navigation = ({ name, changeRoute, issignedIn}) => {
    if(issignedIn){
      return( 
        <nav style={{display:'flex', justifyContent: 'flex-end', margin: '3px'}}>
            <p className='f4  pa3 dib black ' > { name } </p>
            <div>
              <p onClick = {() => changeRoute('signin')} className='link dim underline f4  dib white pa3 pointer'>{'Sign out'}
              </p>
            </div>
            
        </nav>
      )
    }else{
      return(
        <nav className = 'shadow-6' style={{display:'flex', justifyContent: 'flex-end', margin: '3px'}}>
            <p onClick = {() => changeRoute('signin')} className='link dim underline f4  dib white pa3 pointer'>{'Sign In'}</p>
            <p onClick = {() => changeRoute('register')} className='link dim underline f4  dib white pa3 pointer'>{'Register'}</p>
        </nav>
      )
    }
}

export default Navigation;