function bioListViewDataShow(e)
{
    var uid = e.view.params.uid;
    var legislatorModel = legislatorsDataSource.getByUid(uid);

    // Format data where necessary.
    if (legislatorModel.TermStart.length > 4)
    {
        legislatorModel.TermStart = legislatorModel.TermStart.substring(0, 4);
    }

    kendo.bind(e.view.element, legislatorModel, kendo.mobile.ui);

    $('#biodetails').val(legislatorModel.Bio);
}