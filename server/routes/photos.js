var express = require('express');
var router = express.Router();


/* GET photos data. */

// get parameters category ,page
router.get('/', (req, res) => {(
    async ()=> {
        const category = req.query.category;
        const page = req.query.page;
        const sortByDate = req.query.sortByDate;
            const response = await fetch(
            `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&page=${page}${sortByDate ? `&order=latest`: ''}`
        );
        const data = await response.json();
        console.log('hello photos', data.hits.length,'page:',page,'category:',category,'sort by date:',sortByDate)
        res.send(data.hits.slice(0,9));
    })()
});

module.exports = router;
