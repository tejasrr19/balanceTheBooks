const _ = require('underscore');

/**
 * Class to handle all loan servicing
 */
class ServiceLoan {
  constructor(loan, repository) {
    this.repository = repository;
    this.loan = loan;
  }

  serviceLoan() {
    try {
      const covenants = this.findCovenants(this.loan);
      const facilities = this.findFacilities(covenants);
      const filterFacilities = this.getFilterFacilities(facilities, this.loan);
      const match = this.findMatch(filterFacilities, this.loan);
      return match;
    } catch(e) {
      console.error('Exception --->', e);
    }
  }

  findCovenants(loan) {
    return _.filter(this.repository.covenants, (c) => {
      return c.banned_state !== loan.state && c.max_default_likelihood >= loan.default_likelihood;
    });
  }

  findFacilities(covenants) {
    const matchingfacilities = [];
    for(var i=0; i<covenants.length; i++) {
      matchingfacilities.push(this.repository.facilitiesDict[covenants[i].facility_id]);
    }
    return matchingfacilities;
  }

  getFilterFacilities(facilities, loan) {
    return _.filter(facilities, (facility) => {
      return (facility.amount - facility.committed) >= loan.amount;
    });
  }

  findMatch(facilities, loan) {
    let bestMatchYield = 0;

    let bestMatchFacility = null;

    for(var i=0; i<facilities.length; i++) {
      var loanYield = this.getYield(facilities[i], loan);
      if(bestMatchYield < loanYield) {
        bestMatchYield = loanYield;
        bestMatchFacility = facilities[i];
      }
    }
    if(bestMatchYield > 0) {
      this.repository.facilitiesDict.committed += loan.amount;
      bestMatchFacility._yield += bestMatchYield;
      loan.facility = bestMatchFacility;
    }
    return loan;
  }

  getYield(facility, loan) {
    return (1 - loan.default_likelihood) * loan.interest_rate * loan.amount - loan.default_likelihood * loan.amount - facility.interest_rate * loan.amount;
  }

  getFacilityYield() {
    let yieldData = [];
    _.each(this.repository.facilitiesDict, (facility) => {
      var yieldResult = {};
      yieldResult.facility_id = facility.id;
      yieldResult.expected_yield = Math.floor(facility._yield);
      yieldData.push(yieldResult);
    });
    return yieldData;
  }
}

module.exports = ServiceLoan;
