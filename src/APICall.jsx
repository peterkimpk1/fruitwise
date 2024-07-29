export function getFruit() {
    return fetch('https://justcors.com/tl_6bbc215/https://fruityvice.com/api/fruit/all', {
        method: 'GET'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error ('could not fetch')
        }
        return res.json()
    })
}
