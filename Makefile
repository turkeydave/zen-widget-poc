all: css js

init:
	bower install almond requirejs requirejs-text jQuery ractive requirejs-ractive

css:
	r.js -o cssIn=app/css/my-widget.css out=app/css/my-widget_embed.css
    ./node_modules/requirejs/bin/r.js -o cssIn=app/css/my-widget.css out=app/css/my-widget_embed.css
js:
	r.js -o embed.build.js
	./node_modules/requirejs/bin/r.js -o embed.build.js