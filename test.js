const data = null;

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('GET', 'https://map-places.p.rapidapi.com/queryautocomplete/json?input=India&radius=0&language=English&location=India');
xhr.setRequestHeader('x-rapidapi-key', 'c927054b2cmsh7f61fa09ed846aap195e1ajsn5592c918c5c2');
xhr.setRequestHeader('x-rapidapi-host', 'map-places.p.rapidapi.com');

xhr.send(data);