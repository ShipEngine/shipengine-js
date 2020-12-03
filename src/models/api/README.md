### Only import from the src/models/api/index.ts, never anywhere else!
index.ts is the only place we should expose the api types, since it gives us a change to make corrections if there are issues with the openapi definition.
