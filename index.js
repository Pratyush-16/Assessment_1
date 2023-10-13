const fs = require('fs');
const _ = require('lodash');
const https = require("https");

const url = "https://res.cloudinary.com/drjttrnae/raw/upload/v1696592942/input_data.json";

https.get(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    try {
      const inputData = JSON.parse(data);

      // Calculate the average age of all people
      const totalAge = inputData.reduce((sum, person) => sum + person.age, 0);
      const averageAge = totalAge / inputData.length;

      // Create a new array with people aged 30 or older
      const olderThan30 = inputData.filter((person) => person.age >= 30);

      // Sort the new array in alphabetical order by name
      const sortedArray = _.sortBy(olderThan30, 'name');

      // Prepare the result object
      const result = {
        averageAge,
        peopleOver30: sortedArray,
      };

      // Writring output 
      fs.writeFile('output_data.json', JSON.stringify(result, null, 2), (err) => {
        if (err) {
          console.error('Error writing output file:', err);
          return;
        }
        console.log('Data manipulation complete. Result written to output_data.json');
      });
    } catch (parseError) {
      console.error('Error parsing input data:', parseError);
    }
  });
});
