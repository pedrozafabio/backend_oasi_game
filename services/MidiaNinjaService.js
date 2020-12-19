const fetch = require('node-fetch');


exports.ValidateToken = async(tokenToValidate) => {

    const body = JSON.stringify({
        token: tokenToValidate
    });

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    }

    const response = await fetch(process.env.API_MN_URL + '/validate-token', options);

    let resJson = await response.json();
    resJson.status = response.status;

    return resJson;
};