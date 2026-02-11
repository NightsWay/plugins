(function () {
    console.log('[Lampa] Ads block clean');

    /* 1. Убираем баннеры и рекламные оверлеи */
    const style = document.createElement('style');
    style.textContent = `
        .ads,
        .advertising,
        .ad-overlay,
        .ad-layer,
        .ads-video,
        .ads__video,
        .ads__wrapper,
        [class*="ads"],
        [id*="ads"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
        }
    `;
    document.head.appendChild(style);

    /* 2. Глушим video-рекламу */
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
