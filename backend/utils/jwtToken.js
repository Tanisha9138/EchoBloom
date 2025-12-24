export const sendToken = (user, statusCode, message, res)=>{
    const token =  user.getJWTToken();
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };
    // res.status(statusCode).cookie("token", token, options).json({
    //     success: true,
    //     user,
    //     message,
    //     token,
    // });
    res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,          // REQUIRED for HTTPS
      sameSite: "none",      // REQUIRED for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user,
    });
};
