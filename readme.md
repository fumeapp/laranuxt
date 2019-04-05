
<p align="center">
  <a href="https://laravel.com"><img src="https://onecentlin.gallerycdn.vsassets.io/extensions/onecentlin/laravel-extension-pack/0.4.0/1534522609664/Microsoft.VisualStudio.Services.Icons.Default"  width="128" height="128"/></a>
  <img src="https://raw.githubusercontent.com/acidjazz/aeonian/master/media/plus.png"/>
  <a href="https://nuxtjs.org/"><img src="https://images.opencollective.com/proxy/images?src=https%3A%2F%2Fopencollective-production.s3-us-west-1.amazonaws.com%2F63047830-23b9-11e9-8073-c73f9d8c047d.png&height=480"  width="128" height="128"/></a>
</p>

<p align="center">
  <a href="https://vuejs.org"><img src="https://vuejs.org/images/logo.png" width="64" height="64" /></a>
  <a href="https://bulma.io/"><img src="https://i.pinimg.com/originals/f3/c5/4f/f3c54f51a7cb9de02523e226d6b010b6.png" width="64" height="64" /></a>
  <a href="https://github.com/acidjazz/metapi"><img src="https://github.com/acidjazz/metapi/raw/master/logo.png" width="64" height="64" /></a>
  <a href="https://materialdesignicons.com"><img src="https://lh3.googleusercontent.com/kellzw4-4Q258D_HdHvcclbu2HEheO1TxauO4lmI5T6tCDnk8pvUfh0W0WpvKiB54g=s96-rw" width="64" height="64" /></a>
  <a href="https://stylus-lang.com"><img src="https://avatars0.githubusercontent.com/u/10009463?s=400&v=4" width="64" height="64" /></a>
  <a href="https://github.com/FullHuman/purgecss"><img src="https://github.com/FullHuman/purgecss/raw/master/.assets/logo.png" width="64" height="64" /></a>
  <a href="https://tailwindcss.com"><img src="https://pbs.twimg.com/profile_images/895274026783866881/E1G1nNb0_400x400.jpg" width="64" height="64" /></a>
</p>

## laravel + nuxt.js boilerplate

### what is included

* [NUXT](https://nuxtjs.org) for our SPA vue.js powered front-end
  * [@nuxtjs/axios](https://github.com/nuxt-community/axios-module) to communicate with our API
  * [@nuxtjs/proxy](https://github.com/nuxt-community/proxy-module) sending `/api` to Laravel
  * [tailwind](https://tailwindcss.com) - a utility-first framework
  * [nuxt-purgecss](https://github.com/Developmint/nuxt-purgecss) Drop superflous CSS!
  * [bulma](https://bulma.io) - modern CSS framework based on flexbox 
  * [mdi](https://materialdesignicons.com) - material design icons with a ton of contributed ones as well

* [Laravel](https://laravel.com) - for our API
  * [metapi](https://github.com/acidjazz/metapi) - API helpers and utilities
  * [debugbar](https://github.com/barryvdh/laravel-debugbar) - awesome debugbar for our API


### installation

* clone from github
* run `yarn` and `composer install` to install all of your deps
* copy `.env.example` to `.env` and configure it to your likings
* running `yarn bulma` will compile bulma to `resources/static/css/bublma.css`
  * i do this to speed up reactivity and compilation time
* running `yarn mdi` will copy all the fonts and css to `resources/static/` allowing you to use MDI with bulma/etc
* run `yarn dev` in one terminal for our nuxt dev setup
* run `./artisan serve` in another terminal for our laravel API

### byobu
I've also included a simple [byobu](http://byobu.co/) script that starts everything up, just change `PROJECT` to your project folder name 
