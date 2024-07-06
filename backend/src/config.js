import packageJson from '../package.json' with { type: "json" };

/**
 * Pattern for config is:
 * key: process.env['KEY'] ?? default
 */
const config = {
    version: packageJson.version,
    name: packageJson.name,
    description: packageJson.description,

    nodeEnv: process.env['NODE_ENV'] ?? 'development',
    port: process.env['PORT'] ?? 3000,
    passwordSalt: process.env['PASSWORD_SALT'] ?? 'ot',
    secretApiKey: process.env['SECRET_API_KEY'] ?? '123',
    clientOrigins: {
        'test': process.env['DEV_ORIGIN'] ?? '*',
        'development': process.env['DEV_ORIGIN'] ?? '*',
        'production': process.env['PROD_ORIGIN'] ?? 'none'
    },

    db: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT || "5432",
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        sslConnection: (process.env.BACKEND_SSL_DB_CONNECTION === undefined || process.env.BACKEND_SSL_DB_CONNECTION === "false") ? false : true,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}

export default config