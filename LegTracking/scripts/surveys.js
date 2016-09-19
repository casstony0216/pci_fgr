var surveysDataSource = null;
var surveyLegislatorId = null;
var surveyMeetingId = null;
var surveysActive = "Y";

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
    surveyLegislatorId = e.view.params.legislatorId;
    surveyMeetingId = e.view.params.meetingId;

    setSurveysDataSource();

    $("#surveysListView").data("kendoMobileListView").setDataSource(surveysDataSource);

    var addButton = e.view.element.find("#add-button").data("kendoMobileButton");

    if (surveysReference === "meeting")
    {
        kendo.bind(e.view.element, meetingModel, kendo.mobile.ui);

        e.view.element.find("#add-button").show();

        addButton.unbind("click");
        addButton.bind
        (
            "click",
            function ()
            {
                // NEED TO UPDATE ONCE SURVEY ADD SCREEN IS CREATED!!!
                app.navigate("views/meeting.html?legislatorId=" + meetingLegislatorId);
            }
        );
    }
    else
    {
        kendo.bind(e.view.element, legislatorModel, kendo.mobile.ui);

        e.view.element.find("#add-button").hide();
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
        var surveyId = currentRecord.SurveyId;
        var url = "views/survey.html?uid=" + uid + "&legislatorId=" + legislatorId + "&surveyId=" + surveyId;

        app.navigate(url);
    }
    
}

function onSurveysGroupSelect(e)
{
    var index = this.current().index();

    if (index === 0)
    {
        surveysActive = "Y";
    }
    else
    {
        surveysActive = "N";
    }

    setSurveysDataSource();

    $("#surveysListView").data("kendoMobileListView").setDataSource(surveysDataSource);
}

function setSurveysDataSource()
{
    var apiUrl = apiBaseServiceUrl + "legislatorsurveys?legislatorId=" + surveyLegislatorId;
    
    if (surveyMeetingId !== null)
    {
        apiUrl += "&meetingId=" + surveyMeetingId;
    }

    apiUrl += "&active=" + surveysActive;

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
                    id: "SurveyId",
                    fields:
                    {
                        LegislatorId: "LegislatorId",
                        FullName: "FullName",
                        SurveyId: "SurveyId",
                        Survey: "Survey",
                        Year: "Year",
                        Chamber: "Chamber",
                        QuestionCount: "QuestionCount"
                    }
                }
            }
        }
    );
}