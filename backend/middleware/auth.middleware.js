import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.model.js';

// Check if user is authenticated
const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler('Login first to access this resource', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler('Invalid or expired token', 401));
  }
});

// Handle user roles
const authorizeRoles = (...roles) => {
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
const isVerified = (req, res, next) => {
  if (!req.user.isVerified) {
    return next(new ErrorHandler('Please verify your email address', 403));
  }
  next();
};

// Check if user is the owner or admin
const isOwnerOrAdmin = (model, paramName = 'id') => {
  return asyncHandler(async (req, res, next) => {
    const Model = model;
    const document = await Model.findById(req.params[paramName]);
    
    if (!document) {
      return next(new ErrorHandler('Resource not found', 404));
    }

    // Check if user is admin or the owner
    if (req.user.role !== 'admin' && document.user.toString() !== req.user.id) {
      return next(
        new ErrorHandler('You are not authorized to access this resource', 403)
      );
    }

    req.document = document;
    next();
  });
};

// Check if user is a team member
const isTeamMember = (model, paramName = 'id') => {
  return asyncHandler(async (req, res, next) => {
    const Model = model;
    const document = await Model.findById(req.params[paramName]);
    
    if (!document) {
      return next(new ErrorHandler('Resource not found', 404));
    }

    // Check if user is admin, the owner, or a team member
    if (
      req.user.role !== 'admin' && 
      document.user.toString() !== req.user.id &&
      !document.teamMembers.some(member => member.user.toString() === req.user.id)
    ) {
      return next(
        new ErrorHandler('You are not authorized to access this resource', 403)
      );
    }

    req.document = document;
    next();
  });
};

export {
  isAuthenticated,
  authorizeRoles,
  isVerified,
  isOwnerOrAdmin,
  isTeamMember
};
