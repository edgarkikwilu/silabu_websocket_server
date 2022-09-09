/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('chats').del()
  await knex('chats').insert([
    {id: 1, referenceId: null, message:"Hellow",conversation_id:1,to:1,from:2},
    {id: 2, referenceId: 1, message:"Hi there",conversation_id:1,to:2,from:1},
    {id: 3, referenceId: null, message:"How is your day?",conversation_id:1,to:2,from:1},
    {id: 4, referenceId: null, message:"Where is my money?",conversation_id:2,to:2,from:3}
  ]);
};
