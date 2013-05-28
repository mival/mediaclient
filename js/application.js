var SERVER_URL = 'http://mint-vmware:3000';

function display_table(data) {
    var out = '<table class="table">';
    $(data).each(function(index, item) {
        out += '<tr><td><a class="item" href="#" data-href="' + item.url + '">' + item.name + '</a><td></tr><tr class="hidden"><td></td></tr>';
    });
    $('#content').html(out + '</table>');
}

function load_data(url, handler) {
    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'application/json',
        //data: {format: 'json'},
        dataType: 'json',
        crossDomain: true,
        success: function(json) {
            handler(json);
        },
        error: function(e) {
            console.log(e);
        }
    });
}

function carousel_init(selector) {
    $(selector).jcarousel({
        animation: 0,
        wrap: 'circular',
        vertical: false
//        center: true
        // Uncomment the following option if you want items
        // which are outside the visible range to be removed
        // from the DOM.
        // Useful for carousels with MANY items.

        // itemVisibleOutCallback: {onAfterAnimation: function(carousel, item, i, state, evt) { carousel.remove(i); }},
        //itemLoadCallback: mycarousel_itemLoadCallback
    }).on('itemlastin.jcarousel', 'li', function(event, carousel) {
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
        console.log(this);
    });
}

function load_thumb(selector) {
    //load picture
    load_data(SERVER_URL + '/pictures.json', function(data) {
        //load picture items
        $(data).each(function(index, item) {
            $(selector).append('<li><img src="'+(SERVER_URL + item.file)+'"></img></li>');
        });
        carousel_init('#carousel');
    });
    
}

load_thumb('#carousel ul');
    
//$("#carousel").html('<ul>'+load_thumb()+'</ul>', function() {
//    carousel_init('#carousel');
//});
$(document).ready(function() {
	$('a[data-toggle="tab"]').on('shown', function(e) {
	    var target = $(e.target).attr('href');
	    console.log(target);
	    switch (target) {
	        case "#news":
	            break;
	        case "#movies":
	            load_data(SERVER_URL + '/movies.json', display_table);
	            break;
	        case "#musics":
	            load_data(SERVER_URL + '/musics.json', display_table);
	            break;
	        default:
	            console.log('aaaa');
	    }
	    //e.relatedTarget // previous tab
	});

	$('body').on('click', 'a.item', function(event) {
		var url = $(event.target).data('href');
		load_data(url, display_table);
	});	
});