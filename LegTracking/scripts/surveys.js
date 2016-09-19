var initiativeSurveysDataSource = null;

function initiativeSurveysListViewDataInit(e)
{
    e.view.element.find("#initiativeSurveysListView")
        .kendoMobileListView
        (
            {
                dataSource: initiativeSurveysDataSource,
                template: $("#initiativeSurveysListViewTemplate").html(),
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
                tap: initiativeSurveysTap
            }
        );
}

function initiativeSurveysListViewDataShow(e)
{
    var legislatorId = e.view.params.legislatorId;
    var meetingId = e.view.params.meetingId;
    var apiUrl = apiBaseServiceUrl + "legislatorinitiatives?legislatorId=" + legislatorId;

    if (meetingId !== null)
    {
        apiUrl += "&meetingId=" + meetingId;
    }

    initiativeSurveysDataSource = new kendo.data.DataSource
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

    $("#initiativeSurveysListView").data("kendoMobileListView").setDataSource(initiativeSurveysDataSource);

    if (initiativeSurveysReference === "meeting")
    {
        kendo.bind(e.view.element, meetingModel, kendo.mobile.ui);
    }
    else
    {
        kendo.bind(e.view.element, legislatorModel, kendo.mobile.ui);
    }

    e.view.scroller.reset();
}

function initiativeSurveysTap(e)
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
        var currentRecord = initiativeSurveysDataSource.getByUid(uid);
        var legislatorId = currentRecord.LegislatorId;
        var initiativeId = currentRecord.InitiativeId;
        var url = "views/initiativesurvey.html?uid=" + uid + "&legislatorId=" + legislatorId + "&initiativeId=" + initiativeId;

        app.navigate(url);
    }
    
}