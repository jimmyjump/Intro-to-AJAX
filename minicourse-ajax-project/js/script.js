
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=1200x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');



    // New York Times AJAX request
    var NYT_API_KEY = 'eed785fb38e140c2b491faab3e26e83f';
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +
                      cityStr +
                      '&sort=newest&api-key=eed785fb38e140c2b491faab3e26e83f';
    $.getJSON(nytimesUrl, function(data) {

      $nytHeaderElem.text('New York Times articles about ' + cityStr);

      articles = data.response.docs;
      for(var i = 0; i < articles.length; i++) {
        var article = articles[i];
        $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
      }

    }).error(function(error) {
      $nytHeaderElem.text('New York Times Articles cannot be loaded');
    });





    return false;
};


$('#form-container').submit(loadData);
