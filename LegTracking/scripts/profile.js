function profileListViewDataInit(e)
{

}

function profileListViewDataShow(e)
{
    var type = e.view.params.type;
    var uid = e.view.params.uid;
    var profileModel = profilesDataSource.getByUid(uid);
    var dataTitle = null;

    $("#uid")[0].value = uid;

    if (type === "legislator")
    {
        dataTitle = "Profile";
    }
    else
    {
        dataTitle = "PCI Attendee Profile";
    }

    kendo.bind(e.view.element, profileModel, kendo.mobile.ui);

    var navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");

    navbar.title(dataTitle);

    e.view.element.find("#save-button")
        .data("kendoMobileButton")
            .bind
            (
                "click",
                function ()
                {
                    profilesDataSource.sync();

                    app.navigate("#:back");
                }
            );
}

function profileSaveButtonClick(e)
{
    profilesDataSource.sync();

    app.navigate("#:back");
}

function profileDeleteButtonClick(e)
{
    var model = profilesDataSource.getByUid($("#uid")[0].value);

    model.set("Checked", false);

    profilesDataSource.remove(model);
    profilesDataSource.sync();

    app.navigate("#:back");
}

function profileCancelButtonClick(e)
{
    app.navigate("#:back");
}