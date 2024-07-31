export function getFruit() {
    return fetch('https://justcors.com/tl_e4111c9/https://fruityvice.com/api/fruit/all')
    .then(res => {
        if (!res.ok) {
            throw new Error ('could not fetch')
        }
        return res.json()
    })
}
