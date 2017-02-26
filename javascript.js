$(document).ready(function(){
        $('input[type="submit"]').click(function() {
        	function ajax(keyword) {
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
                data: { 
                	action: 'query', 
                	list: 'search', 
                	srsearch: $('input[type="search"]').val(), 
                	format: 'json' 
                },
                datatype: 'json',
                success: function (response) {
                	console.log(response.query);
                	if (response.query.searchinfo.totalhits === 0) {
                		alert("No results found!")
                	}
                	else {
                		for (var i=0; i < response.search.length; i++) {
                			$(".container").append("<div class='searchresult'>"+ i +"</div>")
                		}
                	}
                }
            });
        };
    };  	
});