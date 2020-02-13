const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf} = format;

const myFormat = printf(({level, message, timestamp}) => {
  return `{\n "time":"${timestamp}",\n "level":"${level}",\n "message":"${message}"\n}`;
});

const logger = createLogger({
  format: combine(
      format.colorize(),
      timestamp(),
      myFormat,
  ),
  transports: [new transports.Console()],
});

export {logger as log};