async function getClub(userInput) {
  for (i = 0; i < userInput.length; i++) {
    console.log(userInput[i]);
  }
  var rating = 0;
  var clubinfo;

  var firebase = require('firebase');

  var serviceAccount = require("./clubselector-2394a-firebase-adminsdk-oc2gl-21c4ff87c9.json");

 if (firebase.apps.length === 0)
 {
      //IF firebase is not connected, then connect
      firebase.initializeApp
      (
        {
            apiKey: "AIzaSyDrtl3qnLx_ZfdgxpUVy5XFvkXR4_f6_VU",
            authDomain: "clubselector-2394a.firebaseapp.com",
            databaseURL: "https://clubselector-2394a.firebaseio.com",
            projectId: "clubselector-2394a",
            storageBucket: "clubselector-2394a.appspot.com",
            messagingSenderId: "1039301954159",
            appId: "1:1039301954159:web:e458dc98ecad8303"
        }
      );
  }

  //Go to the database in firebase
  var db = firebase.app().database();

  //Go to the first node in the database
  var ref = db.ref('clubselector-2394a');

  var clubbool;
  clubbool = false;

  var finalstring;
  finalstring = "";

  var clubnoexist;
  clubnoexist = "Club doesn't exist" + '</br>';
  console.log(userInput.length);
  var counter;
  counter = 0;

  var clubList = new Array();
  for (i = 0; i < userInput.length; i++) {
        var keyword = "";


       console.log("begin");
       var currentclubbool;
       currentclubbool = false;
       var children;
       children = userInput[i];
       console.log(children);
       console.log(typeof children);
        var refTest = firebase.app().database().ref().child('clubs').child(children);


        var refTestprime = refTest.child('Rating');


        var snapshot = await refTestprime.once('value');

        if(snapshot.exists()) {
          clubbool = true;
          currentclubbool = true;
          rating = snapshot.val();
        }
        else {
          rating = -5;
        }

        var refTestprime = refTest.child('Keywords');

        var snapshot = await refTestprime.once('value');

        var keywordarray;
        keywordarray = [];
        finalkeyword = [];

        if(snapshot.exists()) {
            clubbool = true;
            currentclubbool = true;
            keywordarray.push(snapshot.val());
            for (var k in keywordarray[0]) {
                var string;
                string = k;
                keyword = keyword + string + ","
            }
            keyword = keyword.slice(0,-1);
        }

        else {
            keyword = "poo";
        }



        var refTestprime = refTest.child('ClubInfo');

        var snapshot = await refTestprime.once('value');

        if(snapshot.exists()) {
            clubinfo = snapshot.val();
        }
        else {
            clubinfo = "you suck";
        }
        if (currentclubbool == true) {
          finalstring = finalstring + "Club Title: " + JSON.stringify(userInput[i]) + '</br>' + "Rating: " + JSON.stringify(rating) + '</br>' + "Keyword: " + JSON.stringify(keyword) + '</br>' + "Clubinfo: " + JSON.stringify(clubinfo) + '</br>';


          console.log(finalstring);


          var title = (userInput[i]);
          var ratingReturn = JSON.stringify(rating);
          var keywordReturn = JSON.stringify(keyword);
          var clubinfoReturn = JSON.stringify(clubinfo);

          clubList[counter++] = new Array(title,ratingReturn,keywordReturn,clubinfoReturn);

        }
    }
    if (clubbool == false) {
        clubList[0] = new Array("club doesn't exist", -5, "", "");
    }


    //returnResult(clubList);

  return clubList;
}



  async function matchclub(input) {
    var iskeyword;
    iskeyword = false;
    input = '"' + input + '"';
        var rating = 0;
        var keyword = "Error";
        var clubinfo;

        if (firebase.apps.length === 0) {
                  firebase.initializeApp (
                      {
                          apiKey: "AIzaSyDrtl3qnLx_ZfdgxpUVy5XFvkXR4_f6_VU",
                          authDomain: "clubselector-2394a.firebaseapp.com",
                          databaseURL: "https://clubselector-2394a.firebaseio.com",
                          projectId: "clubselector-2394a",
                          storageBucket: "clubselector-2394a.appspot.com",
                          messagingSenderId: "1039301954159",
                          appId: "1:1039301954159:web:e458dc98ecad8303"
                      }
                  );
        }

        var ref = firebase.app().database().ref().child('clubs');


        var returnArr = [];
        var counts = [];
        var output = [];
        var title = [];
        var final = [];


        await ref.once('value', function(snap) {
            snap.forEach(function(item) {
                  var itemVal = item.val();
                  returnArr.push(itemVal);
            }
        );
      });
        for (i = 0; i < returnArr.length; i++) {
           counts.push((returnArr[i]).Keywords);
           title.push((returnArr[i]).Clubname);
        }
        for (i = 0; i < counts.length; i++) {
            var l = counts[i];
            for (var k in l) {
                var string;
                string = JSON.stringify(k);
                if (string == input) {
                  console.log("yes");
                  iskeyword = true;
                  output.push(i);
                }
                else {
                  continue;
                }
            }

        }

        console.log("lenght is" + output.length);
        if (iskeyword == true) {
            for (i = 0; i < output.length; i++) {
                    final.push((title[output[i]]));
                    console.log(title[output[i]]);
            }
        }
        else {
            input = input.substring(1, input.length -1);
            final.push(input);
        }
        getClub(final);
        return final;
  }

//  getClub('IEEE');
