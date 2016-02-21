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

    // Set the editor id to the current person id in case the survey question is saved.  This is for audit tracking purposes.
    surveyQuestionModel.EditorId = personId;
    
    $("#surveyquestionuid")[0].value = uid;

    // Determine if the support level has been set and default to the first item if not.
    if (surveyQuestionModel.SupportLevelId === undefined || surveyQuestionModel.SupportLevelId === null || surveyQuestionModel.SupportLevelId === 0)
    {
        if (supportLevelsOptionsDataSource.data().length > 0)
        {
            var data = supportLevelsOptionsDataSource.data();
            
            surveyQuestionModel.SupportLevelId = data[0].Value;
            surveyQuestionModel.SupportLevel = data[0].Text;
        }
        else
        {
            supportLevelsOptionsDataSource.fetch
            (
                function ()
                {
                    surveyQuestionModel.SupportLevelId = this.data()[0].Value;
                    surveyQuestionModel.SupportLevel = this.data()[0].Text;
                }
            );
        }
    }

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

    e.view.scroller.reset();
}

function openModalSurveyQuestionComments(e)
{
    var model = initiativeSurveyDataSource.getByUid($("#surveyquestionuid")[0].value);

    $('#surveyquestioncomments').val(model.Comments);

    $("#modalsurveyquestioncomments").data("kendoMobileModalView").open();
}

function closeModalSurveyQuestionComments(e)
{
    var model = initiativeSurveyDataSource.getByUid($("#surveyquestionuid")[0].value);

    model.set("Comments", $('#surveyquestioncomments').val());

    $("#modalsurveyquestioncomments").data("kendoMobileModalView").close();
}