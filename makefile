build:
	mkdir -p dist
	cp src/manifest.json dist/manifest.json
	cp src/popup.html dist/popup.html
	cp src/logo.png dist/logo.png
	./node_modules/.bin/rollup --config
	./node_modules/.bin/node-sass src/popup.scss dist/popup.css