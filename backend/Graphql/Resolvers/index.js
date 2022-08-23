const postResolvers = require("./Posts");
const userResolvers = require("./Users");
const commentResolvers = require("./comments")

module.exports = {
    Post: {
        likeCount(parent){
            return parent.likes.length
        },
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}