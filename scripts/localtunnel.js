const localtunnel = require('localtunnel');

(async () => {
  console.log('---- Localtunnel: localtunnel...');
  const tunnel = await localtunnel({ port: 3000 });
  console.log('---- Localtunnel: started at: ', tunnel.url);
  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  tunnel.url;
  tunnel.on('close', () => console.log('---- Localtunnel: tunnel closed'));
})();
