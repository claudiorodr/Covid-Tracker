// var numeral = require('numeral');

'use strict';
$.ajax({
    type: "get",
    url: "http://127.0.0.1:3001/api/world/top",
    dataType: "json",
    success: function (response) {
        var country_confirmed = []
        for (let i = 0; i < response.info.length; i++) {
            var country = response.info[i].CountryCode
            var total = response.info[i].TotalConfirmed
            country_confirmed.push({
                [country]: total
            })
        }

        country_confirmed = Object.assign(...country_confirmed) 
        ! function (maps) {
                "use strict";
                var b = function () {};
                b.prototype.init = function () {
                    console.log(maps);
                    maps("#world-map-markers").vectorMap({
                        map: "world_mill_en",
                        series: {
                            regions: [{
                                values: country_confirmed,
                                scale: ['#C8EEFF', '#0071A4'],
                                normalizeFunction: 'polynomial'
                            }]
                        },
                        onRegionTipShow: function (e, el, code) {
                            el.html(el.html() + ' (Total - ' + numeral(country_confirmed[code]).format('0,0') + ')');
                        },
                        backgroundColor: "transparent"
                    })
                }, maps.VectorMap = new b, maps.VectorMap.Constructor = b
            }(window.jQuery),
            function (maps) {
                "use strict";
                maps.VectorMap.init()
            }(window.jQuery);
    }
});