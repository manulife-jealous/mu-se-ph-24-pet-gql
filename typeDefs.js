//JD: THIS IS the SCHEMA

const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        message: String,
        name: String,
        users: [User],
        user (id: ID): User,
        posts: [Post],
        post (id: ID): Post,
        comments: [Comment],
        comment (user_id: ID, post_id: ID): [Comment],
        votes: [Vote]
    }

    type User {
        id: ID,
        name: String,
        posts: [Post]
    }

    type Post {
        id: ID,
        user_id: ID,
        message: String,
        comments: [Comment],
        votes: [Vote]
    }

    type Vote {
        id: ID,
        post_id: ID,
        upvotes: Int,
        downvotes: Int
    }

    type Comment {
        id: ID,
        post_id: ID,
        message: String
    }

# all for post, put, delete
    type Mutation {
        createPost(input: CreatePostRequest!) : CreatePostResponse
        deletePost(input: ID!) : String
    }

    input CreatePostRequest {
        user_id: ID,
        message: String,
        category: String,
        media: String,
        isAnon: Boolean
    }

    type CreatePostResponse {
        user_post: PostRep
    }

    type PostRep {
        id: ID,
        user_id: ID,
        message: String,
        category: String,
        media: String,
        isAnon: Boolean
    }
`;

module.exports = typeDefs;