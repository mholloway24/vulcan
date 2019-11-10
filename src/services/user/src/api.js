const axios = require('axios');
const twitchAPIUserEndpoint = 'https://api.twitch.tv/helix/users';

require('dotenv').config();

const twitchClientToken = process.env.TWITCH_CLIENT_TOKEN;
const twitchClientId = process.env.TWITCH_CLIENT_ID;

const api = {
    getUser: async function (login) {
        const url = `${twitchAPIUserEndpoint}?login=${login}`;

        const headers = {
            "Authorization": `Bearer ${twitchClientToken}`,
            "Content-Type": "application/json",
            "Client-ID": twitchClientId
        };

        let user = undefined;

        try {
            const response = await axios.get(url, { headers });
            if (response.data) {
                const body = response.data;
                user = body.data.length > 1 ? body.data : body.data[0];
            }
        }
        catch (err) {
            console.log(err);
        }

        return user;
    }
}

module.exports = api;