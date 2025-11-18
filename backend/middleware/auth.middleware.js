import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.model.js';

// Check if user is authenticated
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;
  
  // Check for token in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } 
  // Check for token in Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorHandler('Please log in to access this resource', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return next(new ErrorHandler('User not found', 404));
    }
    
    next();
  } catch (error) {
    return next(new ErrorHandler('Not authorized, token failed', 401));
  }
});

// Handle user roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

// Check if user is verified
export const isVerified = (req, res, next) => {
  if (!req.user.isVerified) {
    return next(new ErrorHandler('Please verify your email address', 403));
  }
  next();
};

// Check if user is the owner or admin
export const isOwnerOrAdmin = (model, paramName = 'id') => {
  return async (req, res, next) => {
    try {
      const resource = await model.findById(req.params[paramName]);
      
      if (!resource) {
        return next(new ErrorHandler('Resource not found', 404));
      }
      
      if (resource.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
          new ErrorHandler('Not authorized to access this resource', 403)
        );
      }
      
      req.resource = resource;
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Check if user is a team member
export const isTeamMember = (model, paramName = 'id') => {
  return async (req, res, next) => {
    try {
      const resource = await model.findById(req.params[paramName]);
      
      if (!resource) {
        return next(new ErrorHandler('Resource not found', 404));
      }
      
      const isMember = resource.teamMembers.some(
        member => member.user.toString() === req.user.id
      );
      
      if (!isMember && req.user.role !== 'admin') {
        return next(
          new ErrorHandler('Not authorized to access this resource', 403)
        );
      }
      
      req.resource = resource;
      next();
    } catch (error) {
      next(error);
    }
  };
};

const authMiddleware = {
  isAuthenticated,
  authorizeRoles,
  isVerified,
  isOwnerOrAdmin,
  isTeamMember
};

export default authMiddleware;
