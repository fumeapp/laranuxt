<p align="center">
  <img src="https://raw.githubusercontent.com/acidjazz/laranuxt/master/client/static/laranuxt.png" />
</p>


<p align="center">
  <a href="https://laravel.com"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.svg.png" width="92" height="92" /></a>
  <a href="https://vuejs.org"><img src="https://vuejs.org/images/logo.png" width="92" height="92" /></a>
  <a href="https://tailwindcss.com"><img src="https://pbs.twimg.com/profile_images/1278691829135876097/I4HKOLJw_400x400.png" width="92" height="92" /></a>
  <a href="https://github.com/acidjazz/metapi"><img src="https://github.com/acidjazz/metapi/raw/master/logo.png" width="92" height="92" /></a>
  <a href="https://materialdesignicons.com"><img src="https://lh3.googleusercontent.com/kellzw4-4Q258D_HdHvcclbu2HEheO1TxauO4lmI5T6tCDnk8pvUfh0W0WpvKiB54g=s96-rw" width="92" height="92" /></a>
  <a href="https://stylus-lang.com"><img src="https://avatars0.githubusercontent.com/u/10009463?s=400&v=4" width="92" height="92" /></a>
  <a href="https://pugjs.org/"><img src="https://camo.githubusercontent.com/a43de8ca816e78b1c2666f7696f449b2eeddbeca/68747470733a2f2f63646e2e7261776769742e636f6d2f7075676a732f7075672d6c6f676f2f656563343336636565386664396431373236643738333963626539396431663639343639326330632f5356472f7075672d66696e616c2d6c6f676f2d5f2d636f6c6f75722d3132382e737667" width="92" height="92" /></a>
</p>

## Laravel + Nuxt.js Boilerplate

![Test PHP](https://github.com/acidjazz/laranuxt/workflows/Test%20PHP/badge.svg)
![Test Javascript](https://github.com/acidjazz/laranuxt/workflows/Test%20Javascript/badge.svg)

### What is included

* [NUXT](https://nuxtjs.org) front end, a progressive Vue.js framework - `v2.14.0`
  * [@nuxtjs/axios](https://github.com/nuxt-community/axios-module) to communicate with our API - `v5.11.0`
  * [@nuxtjs/pwa](https://pwa.nuxtjs.org/) Heavily tested, updated and stable PWA solution - `v3.0.0`
  * [@nuxt/components](https://github.com/nuxt/components) Auto import components - `v1.0.3`
  * [@nuxtjs/tailwindcss](https://github.com/nuxt-community/nuxt-tailwindcss) a [utility-first](https://tailwindcss.com) framework - now with PurgeCSS built in - `v2.0.0`
  * [stylus](https://stylus.org) - expressive, dynamic, robust css - `v0.54.8`
  * [pug](https://pugjs.org) -  high-performance template engine - `v3.0.0`
  * [mdi](https://materialdesignicons.com) - material design icons with a ton of contributed ones as well - `v5.4.55`

* [Laravel](https://laravel.com) - for our API - `v7.22.4`
  * [metapi](https://github.com/acidjazz/metapi) - API helpers and utilities - `v2.1.0`
  * [debugbar](https://github.com/barryvdh/laravel-debugbar) - awesome debugbar for our API - `v3.4.3`
  * [ide-helper](https://github.com/barryvdh/laravel-ide-helper) - Helper files to enable accurate IDE autocompletion - `v2.8.0`
  * [dump-server](https://github.com/beyondcode/laravel-dump-server) - Collect your `dump` call outputs and show them separately - `v1.4.0`
  
 * Global Programmatic Components
    * Global Toast Component   
        * Info, danger, warning, and success
        * Optional timeout
        * Properly captures and shows PHP errors from the back-end
        * Link to file:line in PHPStorm
        * Ex: `this.$toast.show('this is a toast')` or `this.$toast.show({type: 'danger', message: 'this is an error'})`
     * Global Modal Component
       * Programmatic with actions that turn into buttons
       * Customizable using the BaseModal component   
       * Ex:
```js
this.$modal.show({
  body: 'test modal with actions',
  actions: [
    { name: 'Confirm', action: () => this.$toast.show('confirmed') },
    { name: 'Cancel', action: () => this.$toast.show('canceled') },
  ],
})
```
        
<p align="center">
    <img src="/media/toasts.png" width="250" />        
    <img src="/media/php-error.png" width="250" />        
    <img src="/media/modal.png" width="250" />        
</p>   

<p align="center">
    <img src="/media/error-validation.png" />        
</p>   

 * [metapi](https://github.com/acidjazz/metapi) packaged with built-in support by the Toast component
   * Now with Dracula dark mode to pair nicely with laravel-debugbar
<p align="center">
    <img src="/media/metapi.png" />        
</p>   
 
### Installation

* clone from github
* run `yarn` and `composer install` to install all of your deps
* copy `.env.example` to `.env` and configure it to your likings
  * i do this to speed up reactivity and compilation time
* running `yarn mdi` will copy all the fonts and css to `resources/static/`
* TL;DR
 ```bash
git clone git@github.com:acidjazz/laranuxt.git; cd laranuxt; yarn; composer install; yarn mdi; cp .env.example .env;
 ```
* Feel free to delete `media/`, this folder is only to store images for the readme

### Local environment
* run `yarn api` (alias for `./artisan serve`) in another terminal for our laravel API
* run `yarn dev` in one terminal for our nuxt dev setup

### I don't want pug
* Copy+Paste the pug section of each `.vue` into [pughtml](https://pughtml.com/) and paste the html back
* Be sure to remove `lang="pug"` in the `<template>` tag
* `yarn remove pug pug-plain-loader`

### I don't want stylus
* Copy+Paste the stylus section of each `.vue|.styl` into [stylus2css](https://www.cssportal.com/stylus-to-css/) and paste the CSS back
* Be sure to remove `lang="stylus"` in the `<style>` tag
* `yarn remove stylus stylus-loader`
