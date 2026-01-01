import { defineConfig } from 'sanity';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'clockpunk-studio',
  title: 'Clockpunk CMS',

  projectId,
  dataset,


  schema: {
    types: schemaTypes,
  },
});
