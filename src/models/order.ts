import Client from './../database';


export type Order = {
          id?:string;
          status:string;
          user_id:string;
}

export type GalleryOrder = {
          id?:number;
          quantity:number;
          art_id:string;
          order_id:string;
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
  async show(id:string): Promise<Order> {
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

  // async currentOrder(user_id:string): Promise<Order> {
  //   try {
  //   const sql = 'SELECT * FROM orders WHERE id=($1)'
  //   // @ts-ignore
  //   const conn = await Client.connect()

  //   const result = await conn.query(sql, [user_id])

  //   conn.release()

  //   return result.rows[0]
  //   } catch (err) {
  //       throw new Error(`Could not find Orders ${user_id}. Error: ${err}`)
  //   }
  // }

  async create(o: Order): Promise<Order> {
      try {
    const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *'

    const conn = await Client.connect()

    const result = await conn
        .query(sql, [o.status, o.user_id])

    const Order = result.rows[0]

    conn.release()

    return Order
      } catch (err) {
          throw new Error(`Could not add new Order ${o.status}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Order> {
    try {
  const sql = 'DELETE FROM orders WHERE id=($1)'
  // @ts-ignore
  const conn = await Client.connect()

  const result = await conn.query(sql, [id])

  const order = result.rows[0]

  conn.release()

  return order
    } catch (err) {
        throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
}

  async addProduct(quantity: number,  art_id: string, order_id: string): Promise<GalleryOrder> {
    try {
      const sql = 'INSERT INTO gallery_order (quantity, art_id, order_id) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn
          .query(sql, [quantity, art_id, order_id])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add Art piece ${art_id} to order ${order_id}: ${err}`)
    }
  }
}