# Strapdown.js

Strapdown.js makes it embarrassingly simple to create elegant Markdown documents. No server-side compilation required. 

For more, please see:

+ http://strapdownjs.com

## Contributor guide

You will need Node.js (>0.6.x) and CoffeeScript to generate the bundles. To bundle/compile the assets, issue in the project directory:

```
$ npm install
$ coffee bundle.coffee <version_number>
```

This will build bundled files in the `v` output directory, specifically `v/<version_number>`. Bundled files are based on the strapdown sources from `src` and the vendor sources (bootstrap, marked, prettify etc.) in `vendor`

Bug fixes should go in the latest version - no need to bump it. New features or anything that changes the old behavior should go into a bumped version.
