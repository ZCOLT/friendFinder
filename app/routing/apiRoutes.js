var friendData = require('../data/friends.js');

module.exports = function(app){

// Your `apiRoutes.js` file should contain two routes:


// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
app.get('/api/friends', function (req, res) {
  res.json(friendData)
  console.log(friendData)
})

// * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post('/api/friends', function (req, res) {
    //req.body hold the data coming from the front end
    console.log(req.body);
    friendData.push(req.body)
    console.log("Added to friendData Array")
    console.log(friendData)

    // user input scores array needs to be compared to next user scores array
    var totalDiffArray = [];
      
      for (var i = 0; i < friendData.length - 1; i++) {

        var friend = friendData[i]
        var userData = friendData[friendData.length - 1]

        var scoreArray = [];
        var userScore;
        var friendScore;
        
          // each index in each array needs to be compared and taken the absolute value and pushed to a new array.
          for (var e = 0; e < userData.scores.length; e++) {
            userScore = userData.scores[e]
            friendScore = friend.scores[e]
            scoreArray.push(Math.abs(userScore - friendScore))
          }
        
        var totalDiff = scoreArray.reduce(function getSum (total, num) {
          return total + num;
        });
        // total difference will be added to totalDiffArray
        totalDiffArray.push(totalDiff);
        
        console.log(`${userData.name} comparing with ${friend.name} ....`)
        console.log(`Differences, question by question: ${scoreArray}`)
        console.log(`The total difference for ${userData.name} and ${friend.name} = ${totalDiffArray[i]}`);
        }
      
    // the minimum with in the total difference array will be the user's best match
    Array.min = function (totalDiffArray) {
      return Math.min.apply(Math, totalDiffArray);
    }
    var minDiff = Array.min(totalDiffArray);
    
    // Account for multiple matches...
    var matches;
    for (var i = 0; i < totalDiffArray.length; i++) {
      if(totalDiffArray[i] === minDiff) {
        console.log(`Your best match is ${friendData[i].name}!`);
        matches = friendData[i]   
      } else {
        console.log(`${friendData[i].name} is not a good match`)
      }
    }

    res.json(matches)
  })
}
