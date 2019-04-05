/*
 * ssl.js - redirect HTTP to HTTPS in staging and prod environments
 * Copyright (C) 2018 kevin olson <acidjazz@gmail.com>
 *
 * Distributed under terms of the APACHE license.
 */
export default function (ctx) {
  if (ctx.env.APP_ENV !== 'local' && typeof window !== "undefined" && window.location.protocol != 'https:') {
    location.href = location.href.replace("http://", "https://");
  }
}
