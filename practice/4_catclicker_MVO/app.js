$(function () {

    //model
    var model = {
        currentCat: null,
        cats: [
            {
                name: "Alfa",
                clickCount: 0,
                img: "https://placekitten.com/g/200/300",
                visible: true,
                id: "cat1"
            },
            {
                name: "Betta",
                clickCount: 0,
                img: "https://placekitten.com/g/200/301",
                visible: false,
                id: "cat2"
            },
            {
                name: "Gamma",
                clickCount: 0,
                img: "https://placekitten.com/g/201/301",
                visible: false,
                id: "cat3"
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

            $catView.html('');

            // Replace template markers with data
            var thisTemplate = catTemplate.replace(/{{name}}/g, currentCat.name).replace(/{{img}}/g, currentCat.img).replace(/{{clickCount}}/g, currentCat.clickCount);

            $catView.append(thisTemplate);

            var $catClickMe = $("#cat-click-me");

            $catClickMe.on('click', function(){
              controller.incrementCounter();
            });



        }
    };


    //view for cat-list
    var catListView = {
        init: function () {
            // grab elements and html for using in the render function
            this.$catList = $('#cat-list');
            this.catControlsTemplate = $('script[data-template="cat-list"]').html();
            this.render();
        },

        render: function () {
            // Cache vars for use in forEach() callback (performance)
            var cats = controller.getCats(),
                $catList = this.$catList,
                catControlsTemplate = this.catControlsTemplate;

            // loop over the cats
            for (var i = 0; i < cats.length; i++) {
                //this is a cat we are currently looping over
                var cat = cats[i];
                // Replace template markers with data
                var thisTemplate = catControlsTemplate.replace(/{{name}}/g, cat.name).replace(/{{id}}/g, cat.id);

                //template needs to be populated first for us to use $thisCat DOM element
                $catList.append(thisTemplate);

                var $thisCat = $("#" + cat.id);

                $thisCat.on('click', (function (cat) {
                    //closure-in-a-loop for adding event listeners inside a for loop
                    return function () {
                        controller.setCurrentCat(cat);
                        catView.render();
                    };
                })(cat));
            }
        }
    };

    controller.init();
});