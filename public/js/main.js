$(document).ready(function () {

    $.getJSON('/dictionary-api', printTerms);
    $('form').submit(function (e) {
        e.preventDefault();
        $.post('/dictionary-api', {term: $('#term').val(), defined: $('#defined').val()}, printTerms);
        this.reset();
    });

});

function printTerms(terms) {

    $('#term-list').empty();
    $.each(terms, function () {
        $('<dt>').text(this.term).appendTo('#term-list');
        $('<dd>').text(this.defined).appendTo('#term-list');
    });
    $('dt').off('dblclick').dblclick(function() {
        $.ajax({
            url: '/dictionary-api/' + $(this).text(),
            type: 'DELETE',
            success: printTerms
        });
    });

}
