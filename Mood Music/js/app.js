let sentiment;

function setup() {
    // initialize sentiment
    sentiment = ml5.sentiment('movieReviews', modelReady);
    console.log('loading model')
}

function modelReady() {
    // model is ready
    console.log('model loaded');

    // predicting the sentiment onclick
    document.getElementById('submitBtn').addEventListener('click', () => getSentiment());
}

function getSentiment() {
    //show again message
    document.getElementById('goagain').style.display = 'inline'

    // get the values from the input
    let inputBox = document.getElementById('inputBox').value;

    // make the prediction
    let prediction = sentiment.predict(inputBox);

    //give song reccomendation
    let randomHappySong = happySongs[Math.floor(Math.random()*happySongs.length)];
    let randomSadSong = sadSongs[Math.floor(Math.random()*sadSongs.length)];
    let randomNeutralSong = neutralSongs[Math.floor(Math.random()*neutralSongs.length)];

    let songRec = document.getElementById('songRec');
    
    if(prediction.score < 0.4){
        console.log("negative")
        songRec.innerHTML = "seems like you're not in a very good mood.. this song might fit it:  " + randomSadSong 
    }
    else if(prediction.score > 0.4 && prediction.score < 0.6){
        console.log("neutral")
        songRec.innerHTML = "seems like you're not feeling any particular way. This song might fit the mood: " + randomNeutralSong
    }
    else if(prediction.score > 0.4 && prediction.score > 0.6){
        console.log("positive")
        songRec.innerHTML = "seems like you're in a good mood! This song might fit it: " + randomHappySong
    }
}

setup()

    //songlists
    let happySongs = [
        'Im so excited - The Pointer Sisters https://www.youtube.com/watch?v=I57hkclh3kk',
        'Im a Believer - The Monkees https://www.youtube.com/watch?v=4PQAqprjOuA',
        'Love Shack - The B-52s https://www.youtube.com/watch?v=LXZFtJceQC4',
        'Shape of You - Ed Sheeran https://youtu.be/JGwWNGJdvx8',
        'Dark Horse - Katy Perry https://youtu.be/0KSOMA3QBU0',
        'Rude - MAGIC! https://youtu.be/PIh2xe4jnpk',
        'Blinding Lights - The Weeknd https://youtu.be/4NRXx6U8ABQ',
        'Roar - Katy Perry https://youtu.be/CevxZvSJLk8',
        'Sugar - Maroon 5 https://www.youtube.com/watch?v=LXZFtJceQC4'
    ];
    let sadSongs = [
        'Paint It Black - The Rolling Stones https://www.youtube.com/watch?v=170sceOWWXc',
        'Dont Bother Me - The Beatles https://www.youtube.com/watch?v=k03IQbaTcxc',
        'Superstar - Carpenters https://www.youtube.com/watch?v=DbBqJhxbwWY',
        'Train Wreck - James Arthur https://youtu.be/CveANi17YfU',
        'Drivers License - Olivia Rodrigo https://youtu.be/_Bjf-iExroI',
        'Save Your Tears - The Weeknd https://youtu.be/XXYlFuWEuKI',
        'Anywhere Away From Here - Rag’n’Bone Man & P!nk https://youtu.be/ilut9TzMfXs',
        'Someone Like You - Adele https://youtu.be/hLQl3WQQoQ0',
        'Hello - Adele https://youtu.be/YQHsXMglC9A',
    ];
    let neutralSongs = [
        'Just The Way You Are - Bruno Mars https://youtu.be/LjhCEhWiKXk',
        'Afterglow - Ed Sheeran https://youtu.be/_NGQfFCFUn4',
        'Cover Me In Sunshine - P!nk, Willow Sage Hart https://youtu.be/vGZhMIXH62M',
        'Halos - Cool Company https://youtu.be/sev6Ogm2Ttw',
        'Heat Waves - Glass Animals https://youtu.be/mRD0-GxqHVo',
        'The Bakery - Melanie Martinez https://youtu.be/ziotSaBtqGk',
        'Deja Vu - Lastlings https://youtu.be/dI0t8UKhEi4',
        'Better  - ZAYN https://youtu.be/NAo38Q9c4xA',
        'In New York - Ethan Gold https://youtu.be/wZwvQCxR4lg',
    ];