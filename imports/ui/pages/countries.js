const countryList = require('country-list')();

Template.countries.helpers({
  countries() {
    return countryList.getData();
  },
});
