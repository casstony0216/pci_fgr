var initiativeSurveyDataSource = null;
var initiativeSurveyLegislatorId = null;
var initiativeSurveyInitiativeId = null;
var initiativeSurveyActive = "Y";

function initiativeSurveyListViewDataInit(e)
{
    e.view.element.find("#initiativeSurveyListView")
        .kendoMobileListView
        (
            {
                dataSource: initiativeSurveyDataSource,
                template: $("#initiativeSurveyListViewTemplate").html(),
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
                tap: initiativeSurveyTap
            }
        );
}

function initiativeSurveyListViewDataShow(e)
{
    initiativeSurveyLegislatorId = e.view.params.legislatorId;
    initiativeSurveyInitiativeId = e.view.params.initiativeId;

    setInitiativeSurveyDataSource();

    var uid = e.view.params.uid;
    var initiativeSurveyModel = initiativeSurveysDataSource.getByUid(uid);
    var navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");

    navbar.title(initiativeSurveyModel.Initiative);

    $("#initiativeSurveyListView").data("kendoMobileListView").setDataSource(initiativeSurveyDataSource);

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

function initiativeSurveyTap(e)
{
    var uid = $(e.touch.currentTarget).data("uid");
    var url = "views/surveyquestion.html?uid=";

    app.navigate(url + uid);
}

function onInitiativeSurveyGroupSelect(e)
{
    var index = this.current().index();

    if (index === 0)
    {
        initiativeSurveyActive = "Y";
    }
    else
    {
        initiativeSurveyActive = "N";
    }

    setInitiativeSurveyDataSource();

    $("#initiativeSurveyListView").data("kendoMobileListView").setDataSource(initiativeSurveyDataSource);
}

function setInitiativeSurveyDataSource()
{
    var apiUrl = apiBaseServiceUrl + "legislatorsurveys?legislatorId=" + initiativeSurveyLegislatorId + "&initiativeId=" + initiativeSurveyInitiativeId + "&active=" + initiativeSurveyActive;

    initiativeSurveyDataSource = new kendo.data.DataSource
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
                    id: "InitiativeSurveyId",
                    fields:
                    {
                        LegislatorId: { editable: false },
                        InitiativeId: { editable: false },
                        Initiative: { editable: false },
                        InitiativeSurveyId: { editable: false },
                        InitiativeSurvey: { editable: false },
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