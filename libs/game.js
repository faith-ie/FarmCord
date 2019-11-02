module.exports = client => {

    client.game = {

        /**
         * Takes in a discord id and make a database entry of the user
         * @param {String} uid discord id
         */
        createUser: async (uid) => {

            //get the starting farm
            let startingFarm = require('../settings/startingfarm.json')
            let startingPet = require('../settings/startingpet.json')

            //Check to make sure user doesnt already exist
            let entry = await client.database.collection('DiscordUser').findOne({uid: uid})
            if(entry === null) return Promise.reject('User exist in database.')

            return client.database.collection('DiscordUser').insert({
                uid: uid,
                votedCounter: 0,
                cash: 0,
                marriedTo: null, //or a user id if they are married
                inventory: [],
                maxInventory: 500,
                pet: startingPet,
                farmPlot: startingFarm
            })
        },

        /**
         * Set a users animal name
         * @param {String} uid
         * @param {String} name
         */
        setAnimalName: async (uid, name) => {
            //Check to make sure user doesnt already exist
            let entry = await client.database.collection('DiscordUser').findOne({uid: uid})
            if(entry === null) return Promise.reject('User exist in database.')

            return client.database.collection('DiscordUser').updateOne({uid:uid}, {
                $set: {
                    'pet.name':name
                }
            })
        }
    }
}
