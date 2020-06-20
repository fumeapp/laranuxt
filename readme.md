<p align="center">
  <img src="https://raw.githubusercontent.com/acidjazz/laranuxt/master/static/laranuxt.png" />
</p>

<p align="center">
  <a href="https://vuejs.org"><img src="https://vuejs.org/images/logo.png" width="92" height="92" /></a>
  <a href="https://tailwindcss.com"><img src="https://pbs.twimg.com/profile_images/895274026783866881/E1G1nNb0_400x400.jpg" width="92" height="92" /></a>
  <a href="https://github.com/acidjazz/metapi"><img src="https://github.com/acidjazz/metapi/raw/master/logo.png" width="92" height="92" /></a>
  <a href="https://materialdesignicons.com"><img src="https://lh3.googleusercontent.com/kellzw4-4Q258D_HdHvcclbu2HEheO1TxauO4lmI5T6tCDnk8pvUfh0W0WpvKiB54g=s96-rw" width="92" height="92" /></a>
  <a href="https://stylus-lang.com"><img src="https://avatars0.githubusercontent.com/u/10009463?s=400&v=4" width="92" height="92" /></a>
  <a href="https://pugjs.org/"><img src="https://camo.githubusercontent.com/a43de8ca816e78b1c2666f7696f449b2eeddbeca/68747470733a2f2f63646e2e7261776769742e636f6d2f7075676a732f7075672d6c6f676f2f656563343336636565386664396431373236643738333963626539396431663639343639326330632f5356472f7075672d66696e616c2d6c6f676f2d5f2d636f6c6f75722d3132382e737667" width="92" height="92" /></a>
</p>

## Laravel + Nuxt.js Boilerplate

### What is included

* [NUXT](https://nuxtjs.org) front end, a progressive Vue.js framework - `v2.13.0`
  * [@nuxtjs/axios](https://github.com/nuxt-community/axios-module) to communicate with our API - `v5.11.0`
  * [@nuxtjs/pwa](https://pwa.nuxtjs.org/) Heavily tested, updated and stable PWA solution - `v3.0.0`
  * [@nuxt/components](https://github.com/nuxt/components) Auto import components - `v1.0.3`
  * [@nuxtjs/tailwindcss](https://github.com/nuxt-community/nuxt-tailwindcss) a [utility-first](https://tailwindcss.com) framework - now with PurgeCSS built in - `v2.0.0`
  * [stylus](https://stylus.org) - expressive, dynamic, robust css - `v0.54.7`
  * [pug](https://pugjs.org) -  high-performance template engine - `v3.0.0`
  * [mdi](https://materialdesignicons.com) - material design icons with a ton of contributed ones as well - `v5.3.45`

* [Laravel](https://laravel.com) - for our API - `v7.16.1`
  * [metapi](https://github.com/acidjazz/metapi) - API helpers and utilities - `v2.0.0`
  * [debugbar](https://github.com/barryvdh/laravel-debugbar) - awesome debugbar for our API - `v3.3.3`
  * [ide-helper](https://github.com/barryvdh/laravel-ide-helper) - Helper files to enable accurate IDE autocompletion - `v2.7.0`
  * [dump-server](https://github.com/beyondcode/laravel-dump-server) - Collect your `dump` call outputs and show them separately - `v1.4.0`

### Installation

* clone from github
* run `yarn` and `composer install` to install all of your deps
* copy `.env.example` to `.env` and configure it to your likings
  * i do this to speed up reactivity and compilation time
* running `yarn mdi` will copy all the fonts and css to `resources/static/`
* run `yarn logs` to create laravels needed storage logs folders
* TL;DR `git clone git@github.com:acidjazz/laranuxt.git; cd laranuxt; yarn; composer install; yarn mdi; cp .env.example .env; yarn logs;`

### Local environment
* run `yarn api` (alias for `./artisan serve`) in another terminal for our laravel API
* run `yarn dev` in one terminal for our nuxt dev setup
