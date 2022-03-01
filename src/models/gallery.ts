import Client from "../database";

export type ArtPiece = {
  id ?: number;
  title: string;
  category: string;
  rate: number
}


export class gallery {
  async index():Promise<ArtPiece[]>{
    try{
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'select * from gallery'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    }catch (err){
      throw new Error(`cannot get the ArtPiece ${err}`)
    }
  }
  async show(id: string): Promise<ArtPiece> {
    try {
    const sql = 'SELECT * FROM gallery WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find ArtPiece ${id}. Error: ${err}`)
    }
  }

  async create(b: ArtPiece): Promise<ArtPiece> {
      try {
    const sql = 'INSERT INTO gallery (title, category, rate) VALUES ($1, $2, $3) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [b.title, b.category, b.rate])

    const ArtPiece = result.rows[0]

    conn.release()

    return ArtPiece
      } catch (err) {
          throw new Error(`Could not add new ArtPiece ${b.title}}. Error: ${err}`)
      }
  }

  async update(b: ArtPiece): Promise<ArtPiece> {
      try {
    const sql = `UPDATE gallery SET title= $1 ,category= $2 ,rate = $3 WHERE id = $4 RETURNING *`
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [b.title, b.category, b.rate,b.id])

    const ArtPiece = result.rows[0]

    conn.release()

    return ArtPiece
      } catch (err) {
          throw new Error(`Could not add new ArtPiece ${b.title}}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<ArtPiece> {
      try {
    const sql = 'DELETE FROM gallery WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const ArtPiece = result.rows[0]

    conn.release()

    return ArtPiece
      } catch (err) {
          throw new Error(`Could not delete ArtPiece ${id}. Error: ${err}`)
      }
  }
}