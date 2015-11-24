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

    var viewModel = kendo.observable({
        surveyQuestionItem: surveyQuestionModel,
        supportLevelsOptions: supportLevelsOptionsDataSource
    });

    kendo.bind(e.view.element, viewModel, kendo.mobile.ui);

    var navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");

    navbar.title(surveyQuestionModel.Initiative);

    e.view.element.find("#save-button")
        .data("kendoMobileButton")
            .bind
            (
                "click",
                function ()
                {
                    initiativeSurveyDataSource.sync();

                    app.navigate("#:back");
                }
            );
}