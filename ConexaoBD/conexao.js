import mysql from 'mysql2/promise'

export default class CarroDB {

   static async connect() {
    // Criar a conexão com mysql usando a versão promise
    let connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'livro'
    })
    return connection
   }

   // Retornar lista
   static async getCarros() {
    let connection = await CarroDB.connect()
    try {
        let sql = "select * from carro"
        let [results] = await connection.query(sql)
        return results
    } finally {
        await connection.end()
    }
   }

   // Listar por tipo
   static async getCarrosByTipo(tipo) {
    let connection = await CarroDB.connect()
    try {
        // Usando interrogação (?) para prevenir SQL Injection
        let sql = "select id, nome, tipo from carro where tipo = ?"
        let [results] = await connection.query(sql, [tipo])
        return results
    } finally {
        await connection.end()
    }
   }

   // Listar por id
   static async getCarrosById(id) {
    let connection = await CarroDB.connect()
    try {
        let sql = "select * from carro where id = ?"
        let [results] = await connection.query(sql, [id])
        return results[0] // Retorna apenas o objeto do carro
    } finally {
        await connection.end()
    }
   }

   // Salvar no banco de dados
   static async save(carro) {
    let connection = await CarroDB.connect()
    try {
        let sql = "insert into carro set ?"
        let [results] = await connection.query(sql, carro)
        carro.id = results.insertId
        return carro
    } finally {
        await connection.end()
    }
   }

   // Atualizar banco de dados
   static async update(carro) {
    let connection = await CarroDB.connect()
    try {
        let sql = "update carro set ? where id = ?"
        await connection.query(sql, [carro, carro.id])
        return carro
    } finally {
        await connection.end()
    }
   }

   // Deletar um carro no BD passando o objeto
   static async delete(carro){
    let connection = await CarroDB.connect()
    try {
        let sql = "delete from carro where id = ?"
        await connection.query(sql, [carro.id])
        return carro
    } finally {
        await connection.end()
    }
   }

   // Deletar um carro no BD by ID direto
   static async deletebyId(id){
    let connection = await CarroDB.connect()
    try {
        let sql = "delete from carro where id = ?"
        let [results] = await connection.query(sql, [id])
        return results.affectedRows
    } finally {
        await connection.end()
    }
   }
}