const expect = require('chai').expect;
const path = require('path');

describe('Update volatile configuration', () => {
  
  it('Update only one key (not nested)', () => {
    const fileToLoad = path.join(__dirname, './config/db.js');

    const valkiria = require(path.join(__dirname, '../'))(fileToLoad);
    const rawConfig = JSON.parse(JSON.stringify(require(fileToLoad)));

    expect(valkiria('host')).to.eq(rawConfig.host);
    // now lets modify host
    const newHostValue = '12.34.56.78';
    valkiria({'host': newHostValue});
    expect(valkiria('host')).to.eq(newHostValue);
  });

  it('Update only one key (nested)', () => {
    const fileToLoad = path.join(__dirname, './config/db.js');

    const valkiria = require(path.join(__dirname, '../'))(fileToLoad);
    const rawConfig = JSON.parse(JSON.stringify(require(fileToLoad)));

    expect(valkiria('credentials.user')).to.eq(rawConfig.credentials.user);
    // now lets modify the credentials
    const newUserValue = 'anotherTestUser';
    valkiria({'credentials.user': newUserValue});
    expect(valkiria('credentials.user')).to.eq(newUserValue);
  });

  it('Update entire object (not nested)', () => {
    const fileToLoad = path.join(__dirname, './config/db.js');

    const valkiria = require(path.join(__dirname, '../'))(fileToLoad);
    const rawConfig = JSON.parse(JSON.stringify(require(fileToLoad)));

    const valkiriaObj = valkiria();
    const rawObj = rawConfig;

    expect(JSON.stringify(valkiriaObj)).to.eq(JSON.stringify(rawObj));
    // now change some db settings
    const newHostValue = '11.22.33.44';
    const newPortValue = 3307;
    valkiria({
      host: newHostValue,
      port: newPortValue
    });
    expect(JSON.stringify(valkiria())).to.not.eq(JSON.stringify(rawObj));
    expect(valkiria('host')).to.eq(newHostValue);
    expect(valkiria('port')).to.eq(newPortValue);
  });
  
  it('Update entire object (nested)', () => {
    const pathToLoad = path.join(__dirname, './config');
    
    const valkiria = require(path.join(__dirname, '../'))(pathToLoad);
    const rawDbConfig = require(`${pathToLoad}${path.sep}/db`);
    const valkiriaDbObj = valkiria('db');


    expect(JSON.stringify(valkiriaDbObj)).to.eq(JSON.stringify(rawDbConfig));
    // now change some db settings
    const newHostValue = '11.22.33.44';
    const newPortValue = 3307;
    valkiria({
      'db.host': newHostValue,
      'db.port': newPortValue
    });
    expect(JSON.stringify(valkiria('db'))).to.not.eq(JSON.stringify(rawDbConfig));
    expect(valkiria('db.host')).to.eq(newHostValue);
    expect(valkiria('db.port')).to.eq(newPortValue);
  });

});