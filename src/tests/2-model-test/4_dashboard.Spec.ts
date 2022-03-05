import { DashboardQueries } from '../../models/services/dashboard';
import {  Orders } from "../../models/order";;
import { gallery } from "../../models/gallery";
import { Users } from "../../models/user";
  // @ts-ignore
import DBMigrate from "db-migrate";

const dashboard = new DashboardQueries()
const store = new Orders();
const astore = new gallery();
const ustore = new Users();

describe("Dashboard Model", () => {

  beforeAll(async (done) => {

      await astore.create({
      title: 'monaliza',
      artist: 'davanci',
      category: 'Renaissance',
      price: 6})

      await ustore.create({
        username: 'ahmed',
        firstname: 'naira',
        lastname: 'ahmed',
        password: 'password'})
  
      await store.create({
        status: 'complete',
        user_id: '1',
      });

      done()
  })

  it('is a get completed order method that should return the correct completed orders', async () => {
    const result = await dashboard.completedOrder()

      expect(result[0]).toEqual({ username: 'ahmed', status: 'complete' })
  });

  afterAll(async function clearTestData () {
    let dbMigrate = DBMigrate.getInstance(true, { env: "test" });
    await dbMigrate.reset();
    await dbMigrate.up();
  });
});