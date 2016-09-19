var surveysDataSource = null;

function surveysListViewDataInit(e)
{
    e.view.element.find("#surveysListView")
        .kendoMobileListView
        (
            {
                dataSource: surveysDataSource,
                template: $("#surveysListViewTemplate").html(),
                dataBound: function(e)
                {
                    e.sender.element.find('li').each(function ()
                    {
                        var liElement = $(this);
                        var questionCount = liElement.find('input[name="questionCount"]');

                        if (questionCount[0].value === "0")
                        {
                            var detailButtonElement = liElement.find("[data-role=detailbutton]");

                            detailButtonElement.hide();
                        }
                    });
                }
            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                tap: surveysTap
            }
        );
}

function surveysListViewDataShow(e)
{
    var legislatorId = e.view.params.legislatorId;
    var meetingId = e.view.params.meetingId;
    var apiUrl = apiBaseServiceUrl + "legislatorinitiatives?legislatorId=" + legislatorId;

    if (meetingId !== null)
    {
        apiUrl += "&meetingId=" + meetingId;
    }

    surveysDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiUrl,
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
                }
            },
            schema:
            {
                model:
                {
                    id: "InitiativeId",
                    fields:
                    {
                        LegislatorId: "LegislatorId",
                        FullName: "FullName",
                        InitiativeId: "InitiativeId",
                        Initiative: "Initiative",
                        QuestionCount: "QuestionCount"
                    }
                }
            }
        }
    );

    $("#surveysListView").data("kendoMobileListView").setDataSource(surveysDataSource);

    if (surveysReference === "meeting")
    {
        kendo.bind(e.view.element, meetingModel, kendo.mobile.ui);
    }
    else
    {
        kendo.bind(e.view.element, legislatorModel, kendo.mobile.ui);
    }

    e.view.scroller.reset();
}

function surveysTap(e)
{
    var liElement = $(e.touch.currentTarget);
    var questionCount = liElement.find('input[name="questionCount"]');

    if (questionCount[0].value === "0")
    {
        this.events.cancel();
        e.event.stopPropagation();
    }
    else
    {
        var uid = $(e.touch.currentTarget).data("uid");
        var currentRecord = surveysDataSource.getByUid(uid);
        var legislatorId = currentRecord.LegislatorId;
        var initiativeId = currentRecord.InitiativeId;
        var url = "views/survey.html?uid=" + uid + "&legislatorId=" + legislatorId + "&initiativeId=" + initiativeId;

        app.navigate(url);
    }
    
}