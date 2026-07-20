import fs from 'fs';
import path from 'path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const rootDir = process.cwd();
const schemasDir = path.join(rootDir, 'src', 'content', 'schemas');
const dataDir = path.join(rootDir, 'src', 'content', 'data');

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

function validateFile(schemaName, dataName) {
  const schemaPath = path.join(schemasDir, schemaName);
  const dataPath = path.join(dataDir, dataName);

  if (!fs.existsSync(schemaPath) || !fs.existsSync(dataPath)) {
    console.error(`[Data Validation Error] Missing file: ${schemaPath} or ${dataPath}`);
    process.exit(1);
  }

  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.error(`[Data Validation Failed] ${dataName} does not conform to ${schemaName}:`);
    console.error(validate.errors);
    process.exit(1);
  }

  console.log(`✓ Validated ${dataName} against ${schemaName}`);
}

try {
  validateFile('profile.schema.json', 'profile.json');
  validateFile('projects.schema.json', 'projects.json');
  validateFile('site.schema.json', 'site.json');
  console.log('✓ All JSON content schemas validated successfully.');
} catch (err) {
  console.error('[Data Validation Exception]', err);
  process.exit(1);
}
