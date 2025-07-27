const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '4ni7dc',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
    baseUrl : 'http://qamid.tmweb.ru/admin'
  },
  //npx cypress run --record --key 914d145a-4491-48e8-b9e4-087839611173
});

