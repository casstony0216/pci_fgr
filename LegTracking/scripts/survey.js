var surveyDataSource = null;
var surveyLegislatorId = null;
var surveyInitiativeId = null;
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
    surveyInitiativeId = e.view.params.initiativeId;

    setSurveyDataSource();

    var uid = e.view.params.uid;
    var surveyModel = surveysDataSource.getByUid(uid);
    var navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");
    var initiativeTitle = surveyModel.Initiative;
    var maxTitleLength = 23;

    if (initiativeTitle.length > maxTitleLength)
    {
        for (var i = maxTitleLength; i > 0; i--)
        {
            var position = initiativeTitle.indexOf(" ", i);

            if (position > -1 && position <= maxTitleLength)
            {
                initiativeTitle = initiativeTitle.substr(0, position) + "..."

                break;
            }
        }

        //initiativeTitle = initiativeTitle.substr(0, 20) + "..."
    }

    navbar.title(initiativeTitle);

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

function onSurveyGroupSelect(e)
{
    var index = this.current().index();

    if (index === 0)
    {
        surveyActive = "Y";
    }
    else
    {
        surveyActive = "N";
    }

    setSurveyDataSource();

    $("#surveyListView").data("kendoMobileListView").setDataSource(surveyDataSource);
}

function setSurveyDataSource()
{
    var apiUrl = apiBaseServiceUrl + "legislatorsurveys?legislatorId=" + surveyLegislatorId + "&initiativeId=" + surveyInitiativeId + "&active=" + surveyActive;

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
                        InitiativeId: { editable: false },
                        Initiative: { editable: false },
                        SurveyId: { editable: false },
                        Survey: { editable: false },
                        SupportLevelId: { editable: true },
                        SupportLevel: { editable: true },
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