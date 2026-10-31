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
  return data;
}

function assertRef(id, validSet, contextLabel) {
  if (!id) return;
  if (!validSet.has(id)) {
    console.error(`[Relational Integrity Error] Unknown reference "${id}" in ${contextLabel}`);
    process.exit(1);
  }
}

try {
  validateFile('profile.schema.json', 'profile.json');
  const projectsData = validateFile('projects.schema.json', 'projects.json');
  validateFile('experiences.schema.json', 'experiences.json');
  validateFile('site.schema.json', 'site.json');
  const mediaData = validateFile('media.schema.json', 'media.json');
  const rolesData = validateFile('roles.schema.json', 'roles.json');
  const journeyData = validateFile('journey.schema.json', 'journey.json');
  const awardsData = validateFile('awards.schema.json', 'awards.json');

  const projectIds = new Set(projectsData.projects.map((p) => p.id));
  const mediaIds = new Set(mediaData.assets.map((m) => m.id));
  const roleIds = new Set(rolesData.roles.map((r) => r.id));
  const journeyIds = new Set(journeyData.items.map((j) => j.id));
  const awardIds = new Set(awardsData.awards.map((a) => a.id));

  for (const role of rolesData.roles) {
    assertRef(role.coverImage, mediaIds, `role:${role.id}.coverImage`);
    role.galleryImages.forEach((mId) => assertRef(mId, mediaIds, `role:${role.id}.galleryImages`));
    role.relatedProjects.forEach((pId) => assertRef(pId, projectIds, `role:${role.id}.relatedProjects`));
    role.relatedActivityIds.forEach((jId) => assertRef(jId, journeyIds, `role:${role.id}.relatedActivityIds`));
    role.relatedAwardIds.forEach((aId) => assertRef(aId, awardIds, `role:${role.id}.relatedAwardIds`));
  }

  for (const item of journeyData.items) {
    assertRef(item.coverImage, mediaIds, `journey:${item.id}.coverImage`);
    item.galleryImages.forEach((mId) => assertRef(mId, mediaIds, `journey:${item.id}.galleryImages`));
    item.relatedRoleIds.forEach((rId) => assertRef(rId, roleIds, `journey:${item.id}.relatedRoleIds`));
    item.relatedProjectIds.forEach((pId) => assertRef(pId, projectIds, `journey:${item.id}.relatedProjectIds`));
    item.relatedAwardIds.forEach((aId) => assertRef(aId, awardIds, `journey:${item.id}.relatedAwardIds`));
  }

  for (const award of awardsData.awards) {
    assertRef(award.certificateImage, mediaIds, `award:${award.id}.certificateImage`);
    award.awardImages.forEach((mId) => assertRef(mId, mediaIds, `award:${award.id}.awardImages`));
    assertRef(award.relatedProjectId, projectIds, `award:${award.id}.relatedProjectId`);
    assertRef(award.relatedActivityId, journeyIds, `award:${award.id}.relatedActivityId`);
    assertRef(award.relatedRoleId, roleIds, `award:${award.id}.relatedRoleId`);
  }

  console.log('✓ All cross-entity relational IDs (Roles ↔ Journey ↔ Awards ↔ Projects ↔ Media) verified.');
  console.log('✓ All JSON content schemas validated successfully.');
} catch (err) {
  console.error('[Data Validation Exception]', err);
  process.exit(1);
}
