const {createConfig} = require('@graphql-codegen/cli/dist/commonjs/config');
const {generate} = require('@graphql-codegen/cli/dist/commonjs/generate-and-save');
const {lifecycleHooks} = require('@graphql-codegen/cli/dist/commonjs/hooks');
const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config()

if((!process.env.NODE_ENV || process.env.NODE_ENV  === 'development') && fs.existsSync('.env.development')){
  console.log('DEVELOPMENT MODE')
  const envConfig = dotenv.parse(fs.readFileSync('.env.development'))
  console.log('.env overrides:')
  for (const k in envConfig) {
  console.log(k,':',envConfig[k])
  process.env[k] = envConfig[k]
  }
}

createConfig({ config:'./codegen.yml' })
  .then(config=>{
    return generate(config).catch(async (error) => {
      await lifecycleHooks(config.hooks).onError(error.toString());
      throw error;
    });
  })
