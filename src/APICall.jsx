export function getFruit() {

    return fetch('https://justcors.com/l_zd7p6xl6tg/https://fruityvice.com/api/fruit/all')
    .then(res => {
        if (!res.ok) {
            throw new Error ('could not fetch')
        }
        return res.json()
    })
}
