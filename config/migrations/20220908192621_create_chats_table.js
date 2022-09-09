/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('chats', function(table){
        table.increments('id').primary()
        table.string('referenceId').nullable()
        table.string('message').notNullable()
        table.integer('conversation_id').unsigned().notNullable()
        table.integer('to').unsigned().notNullable()
        table.integer('from').unsigned().notNullable()
        table.boolean('read').notNullable().defaultTo(false)
        table.timestamps()

        table.foreign('conversation_id').references('conversations.id')
        table.foreign('to').references('users.id')
        table.foreign('from').references('users.id')
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
