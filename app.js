const streamCSV = require('./lib/util/csv-stream.js');
const Loan = require('./lib/loan.js');
const Repo = require('./repository.js');
const ServiceLoan = require('./lib/serviceLoan.js');
const createCSV = require('./lib/util/write_csv.js');

function writeResult(assignResult, yieldResult) {
  const assignmentFields = ['loan_id', 'facility_id'];
  const yieldFields = ['facility_id', 'expected_yield'];

  try {
    createCSV(assignmentFields, assignResult, './out/assignments.csv');
    createCSV(yieldFields, yieldResult, './out/yields.csv');
    console.log('Please check the "out" directory for the result files!');
  } catch(e) {
    console.error('WRITE FAILED');
  }
}

async function balanceTheBooks(dataSet) {
  const repo = new Repo(dataSet);
  const assignmentFields = ['loan_id', 'facility_id'];
  const yieldFields = ['facility_id', 'expected_yield'];
  let assignmentData = [];
  await repo.getBanks();
  await repo.getFacilities();
  await repo.getCovenants();
  var csv_stream = streamCSV(`./data/${dataSet}/loans.csv`);

  for(var loanRecord of csv_stream) {
    var assignResult = {};
    loanRecord = await loanRecord;
    var Service = new ServiceLoan(loanRecord, repo);
    var match = Service.serviceLoan();
    var yieldData = Service.getFacilityYield();
    assignResult.loan_id = match.id;
    assignResult.facility_id = match.facility.id;
    assignmentData.push(assignResult);
  }
  writeResult(assignmentData, yieldData);
}

if(require.main === module) {
  const data = process.argv[2].toString();
  if(data != 'small' && data != 'large') {
    console.log('WRONG PARAMETERS ---> please enter either "small" or "large" as the parameter');
    process.exit(0);
  } else {
    balanceTheBooks(data);
  }
}
