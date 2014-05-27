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
                // else if onnly one parameter was passed it's a getter
                else if (arguments[1] === undefined) {

                    return this[i].style[property];

                } else { //setter
                    this[i].style[property] = value;
                }


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

            return miniQ(this[0].nextElementSibling);
        },

        //creates a miniQ object of this object previous sibling
        prev: function() {
            return miniQ(this[0].previousElementSibling);
        }

    };
}());