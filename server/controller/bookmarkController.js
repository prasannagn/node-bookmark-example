let Bookmark = require('../model/bookmark');

class BookmarkController {
    constructor() {
        this.bookmark = new Bookmark();
    }

    saveOrUpdate(req, res) {
        let id = req.body.id;
        if (id) { // Update
            this.bookmark.update(id, req.body, ()=> {
                res.redirect("/?id=" + req.body.id);
            });
        } else { // Create
            this.bookmark.insert(req.body, ()=> {
                res.redirect("/?id=" + req.body.id);
            });
        }
    }

    index(req, res) {
        let id = req.param("id");
        if (id) { // Find by id
            this.bookmark.findOne(id, (one)=> {
                BookmarkController.render(res, 'list', {bookmarks: [one]});
            });
        } else { //Fetch all
            this.bookmark.fetchAll((list)=> {
                BookmarkController.render(res, 'list', list);
            });
        }
    }

    del(req, res) {
        this.bookmark.del(req.param("id"), ()=> {
            res.end();
        });
    }
    
    editView(req, res) {
        let id = req.param("id");
        if (id) { // Update
            this.bookmark.findOne(id, (bookmark)=> {
                BookmarkController.render(res, 'edit', bookmark);
            });
        } else { // Create
            BookmarkController.render(res, 'edit', {});
        }
    }

    static render(res, view, data) {
        res.render(view, data);
    }

    static main() {
        module.exports = BookmarkController;
    }
}

BookmarkController.main();