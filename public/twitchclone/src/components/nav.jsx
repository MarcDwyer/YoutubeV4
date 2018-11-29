import React from 'react'


export const Navbar = (props) => {
  const darkTheme = props.theme ? 'darkTheme' : 'whiteTheme';
  return (
<nav className={`navbar ${darkTheme}`}>
  <span className="navbar-brand">FetcherApp <i className="fa fa-toggle-on ml-2" onClick={() => props.toggle()}></i></span>
</nav>
  )
};