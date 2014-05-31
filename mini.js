var miniQ, _;

(function() {
    miniQ = _ = function(target) {
        return new MiniQ(target);
    };

    var MiniQ = function(target) {
        // checks if parameter passed is an html object
        if (typeof target == 'object') {
            // checks object attributes
            for (var key in target.attributes) {
                //if it has an id uses it to create a miniQ object
                if (target.attributes[key]['localName'] == 'id') {
                    var id = '#' + target.attributes[key]['value'];
                    return miniQ(id);
                    // else if it has a class uses it to create a miniQ object of the first class item (not working yet)
                } else if (target.attributes[key]['localName'] == 'class') {
                    var cls = '.' + target.attributes[key]['value'];
                    return miniQ(cls)[0];
                    //else uses it's tag to create a miniQ object of the first element (not working yet)
                } else {
                    var tag = target.localName;
                    return miniQ(tag)[0];
                }
            }
            // Else creates a new miniQ object
        } else {
            // checks if string defines a class
            if (target[0] == '.') {
                var selector = document.getElementsByClassName(target.slice(1));
                for (var i = 0; i < selector.length; i++) {
                    this[i] = selector[i];
                }
                this.length = selector.length;
                return this;
                // checks if string defines an id
            } else if (target[0] == '#') {
                var selector = document.getElementById(target.slice(1));
                this.length = 1;
                this[0] = selector;
                return this;
                // checks if string defines a tag
            } else {
                var selector = document.getElementsByTagName(target);
                for (var i = 0; i < selector.length; i++) {
                    this[i] = selector[i];

                }
                this.length = selector.length;
                return this;
            }
        }
    };

    //search or parse function
    //will help to find any Id or class selector inside a next or prev object

    MiniQ.prototype = {

        //methodes

        // Accepts any css property in i'ts JS form. it accepts one property and it's value 
        // as parameters or it takes a JSON object with any amount of properties and values.
        // if just one parameter is passed it asumes it's a css property whose value we need to retrieve.

        css: function(property, value) {

            for (var i = 0; i < this.length; i++) {
                // checks if it's a JSON object
                if (typeof arguments[0] == 'object') {

                    for (var propiedad in arguments[0]) {
                        console.log(propiedad, arguments[0][propiedad]);
                        this[i].style[propiedad] = arguments[0][propiedad];
                    }
                }
                // else if only one parameter was passed it's a getter
                else if (arguments[1] === undefined) {

                    return this[i].getComputedStyle[property];

                } else { //setter
                    this[i].style[property] = value;
                }


            }
            return this;
        },

        // hides the element with display none
        hide: function() {
            for (var i = 0; i < this.length; i++) {
                this[i].style.display = 'none';
            }
            return this;
        },
        show: function() {
            for (var i = 0; i < this.length; i++) {
                this[i].style.display = '';
            }
            return this;
        },
        // adds any attribute passed to the attributes object with it's correspondant value,
        // it accepts two parameters as an atributte and it's new value, or a JSON object with many
        // attributes and values to set. If only one parameter is passed and it's not a JSON object
        // it asumes it's an attribute which value is going to be retrieved.

        attr: function(attribute, value) {

            for (var i = 0; i < this.length; i++) {
                // json setter
                if (typeof arguments[0] == 'object') {

                    for (var propiedad in arguments[0]) {

                        this[i].setAttribute(propiedad, arguments[0][propiedad]);
                    }
                }
                // getter
                else if (arguments[1] == undefined) {
                    return this[i].getAttribute(attribute);
                }
                // setter
                else {
                    this[i].setAttribute(attribute, value);
                }


            }
            return this;
        },

        // creates a miniQ object of this object next sibling
        next: function() {
            var next = this[0].nextElementSibling;
            next.prototype = miniQ.prototype;
            return miniQ(this[0].nextElementSibling);
        },

        //creates a miniQ object of this object previous sibling
        prev: function() {
            return miniQ(this[0].previousElementSibling);
        },

        // adds element passed as a child of the targetet element
        append: function(element) {
            for (var i = 0; i < this.length; i++) {
                this[i].appendChild(element);
            }
            return this;
        },
        // prepends an element to every passed elements
        prepend: function(element) {
            for (var i = 0; i < this.length; i++) {
                this[i].insertBefore(element, this[i].firstChild);
            }
            return this;
        },
        //removes element
        remove: function() {
            for (var i = 0; i < this.length; i++) {
                this[i].parentNode.removeChild(this[i]);
            }
            return this;
        },

        // returns all elements of the matching tag, class or id without miniQ properties
        find: function(element) {
            return document.querySelectorall(element);
        },
        // returns an array of iner HTML of the selected elements
        inner: function() {
            var items = [];
            for (var i = 0; i < this.length; i++) {
                items.push(this[i].innerHTML);
            }
            return items;
        },
        // returns an array of the text contained in the selected elements
        text: function(text) {
            if (arguments.length == 0) {
                var items = [];
                for (var i = 0; i < this.length; i++) {
                    items.push(this[i].textContent);
                }
                return items;
            } else {
                for (var i = 0; i < this.length; i++) {
                    this[i].textContent = text;
                }
            }

        },
        //returns true is both elements are the same
        same: function(toMatch) {
            return this[0] === toMatch;
        },
        // returns  parent
        parent: function() {

            return this[0].parentNode;
        },
        //returns top and left offset positions
        position: function() {
            var items = [];
            for (var i = 0; i < this.length; i++) {
                items.push({
                    left: this[i].offsetLeft,
                    top: this[i].offsetTop
                });
            }
            return items;
        },
        // remove event
        removeEvt: function(event, handler) {
            for (var i = 0; i < this.length; i++) {
                this[i].removeEventListener(event, handler);
            }
        },
        //add event
        addEvt: function(event, handler) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener(event, handler);
            }
        },
        // binds itself to a form element by it's ID
        // sending it's post data to a specified route
        // takes a handler for the responseText and 
        // a 4th parameter for async conection, it defaults to true.
        POST: function(element, route, handler, async) {
            var xhr = new XMLHttpRequest();
            formData = new FormData(document.getElementById(element));
            xhr.addEventListener('load', function() {
                if (handler) {
                    handler(xhr.responseText);
                }
            });
            if (!async) {
                var async = true;
            }
            xhr.open('POST', route, async);
            xhr.send(formData);
        },
        GET: function(element, route, handler, async) {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', function() {
                if (handler) {
                    handler(xhr.responseText);
                }
            });
            if (!async) {
                var async = true;
            }
            xhr.open('GET', route, async);
            xhr.send();
        }




    };
})();