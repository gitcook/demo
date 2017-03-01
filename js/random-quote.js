$(document).ready(function(){
    getQuote();
    $('#new-quote').on('click', getQuote);
});

function getQuote() {
    $.ajax({
        url: 'http://www.quotzzy.co/api/quote',
        success: function(response) {
            var text = response.text;
            var author = response.author.name;
            $('#text').html(text);
            $('#author').html(author);
        }
    });
}