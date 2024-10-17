export class Router {
	routes = {};

	add(routeName, page) {
		this.routes[routeName] = page;
	}

	route(event) {
		event = event || window.event;
		event.preventDefault();

		window.history.pushState({}, '', event.target.href);

		this.handle();
	}

	handle() {
		const { pathname } = window.location;
		const route = this.routes[pathname] || this.routes[404];

		fetch(route)
			.then((data) => data.text())
			.then((html) => {
				document.querySelector('#app').innerHTML = html;
			});

		document.body.className = '';

		switch (pathname) {
			case '/home':
				document.body.classList.add('home-page');
				break;
			case '/o-universo':
				document.body.classList.add('universo-page');
				break;
			case '/exploracao':
				document.body.classList.add('exploracao-page');
				break;
		}
	}
}
