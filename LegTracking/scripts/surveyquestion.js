var responsesOptionsDataSource = null;

function surveyQuestionListViewDataInit(e)
{
    
}

function surveyQuestionListViewDataShow(e)
{
    var uid = e.view.params.uid;
    var surveyQuestionModel = surveyDataSource.getByUid(uid);

    // Set the editor id to the current person id in case the survey question is saved.  This is for audit tracking purposes.
    surveyQuestionModel.EditorId = personId;
    
    $("#surveyquestionuid")[0].value = uid;

    setResponsesDataSource(surveyQuestionModel.SurveyQuestionId);

    // Determine if the response has been set and default to the first item if not.
    if (surveyQuestionModel.ResponseId === undefined || surveyQuestionModel.ResponseId === null || surveyQuestionModel.ResponseId === 0)
    {
        if (responsesOptionsDataSource.data().length > 0)
        {
            var data = responsesOptionsDataSource.data();
            
            surveyQuestionModel.ResponseId = data[0].Value;
            surveyQuestionModel.Response = data[0].Text;
        }
        else
        {
            responsesOptionsDataSource.fetch
            (
                function ()
                {
                    surveyQuestionModel.ResponseId = this.data()[0].Value;
                    surveyQuestionModel.Response = this.data()[0].Text;
                }
            );
        }
    }

    var viewModel = kendo.observable({
        surveyQuestionItem: surveyQuestionModel,
        responsesOptions: responsesOptionsDataSource
    });

    kendo.bind(e.view.element, viewModel, kendo.mobile.ui);
    
    $('#surveyquestioncomments').val(surveyQuestionModel.Comments);

    var navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");
    var surveyTitle = surveyQuestionModel.Survey;
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
    
    var saveButton = e.view.element.find("#save-button").data("kendoMobileButton");

    saveButton.unbind("click");
    saveButton.bind
    (
        "click",
        function ()
        {
            surveyDataSource.sync();

            app.navigate("#:back");
        }
    );

    e.view.scroller.reset();
}

function openModalSurveyQuestionComments(e)
{
    var model = surveyDataSource.getByUid($("#surveyquestionuid")[0].value);

    $('#surveyquestioncomments').val(model.Comments);

    $("#modalsurveyquestioncomments").data("kendoMobileModalView").open();
}

function closeModalSurveyQuestionComments(e)
{
    var model = surveyDataSource.getByUid($("#surveyquestionuid")[0].value);

    model.set("Comments", $('#surveyquestioncomments').val());

    $("#modalsurveyquestioncomments").data("kendoMobileModalView").close();
}

function setResponsesDataSource(surveyQuestionId)
{
    responsesOptionsDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "surveyresponseset?surveyQuestionId=" + surveyQuestionId,
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
                    id: "ResponseId",
                    fields:
                    {
                        Value: "ResponseId",
                        Text: "Response"
                    }
                }
            }
        }
    );
}