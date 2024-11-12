import jwt from 'jsonwebtoken';

export default function authenticate(req, res, next) {
  const authHeader = req.header('Authorization');

  // Check if the Authorization header exists and if the token is provided in the "Bearer" format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(' ')[1];
  cl

  try {
    // Verify the token with the secret, which will also consider the 'expiresIn' setting from token creation
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded token information to the request object for use in later middleware or routes
    req.user = decoded;
    console.log(req.user);
    next();  // Continue to the next middleware or route handler
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    // Handle any other errors (e.g., invalid token)
    res.status(401).json({ message: 'Token is not valid' });
  }
}
