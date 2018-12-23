
[![laravel](https://onecentlin.gallerycdn.vsassets.io/extensions/onecentlin/laravel-extension-pack/0.4.0/1534522609664/Microsoft.VisualStudio.Services.Icons.Default)](https://laravel.com)
[![nuxt](https://storage.googleapis.com/pwa-directory.appspot.com/128_5160839372341248.png)](https://nuxtjs.org/)
<a href="https://bulma.io/"><img src="https://api.compargram.com/media/__sized__/images/2018/7/25/0bd7624cc7a94463be73f4bac71cc840-crop-c0-5__0-5-400x400.png" width="128" height="128" /></a>
<a href="https://github.com/acidjazz/metapi"><img src="https://github.com/acidjazz/metapi/raw/master/logo.png" width="128" height="128" /></a>
<a href="https://materialdesignicons.com"><img src="https://lh3.googleusercontent.com/kellzw4-4Q258D_HdHvcclbu2HEheO1TxauO4lmI5T6tCDnk8pvUfh0W0WpvKiB54g=s128-rw" /></a>

## boilerplate experiment 

### what is included

* [NUXT](https://nuxtjs.org) for our SPA front-end
  * [@nuxtjs/axios](https://github.com/nuxt-community/axios-module) to communicate with our API
  * [@nuxtjs/proxy](https://github.com/nuxt-community/proxy-module) sending `/api` to Laravel
  * [@nuxtjs/google-analytics](https://github.com/nuxt-community/analytics-module) GA

* [Laravel](https://laravel.com) - for our API
  * [metapi](https://github.com/acidjazz/metapi) - API helpers and utilities
  * [debugbar](https://github.com/barryvdh/laravel-debugbar) - awesome debugbar for our API


### installation

* clone from github
* run `yarn` and `composer install` to install all of your deps
* copy .env.example to .env and configure it how you'd prefer
* running `yarn bulma` will compile bulma to `resources/static/css/bublma.css`
  * i do this to speed up reactivity and compilation time
* running `yarn mdi` will copy all the fonts and css to `resources/static/` allowing you to use MDI with bulma/etc
* run `yarn dev` in one terminal for our nuxt dev setup
* run `./artisan serve` in another terminal for our laravel API
