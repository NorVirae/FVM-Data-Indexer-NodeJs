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
const { User } = require("../models/users.model");

const BidType = new GraphQLObjectType({
  name: "Bid",
  description: "",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    addr: { type: new GraphQLNonNull(GraphQLInt) },
    auctionId: { type: new GraphQLNonNull(GraphQLString) },
    bid: { type: new GraphQLNonNull(GraphQLString) },
    bidder: {
      type: UserType,
      resolve: (bid) => {
        return User.find({ id: bid.bidder });
      },
    },
  }),
});

const PodcastType = new GraphQLObjectType({
  name: "PodCast",
  description: "",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    metadataURI: { type: new GraphQLNonNull(GraphQLString) },
    created: { type: new GraphQLNonNull(GraphQLString) },
    ownerAddress: {
      type: new UserType(),
      resolve: (user) => {
        let foundUser = User.find({ id: user.id });
        console.log(foundUser);
        return foundUser;
      },
    },
    creator: {
      type: UserType,
      resolve: (user) => {
        let foundUser = User.find({ id: user.id });
        console.log(foundUser);
        return foundUser;
      },
    },
  }),
});

const PodSaleType = new GraphQLObjectType({
  name: "PodSale",
  description: "",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    amount: { type: new GraphQLNonNull(GraphQLString) },
    auctionId: { type: new GraphQLNonNull(GraphQLString) },
    duration: { type: new GraphQLNonNull(GraphQLString) },
    endTIme: { type: new GraphQLNonNull(GraphQLString) },
    isOnSale: { type: new GraphQLNonNull(GraphQLString) },
    startTime: { type: new GraphQLNonNull(GraphQLString) },
    buyer: {
      type: UserType,
      resolve: (user) => {
        return User.find({ id: user.id });
      },
    },
    seller: {
      type: UserType,
      resolve: (user) => {
        return User.find({ id: user.id });
      },
    },
    podcast: {
      type: PodcastType,
      resolve: (podcast) => {
        return Podcast.find({ id: podcast.id });
      },
    },
  }),
});

const TipType = new GraphQLObjectType({
  name: "Tip",
  description: "",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    tip: { type: new GraphQLNonNull(GraphQLString) },
    podcast: {
      type: PodcastType,
      resolve: (podcast) => {
        return Podcast.find({ id: podcast.id });
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: "",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    isRecentWinner: { type: new GraphQLNonNull(GraphQLString) },
    bids: {
      type: GraphQLList(BidType),
      resolve: (bid) => {
        return Bid.find({id: bid.id});
      },
    },
    created: {
      type: new GraphQLList(PodcastType),
      resolve: (podcast) => {
        return Podcast.find({id: podcast.id});
      },
    },
    podcasts: {
      type: GraphQLList(PodcastType),
      resolve: (podcast) => {
        return Podcast.find({id: podcast.id});
      },
    },
  }),
});

module.exports = { BidType, PodcastType, PodSaleType, TipType, UserType };
