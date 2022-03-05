import { Order ,GalleryOrder , Orders } from "../../models/order";
import { ArtPiece, gallery } from "../../models/gallery";
import { User ,Users } from "../../models/user";
// @ts-ignore
import DBMigrate from "db-migrate";



const store = new Orders();
const astore = new gallery();
const ustore = new Users();

describe("Orders Model", () => {

  beforeAll(async () => {

    await ustore.create({
    username: 'naira',
    firstname: 'naira',
    lastname: 'ahmed',
    password: 'password'})

    await astore.create({
    title: 'monaliza',
    artist: 'davanci',
    category: 'Renaissance',
    price: 6})

    // await store.create({
    //   status:'pending',
    //   user_id: '1',
    // });
  })


  it('should have an index method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('is a create method that should add an ArtPiece order', async () => {
    // @ts-ignore
    const result = await store.create({
      status:'pending',
      user_id: '1',
    });

  expect(result).toEqual({  
      id: '1',
      status: 'pending',
      user_id: '1'
    });
  });

  it('is an show method that should return the correct ArtPiece order', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: '1',
      status:'pending',
      user_id: '1',
    });
  });


  it('is an addProduct method that should add product to gallery_order', async () => {
    const result = await store.addProduct(3, "1", "1");

    expect(result).toEqual({
      id:1,
      quantity:3,
      art_id: '1',
      order_id: '1',
    });
  });

  afterAll(async function clearTestData () {
    let dbMigrate = DBMigrate.getInstance(true, { env: "test" });
    await dbMigrate.reset();
    await dbMigrate.up();
  });
});