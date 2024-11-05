import logger from '../configs/logger.config.js';

const requestLogger = (req, res, next) => {
 const start = new Date();
 const requestData = {
  ip: req.ip,
  method: req.method,
  path: req.path,
  url: req.originalUrl,
  userAgent: req.get('user-agent'),
 };

 // Incoming request log
 logger.info('Incoming request', requestData);

 // Capture response data
 const originalSend = res.send;
 res.send = function (body) {
  res.send = originalSend;
  res.responseBody = body;
  return res.send(body);
 };

 res.on('finish', () => {
  const duration = new Date() - start;
  const level = res.statusCode >= 400 ? 'error' : 'info';

  // Outgoing response log
  const responseData = {
   ...requestData,
   duration: `${duration}ms`,
   httpStatus: res.statusCode,
   contentType: res.get('content-type'),
  };

  logger[level]('Outgoing response', responseData);

  // Log response status (success/error) without data
  if (res.statusCode >= 400) {
   logger.error('Error response', {
    status: res.statusCode,
    path: req.path,
    method: req.method,
    message:
     JSON.parse(res.responseBody).message || 'Internal Server Error',
   });
  } else {
   logger.info('Success response', {
    status: res.statusCode,
    path: req.path,
    method: req.method,
   });
  }
 });

 next();
};

export default requestLogger;
