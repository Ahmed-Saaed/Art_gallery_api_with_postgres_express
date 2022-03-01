import {ArtPiece, gallery} from '../models/gallery'
  // @ts-ignore
import DBMigrate from "db-migrate";


const store = new gallery();


describe("ArtPiece Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  // it('should have a update method', () => {
  //   expect(store.update).toBeDefined();
  // });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a ArtPiece', async () => {
    // @ts-ignore
    const result = await store.create({
      title: 'Die Hard',
      category: 'Action',
      rate: 6,
    });

  expect(result).toEqual(
    {  
      id: 1,
      title: 'Die Hard',
      category: 'Action',
      rate: 6
    });
  });

  it('show method should return the correct ArtPiece', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      title: 'Die Hard',
      category: 'Action',
      rate: 6,
    });
  });

  it('delete method should remove the ArtPiece', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toEqual([]);
  });

  afterAll(async function clearTestData () {
    let dbMigrate = DBMigrate.getInstance(true, { env: "test" });
    await dbMigrate.reset();
    await dbMigrate.up();
  });
});