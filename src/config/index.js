"use strict";
exports.__esModule = true;
var convict = require("convict");
var config = convict({
    env: {
        format: ['production', 'staging', 'qa', 'development', 'local', 'test'],
        env: 'NODE_ENV',
        arg: 'node-env',
        "default": 'development'
    },
    version: {
        format: String,
        "default": 'unknown'
    },
    tokenSecret: {
        format: String,
        "default": ''
    },
    server: {
        port: {
            format: 'port',
            "default": 3000
        },
        frontendURL: {
            format: String,
            "default": 'http://localhost:4200'
        },
        passwordSalt: {
            format: String,
            "default": ''
        },
        tokenExpiry: {
            format: String,
            "default": '1w'
        },
        resetHashExpiry: {
            format: Number,
            "default": 4
        }
    },
    postgres: {
        host: {
            format: String,
            "default": 'localhost'
        },
        port: {
            format: 'port',
            "default": 5432
        },
        username: {
            format: String,
            "default": 'postgres'
        },
        password: {
            format: String,
            "default": 'postgres'
        },
        database: {
            format: String,
            "default": 'postgres'
        },
        url: {
            format: String,
            "default": ''
        }
    },
    apiAccessKeys: {
        app: {
            format: String,
            "default": '123456'
        }
    },
    email: {
        host: {
            format: String,
            "default": ''
        },
        port: {
            format: Number,
            "default": 465
        },
        secure: {
            format: Boolean,
            "default": true
        },
        user: {
            format: String,
            "default": ''
        },
        password: {
            format: String,
            "default": ''
        }
    },
    cloudinary: {
        name: {
            format: String,
            "default": ''
        },
        apiKey: {
            format: String,
            "default": ''
        },
        apiSecret: {
            format: String,
            "default": ''
        },
        env: {
            format: String,
            "default": ''
        }
    },
    sendgrid: {
        key: {
            format: String,
            "default": ''
        }
    },
    fcm: {
        serverKey: {
            format: String,
            "default": ''
        }
    },
    realTimeIntervalInMin: {
        format: Number,
        "default": 2
    },
    appVersion: {
        format: Number,
        "default": 0
    }
});
var env = config.get('env');
config.loadFile(__dirname + '/env/' + env + '.json');
config.validate({ allowed: 'strict' });
exports["default"] = config.getProperties();
