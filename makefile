build:
	node ./build/index.js

test:
	./node_modules/.bin/tap test/governance/*.js
	./node_modules/.bin/tap test/unit/*.js

benchmark:
	node test/benchmark/index.js

.PHONY: build test benchmark