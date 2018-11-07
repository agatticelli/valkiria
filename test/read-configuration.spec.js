const expect = require('chai').expect;
const path = require('path');

describe('Load single file', () => {
  
  it('Should read simple value from config', () => {
    const fileToLoad = path.join(__dirname, './config/db.js');

    const valkiria = require(path.join(__dirname, '../'))(fileToLoad);
    const rawConfig = require(fileToLoad);

    expect(valkiria('host')).to.eq(rawConfig.host);
    expect(valkiria('port')).to.eq(rawConfig.port);
    expect(valkiria('credentials.user')).to.eq(rawConfig.credentials.user);
  });

  it('Should read object from config', () => {
    const fileToLoad = path.join(__dirname, './config/db.js');
    
    const valkiria = require(path.join(__dirname, '../'))(fileToLoad);
    const rawConfig = require(fileToLoad);

    const valkiriaObj = valkiria('credentials');
    const rawObj = rawConfig.credentials;

    expect(JSON.stringify(valkiriaObj)).to.eq(JSON.stringify(rawObj));
  });

});

describe('Load entire config folder', () => {
  
  it('Should read simple value from config', () => {
    const pathToLoad = path.join(__dirname, './config');

    const valkiria = require(path.join(__dirname, '../'))(pathToLoad);
    const rawAppConfig = require(`${pathToLoad}${path.sep}/app`);
    const rawDbConfig = require(`${pathToLoad}${path.sep}/db`);

    expect(valkiria('app.host')).to.eq(rawAppConfig.host);
    expect(valkiria('db.port')).to.eq(rawDbConfig.port);
    expect(valkiria('db.credentials.user')).to.eq(rawDbConfig.credentials.user);
  });

  it('Should read object from config', () => {
    const pathToLoad = path.join(__dirname, './config');
    
    const valkiria = require(path.join(__dirname, '../'))(pathToLoad);
    const rawAppConfig = require(`${pathToLoad}${path.sep}/app`);
    const rawDbConfig = require(`${pathToLoad}${path.sep}/db`);

    const valkiriaAppObj = valkiria('app');
    const valkiriaCredentialsObj = valkiria('db.credentials');

    expect(JSON.stringify(valkiriaAppObj)).to.eq(JSON.stringify(rawAppConfig));
    expect(JSON.stringify(valkiriaCredentialsObj)).to.eq(JSON.stringify(rawDbConfig.credentials));
  });

});