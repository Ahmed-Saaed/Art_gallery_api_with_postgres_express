import { Order ,GalleryOrder , Orders } from "../models/order";
// @ts-ignore
import DBMigrate from "db-migrate";


const store = new Orders();

describe("Orders Model", () => {
  it('should have an index method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('is a create method that should add a ArtPiece', async () => {
    // @ts-ignore
    const result = await store.create({
      status:'pending',
      userId: 1,
    });

  expect(result).toEqual({  
      id: 1,
      status: 'pending',
      userId: 1
    });
  });

  it('is an show method that should return the correct ArtPiece', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      status:'pending',
      userId: 1,
    });
  });


  it('is an addProduct method that should add product to gallery_order', async () => {
    const result = await store.addProduct(3, 1, 1);

    expect(result).toEqual({  
      quantity:3,
      ArtId: 1,
      orderId: 1,
    });
  });

  afterAll(async function clearTestData () {
    let dbMigrate = DBMigrate.getInstance(true, { env: "test" });
    await dbMigrate.reset();
    await dbMigrate.up();
  });
});