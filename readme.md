<p align="center">
  <img src="https://raw.githubusercontent.com/acidjazz/laranuxt/nuxt3/resources/laranuxt.png" width="300" />
</p>

> Now supporting [Nuxt v3](https://v3.nuxtjs.org)

## Laravel + Nuxt.js Boilerplate

[![](https://img.shields.io/badge/nuxt.js-v2.15.8-04C690.svg)](https://nuxtjs.org)
[![](https://img.shields.io/badge/Laravel-v8.60.0-ff2e21.svg)](https://laravel.com)
![Test PHP](https://github.com/acidjazz/laranuxt/workflows/Test%20PHP/badge.svg)
![Test Javascript](https://github.com/acidjazz/laranuxt/workflows/Test%20Javascript/badge.svg)
[![Lint Javascript](https://github.com/acidjazz/laranuxt/actions/workflows/lint-js.yml/badge.svg)](https://github.com/acidjazz/laranuxt/actions/workflows/lint-js.yml)
[![Lint PHP](https://github.com/acidjazz/laranuxt/actions/workflows/lint-php.yml/badge.svg)](https://github.com/acidjazz/laranuxt/actions/workflows/lint-php.yml)

![](resources/laranuxt.gif?raw=true)

> Now with examples on using Dark Mode and the Nuxt Api module!

### What is included

* [NUXT](https://nuxtjs.org) front end, a progressive Vue.js framework - `v2.15.8`
  * [@nuxtjs/typescript-build](https://typescript.nuxtjs.org/) TypeScript Support for Nuxt.js
  * [@nuxtjs/composition-api](https://composition-api.nuxtjs.org/) Composition API Support for Nuxt.js
  * [@nuxtjs/tailwindcss](https://tailwindcss.nuxtjs.org/) a [utility-first](https://tailwindcss.com) framework - now with PurgeCSS built in
  * [@nuxtjs/axios](https://github.com/nuxt-community/axios-module) to communicate with our API 
  * [@nuxtjs/auth](https://auth.nuxtjs.org/) NuxtJS Authentication module 
  * [nuxt-tailvue](https://github.com/acidjazz/nuxt-tailvue) a collection of components built for Nuxt.js, powered by TailwindCSS

* [Laravel](https://laravel.com) - for our API - `v8.60.0`
  * [MetAPI](https://github.com/acidjazz/metapi) - API helpers and utilities
  * [debugbar](https://github.com/barryvdh/laravel-debugbar) - awesome debugbar for our API
  * [ide-helper](https://github.com/barryvdh/laravel-ide-helper) - Helper files to enable help with IDE autocompletion

### Installation

* clone from GitHub
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

