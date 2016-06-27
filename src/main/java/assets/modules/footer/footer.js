define(["avalon", "text!/modules/footer/footer.html"], function(avalon, footer) {

    avalon.templateCache.footer = footer
    avalon.define({
        $id: "footer",
        footer: "empty",
    })

    avalon.vmodels.root.footer = "footer"
})
