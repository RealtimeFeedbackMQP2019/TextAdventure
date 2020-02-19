class dbWriter{

    writePerSession(){
        //the entry
        var data = {
            //input vars here
        }

        //key for new post
        var newKey = firebase.database().ref().child("playSession").push().key;
        var updates = {};
        updates["playSession"] = data;

        return firebase.database().ref().update(updates);
    }
    writePerAge(){
        //the entry
        var data = {
            //input vars here
            //agetime and list? of choice
        }

        //key for new post
        var newKey = firebase.database().ref().child("ageStats").push().key;
        var updates = {};
        updates["ageSession"] = data;

        return firebase.database().ref().update(updates);
    }

    writePerChoice(){
        //the entry
        var data = {
            //input vars here
            //all the stats after each promptupdate
        }

        //key for new post
        var newKey = firebase.database().ref().child("choiceStats").push().key;
        var updates = {};
        updates["choiceStats"] = data;

        return firebase.database().ref().update(updates);
    }

    makeTheData(){
        //set things here ???
    }

    constructor() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyA3Uy2QL4_4UB6tecOyWiVLs90U6c_md_w",
            authDomain: "rficc-mqp.firebaseapp.com",
            databaseURL: "https://rficc-mqp.firebaseio.com",
            projectId: "rficc-mqp",
            storageBucket: "rficc-mqp.appspot.com",
            messagingSenderId: "545693842156",
            appId: "1:545693842156:web:63ee85a180b3a8d45a83c9",
            measurementId: "G-N0MDBXX2Z5"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }

}

