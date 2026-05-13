const { z } = require('zod');
const schema = z.object({ name: z.string() });
try {
  schema.parse({});
} catch (err) {
  console.log('errors exists:', !!err.errors);
  console.log('issues exists:', !!err.issues);
  console.log('errors is array:', Array.isArray(err.errors));
}
