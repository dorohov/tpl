var url = window.location.pathname;
//var url = window.location.href;
$('.navbar__nav a[href="'+url+'"]').parent().addClass('is--active'); 
$('.navbar-aside__nav a[href="'+url+'"]').parent().addClass('is--active'); 
$('.tabs__nav a[href="'+url+'"]').parent().addClass('is--active'); 
$('[data-azbn-toggle="dropdown"]').on('click', function(e) {
	$(".azbn-dropdown").toggleClass('open');
});	
$('.navbar-aside__dropdown [data-toggle="dropdown"]').on('click', function(e) {
	e.preventDefault();
	e.stopPropagation();
	$(this).parent().siblings().removeClass('open');
	$(this).parent().toggleClass('open');
});
$('.azbn__search-dropdown').on('shown.bs.dropdown', function(e) {
	$('.azbn__search-input').focus();
});