import {ArtPiece, gallery} from '../../models/gallery'
  // @ts-ignore
import DBMigrate from "db-migrate";


const galleryStore = new gallery();


describe("ArtPiece Model", () => {
  it('should have an index method', () => {
    expect(galleryStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(galleryStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(galleryStore.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(galleryStore.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(galleryStore.delete).toBeDefined();
  });

  it('is a create method that should add a ArtPiece', async () => {
    // @ts-ignore
    const result = await galleryStore.create({
      title: 'monaliza',
      artist: 'davanci',
      category: 'Renaissance',
      price: 6,
    });

  expect(result).toEqual({  
      id: '1',
      title: 'monaliza',
      artist: 'davanci',
      category: 'Renaissance',
      price: 6
    });
  });

  it('is an show method that should return the correct ArtPiece', async () => {
    const result = await galleryStore.show(1);
    expect(result).toEqual({
      id: '1',
      title: 'monaliza',
      artist: 'davanci',
      category: 'Renaissance',
      price: 6,
    });
  });

  it('it is an update method which should update the ArtPiece', async () => {
    const result = await galleryStore.update({
      id: '1',
      title: 'the scream',
      artist: 'munch',
      category: 'Expressionism',
      price: 8,
    });

    expect(result).toEqual({
      id: '1',
      title: 'the scream',
      artist: 'munch',
      category: 'Expressionism',
      price: 8,
    });
  });

  it('is a delete method which should remove the ArtPiece', async () => {
    await galleryStore.delete("1");
    const result = await galleryStore.index()

    expect(result).toEqual([]);
  });

  afterAll(async function clearTestData () {
    let dbMigrate = DBMigrate.getInstance(true, { env: "test" });
    await dbMigrate.reset();
    await dbMigrate.up();
  });
});