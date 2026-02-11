(function () {
    console.log('[Lampa] Ads block lite');

    // Глушим только video-рекламу
    const origCreate = document.createElement;
    document.createElement = function (tag) {
        const el = origCreate.call(this, tag);

        if (tag === 'video') {
            el.play = function () {
                el.dispatchEvent(new Event('ended'));
                return Promise.resolve();
            };
        }
        return el;
    };
})();
