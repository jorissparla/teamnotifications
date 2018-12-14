const { request } = require('graphql-request');

const query = `{
    employees {
      fullname
  }
}`;

const notifications = [
  [
    { team: 'TLS', region: 'EMEA', codes: ['Q1', 'Q'] },
    { team: 'LOG', region: 'EMEA', codes: ['RT1'] },
    { team: 'FIN', region: 'EMEA', codes: ['Q1', 'Q'] },
    { team: 'BI-dEPM', region: 'EMEA', codes: ['Q1', 'Q'] },
    { team: 'TECHSTACK', region: 'EMEA', codes: ['Q1', 'Q'] },
    { team: 'EAM', region: 'EMEA', codes: ['Q1E', 'QE'] }
  ],
  [
    { team: 'TLS', region: 'EMEA', codes: ['Q2', 'Q'] },
    { team: 'LOG', region: 'EMEA', codes: ['RT2'] },
    { team: 'FIN', region: 'EMEA', codes: ['Q2', 'Q'] },
    { team: 'BI-dEPM', region: 'EMEA', codes: ['Q2', 'Q'] },
    { team: 'TECHSTACK', region: 'EMEA', codes: ['Q2', 'Q'] },
    { team: 'EAM', region: 'EMEA', codes: ['Q2E', 'QE'] }
  ]
];

let mutation = `
mutation {
  sendTeamNotification(team:"TLS", region:"EMEA", codes:["Q2"]) {
    email
  }
}
`;
//request('http://nlbavwixs.infor.com:4000', mutation).then(data => console.log(data));
process.argv.forEach(function(val, index, array) {
  // console.log(index + ': ' + val);
});

const v = process.argv[2];
console.dir(notifications[v]);

function start() {
  const number = process.argv[2];
  //console.dir(notifications[v]);
  notifications[number].map(({ team, region, codes }) => {
    let codess = codes.map(code => `"${code}"`).join(',');
    let mutation = `
    mutation {
      sendTeamNotification(team:"${team}", region:"${region}", codes:[${codess}]) {
          email
      }
    }`;
    console.log(mutation, codess);
    request('http://nlbavwixs.infor.com:4000', mutation).then(data => console.log(data));
  });
}

start();
