import { Mongo } from 'meteor/mongo'

const Greetings = new Mongo.Collection("greetings")

export default Greetings
