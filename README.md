# nw-vue-devtools-beta-prebuilt

Install prebuilt Vue DevTools-Beta extension to use in a NW.js application

## Instructions

1. `npm install nw-vue-devtools-beta-prebuilt`

2. Add this to your `package.json` of your NW.js app:
    ```js
      "chromium-args": "--load-extension='./node_modules/nw-vue-devtools-beta-prebuilt/extension'"
    ```

You may need to add `app.config.devtools = true;` to your `main.js` file.

If you are using `nwjs-builder-phoenix` then add in `"chromium-args"` to your `package.json` `build.strippedProperties` array ([more info](https://github.com/evshiron/nwjs-builder-phoenix/blob/master/docs/Options.md#build---buildconfig)).
