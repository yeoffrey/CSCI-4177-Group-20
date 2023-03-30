import './Filter.css'
import BookSearch from "./bookSearch";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


export default function Filter() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    window.onload = function () {
        //This is an example of the book list
        // const bookList = [{
        //     name: "BOOK NAME ut eu sem integer vitae",
        //     genre: "XXX",
        //     status: "XXX",
        //     published: "XXX",
        //     word: "XXX"
        // },
        // {
        //     name: "BOOK NAME malesuada fames ac turpis egestas integer eget",
        //     genre: "XXX",
        //     status: "XXX",
        //     published: "XXX",
        //     word: "XXX"
        // },
        // {
        //     name: "BOOK NAME pharetra diam",
        //     genre: "XXX",
        //     status: "XXX",
        //     published: "XXX",
        //     word: "XXX"
        // },
        // {
        //     name: "THE ONE USER CHOOSE",
        //     genre: "Horror",
        //     status: "XXX",
        //     published: "XXX",
        //     word: "XXX"
        // },
        // {
        //     name: "BOOK NAME venenatis lectus magna fringilla",
        //     genre: "XXX",
        //     status: "XXX",
        //     published: "XXX",
        //     word: "XXX"
        // },
        // {
        //     name: "BOOK NAME in nibh",
        //     genre: "XXX",
        //     status: "XXX",
        //     published: "XXX",
        //     word: "XXX"
        // }]


        var dls = document.querySelectorAll('dl:not(.select)');
        var selected = document.querySelector('.select');
        // var list = document.querySelector('.list');

        //get each line of the filter
        for (var i = 0; i < dls.length; i++) {
            //mark each section false
            dls[i].mark = false;
            select(i);
        }
        // for (var j = 0; j < bookList.length; j++) {
        //         var book = document.createElement("div");
        //         book.className = 'book';
        //         book.innerHTML = bookList[j].name;
        //         list.appendChild(book);
        //         if(bookList[j].genre=='Horror'){
        //             book.onclick=function(){
        //                 location.href='review.html'
        //             };
        //         }
        // }

        //define a function when the section is selected
        function select(n) {
            //get each section in each line
            var dds = dls[n].querySelectorAll('dd');
            var prev = null;
            var dd = null;

            //when each section is clicked
            for (var i = 0; i < dds.length; i++) {
                dds[i].onclick = function () {
                    if (prev) {
                        prev.className = '';
                    }
                    //if there is no prev, mark it active and change the css style to red
                    this.className = 'active';
                    prev = this;

                    var parent = this.parentNode;
                    //if the line of section has not clicked before, create the child ele for the select line
                    if (!parent.mark) {
                        dd = document.createElement('dd');
                        dd.innerHTML = this.innerHTML;
                        selected.appendChild(dd);
                        parent.mark = true;
                    } else {
                        dd.innerHTML = this.innerHTML;
                    }

                    //create the delete button
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
    }

    return (
        <React.Fragment>
            <h1 style={{ textAlign: "center" }}>Home</h1>
            <main>
                <div id="box">
                    <dl>
                        <dt>Status: </dt>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                    </dl>
                    <dl>
                        <dt>Genre: </dt>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                        <dd>Horror</dd>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                    </dl>
                    <dl>
                        <dt>Word: </dt>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                    </dl>
                    <dl>
                        <dt>Time Published: </dt>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                        <dd>XXX</dd>
                    </dl>
                    <dl className="select">
                        <dt>Selected: </dt>
                    </dl>

                </div>
                <div className="list">
                </div>
            </main>
            <BookSearch />
        </React.Fragment>

    )
}
