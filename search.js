var Query = {
  createQuery: function() {
    var query = $('#options').serialize();
    //console.log(query)
    return query;
  }
}

var Tab = {
  openTab: function() {
    var searchUrl = Url.createSearchUrl(Query.createQuery);
    var tabProperties = { url: searchUrl, active: true }
    chrome.tabs.create(tabProperties);
  }
}

var Url = {
  createSearchUrl: function(query) {
    var query = Query.createQuery(); 
    var baseUrl = getData($('#select-lang').val()).url + '/app/d?kw=' + $('#t').val() + '&utm_campaign=pict&utm_medium=chrome&utm_source=popup&';
    var searchUrl = baseUrl + query;
    return searchUrl;
  }
}

$(document).ready(function() {
  $('#options').submit(Tab.openTab);
});
