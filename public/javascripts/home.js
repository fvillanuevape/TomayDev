var URL_BASE=window.location.host;
var END_ON='/led/on'
var END_OFF='/led/off'

$(document).ready(function(){
    $('#b_on').click(function(){
        $.ajax({url: URL_BASE+END_ON,
            success: function(result){
                $("#data").html(result);
            }});
    });
});
$(document).ready(function(){
    $('#b_off').click(function(){
        $.ajax({url: URL_BASE+END_OFF,
            success: function(result){
                $("#data").html(result);
            }});
    });
});