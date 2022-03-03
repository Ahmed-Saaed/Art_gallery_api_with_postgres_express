import Client from './../database';


export type Order = {
          id?:number;
          status:string;
          userId:number;
}

export type GalleryOrder = {
          quantity:number;
          ArtId:number;
          orderId:number;
}

export class Orders {
  async index():Promise<Order[]>{
    try{
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'select * from orders'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    }catch (err){
      throw new Error(`cannot get the Order ${err}`)
    }
  }
  async show(id:number): Promise<Order> {
    try {
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find Orders ${id}. Error: ${err}`)
    }
  }

  async create(o: Order): Promise<Order> {
      try {
    const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *'

    const conn = await Client.connect()

    const result = await conn
        .query(sql, [o.status, o.userId])

    const Order = result.rows[0]

    conn.release()

    return Order
      } catch (err) {
          throw new Error(`Could not add new Order ${o.status}. Error: ${err}`)
      }
  }

  async addProduct(quantity: number,  ArtId: number, orderId: number): Promise<GalleryOrder> {
    try {
      const sql = 'INSERT INTO gallery_order (quantity, art_id, order_id) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn
          .query(sql, [quantity, ArtId, orderId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add Art piece ${ArtId} to order ${orderId}: ${err}`)
    }
  }
}