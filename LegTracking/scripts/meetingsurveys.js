var meetingSurveysDataSource = null;

function meetingSurveysListViewDataInit(e)
{
    e.view.element.find("#meetingSurveysListView")
        .kendoMobileListView
        (
            {
                dataSource: meetingSurveysDataSource,
                template: $("#meetingSurveysListViewTemplate").html()
            }
        );
}

function meetingSurveysListViewDataShow(e)
{
    var meetingId = e.view.params.meetingId;

    meetingSurveysDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "meetingsurveys?meetingId=" + meetingId,
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
                    url: apiBaseServiceUrl + "updatemeetingsurvey",
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
                    id: "SurveyId",
                    fields:
                    {
                        MeetingId: { editable: false },
                        LegislatorId: { editable: false },
                        SurveyId: { editable: false },
                        Survey: { editable: false },
                        InitiativeIds: { editable: false },
                        Initiatives: { editable: false },
                        Year: { editable: false },
                        ChamberId: { editable: false },
                        Chamber: { editable: false },
                        Checked: { editable: true }
                    }
                }
            }
        }
    );

    $("#meetingSurveysListView").data("kendoMobileListView").setDataSource(meetingSurveysDataSource);

    e.view.scroller.reset();
}

function meetingSurveysSwitchChange(e)
{
    var listItem = e.sender.element.parent().parent();
    var uid = listItem.attr("data-uid");
    var meetingSurveyModel = meetingSurveysDataSource.getByUid(uid);

    meetingSurveyModel.set("Checked", e.checked);

    meetingSurveysDataSource.sync();
}