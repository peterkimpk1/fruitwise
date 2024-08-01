export function getFruit() {
    return fetch('https://justcors.com/tl_e5a3364/https://fruityvice.com/api/fruit/all')
    .then(res => {
        if (!res.ok) {
            throw new Error ('could not fetch')
        }
        return res.json()
    })
}
