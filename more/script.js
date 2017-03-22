$(document).ready( function() {

    $('.sl-pager').on('click','.sl-more',function () {
        var action = $(this).data("url"),
            currentPage = $('.sl-more').data('current'),
            maxPage = $('.sl-more').data('max-page');

        $.ajax({
            type: "GET",
            url: action,
            dataType: "json",
            success: function(data){
                $('.sl-wrapper').append(data["content_html"]);

                if( maxPage == currentPage){
                    $('.sl-more').remove();
                }else {
                    $('.sl-pager *').remove();
                    $('.sl-pager').append(data["pager_html"]);
                }
            }
        });

    })
});