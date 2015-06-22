   var dsIssues = [
        {issueId:1,issue: "Parts", legislatorId:1,legislator:"Bonnie Watson Coleman", stanceId: 1 , stance:"Will not sponsor"},
        {issueId:2,issue: "Cyber",legislatorId:1,legislator:"Bonnie Watson Coleman",stanceId: 2,stance:"Will not sponsor" },
        {issueId:3,issue: "Global Regulatory Convergence",legislatorId:1,legislator:"Bonnie Watson Coleman",stanceId: 4,stance:"Will not sponsor" },
        {issueId:4,issue: "Tax Reform",legislatorId:1,legislator:"Bonnie Watson Coleman",stanceId: 1,stance:"Likely will not sponsor" },
        {issueId:5,issue: "Flood",legislatorId:1,legislator:"Bonnie Watson Coleman",stanceId: 2,stance:"Sponsor/Co-Sponsor" }

    ];

var  dataSourceIssues = new kendo.data.DataSource({
         data: dsIssues,
     	 batch: true,
    //,
          //  transport: {
          //      read:  {
          //          url: crudServiceBaseUrl + "/Products",
          //          dataType: "jsonp"
          //      },
          //      update: {
          //          url: crudServiceBaseUrl + "/Products/Update",
          //          dataType: "jsonp"
          //      },
          //      destroy: {
          //          url: crudServiceBaseUrl + "/Products/Destroy",    
          //          dataType: "jsonp"
           //     },
            //    parameterMap: function(options, operation) {
            //        if (operation !== "read" && options.models) {
           //             return {models: kendo.stringify(options.models)};
           //         }
           //     }    
          //  ,
         //   batch: true,
            schema: {
                model: {
                    id: "issueId",
                    fields: {
                        Id: "issueId",
                        Issue:"issue",
                        LegislatorId: "legislatorId",
                        Legislator: "legislator",
                        StanceId: "stanceId",
                        Stance: "stance",
                      
                    }
                }
            }
        });

function issuesListViewDataBindInitFlat(e) {
    
        e.view.element.find("#issues-listview").kendoMobileListView({
            dataSource:dataSourceIssues ,
            template: $("#issues-listview-filtering-template").html()
        })
        .kendoTouch({
            filter: ">li",
            enableSwipe: true,
            touchstart: issuestouchstart,
            tap: issuesnavigate,
            swipe: issuesswipe
        });
    }


   function issuesnavigate(e) {
        var itemUID = $(e.touch.currentTarget).data("uid");
        kendo.mobile.application.navigate("views/issue.html?uid=" + itemUID);
    }

    function issuesswipe(e) {
        var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
        button.expand().duration(200).play();
    }

    function issuestouchstart(e) {
        var target = $(e.touch.initialTouch),
            listview = $("#issues-listview").data("kendoMobileListView"),
            model,
            button = $(e.touch.target).find("[data-role=button]:visible");

        if (target.closest("[data-role=button]")[0]) {
            model = dataSourceIssues.getByUid($(e.touch.target).attr("data-uid"));
            dataSourceIssues.remove(model);

            //prevent `swipe`
            this.events.cancel();
            e.event.stopPropagation();
        } else if (button[0]) {
            button.hide();

            //prevent `swipe`
            this.events.cancel();
        } else {
            listview.items().find("[data-role=button]:visible").hide();
        }
    }

  