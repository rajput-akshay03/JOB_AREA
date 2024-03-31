import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css';
const NotFound = () => {
  return (
    <>
        <section className='page notfound'>
          <div className="content">
            <img src="https://www.udacity.com/blog/wp-content/uploads/2021/02/img8.png" alt="notfound" />
            <Link to={'/'}>RETURN TO HOME PAGE</Link>
          </div>
        </section>
    </>
  )
}

export default NotFound