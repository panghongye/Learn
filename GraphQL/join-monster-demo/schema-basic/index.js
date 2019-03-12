import { GraphQLSchema } from 'graphql'

import QueryRoot from './QueryRoot'

export default new GraphQLSchema({
  description: 'base schema',
  query: QueryRoot,
  // mutation:Mutation,
})
