//Sample Class
class Circle {
    constructor(radius) {
        this.radius = radius;
        Circle.circlesMade++;
    };

    static draw(circle, canvas) {
        // Canvas drawing code
    };

    static get circlesMade() {
        return !this._count ? 0 : this._count;
    };
    static set circlesMade(val) {
        this._count = val;
    };

    area() {
        return Math.pow(this.radius, 2) * Math.PI;
    };

    get radius() {
        return this._radius;
    };
    set radius(radius) {
        if (!Number.isInteger(radius))
            throw new Error("Circle radius must be an integer.");
        this._radius = radius;
    };
}


//Sample Simple Loader
var load = (function() {
  // Function which returns a function: https://davidwalsh.name/javascript-functions
  function _load(tag) {
    return function(url) {
      // This promise will be used by Promise.all to determine success or failure
      return new Promise(function(resolve, reject) {
        var element = document.createElement(tag);
        var parent = 'body';

        // Important success and error for the promise
        element.onload = function() {
          resolve(url);
        };
        element.onerror = function() {
          reject(url);
        };

        // Need to set different attributes depending on tag type
        switch(tag) {
          case 'img':
            element.src = url;
            break;
          case 'script':
            element.async = true;
            element.src = url;
            break;
          case 'link':
            element.type = 'text/css';
            element.rel = 'stylesheet';
            element.href = url;
            parent = 'head';
        }

        // Inject into document to kick off loading
        document[parent].appendChild(element);
      });
    };
  }
  
  return {
    css: _load('link'),
    js: _load('script'),
    img: _load('img')
  }
})();

// Usage:  Load different file types with one callback
Promise.all([
    load.js('lib/highlighter.js'), 
    load.js('lib/main.js'), 
    load.css('lib/highlighter.css'),
    load.img('images/logo.png')
  ]).then(function() {
    console.log('Everything has loaded!');
  }).catch(function() {
    console.log('Oh no, epic failure!');
  });
  
  
  

//Sample Fetch Statement to be used instead of older ajax XMLHTTPblahblah
// Simple response handling
fetch('/some/url').then(function(response) {
	
}).catch(function(err) {
	// Error :(
});

// Chaining for more "advanced" handling
fetch('/some/url').then(function(response) {
	return //...
}).then(function(returnedValue) {
	// ...
}).catch(function(err) {
	// Error :(
});

more in https://davidwalsh.name/fetch
