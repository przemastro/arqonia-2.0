use arqonia2
db.createUser(
    {
        user: "arqoniaMongoUser",
        pwd: "arqoniaSuperPass12",
        roles: [ { role: "readWrite", db: "arqonia2" } ]
    }
)
