$(document).ready(function(){
	$('input[type="submit"]').click(function() {
		// get the value of whatvever is in the search bar
		var something = document.getElementById("userinput").value;
		$(".container").empty();
		$("#userinput").val(" ");
		ajax(something);
	});
	$('.submitonenter').keydown(function(event) {
    // enter has keyCode = 13, change it if you want to use another button
    if (event.keyCode == 13) {
      this.form.submit();
      return false;
    }
  });
});

function build_wiki_search_url(pattern) {
    var base_url = "https://en.wikipedia.org/w/api.php";
    var format = "&format=json";
    var request_url = "?action=query&format=json&list=search&srsearch=";
    var url = base_url + request_url + pattern;
    return url;
}

function ajax (keyword) {
	$.ajax({
		// url:"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
		// data: {
			// action: 'query', 
	  //   	list: 'search', 
	  //   	srsearch: $('input[type="search"]').val(), 
	  //   	format: 'json',
	 //    	origin: 'https://www.mediawiki.org',
		// },
		url: build_wiki_search_url(keyword),
		method: "GET",
		// headers: { 
		// 	'Api-User-Agent': 'Example/1.0',
		// },
		// xhrFields: {
		// 	withCredentials: true
		// },
		// jsonp: "callback",
		dataType: 'jsonp',
		success: function (response){
			console.log(response)
			if (response.query.searchinfo.totalhits === 0) {
				alert("No results found! :(");
			}
			else {
				for (var i=0; i < response.query.search.length; i++) {
					var url = response.query.search[i].title.replace(/ /g,"_");
	    			$(".container").append("<div class='searchresult'>" + "<a href='https://en.wikipedia.org/wiki/" + url + "' target='_blank'>" + "<h2>" + response.query.search[i].title + "</h2>" + "</a>" + "<center>" + "<p>" + response.query.search[i].snippet + "..." + "</p>" + "</center>" + "</div>" + "<br>");
	    		}
			}
		}
	});
};