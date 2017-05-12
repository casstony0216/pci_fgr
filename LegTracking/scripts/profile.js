function profileListViewDataInit(e)
{
    
}

function profileListViewDataShow(e)
{
    // Set the highlighted tabstrip icon.
    var tabstrip = e.view.footer.find(".km-tabstrip").data("kendoMobileTabStrip");
    tabstrip.switchTo(tabstripPathName);

    var type = e.view.params.type;
    var uid = e.view.params.uid;
    var profileModel = profilesDataSource.getByUid(uid);
    var dataTitle = null;

    $("#profileuid")[0].value = uid;

    if (type === "legislator")
    {
        dataTitle = "Profile";
    }
    else
    {
        dataTitle = "PCI Attendee Profile";
    }

    profileModel.MailTo = "mailto:" + profileModel.EmailAddress;

    kendo.bind(e.view.element, profileModel, kendo.mobile.ui);
    
    $('#profilenotes').val(profileModel.Notes);

    var navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");

    navbar.title(dataTitle);

    var saveButton = e.view.element.find("#save-button").data("kendoMobileButton");
    
    saveButton.unbind("click");
    saveButton.bind
    (
        "click",
        function ()
        {
            profilesDataSource.sync();

            app.navigate("#:back");
        }
    );

    e.view.scroller.reset();
}

function profileSaveButtonClick(e)
{
    profilesDataSource.sync();

    app.navigate("#:back");
}

function profileDeleteButtonClick(e)
{
    var model = profilesDataSource.getByUid($("#profileuid")[0].value);

    model.set("Checked", false);

    profilesDataSource.remove(model);
    profilesDataSource.sync();

    app.navigate("#:back");
}

function openModalProfileNotes(e)
{
    var model = profilesDataSource.getByUid($("#profileuid")[0].value);

    $('#profilenotes').val(model.Notes);

    $("#modalprofilenotes").data("kendoMobileModalView").open();
}

function closeModalProfileNotes(e)
{
    var model = profilesDataSource.getByUid($("#profileuid")[0].value);

    model.set("Notes", $('#profilenotes').val());

    $("#modalprofilenotes").data("kendoMobileModalView").close();
}