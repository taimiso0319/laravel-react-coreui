

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window._ = require('lodash');
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');
    window.moment = require('moment')
    require('bootstrap');

    window._.mixin({ pascalCase: _.flow(_.camelCase, _.upperFirst) })
    // Animate CSS
    window.$.fn.extend({
        animateCss: function (animationName, callback) {
            const animationEnd = (function (element) {
                const animations = {
                    animation      : 'animationend',
                    OAnimation     : 'oAnimationEnd',
                    MozAnimation   : 'mozAnimationEnd',
                    WebkitAnimation: 'webkitAnimationEnd',
                }

                for (const t in animations) {
                    if (element.style[t] !== undefined)
                        return animations[t]
                }
            })(document.createElement('div'))

            this.addClass(`animated ${animationName}`).one(animationEnd, function () {
                $(this).removeClass(`animated ${animationName}`)

                if (typeof callback === 'function') callback()
            })

            return this
        },
    })
    require('bootstrap')
    require('select2')
    require('offline-plugin/runtime').install()

    $.fn.select2.defaults.set('theme', 'bootstrap4')
    $.fn.select2.defaults.set('width', '100%')
} catch (error) {
    console.error(error)
}


/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const token = document.head.querySelector('meta[name="csrf-token"]')

if (token)
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
else
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
