# Scheme generation

Scheme for configuration file is generated from configuration model as following

**Requires installed typescript-json-schema package**

```
typescript-json-schema \
	./src/models/ApiServiceConfig.ts \
	"ApiServiceConfig" \
	--out ./schemes/ApiServiceConfig.scheme.json \
	--required true \
	--noExtraProps true
```
