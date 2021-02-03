async function tokenFetch() {

    let myToken
    /* fetch(`https://blog.webcontinental.com.br/provisorio/wc-products-req/getToken.php`) */
    await fetch(`http://localhost/_react/getToken.php`, {
        method: 'GET',
        mode: 'cors',
    })
        .then(resp => {
            return resp.json()
        })
        .then(resp => {
            myToken = resp.access_token
        })
        .catch(error => console.log(error));

        return myToken
}

export default tokenFetch