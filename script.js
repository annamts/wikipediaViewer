function getResults() {
    var search = document.getElementById("input").value;
    document.getElementById("input").value = "";
    if (search != "") {
        $("#results").html("");
        getId(search);   
    }
}

function getId(search) {
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=" + search, function(json) {
            json.query.search.forEach( function(element) {
                var id = element.pageid.toString();
                getInfo(id);                
            });
    });

}

function getInfo(id) {
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&prop=info|extracts&exintro&explaintext&exchars=300&exlimit=max&pageids=" + id + "&inprop=url&format=json&origin=*", function(json) {
        var link = json.query.pages[id].fullurl;
        var title = json.query.pages[id].title;
        var extract = json.query.pages[id].extract;
        $("#results").append('<div class="result"><a href='+ link +' target="_blank" class="link">' + title + '</a><p class="extract">' + extract + '</p></div>');
    });
}