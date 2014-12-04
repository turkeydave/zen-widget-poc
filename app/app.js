define(['jquery', 'ractive', 'ractive-fade', 'rv!templates/template', 'rv!templates/modal', 'text!app/css/my-widget_embed.css', 'app/src/dataService'],
  function ($, Ractive, ractive_fade, mainTemplate, modalTemplate, css, dataService) {

    'use strict';
    var wod = {};



    var app = {
        init: function () {

            // put our css in our embedable
            var $style = $("<style></style>", {type: "text/css"});
            $style.text(css);
            $("head").append($style);

            // Create our Modal subclass
            var Modal = Ractive.extend({
                // by default, the modal should sit atop the <body>...
                el: document.body,

                // ...but it should append to it rather than overwriting its contents
                append: true,

                // all Modal instances will share a template (though you can override it
                // on a per-instance basis, if you really want to)
                template: modalTemplate,

                // the init function will be called as soon as the instance has
                // finished rendering
                init: function () {
                    var self = this, resizeHandler;

                    // store references to the background, and to the modal itself
                    // we'll assume we're in a modern browser and use querySelector
                    this.outer = this.find( '.modal-outer' );
                    this.modal = this.find( '.modal' );

                    // if the user taps on the background, close the modal
                    this.on( 'close', function ( event ) {
                        if ( !this.modal.contains( event.original.target ) ) {
                            this.teardown();
                        }
                    });

                    // when the window resizes, keep the modal horizontally and vertically centred
                    window.addEventListener( 'resize', resizeHandler = function () {
                        self.center();
                    }, false );

                    // clean up after ourselves later
                    this.on( 'teardown', function () {
                        window.removeEventListener( 'resize', resizeHandler );
                    }, false );

                    // manually call this.center() the first time
                    this.center();
                },

                center: function () {
                    var outerHeight, modalHeight, verticalSpace;

                    // horizontal centring is taken care of by CSS, but we need to
                    // vertically centre
                    outerHeight = this.outer.clientHeight;
                    modalHeight = this.modal.clientHeight;

                    verticalSpace = ( outerHeight - modalHeight ) / 2;

                    this.modal.style.top = verticalSpace + 'px';
                }
            });

            // render our main view
            this.ractive = new Ractive({
                el: 'myWidget',
                template: mainTemplate,
                data: {
                    wod: wod,
                    isAdminLoggedIn: false,
                    newImg: '',
                    newDesc: '',
                    newName: '',
                    newCount: 0,
                    newSets: 0,
                    categories: dataService.categories
                }
            });
//            this.ractive.on({
//                mwClick: function(ev) {
//                    ev.original.preventDefault();
//                    this.set('cnt', this.get('cnt') + 1);
//                    var that = this;
//                    $.ajax({
//                        url: "http://date.jsontest.com/",
//                        dataType: "jsonp"
//                    }).then(function(resp) {
//                        that.set("ts", resp.time);
//                    }, function(resp) {
//                        that.set("ts", "Something bad happened");
//                    });
//                }
//            });

            this.ractive.on({
                openPopup: function(ev) {
                    ev.original.preventDefault();
                    // We can now instantiate our modal
                    var basicModal = new Modal({
                        partials: {
                            modalContent: '<p>This is some important content!</p><a class="modal-button" on-click="okay">Okay</a>'
                        }
                    });

                    basicModal.on( 'okay', function () {
                        this.teardown();
                    });
                },
                remove: function ( event, index ) {
                    this.get('wod').activities.splice( index, 1 );
                },
                add: function ( event ) {
                    var img = this.get('newImg'),
                        desc = this.get('newDesc'),
                        count = this.get('newCount'),
                        sets = this.get('newSets');
                    if(img.length > 0 && desc.length > 0 && count > 0 && sets > 0){
                        var newItem = {
                            imgClass: img, desc:desc, count:count, sets:sets
                        };

                        // add to activities collection
                        this.get('wod').activities.push(newItem);

                        this.set('newImg', '');
                        this.set('newDesc', '');
                        this.set('newCount', 0);
                        this.set('newSets', 0);
                    }
                }
            });

            var that = this;
            dataService.getWODTest(function(data){
                console.log(data);
                that.ractive.set('wod', data);
            });



        } // init function
    };

    return app;

});