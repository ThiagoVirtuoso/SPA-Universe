export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()

        window.history.pushState({}, "", event.target.href)
        event.target.classList.add('selected')
        const navItems = document.querySelectorAll('a')

        for (const navItem of navItems) {
            if(navItem.classList.contains('selected')) {
                if(navItem != event.target) {
                    navItem.classList.remove('selected')
                }
            }
        }

        this.handle()
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]
        const html = document.querySelector('html')
        let backgroundPath = pathname

        if(!this.routes[pathname]) {
            backgroundPath = '/home'
        }

        if(pathname == '/') {
            backgroundPath = '/home'
        }

        html.style.backgroundImage = `url('./assets${backgroundPath}.png')`

        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector('#app').innerHTML = html
        })
    }
}