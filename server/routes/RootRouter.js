let BookmarkController = require('../controller/bookmarkController');

class RootRouter {

    static main() {
        module.exports = RootRouter;
    }

    constructor() {
        this.router = require('express').Router();
        this.bookmarkController = new BookmarkController();
        this.init();
    }

    init() {
        this.getRouter().get('/', this.bookmarkController.index.bind(this.bookmarkController));

        this.getRouter().get('/editView', this.bookmarkController.editView.bind(this.bookmarkController));
        
        this.getRouter().post('/', this.bookmarkController.saveOrUpdate.bind(this.bookmarkController));

        this.getRouter().delete('/', this.bookmarkController.del.bind(this.bookmarkController));
    }

    getRouter() {
        return this.router;
    }
}

RootRouter.main();