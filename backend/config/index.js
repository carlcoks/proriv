module.exports = {
  port: 3000,
  portSocket: 3001,
  secret: 'proriv123456789',
  session: { session: false },
  dbProd: {
    host: "localhost",
    port: 3306,
    dbuser: "root",
    dbpass: "",
    dbname: "analitics"
  },
  dbDev: {
    host: "localhost",
    port: 3306,
    dbuser: "root",
    dbpass: "",
    dbname: "analitics"
  },
}
