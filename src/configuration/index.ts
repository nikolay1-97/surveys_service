export default () => ({
    port: process.env.PORT,
    salt: process.env.SALT,
    db_url: process.env.DB_URL,
    expire_jwt: process.env.EXPIRE_JWT,
    admin_secret: process.env.ADMIN_SECRET,
    user_secret: process.env.USER_SECRET,
    docker_db_url: process.env.DOCKER_DB_URL,
  });
  