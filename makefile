# Paths
TAP = ./node_modules/.bin/tap
JSHINT = ./node_modules/.bin/jshint

# ------------------------------------------------------------------------------

# Builds a JSON representation of the raw AFINN word list
build:
	node ./build/index.js

# Governance tests
lint:
	$(JSHINT) ./lib/*.js
	$(JSHINT) ./build/*.js
	$(JSHINT) ./test/**/*.js

# Unit tests
unit:
	$(TAP) ./test/unit/*.js

# Benchmarks
benchmark:
	node test/benchmark/index.js

# Run entire test suite
test:
	@make lint
	@make unit
	@make benchmark

# ------------------------------------------------------------------------------

.PHONY: build lint unit benchmark test