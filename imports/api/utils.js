export const isAdmin = function() {
    const currentUser = Meteor.user();
    return "emails" in currentUser &&
        currentUser.emails[0].address == "alvydas@vitkauskas.lt"
};
