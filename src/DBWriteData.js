class dbWriter{

    //make a new UUID for a user.
    generateUUID(){
        var uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
        this.id = uuid;
        return uuid;
    }
    redirect(){
        //redirect to form
        let url = "https://docs.google.com/forms/d/e/1FAIpQLSf5Vij35ngAQEB9v515EUfsZcnttgj8xXISTXHjMze_svkwmQ/viewform?usp=pp_url&entry.1984585336="+"test"+this.id;
        return url;
    }

    writePerSession(ageData,mans,ais){
        //the entry
        var data = {
            //input vars here
            //the is the list of age stats
            ageData : ageData,
            numMans : mans,
            numAI : ais
        };

        //key for new post
        var newKey = firebase.database().ref().child("playSession").push().key;
        var updates = {};

        console.log("firebase store info confirmed");
        updates["/playSession/"+"HMMMMM"+this.generateUUID()] = data;

        //redirect to form
        //window.location.replace("https://docs.google.com/forms/d/e/1FAIpQLSf5Vij35ngAQEB9v515EUfsZcnttgj8xXISTXHjMze_svkwmQ/viewform?usp=pp_url&entry.1984585336="+this.id);

        //console.log(this.id);
        //console.log(this.id);

        return firebase.database().ref().update(updates);
    }
    writePerAge(ageTime,choiceStats){
        //the entry
        var data = {
            //input vars here
            //agetime and list? of choice
            ageTime:ageTime,
            choiceStats:choiceStats
        };

        //key for new post
        var newKey = firebase.database().ref().child("ageStats").push().key;
        var updates = {};
        updates["ageSession"] = data;

        return firebase.database().ref().update(updates);
    }

    writePerChoice(hunger,secure, population, science, military){
        //the entry
        var data = {
            //input vars here
            //all the stats after each promptupdate
            hunger:hunger,
            secure:secure,
            population:population,
            science:science,
            military:military

        };

        //key for new post
        var newKey = firebase.database().ref().child("choiceStats").push().key;
        var updates = {};
        updates["choiceStats"] = data;

        return firebase.database().ref().update(updates);
    }

    makeTheData(){
        //set things here ???
    }

    //firebase config
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

