// This middleware will wrap our async route handlers and catch any errors
export default (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
