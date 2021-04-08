const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

// Hardcoded Data
// const customers = [
//   { id: '1', name: 'John Doe', email: 'jdoe@example.com', age: 35 },
//   { id: '2', name: 'Steve Smith', email: 'ssmith@example.com', age: 25 },
//   { id: '3', name: 'Sara Williams', email: 'swilliams@example.com', age: 32 },
// ]

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/customers/' + args.id)
          .then(res => res.data)

        // for (let i = 0; i < customers.length; i++) {
        //   if (customers[i].id == args.id) {
        //     return customers[i]
        //   }
        // }
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/customers/')
          .then(res => res.data)
      }
    }
  }

})

module.exports = new GraphQLSchema({
  query: RootQuery
})