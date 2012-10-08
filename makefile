build:
	node ./build/index.js

generator:
	npm install
	git init
	git add -A
	git remote add origin https://thisandagain@github.com/thisandagain/sentiment

.PHONY: build generator