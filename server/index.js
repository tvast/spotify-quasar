let express = require('express')
var http = require('http').createServer(app);
var app = express()
// const fetch = require('node-fetch');
const cors = require('cors')
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);

app.use(express.json());
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: 'dedfe7ffe85d4afaa8ae6770fa6d3aad',
    clientSecret: '1e44277ddf6546b08dc9ed9b111f95dc',
    redirectUri: 'http://www.example.com/callback'
});

app.post("/search", async function (req, res) {
    console.log(req.body.track);
    const track = req.body.track

    // Retrieve an access token.
    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);

            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);

            spotifyApi.searchTracks(track)
                .then(function (data) {
                    console.log('Search by' + track, data.body);
                    res.send(JSON.stringify(data.body))
                }, function (err) {
                    console.error(err);
                });
        },
        function (err) {
            console.log('Something went wrong when retrieving an access token', err);
        }
    );
});

app.post("/searchArtist", async function (req, res) {
    console.log(req.body.id);
    const id = req.body.id

    // Retrieve an access token.
    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);

            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);

            spotifyApi.getArtistTopTracks(id, 'GB').then(function (data) {
                console.log('Search by' + id, data.body);
                res.send(JSON.stringify(data.body))
            }, function (err) {
                console.error(err);
            });;
        },
        function (err) {
            console.log('Something went wrong when retrieving an access token', err);
        }
    );
});






app.listen(process.env.PORT || 2800, () => {
    console.log("Howdy, I am running at PORT 2800")
})