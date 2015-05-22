$(function () {

//model
    var model = {
        currentCat: null,
        cats: [
            {
                name: "Alfa",
                clickCount: 0,
                img: "https://placekitten.com/g/200/300",
                visible: true
            },
            {
                name: "Betta",
                clickCount: 0,
                img: "https://placekitten.com/g/200/301",
                visible: false

            },
            {
                name: "Gamma",
                clickCount: 0,
                img: "https://placekitten.com/g/201/301",
                visible: false
            }
        ]
    };


//controller
    var controller = {

        init: function () {

            //set current cat to the first one in the list
            model.currentCat = model.cats[0];

            catListView.init();
            catView.init();
        },

        getCurrentCat: function () {
            return model.currentCat;
        },

        getCats: function () {
            return model.cats;
        },

        //set the currently-selected cat to the object we passed in
        setCurrentCat: function (cat) {
            model.currentCat = cat;
        },

        incrementCounter: function () {
            model.currentCat.clickCount++;
            catView.render();
        }


    }


//view for cat-view
    var catView = {
        init: function () {

            // grab elements and html for using in the render function
            this.$catView = $('#cat-view');
            this.$catClickMe = $("#cat-click-me");

            this.catTemplate = $('script[data-template="cat-view"]').html();

            //on click, increment the current cat's counter
            this.$catClickMe.click(function () {
                controller.incrementCounter();
            });

            //render
            this.render();
        },

        render: function () {
            // Cache vars for use in forEach() callback (performance)
            var $catView = this.$catView,
                currentCat = controller.getCurrentCat(),
                catTemplate = this.catTemplate;

            // $catView.html('');

            // Replace template markers with data
            var thisTemplate = catTemplate.replace(/{{name}}/g, currentCat.name).replace(/{{img}}/g, currentCat.img).replace(/{{clickCount}}/g, currentCat.clickCount);
            $catView.append(thisTemplate);

        }
    };


//view for cat-list
    var catListView = {
        init: function () {
            // grab elements and html for using in the render function
            this.$catControls = $('#cat-list');
            this.catControlsTemplate = $('script[data-template="cat-list"]').html();
            this.render();
        },

        render: function () {
            // Cache vars for use in forEach() callback (performance)
            var $catControls = this.$catControls,
                catControlsTemplate = this.catControlsTemplate;

            // render
            controller.getCats().forEach(function (cat) {
                // Replace template markers with data
                var thisTemplate = catControlsTemplate.replace(/{{name}}/g, cat.name);
                $catControls.append(thisTemplate);
            });

            this.renderNewCat();


        },

        renderNewCat: function () {
            this.$renderThisCat = $('.render-this-cat');
            var $renderThisCat = this.$renderThisCat;

            /*
             $renderThisCat.click(function(){
             return function(){
             controller.setCurrentCat(cat);
             catView.render();
             }
             })(cat);
             */


            $renderThisCat.on('click', function () {
                console.log("render this cat " + $renderThisCat.text());
               /* controller.setCurrentCat(cat); */
                catView.render();
            });

        }
    };

    controller.init();
});