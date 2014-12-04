define(['jquery'], function ($) {

    'use strict';

    var dataService = {
        wod: null,
        getWODTest: function(callback){
            var that = this;
            $.ajax({
                url: "http://0.0.0.0:9000/wod.html",
                dataType: "jsonp",
                jsonp:'callback',
                jsonpCallback: 'callback'
            }).then(function(resp) {
                callback(resp);
            }, function(resp) {
                console.log('error! ' + resp);
            });
        },
        getWOD: function(callback){
            return {
                name:'Kill Sesh',
                level: 'hard',
                activities:[
                    { imgClass: 'squat', desc:'squats', count: 25, sets: 3},
                    { imgClass: 'pushup', desc:'pushups', count: 15, sets: 3}
                ]
            };
        },
        addItem: function(itema){
            if(this.wod){
                wod.activities.push(item);
            }
        },
        defaults: {
            name:'Kill Sesh',
            level: 'hard',
            activities:[
                { imgClass: 'squat', desc:'squats', count: 25, sets: 3},
                { imgClass: 'pushup', desc:'pushups', count: 15, sets: 3}
            ]
        },
        categories: [{name: 'squat'}, {name: 'pushup'}, {name: 'plank'}]
    };

    return dataService;

});
