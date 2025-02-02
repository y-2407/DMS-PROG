import { createPool } from "mariadb"

const pool = createPool({
    //host: "maria.northeurope.cloudapp.azure.com",
    host: "localhost",
    //user: "testi",
    user: "yousra",
    port: 3306,
    //password: "mariadb1",
    password: "Noussa1",
    //database: "adbms",
    databasse: "testi",
    inertIdAsNumber: true,
    bigIntAsNumber: true,
})

export default Object.freeze({
    pool: pool
})
