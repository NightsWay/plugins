(function () {
    console.log('[Lampa] Ads killer stable');

    /* 1. CSS — прячем всё рекламное */
    const style = document.createElement('style');
    style.textContent = `
        .ads,
        .advertising,
        .ad-overlay,
        .ad-layer,
        .ads-video,
        .ads__video,
        .ads__wrapper,
        .player-ads,
        .player__ads,
        .player__overlay,
        [class*="ads"],
        [id*="ads"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }
    `;
    document.documentElement.appendChild(style);

    /* 2. Удаляем рекламу из DOM сразу при появлении */
    const nukeAds = () => {
        document.querySelectorAll(
            '.ads, .advertising, .ad-overlay, .ad-layer, .player-ads, .player__ads'
        ).forEach(el => el.remove());
    };

    new MutationObserver(nukeAds).observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    /* 3. Глушим video-рекламу (чтобы Lampa сразу шла дальше) */
    const origCreate = document.createElement;
    document.createElement = function (tag) {
        const el = origCreate.call(this, tag);

        if (tag === 'video') {
            el.play = function () {
                el.dispatchEvent(new Event('ended'));
                el.dispatchEvent(new Event('timeupdate'));
                return Promise.resolve();
            };
        }
        return el;
    };

    /* 4. Форсируем "реклама уже была" */
    window.__lampaAdsDisabled = true;
})();
