const Footer = () =>{
  const year = new Date().getFullYear();

  return(
    <footer className="p-2 bg-dark">
      <p className='text-light text-center mt-3'>Copyright 2022-{year} &copy;  All rights reserved</p>
    </footer>
  )
 }
 
 export default Footer;