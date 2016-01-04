var meetingInitiativesDataSource = null;

function meetingInitiativesListViewDataInit(e)
{
    e.view.element.find("#meetingInitiativesListView")
        .kendoMobileListView
        (
            {
                dataSource: meetingInitiativesDataSource,
                template: $("#meetingInitiativesListViewTemplate").html()
            }
        );
}

function meetingInitiativesListViewDataShow(e)
{
    var meetingId = e.view.params.uid;

    meetingInitiativesDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "meetinginitiatives?meetingId=" + meetingId,
                    type: "get",
                    dataType: "json",
                    beforeSend: function (xhr)
                    {
                        xhr.setRequestHeader("Authorization", token);
                    },
                    error: function (xhr, ajaxOptions, thrownError)
                    {
                        alert("error " + xhr.responseText);
                    }
                },
                update:
                {
                    url: apiBaseServiceUrl + "updatemeetinginitiative",
                    type: "post",
                    dataType: "json",
                    beforeSend: function (xhr)
                    {
                        xhr.setRequestHeader("Authorization", token);
                    },
                    error: function (xhr, ajaxOptions, thrownError)
                    {
                        alert("error " + xhr.responseText);
                    }
                }
            },
            schema:
            {
                model:
                {
                    id: "InitiativeId",
                    fields:
                    {
                        MeetingId: { editable: false },
                        LegislatorId: { editable: false },
                        InitiativeId: { editable: false },
                        Initiative: { editable: false },
                        Checked: { editable: true }
                    }
                }
            }
        }
    );

    $("#meetingInitiativesListView").data("kendoMobileListView").setDataSource(meetingInitiativesDataSource);
    
    e.view.scroller.reset();
}

function meetingInitiativeSwitchChange(e)
{
    var listItem = e.sender.element.parent().parent();
    var uid = listItem.attr("data-uid");
    var meetingInitiativeModel = meetingInitiativesDataSource.getByUid(uid);

    meetingInitiativeModel.set("Checked", e.checked);

    meetingInitiativesDataSource.sync();
}