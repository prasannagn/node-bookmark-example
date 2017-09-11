class BookmarkDao {

    static main() {
        module.exports = BookmarkDao;
    }

    constructor() {
        let path = require('path');
        this.database = require('simple-node-db').createREPL(path.join(__dirname, '../../NewDataBase'));
    }

    getDatabase() {
        return this.database;
    }
}
BookmarkDao.main();