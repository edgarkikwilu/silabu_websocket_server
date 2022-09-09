/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('conversations', function(table){
        table.increments('id')
        table.string('name')
        table.integer('participant1').unsigned().notNullable()
        table.integer('participant2').unsigned().notNullable()
        table.boolean('has_new_message').defaultTo(false)
        table.timestamps()

        table.foreign('participant1').references('users.id')
        table.foreign('participant2').references('users.id')
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
