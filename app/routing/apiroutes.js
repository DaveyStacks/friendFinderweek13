const path = require('path');
const people = require('../data/friends')


module.exports = function (app) {



    //get route to /api/friends -- displays all friends in JSON
    app.get('/api/friends', function (req, res) {
        console.log("Reading API");
        res.json(people);
    });

    //POST route /api/friends -- will post new surevey results as well as friend finder logic.
    // Add new friend entry
    app.post('/api/friends', function (req, res) {
        // Capture the user input object
        console.log(req.body);
        let userAnswers = req.body.scores;

        let allDiffs = [];

        // finds the difference between the userAnswers array (by index) and each answer
        // then sums each new array of differences and pushes to the userDiff array for each 'new people'
        let answers = [];

        for (let i = 0; i < people.length; i++) {
            let x = userAnswers.map(function (item, index) {

                return Math.abs(item - people[i].scores[index]);
            })

            answers[i] = (x.reduce((a, b) => a + b, 0));
        }

        //creates an array of all of the userDiffs named allDiffs and populates allDiffs with all userDiffs

        for (var i = 0; i < people.length; i++) {
            allDiffs.push(answers[i]);

        }
        // selects the smallest value in the allDiffs array and identifies its index
        // then console.log the person in the people array with the same index!!
        let matchName = '';
        let matchImage = '';
        let matchIndex = 0;
        let diffValue = allDiffs[0];

        for (let i = 1; i < allDiffs.length; i++) {

            if (allDiffs[i] < diffValue) {
                diffValue = allDiffs[i];
                matchIndex = i;
            }
        }

        console.log(people[matchIndex].name);
        matchName = people[matchIndex].name;
        console.log(people[matchIndex].photo);
        matchImage = people[matchIndex].photo;
        people.push(req.body);
        res.json({ status: 'OK', matchName: matchName, matchImage: matchImage });
    });

};


