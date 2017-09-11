let Controller = require('./controller');

class Application {

    static main() {
        let application = new Application();
        application.init();
        module.exports = application;
    }

    constructor() {
        var fs = require('fs');
        this.controller = new Controller();
        this.debug = require('debug')('test:server');
        this.http = require('http');
        /*var privateKey  = fs.readFileSync('./server.key', 'utf8');
        var certificate = fs.readFileSync('./server.crt', 'utf8');
        var credentials = {key: privateKey, cert: certificate,passphrase: '1234'};*/

        this.server = this.http.createServer(this.controller.getExpress());
        this.port = Application.normalizePort(process.env.PORT || '3000');
    };

    init() {
        let self = this;
        this.controller.init();
        this.getServer().listen(this.getPort());
        this.getServer().on('error', this.onError);
        this.getServer().on('listening', ()=> {
            var addr = self.getServer().address();
            var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
            self.getDebug()('Listening on ' + bind);
        });
    }

    getPort() {
        return this.port;
    };

    getServer() {
        return this.server;
    };

    getDebug() {
        return this.debug;
    };
    
    static normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

Application.main();