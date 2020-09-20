<p align="center">
  <img src="https://raw.githubusercontent.com/acidjazz/laranuxt/master/client/static/laranuxt.png" />
</p>

<p align="center">
  <a href="https://laravel.com"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.svg.png" width="92" height="92" /></a>
  <a href="https://vuejs.org"><img src="https://vuejs.org/images/logo.png" width="92" height="92" /></a>
  <a href="https://tailwindcss.com"><img src="https://pbs.twimg.com/profile_images/1278691829135876097/I4HKOLJw_400x400.png" width="92" height="92" /></a>
  <a href="https://github.com/acidjazz/metapi"><img src="https://github.com/acidjazz/metapi/raw/master/logo.png" width="92" height="92" /></a>
</p>

## Laravel + Nuxt.js Boilerplate

[![](https://img.shields.io/badge/nuxt.js-v2.14.5-04C690.svg)](https://nuxtjs.org)
[![](https://img.shields.io/badge/Laravel-v8.5.0-ff2e21.svg)](https://laravel.com)
![Test PHP](https://github.com/acidjazz/laranuxt/workflows/Test%20PHP/badge.svg)
![Test Javascript](https://github.com/acidjazz/laranuxt/workflows/Test%20Javascript/badge.svg)

### What is included

* [NUXT](https://nuxtjs.org) front end, a progressive Vue.js framework - `v2.14.0`
  * [@nuxtjs/axios](https://github.com/nuxt-community/axios-module) to communicate with our API - `v5.12.0`
  * [@nuxtjs/tailwindcss](https://tailwindcss.nuxtjs.org/) a [utility-first](https://tailwindcss.com) framework - now with PurgeCSS built in - `v3.0.2`
  * [nuxt-tailvue](https://github.com/acidjazz/nuxt-tailvue) a collection of components built for Nuxt.js, powered by TailwindCSS


* [Laravel](https://laravel.com) - for our API - `v7.22.4`
  * [metapi](https://github.com/acidjazz/metapi) - API helpers and utilities - `v2.1.1`
  * [debugbar](https://github.com/barryvdh/laravel-debugbar) - awesome debugbar for our API - `v3.5.1`
  * [ide-helper](https://github.com/barryvdh/laravel-ide-helper) - Helper files to enable help with IDE autocompletion - `v2.8.0`

### Installation

* clone from github
* run `yarn` and `composer install` to install all of your deps
* copy `.env.example` to `.env` and configure it to your likings
* TL;DR
 ```bash
git clone git@github.com:acidjazz/laranuxt.git; cd laranuxt; yarn; composer install; cp .env.example .env;
 ```
* Feel free to delete excess media in  `/client/static/`, just images for the readme


### Local Environment
* run `yarn dev` in one terminal for our nuxt dev setup
* run `yarn api` (alias for `./artisan serve`) in another terminal for our laravel API

### Features

