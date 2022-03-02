"use strict";
// import supertest from 'supertest';
// import app from '../server';
//   // @ts-ignore
// import DBMigrate from "db-migrate";
// const request = supertest(app);
// describe('gallery route endpoints responses', () => {
//   it('the gallery get endpoint should return a status of 200', (): void => {
//     request
//       .get('/art')
//       .then((response) => {
//         expect(response.status).toBe(200);
//       });
//   });
//   it('the gallery show endpoint should return a status of 200', (): void => {
//     request
//       .get('/art/1')
//       .then((response) => {
//         expect(response.status).toBe(200);
//       });
//   });
//   it('the gallery post endpoint should return a status of 200', (): void => {
//     request
//       .post('/art')
//       .then((response) => {
//         expect(response.status).toBe(200);
//       });
//   });
//   it('the gallery update endpoint should return a status of 200', (): void => {
//     request
//       .put('/art/1')
//       .then((response) => {
//         expect(response.status).toBe(200);
//       });
//   });
//   it('the gallery delete endpoint should return a status of 200', (): void => {
//     request
//       .delete('/art/1')
//       .then((response) => {
//         expect(response.status).toBe(200);
//       });
//   });
//   afterAll(async function clearTestData () {
//     let dbMigrate = DBMigrate.getInstance(true, { env: "test" });
//     await dbMigrate.reset();
//     await dbMigrate.up();
//   });
// });
