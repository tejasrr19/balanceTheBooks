const streamCSV = require('./lib/util/csv-stream.js');

/**
 * Class to read and manage all bank, facility and covenant data
 */

class Repository {
  constructor(dataSet) {
    this.dataSet = dataSet;
  }

  /**
   * async getBanks - read banks from CSV
   *
   * @return {type}
   */
  async getBanks() {
    var bankStream = streamCSV(`./data/${this.dataSet}/banks.csv`);
    this.banks = [];
    for(var bank of bankStream) {
      bank = await bank;
      this.banks.push(bank);
    }
  }

  /**
   * async getFacilities - read facilities from CSV
   *
   * @return {type}  description
   */
  async getFacilities() {
    var facilitesStream = streamCSV(`./data/${this.dataSet}/facilities.csv`);
    this.facilitiesDict = {};
    for(var facility of facilitesStream) {
      facility = await facility;
      this.facilitiesDict[facility.id] = {
        id: facility.id,
        amount: facility.amount,
        interest_rate: facility.interest_rate,
        bank_id: facility.bank_id,
        committed: 0,
        _yield: 0
      };
    }
  }

  /**
   * async getCovenants - read covenants from CSV
   *
   * @return {type}  description
   */
  async getCovenants() {
    var covenantStream = streamCSV(`./data/${this.dataSet}/covenants.csv`);
    this.covenants = [];
    for(var covenant of covenantStream) {
      covenant = await covenant;
      this.covenants.push(covenant);
    }
  }
}

module.exports = Repository;
