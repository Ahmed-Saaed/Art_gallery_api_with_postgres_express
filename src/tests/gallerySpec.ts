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

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('is a create method that should add a ArtPiece', async () => {
    // @ts-ignore
    const result = await store.create({
      title: 'Die Hard',
      category: 'Action',
      rate: 6,
    });

  expect(result).toEqual({  
      id: 1,
      title: 'Die Hard',
      category: 'Action',
      rate: 6
    });
  });

  it('is an show method that should return the correct ArtPiece', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      title: 'Die Hard',
      category: 'Action',
      rate: 6,
    });
  });

  it('it is an update method which should update the ArtPiece', async () => {
    const result = await store.update({
      id: 1,
      title: 'the mask',
      category: 'comedy',
      rate: 8,
    });

    expect(result).toEqual({
      id: 1,
      title: 'the mask',
      category: 'comedy',
      rate: 8,
    });
  });

  it('is a delete method which should remove the ArtPiece', async () => {
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