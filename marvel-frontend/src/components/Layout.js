import React from 'react'

import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) =>{
    return (
        <div className='layout-container'>
            <Header></Header>
            <div className='page-container'>
            { children }
            </div>
            
            <Footer></Footer>
        </div>
      )
}

export default Layout;