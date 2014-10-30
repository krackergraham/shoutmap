var Shout = require('./models/shout'),
    Reply = require('./models/reply');

/* Initialize Routing */
this.initialize = function (app) {
    /* Get
     * '/all'
     * Returns all shouts from the database
     * */
    app.get("/api/shouts", function (req, res) {
        Shout.find(function (err, shouts) {
            res.send(shouts);
        });
    });

    /* Get
     * '/replies/{id}'
     * Returns all replies for a shout from the database
     * */
    app.get("/api/replies/:id", function (req, res) {
        Reply.find({parentId: req.params.id}, function (err, replies) {
            res.send(replies);
        });
    });

    /* Post
     * '/shout'
     * Saves a new Shout object to the database*/
    app.post('/api/shout', function (req, res) {
        var obj = req.body;
        var shout = new Shout({
            text: obj.text,
            location: {
                lat: obj.location.lat,
                long: obj.location.long
            },
            time: obj.time
        });
        shout.save(function (err) {
            if (err) {
                console.log('Error saving shout to database - ' + err);
            }
            res.send();
        })
    });

    /* Post
     * '/reply'
     * Saves a new Reply object to the database*/
    app.post('/api/reply', function (req, res) {
        var obj = req.body;
        var reply = new Reply({
            text: obj.text,
            location: {
                lat: obj.location.lat,
                long: obj.location.long
            },
            time: obj.time,
            parentId: obj.parentId
        });
        reply.save(function (err) {
            if (err) {
                console.log('Error saving reply to database - ' + err);
            }
            res.send();
        })
    });
};

exports.initialize = this.initialize;
