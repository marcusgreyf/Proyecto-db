declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string
        MYSQL_HOST: string
        MYSQL_USER: string
        MYSQL_PASSWORD: string
        MYSQL_DATABASE: string
        CONTRASENASECRETA: string
      }
    }
  }
  
  export { }