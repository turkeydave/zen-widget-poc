define(['jquery', 'ractive', 'ractive-fade', 'rv!templates/template', 'rv!templates/modal', 'text!app/css/my-widget_embed.css'],
  function ($, Ractive, ractive_fade, mainTemplate, modalTemplate, css) {

    'use strict';

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
                    cnt: 0,
                    ts: 'never'
                }
            });
            this.ractive.on({
                mwClick: function(ev) {
                    ev.original.preventDefault();
                    this.set('cnt', this.get('cnt') + 1);
                    var that = this;
                    $.ajax({
                        url: "http://date.jsontest.com/",
                        dataType: "jsonp"
                    }).then(function(resp) {
                        that.set("ts", resp.time);
                    }, function(resp) {
                        that.set("ts", "Something bad happened");
                    });
                }
            });

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
                }
            });






        }
    };

    return app;

});