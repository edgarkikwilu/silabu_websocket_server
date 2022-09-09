/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, name: 'Edgar Emil Kikwilu', phoneNumber:'255763006587'},
    {id: 2, name: 'John Foo Kennedy', phoneNumber:'2557656724750'},
    {id: 3, name: 'Agness Malita Pius', phoneNumber:'255714621214'},
  ]);
};
