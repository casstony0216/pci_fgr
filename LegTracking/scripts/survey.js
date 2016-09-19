var surveyDataSource = null;
var surveyLegislatorId = null;
var surveySurveyId = null;
var surveyActive = "Y";

function surveyListViewDataInit(e)
{
    e.view.element.find("#surveyListView")
        .kendoMobileListView
        (
            {
                dataSource: surveyDataSource,
                template: $("#surveyListViewTemplate").html(),
                dataBound: function (e)
                {
                    e.sender.element.find('input[name="followUpRequired"]').each(function ()
                    {
                        var inputElement = $(this);
                        var liElement = inputElement.parent();
                        var spanElement = liElement.find('span[id="followUpRequired"]');

                        if (inputElement[0].value === "true")
                        {
                            spanElement[0].innerText = "Yes";
                        }
                        else if (inputElement[0].value === "false")
                        {
                            spanElement[0].innerText = "No";
                        }
                        else
                        {
                            spanElement[0].innerText = "";
                        }
                    });
                }
            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                tap: surveyTap
            }
        );
}

function surveyListViewDataShow(e)
{
    surveyLegislatorId = e.view.params.legislatorId;
    surveySurveyId = e.view.params.surveyId;

    setSurveyDataSource();

    var uid = e.view.params.uid;
    var surveyModel = surveysDataSource.getByUid(uid);
    var navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");
    var surveyTitle = surveyModel.Survey;
    var maxTitleLength = 23;

    if (surveyTitle.length > maxTitleLength)
    {
        for (var i = maxTitleLength; i > 0; i--)
        {
            var position = surveyTitle.indexOf(" ", i);

            if (position > -1 && position <= maxTitleLength)
            {
                surveyTitle = surveyTitle.substr(0, position) + "..."

                break;
            }
        }

        //surveyTitle = surveyTitle.substr(0, 20) + "..."
    }

    navbar.title(surveyTitle);

    $("#surveyListView").data("kendoMobileListView").setDataSource(surveyDataSource);

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

function surveyTap(e)
{
    var uid = $(e.touch.currentTarget).data("uid");
    var url = "views/surveyquestion.html?uid=";

    app.navigate(url + uid);
}

function setSurveyDataSource()
{
    var apiUrl = apiBaseServiceUrl + "legislatorsurvey?legislatorId=" + surveyLegislatorId + "&surveyId=" + surveySurveyId;

    surveyDataSource = new kendo.data.DataSource
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
                },
                update:
                {
                    url: apiBaseServiceUrl + "updatelegislatorsurvey",
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
                        LegislatorId: { editable: false },
                        SurveyId: { editable: false },
                        Survey: { editable: false },
                        SurveyQuestionId: { editable: false },
                        SurveyQuestion: { editable: false },
                        InitiativeIds: { editable: false },
                        Initiatives: { editable: false },
                        ResponseId: { editable: true },
                        Response: { editable: true },
                        FollowUpRequired: { editable: true, type: "boolean" },
                        Comments: { editable: true },
                        EditorId: { editable: false },
                        Editor: { editable: false },
                        ModifiedDate: { editable: false }
                    }
                }
            }
        }
    );
}