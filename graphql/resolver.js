const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID,
} = require("graphql");
const { Bid } = require("../models/bid.model");
const { Podcast } = require("../models/podcast.model");
const { PodSale } = require("../models/podsale.model");
const { Tip } = require("../models/tip.model");
const { User } = require("../models/users.model");
const {
  BidType,
  PodcastType,
  PodSaleType,
  TipType,
  UserType,
} = require("./schema");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    bid: {
      type: BidType,
      description: "Bid",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => Bid.find({id: args.id}),
    },
    bids: {
      type: new GraphQLList(BidType),
      description: "List of Bids",
      resolve: () => Bid.find(),
    },

    podcast: {
      type: PodcastType,
      description: "Podcast",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) =>
        Podcast.find({id: args.id}),
    },
    podcasts: {
      type: new GraphQLList(PodcastType),
      description: "List of podcasts",
      resolve: () => Podcast.find(),
    },

    podsale: {
      type: PodSaleType,
      description: "PodSale",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) =>
        PodSale.find({id: args.id}),
    },
    podsales: {
      type: new GraphQLList(AuthorType),
      description: "List of podsales",
      resolve: () => PodSale.find(),
    },

    tip: {
      type: TipType,
      description: "Tip",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) =>
        Tip.find({id: args.id}),
    },
    authors: {
      type: new GraphQLList(TipType),
      description: "List of Tips",
      resolve: () => Tip.find(),
    },

    user: {
      type: UserType,
      description: "user",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) =>
        User.find({id: args.id}),
    },
    users: {
      type: new GraphQLList(UserType),
      description: "List of Users",
      resolve: () => User.find({id: args.id}),
    },
  }),
});

// const RootMutationType = new GraphQLObjectType({
//   name: "Mutation",
//   description: "Root Mutation",
//   fields: () => ({
//     addBook: {
//       type: BookType,
//       description: "Add a book",
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         authorId: { type: new GraphQLNonNull(GraphQLInt) },
//       },
//       resolve: (parent, args) => {
//         const book = {
//           id: books.length + 1,
//           name: args.name,
//           authorId: args.authorId,
//         };
//         books.push(book);
//         return book;
//       },
//     },
//   }),
// });

module.exports = { RootQueryType, RootMutationType };
