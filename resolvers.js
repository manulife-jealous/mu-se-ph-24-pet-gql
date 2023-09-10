// import fetch from 'node-fetch';

const fetch = require('node-fetch');

const URL = `http://localhost:3000`;

const Query = {
    message: () => {
        return 'Hello World';
    },
    /* GET ALL HERE */
    users: async () => {
        const res = await fetch(`${URL}/users`);
        const data = await res.json();
        return data;
    },    
    posts: async () => {
        const res = await fetch(`${URL}/posts`);
        const data = await res.json();
        return data;
    },
    comments: async () => {
        const res = await fetch(`${URL}/comments`);
        const data = await res.json();
        return data;
    },
    votes: async () => {
        const res = await fetch(`${URL}/votes`);
        const data = await res.json();
        return data;
    },
    /* END of GET */

    /* START of GET by ID */
    user: async (parent, args, context, info) => {
        const { id } = args;
        const res = await fetch(`${URL}/users/${id}`);
        const data = await res.json();
        return data;
    },
    post: async (parent, args, context, info) => {
        const { id } = args;
        const res = await fetch(`${URL}/posts/${id}`);
        const data = await res.json();
        return data;
    },
    comment: async (parent, args, context, info) => {
        const { id } = args;
        const res = await fetch(`${URL}/comments/${id}`);
        const data = await res.json();
        return data;
    },

    /* END of GET by ID */
}

const User = {
    //all user posts
    posts: async (parent, args, context, info) => { 
        const { id } =  parent;
        
        const res = await fetch(`${URL}/posts?user_id=${id}`);
        const user_posts = await res.json();
        return await Promise.all(user_posts);
    }
}

const Post = {
    comments: async (parent, args, context, info) => { 
        const { id: post_id } =  parent;
        
        const res = await fetch(`${URL}/comments?post_id=${post_id}`);
        const post_comments = await res.json();
        return await Promise.all(post_comments);
    },
    votes: async (parent, args, context, info) => { 
        const { id: post_id } =  parent;
        const res = await fetch(`${URL}/votes?post_id=${post_id}`);
        const post_votes = await res.json();
        return await Promise.all(post_votes);
    }
}

// const Mutation = {
//     createAppointment: async (parent, args, context, info) => {
//         console.log(parent);
//         const input = 
//         {
//             appointment: {
//                 id: '123456',
//                 ...args.input
//             }
//         }

//         //POST to API
//         // const res = await fetch(`${URL}/visits`, {
//         //     method: "post",
//         //     body: JSON.stringify(input),
//         //     headers: { "Content-Type": "application/json" }
//         //   }).json();
//         return input;
//     },
//     deleteAppointment: (parent, args, context, info) => { 
//         const input = args.input; 

//         return `${input} ID has been deleted`;
//     }

// }
module.exports = { Query, User, Post };