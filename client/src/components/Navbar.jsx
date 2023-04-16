import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    
      <header>
        <nav className='nav'> 
        <div>

         <h3 className='title'>Time Locked Wallet</h3>
        </div>
       <ul className="links">
        <Link to='/create'>
            <li>Create Wallet</li>
          </Link>
          <Link to='/topup'>
            <li>Topup Wallet</li>
          </Link>
          <Link to='/claim'>
            <li>Claim Funds</li>
          </Link>
  </ul>    
  </nav>    
      </header>
  
  )
}

export default Navbar