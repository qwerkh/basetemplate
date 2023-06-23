module.exports = {
    servers: {
        one: {
            // TODO: set host address, username, and authentication method
            host: '192.53.114.143',
            username: 'root',
            // pem: './path/to/pem'
            password: 'MasterIt@root.124#.com'
            // or neither for authenticate from ssh-agent
        }
    },

    meteor: {
        // TODO: change app name and path
        name: 'myloan',
        //name: 'pos',
        path: '../.',

        servers: {
            one: {},
        },

        buildOptions: {
            serverOnly: true,
        },

        env: {
            // TODO: Change to your app's url
            // If you are using ssl, it needs to start with https://
            PORT: 1111,
            //PORT: 3636,
            ROOT_URL: 'http://192.53.114.143',
            MONGO_URL: 'mongodb://localhost/myloan',
            //MONGO_URL: 'mongodb://localhost/svp',
            TZ: 'Asia/Bangkok',
        },

        // ssl: { // (optional)
        //   // Enables let's encrypt (optional)
        //   autogenerate: {
        //     email: 'email.address@domain.com',
        //     // comma seperated list of domains
        //     domains: 'website.com,www.website.com'
        //   }
        // },

        docker: {
            // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
            //image: 'abernix/meteord:node-8.4.0-base',
	    //image: 'zodern/meteor:root',
            image: 'zodern/meteor',
            // imagePort: 80, // (default: 80, some images EXPOSE different ports)
        },

        // This is the maximum time in seconds it will wait
        // for your app to start
        // Add 30 seconds if the server has 512mb of ram
        // And 30 more if you have binary npm dependencies.
        deployCheckWaitTime: 60,

        // Show progress bar while uploading bundle to server
        // You might need to disable it on CI servers
        enableUploadProgressBar: true
    },

    mongo: {
        port: 27017,
        version: '4.4',
        oplog: true,
        servers: {
            one: {}
        }
    }
};
