ESLINT=./node_modules/.bin/eslint
TAP=./node_modules/.bin/tap

# ------------------------------------------------------------------------------

# Builds a JSON representation of the raw AFINN word list
build:
	node ./build/index.js

# ------------------------------------------------------------------------------

lint:
	$(ESLINT) ./lib/*.js
	$(ESLINT) ./build/*.js
	$(ESLINT) ./test/**/*.js

unit:
	$(TAP) ./test/unit/*.js

# Benchmarks
benchmark:
	node ./test/benchmark/index.js

# Run entire test suite
test:
	@make lint
	@make unit
	@make benchmark

# ------------------------------------------------------------------------------

.PHONY: build lint unit benchmark test
