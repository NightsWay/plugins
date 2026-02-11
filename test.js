(function () {
    console.log('[Lampa] Plugin loaded');

    function waitLampa(cb) {
        if (window.Lampa && Lampa.Account && Lampa.Ads) {
            cb();
        } else {
            setTimeout(() => waitLampa(cb), 300);
        }
    }

    waitLampa(() => {
        // Премиум
        const origPremium = Lampa.Account.hasPremium;
        Lampa.Account.hasPremium = function () {
            return true;
        };
        console.log('[Lampa] Premium forced');

        // Реклама
        Lampa.Ads.show = function () {
            console.log('[Lampa] Ads blocked');
        };
        Lampa.Ads.init = function () {};
    });
})();
