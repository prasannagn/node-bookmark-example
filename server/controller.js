let RootRouter = require('./routes/RootRouter');

class Controller {

    static main() {
        module.exports = Controller;
    }

    constructor() {
        this.expressModule = require('express');
        this.express = this.getExpressModule()();
        this.path = require('path');
        this.logger = require('morgan');
        this.cookieParser = require('cookie-parser');
        this.bodyParser = require('body-parser');
        this.simpleDb = require('simple-node-db');
    };

    init() {
        this.configureViewEngine();
        this.configurePreFilter();
        this.configureStaticPath();
        this.configureRoutes();
        this.configurePostFilter();
    }
    
    configureViewEngine() {
        this.getExpress().set('views', this.getPath().join(__dirname, 'views'));
        this.getExpress().set('view engine', 'hbs');
    }

    configurePreFilter() {
        this.getExpress().use(this.getLogger()('dev'));
        this.getExpress().use(this.getBodyParser().json());
        this.getExpress().use(this.getBodyParser().urlencoded({extended: false}));
        this.getExpress().use(this.getCookieParser()());
    }

    configureStaticPath() {
        this.getExpress().use(this.getExpressModule().static(this.getPath().join(__dirname, '../public')));
    }

    configureRoutes() {
        let rootRouter = new RootRouter();
        this.getExpress().use('/', rootRouter.getRouter());
    }

    configurePostFilter() {
        // catch 404 and forward to error handler
        this.getExpress().use(Controller.handle404);

        // error handler
        this.getExpress().use(Controller.handleError);
    }

    getExpress() {
        return this.express;
    }

    getExpressModule() {
        return this.expressModule;
    }

    getPath() {
        return this.path;
    }

    getBodyParser() {
        return this.bodyParser;
    }

    getLogger() {
        return this.logger;
    }

    getCookieParser() {
        return this.cookieParser;
    }
    
    static handle404(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    static handleError(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }

}

Controller.main();