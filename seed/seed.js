let Bookmark = require('../server/model/bookmark');

class Seed {

    static main() {
        const seed = new Seed();
        let bookmark = Seed.getDummyBookmark();
        seed.getBookmark().insert(bookmark,()=>{
            
        });
    };

    constructor() {
        let path = require('path');
        this.bookmark = new Bookmark();
    };
    
    getBookmark() {
        return this.bookmark;
    }

    static getDummyBookmark() {
        return {
            url: 'www.facebook.com',
            title: 'Facebook',
            tags: ['book', 'mark'],
            note: 'The Paris area is one of the largest population centers in Europe, with more than 12 million inhabitants.'
        };
    };
}

Seed.main();

