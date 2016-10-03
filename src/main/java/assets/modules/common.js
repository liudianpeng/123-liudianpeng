require.config({
    baseUrl: '/',
    paths: {
        jquery: "/assets/vendor/jquery-1.11.3",
        avalon: "/assets/vendor/avalon.shim",
        text: "/assets/vendor/text",
        mmRequest: "/assets/vendor/mmRequest",
        mmPromise: "/assets/vendor/mmPromise",
        domReady: "/assets/vendor/domReady",
        mmState: "/assets/vendor/mmHistory",
        mmRouter: "/assets/vendor/mmRouter",
        mmHistory: "/assets/vendor/mmHistory",
        css: "/assets/vendor/css",
        weiutils:"/assets/modules/weiutils"
    },
    priority: ['text', 'css'],
    shim: {
        jquery: {
            exports: "jQuery"
        },
        avalon: {
            exports: "avalon"
        }
    }
});
