const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const typeDefs = require("./Graphql/typeDefs")
const resolvers = require("./Graphql/Resolvers")

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req}) => ({ req })
})

mongoose.connect(MONGODB)
    .then(() => {
        console.log('MongoDb connected')
        return server.listen({ port: 4000})
            .then((res) => {
                console.log(`Server Up and running on Port ${res.url}`)
            })
    })
    .catch(err => console.log(`Err Found`, err))

