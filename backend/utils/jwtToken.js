export default (user, statusCode, res) =>{
  const token = user.getJwtToken(); // Create JWT Token

  const options ={
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true
  }
  res.status(statusCode)
  .cookie("token", token, options)
  .json({ user, token });
}