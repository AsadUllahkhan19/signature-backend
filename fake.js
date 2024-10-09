const { faker } = require('@faker-js/faker');
(() => {
    
     function createRandomUser() {
        return {
          userId: faker.string.uuid(),
          blockName: faker.helpers.arrayElement(['Overseas Block', 'Musqat Block', 'Mosque Block']),
          plotNumber: faker.number.bigInt(10000), 
          possessionCharges: faker.helpers.arrayElement(['Half paid', 'Non Paid', 'Full Paid', 'Transfer Free']),
          location: faker.helpers.arrayElement(['Corner', 'General plot', 'Park Facing']),
          size: faker.helpers.arrayElement([10,20, 30, 25]),
          size: faker.helpers.arrayElement(['Residential', 'Commercial'])
        };
      }
      
       const users = faker.helpers.multiple(createRandomUser, {
        count: 50,
      });
 
      console.log(users)

})()