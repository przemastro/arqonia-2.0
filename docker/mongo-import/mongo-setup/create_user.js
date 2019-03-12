db.createUser(
    {
        user: "arqoniaMongoUser2",
        pwd: "arqoniaSuperPass12",
        roles: [ { role: "readWrite", db: "arqonia2" } ]
    }
);
