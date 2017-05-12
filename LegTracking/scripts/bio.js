function bioListViewDataShow(e)
{
    // Set the highlighted tabstrip icon.
    var tabstrip = e.view.footer.find(".km-tabstrip").data("kendoMobileTabStrip");
    tabstrip.switchTo(tabstripPathName);

    // Following lines were commented out because the legislatorModel is populated on a previous screen.
    //var uid = e.view.params.uid;
    //var legislatorModel = legislatorsDataSource.getByUid(uid);

    // Format data where necessary.
    if (legislatorModel.TermStart.length > 4)
    {
        //legislatorModel.TermStart = legislatorModel.TermStart.substring(0, 4);
        var newTermStart = new Date(legislatorModel.TermStart);

        legislatorModel.TermStart = kendo.toString(newTermStart, 'MMMM d, yyyy');
    }

    kendo.bind(e.view.element, legislatorModel, kendo.mobile.ui);

    //$('#biodetails').val(legislatorModel.Bio);
    $('#biodetails').html(legislatorModel.Bio);

    e.view.scroller.reset();
}

function closeModalBio(e)
{
    $("#modalbio").data("kendoMobileModalView").close();
}