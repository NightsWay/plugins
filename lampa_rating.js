(function () {
  'use strict';

  function cubRating(rateCub, render, e) {
    if (!e.object || !e.object.source || !(e.object.source === 'cub' || e.object.source === 'tmdb')) return;
    var isTv = !!e.object && !!e.object.method && e.object.method === 'tv';
    var minCnt = 20;
    var reactionCoef = {
      fire: 10,
      nice: 7.5,
      think: 5,
      bore: 2.5,
      shit: 0
    };
    var reactionCnt = {};
    var coef = 0, sum = 0, cnt = 0, title = 'undefined', tmdbId = 0;

    if (e.data) {
      if (e.data.movie) {
        var movie = e.data.movie;
        tmdbId = movie.id || 0;
        title = movie.title || movie.name || movie.original_title || movie.original_name || '';
      }
      if (e.data.reactions && e.data.reactions.result) {
        var reactions = e.data.reactions.result;
        for (var i = 0; i < reactions.length; i++) {
          coef = reactionCoef[reactions[i].type];
          if (reactions[i].counter) {
            sum += reactions[i].counter * coef;
            cnt += reactions[i].counter * 1;
            reactionCnt[reactions[i].type] = reactions[i].counter * 1;
          }
        }
      }
    }

    if (cnt >= minCnt) {
      var avg_rating = isTv ? 7.436 : 6.584;
      var m = isTv ? 69 : 274;
      var cub_rating = ((avg_rating * m + sum) / (m + cnt));
      var cub_rating_text = cub_rating.toFixed(1).replace('10.0', '10');

      var div = rateCub.removeClass('hide').find('> div');
      div.eq(0).text(cub_rating_text);
      div.eq(1).html('');

      console.log('LAMPA Rating',
        (isTv ? 'tv' : '') + tmdbId + ' "' + title + '"',
        'rating:', cub_rating.toFixed(3) * 1,
        'avg:', (sum / cnt).toFixed(3) * 1,
        'cnt:', cnt,
        reactionCnt
      );
    }
  }

  function startPlugin() {
    window.lampa_rating_plugin = true;
    Lampa.Listener.follow('full', function (e) {
      if (e.type === 'complite') {
        var render = e.object.activity.render();
        var rateCub = $('.rate--cub', render);

        if (rateCub.length === 0) {
          $('.rate--kp', render).after(`
            <div class="full-start__rate rate--cub hide">
              <div></div>
              <div></div>
              <div style="padding-left: 0.4em;">LAMPA</div>
            </div>
          `);
          rateCub = $('.rate--cub', render);
        }

        if (rateCub.hasClass('hide')) {
          cubRating(rateCub, render, e);
        }
      }
    });
  }

  if (!window.lampa_rating_plugin) startPlugin();
})();
