import { COUNTRIES } from './countries-codes.js';

Template.countries.helpers({
    countries() {
        let countries = [];
        for (country in COUNTRIES) {
            countries.push({code: country, name: COUNTRIES[country]});
        }
        return countries;
    }
});
