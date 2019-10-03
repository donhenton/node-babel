import http from 'http';
import app from './app';
import logger from './lib/logger';

// Set Port
const port = 8080;
app.set('port', port);

// Create server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

 
  switch (error.code) {
  case 'EACCES':
    logger.error(`${port} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    logger.error(`${port} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address();
  // const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  logger.info(addr);
  logger.info(addr.port);
}
