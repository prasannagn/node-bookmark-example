let BookmarkDao = require('../dao/BookmarkDao');

class Bookmark {

    static main() {
        module.exports = Bookmark;
    }

    constructor() {

    }
    
    insert(bookmark, callback) {
        let bookmarkDao = new BookmarkDao();
        let id = Bookmark.generateKey(bookmarkDao.getDatabase());
        bookmarkDao.getDatabase().insert(id, bookmark, (err, model) => {
            bookmarkDao.getDatabase().close();
            if (err) throw err;
            model.id = id;
            callback(model);
        });
    };

    update(id, bookmark, callback) {
        let bookmarkDao = new BookmarkDao();
        bookmarkDao.getDatabase().update(id, bookmark, (err, bookmark)=> {
            bookmarkDao.getDatabase().close();
            if (err) throw err;
            bookmark.id = id;
            callback(bookmark);
        });
    };
    
    findOne(id, callback) {
        let bookmarkDao = new BookmarkDao();
        bookmarkDao.getDatabase().find(id, (err, bookmark)=> {
            bookmarkDao.getDatabase().close();
            if (err) throw err;
            bookmark.id = id;
            callback(bookmark);
        });
    };
    
    fetchAll(callback) {
        let bookmarkDao = new BookmarkDao();
        let bookmars = [];
        bookmarkDao.getDatabase().query({}, (id, obj) => {
            let bookmark = JSON.parse(obj);
            bookmark.id = id;
            bookmars.push(bookmark);
        }, ()=> {
            bookmarkDao.getDatabase().close();
            callback({'bookmarks': bookmars});
        });
    };

    del(id, callback) {
        let bookmarkDao = new BookmarkDao();
        bookmarkDao.getDatabase().delete(id, (err)=> {
            bookmarkDao.getDatabase().close();
            if (err) throw err;
            callback();
        });
    };

    static generateKey(database) {
        return database.createDomainKey('bookmark', database.createModelId())
    };

}

Bookmark.main();