var supportLevelsOptionsDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "supportlevels",
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
                    id: "SupportLevelId",
                    fields:
                    {
                        Value: "SupportLevelId",
                        Text: "SupportLevelText"
                    }
                }
            }
        }
    );

function surveyQuestionListViewDataInit(e)
{
    
}

function surveyQuestionListViewDataShow(e)
{
    var uid = e.view.params.uid;
    var surveyQuestionModel = initiativeSurveyDataSource.getByUid(uid);
    
    $("#surveyquestionuid")[0].value = uid;

    var viewModel = kendo.observable({
        surveyQuestionItem: surveyQuestionModel,
        supportLevelsOptions: supportLevelsOptionsDataSource
    });

    kendo.bind(e.view.element, viewModel, kendo.mobile.ui);
    
    $('#surveyquestioncomments').val(surveyQuestionModel.Comments);

    var navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");

    navbar.title(surveyQuestionModel.Initiative);
    
    var saveButton = e.view.element.find("#save-button").data("kendoMobileButton");

    saveButton.unbind("click");
    saveButton.bind
    (
        "click",
        function ()
        {
            initiativeSurveyDataSource.sync();

            app.navigate("#:back");
        }
    );
}

function openModalSurveyQuestionComments(e)
{
    var model = initiativeSurveyDataSource.getByUid($("#surveyquestionuid")[0].value);

    $('#surveyquestioncomments').val(model.Comments);

    $("#modalsurveyquestioncomments").data("kendoMobileModalView").open();
}

function updateModalSurveyQuestionComments(e)
{
    var model = initiativeSurveyDataSource.getByUid($("#surveyquestionuid")[0].value);

    model.set("Comments", $('#surveyquestioncomments').val());

    $("#modalsurveyquestioncomments").data("kendoMobileModalView").close();
}

function cancelModalSurveyQuestionComments(e)
{
    $("#modalsurveyquestioncomments").data("kendoMobileModalView").close();
}