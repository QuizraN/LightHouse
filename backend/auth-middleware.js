const firebase = require("./firebase/index");

function authMiddleware(request, response, next) {
  const headerToken = request.headers.authorization;
//   console.log("eneter into authorization process usin",headerToken);
//console.log("Header Tken Value:",headerToken)
  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    response.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];//index 0 is bearer and index 1 is token
  //console.log(token);
  firebase
    .auth()
    .verifyIdToken(token)
    .then((result) =>{
      request.user_name=result.displayName;
      request.user_email=result.email;
      request.user_img=result.photoURL;
      next()
    })
    .catch(() => response.send({ message: "Could not authorize" }).status(403));
}

module.exports = authMiddleware;