const bookList = [{
    name: "BOOK NAME ut eu sem integer vitae",
    genre: "XXX",
    status: "XXX",
    published: "XXX",
    word: "XXX"
},
{
    name: "BOOK NAME malesuada fames ac turpis egestas integer eget",
    genre: "XXX",
    status: "XXX",
    published: "XXX",
    word: "XXX"
},
{
    name: "BOOK NAME pharetra diam",
    genre: "XXX",
    status: "XXX",
    published: "XXX",
    word: "XXX"
},
{
    name: "THE ONE USER CHOOSE",
    genre: "Horror",
    status: "XXX",
    published: "XXX",
    word: "XXX"
},
{
    name: "BOOK NAME venenatis lectus magna fringilla",
    genre: "XXX",
    status: "XXX",
    published: "XXX",
    word: "XXX"
},
{
    name: "BOOK NAME in nibh",
    genre: "XXX",
    status: "XXX",
    published: "XXX",
    word: "XXX"
}]

var dls = document.querySelectorAll('dl:not(.select)');
var selected = document.querySelector('.select');
var list = document.querySelector('.list');

for (var i = 0; i < dls.length; i++) {
    dls[i].mark = false;
    select(i);
}
for (var j = 0; j < bookList.length; j++) {
        var book = document.createElement("div");
        book.className = 'book';
        book.innerHTML = bookList[j].name;
        list.appendChild(book);
        if(bookList[j].genre=='Horror'){
            book.onclick=function(){
                location.href='review.html'
            };
        }
}

function select(n) {
    var dds = dls[n].querySelectorAll('dd');
    var prev = null;
    var dd = null;

    for (var i = 0; i < dds.length; i++) {
        dds[i].onclick = function () {
            if (prev) {
                prev.className = '';
            }
            this.className = 'active';
            prev = this;

            var parent = this.parentNode;
            if (!parent.mark) {
                dd = document.createElement('dd');
                dd.innerHTML = this.innerHTML;
                selected.appendChild(dd);
                parent.mark = true;
            } else {
                dd.innerHTML = this.innerHTML;
            }

            var thisDd = this;
            var span = document.createElement('span');
            span.innerHTML = "X";
            span.onclick = function () {
                selected.removeChild(dd);
                parent.mark = false;
                thisDd.className = '';
            };

            dd.appendChild(span);


        };
    }
}


