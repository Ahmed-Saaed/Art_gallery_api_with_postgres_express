import {User, Users} from '../models/user'
import bcrypt from 'bcrypt';
// @ts-ignore
import DBMigrate from "db-migrate";

const store = new Users();
const {BCRYPT_PASSWORD:pepper,SALT_ROUNDS:saltRounds} = process.env
const testPassword  = '1234abc';

describe("User Model", () => {
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

  it('is a create method which should add a user', async () => {
    // @ts-ignore
    const result = await store.create({
      username: 'ahmed',
      password: testPassword,
    });

    const hash = bcrypt.hashSync(
      testPassword + pepper, 
      parseInt(saltRounds as string)
    );

  expect(result).toEqual(
    {  
      id: 1,
      username: 'ahmed',
      password: hash,
    });
  });

  it('is a show method which should return the correct user', async () => {
    const result = await store.show("1");

    const hash = bcrypt.hashSync(
      testPassword + pepper, 
      parseInt(saltRounds as string)
    );

    expect(result).toEqual({
      id: 1,
      username: 'ahmed',
      password: hash,
    });
  });

  it('is a delete method which should remove the user', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toEqual([]);
  });

  it('is an authenticate method which should verfiy the user', async () => {
    const result = await store.authenticate('ahmed', testPassword);

    const hash = bcrypt.hashSync(
      testPassword + pepper, 
      parseInt(saltRounds as string)
    );

    expect(result).toEqual({  
      id: 1,
      username: 'ahmed',
      password: hash,
    });
  });

  afterAll(async function clearTestData () {
    let dbMigrate = DBMigrate.getInstance(true, { env: "test" });
    await dbMigrate.reset();
    await dbMigrate.up();
  });
});