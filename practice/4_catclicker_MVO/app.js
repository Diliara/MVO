$(function () {

//model
    var model = {
        cats: [
            {
                name: "cat 1",
                clickCount: 0,
                img: "https://placekitten.com/g/200/300",
                visible: true
            },
            {
                name: "cat 2",
                clickCount: 0,
                img: "https://placekitten.com/g/200/301",
                visible: false

            },
            {
                name: "cat 3",
                clickCount: 0,
                img: "https://placekitten.com/g/201/301",
                visible: false
            }
        ]
    };


//controller
    var controller = {

        init: function () {


            catListView.init();
            catView.init();


        },


        getCats: function () {
            var cats = model.cats.filter(function (cat) {
                return cat;
            });
            return cats;

        },

        getVisibleCats: function () {
            var visibleCats = model.cats.filter(function (cat) {
                return cat.visible;
            });
            return visibleCats;
        },

        makeCatVisible: function () {
            catView.render();
        }



    }


//view for cat-view
    var catView = {
        init: function () {
            // grab elements and html for using in the render function
            this.$catView = $('.cat-view');
            this.catTemplate = $('script[data-template="cat-view"]').html();
            this.render();
        },

        render: function () {
            // Cache vars for use in forEach() callback (performance)
            var $catView = this.$catView,
                catTemplate = this.catTemplate;

            // Clear and render
            $catView.html('');
            controller.getVisibleCats().forEach(function (cat) {
                // Replace template markers with data
                var thisTemplate = catTemplate.replace(/{{name}}/g, cat.name).replace(/{{img}}/g, cat.img);
                $catView.append(thisTemplate);
            });
        }
    };


//view for cat-list
    var catListView = {
        init: function () {

            var showCatBtn = $('.show-cat');
            showCatBtn.click(function () {
                controller.makeCatVisible();
            });


            // grab elements and html for using in the render function
            this.$catControls = $('.cat-list');
            this.catControlsTemplate = $('script[data-template="cat-list"]').html();
            this.render();
        },

        render: function () {
            // Cache vars for use in forEach() callback (performance)
            var $catControls = this.$catControls,
                catControlsTemplate = this.catControlsTemplate;

            // Clear and render
            $catControls.html('');
            controller.getCats().forEach(function (cat) {
                // Replace template markers with data
                var thisTemplate = catControlsTemplate.replace(/{{name}}/g, cat.name);
                $catControls.append(thisTemplate);
            });
        }
    };

    controller.init();
});