import { ApolloServer, gql } from 'apollo-server';

const user = [
    { name: "A", sex: "M"},
    { name: "B", sex: "W"},
    { name: "C", sex: "M"},
]


//schema
const typeDefs = gql`
    type Query {
        hello: String
        hi: String
        users: [User]
        id: String
        user(name: String): User
    }
    type User {
        name: String
        sex: String
    }
`;
//resolver
const resolvers = {
    Query: {
        hello: (parent, args, context, info) => {
            return "World";
        },
        hi: (parent, args, context, info) => {
            return "bye";
        },
        users: (parent, args, context, info) => {
            return user;
        },
        user: (parent, args, context, info) => {
            return user.find( user => user.name === args.name);
        },
    }
};

//function-apollo-server
const startApolloServer = async (typeDefs,resolvers) =>{
    const server = new ApolloServer({ typeDefs, resolvers});
    const { url } = await server.listen();
    console.log(`Server ready at ${url}`);

};
//call function
startApolloServer(typeDefs, resolvers);