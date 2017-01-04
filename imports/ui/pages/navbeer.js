(function($) {

    $.fn.navBeer = function () {

        // self = this;

        // console.log("non-collapse:", jQuery('.navbeer-non-collapse', this));
        // console.log("non-collapse:", jQuery('#login-name-link', this));
        // console.log("menu:", jQuery('.navbeer-menu', this));
        // console.log("brand:", jQuery('.navbeer-brand', this));

        var
            navBeerSandwich = jQuery('.navbeer-sandwich', this),
            // navBeerNonCollapse = jQuery('.navbeer-non-collapse', this),
            navBeerNonCollapse = document.getElementById('non-collapse');
            navBeerBrand = jQuery('.navbeer-brand', this),
            navBeerBrandWidth = 150,
            navBeerMenu = jQuery('.navbeer-menu', this),
            navBeerMenuWidth = 250,
            navBeerNonCollapseWidth = 230,
            menuWidthCompensation = 50, // Try change this if the navbar is collapsing too early or too late.
            navBeerWidth = navBeerBrandWidth + navBeerMenuWidth + navBeerNonCollapseWidth + menuWidthCompensation,
            navBeerFit = navBeerBrandWidth + navBeerNonCollapseWidth + menuWidthCompensation,
            navBeerCollapse = function () {

                // console.log("non-collapse:", navBeerNonCollapse);
                // console.log("menu:", navBeerMenu);
                // console.log("brand:", navBeerBrand);
                // console.log("width:", navBeerWidth);
                // console.log("fit:", navBeerFit);
                // console.log("widow:", jQuery(window).width());

                if (jQuery(window).width() < navBeerWidth) {
                    // Hide Brand if does not fit
                    if (jQuery(window).width() < navBeerFit) {
                        navBeerBrand.hide();
                    } else {
                        navBeerBrand.show();
                    }
                    // Get the navbar items and put them into the sandwich menu.
                    navBeerMenu
                        .find('.navbeer-collapsable-item')
                        .appendTo(navBeerSandwich.find('.navbeer-sandwich-content'));
                    navBeerSandwich.show();
                } else {
                    // Give the items back to the navbar.
                    navBeerSandwich
                        .hide()
                        .find('.navbeer-collapsable-item ')
                        .prependTo(navBeerMenu);
                    navBeerBrand.show();
                    navBeerMenu.show();
                }
            }
        ;

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                console.log(mutation.type);
            });
            console.log("in observer");
            navBeerCollapse();
        });

        // configuration of the observer:
        var config = { subtree: true, characterData: true };

        // pass in the target node, as well as the observer options
        observer.observe(navBeerNonCollapse, config);

        // Check to collapse on page load.
        navBeerCollapse();
        // ...or when window resize.
        jQuery(window).on('resize', function(){
            navBeerCollapse();
        });
    };

}(jQuery));
