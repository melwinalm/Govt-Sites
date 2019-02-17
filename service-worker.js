self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.open('cache').then(function (cache) {
			return cache.match(event.request).then(function (response) {
				var fetchPromise = fetch(event.request).then(
					function (networkResponse) {
						if (networkResponse) {
							cache.put(event.request, networkResponse.clone())
						}
						return networkResponse
					},
					function (event) {
						event.waitUntil(
							caches.open('cache').then(function (cache) {
								return cache.addAll([
									'/', // do not remove this
									'/index.html', //default
									'/index.html?homescreen=1', //default
									'/?homescreen=1', //default
									'/css/app.css', // configure as by your site ; just an example
									'/img/icons/icon-96x96.png', // choose images to keep offline; just an example
									'/manifest.js',
								])
							})
						)
					}
				)
				return response || fetchPromise
			})
		})
	)
})

self.addEventListener('install', function (event) {
	self.skipWaiting()
})
