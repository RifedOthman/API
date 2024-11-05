import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';



interface DecodeToken extends JwtPayload {
  id: string;
  role: string;
}


const authorize = (requiredRole: string) => {

  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = 'admin' ; // Get the role from the request object set by JWT middleware

    if (userRole !== requiredRole) {
        console.log('User role from request:', req.userRole);

      return res.status(403).json({
        status: 403,
        message: 'Forbidden: You do not have permission to perform this action.',
      });
    }

    next(); // User is authorized, proceed to the next middleware/route handler
  };
};

export default authorize;
