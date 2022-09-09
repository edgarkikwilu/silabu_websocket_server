/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('conversations').del()
  await knex('conversations').insert([
    {id: 1, name: 'fam',participant1:1,participant2:2},
    {id: 2, name: 'home',participant1:2,participant2:3},
    {id: 3, name: 'work',participant1:3,participant2:1}
  ]);
};