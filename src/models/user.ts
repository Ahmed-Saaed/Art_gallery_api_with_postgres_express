import bcrypt from 'bcrypt';
import Client from "../database";


export type User = {
  id ?: number;
  username: string;
  password: string;
}

const {BCRYPT_PASSWORD:pepper,saltRounds} = process.env


export class Users {
  async create(u: User): Promise<User> {
    try {
      
      const conn = await Client.connect()
      const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *'

      const hash = bcrypt.hashSync(
        u.password + pepper, 
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [u.username, hash])
      const user = result.rows[0]

      conn.release()

      return user
    } catch(err) {
      throw new Error(`unable create user (${u.username}): ${err}`)
    } 
  }

  // equal show method in gallery 

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect()
    const sql = 'SELECT password_digest FROM users WHERE username=($1)'

    const result = await conn.query(sql, [username])

    console.log(password+pepper)

    if(result.rows.length) {

      const user = result.rows[0]

      if (bcrypt.compareSync(password+pepper, user.password_digest)) {
        return user
      }
    }

    return null
  }
}