const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

module.exports = function(app) {

    app.get("/", jsonParser, async (req, res) => {
        res.send("hello Stofi");
    });

}