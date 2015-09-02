var masterUid;

var relationshipModel = kendo.data.Model.define({
    id: "Id" ,
    
    fields: {
        Id:{type:"number"},
        PersonId:{type:"number"},
        LegislatorId:{type:"number"}
}
    });

//var Person = kendo.data.Model.define({
 //   id: "personId", // the identifier of the model
  //  fields: {
   //     "name": {
   //         type: "string"
    //    },
    //    "age": {
    //        type: "number"
    //    }
   // }
//});

var relationshipViewModel = kendo.observable({
    LegislatorId: 0,
    dataSource: new kendo.data.DataSource({
        //serverFiltering: true,
        batch: false,
        transport: {
            read: {
                type: "get",
                url: "http://dev.pciaa.net/pciwebsite/congressapi/legislators/relationships",
                dataType: "json",
                success: function (jqXhr, textStatus) {
                    var obj = jQuery.parseJSON( jqXhr.responseText);
					if(obj.PersonId!=null){
                        //alert('Entry Saved Successfully!');
                    }else{
                        alert(obj.message);
                    }  
                },
                error: function (xhr, error) {
                    alert("error " + xhr.responseText);
                    
                },
            },
             update: {
                type: "put",
                url: "http://dev.pciaa.net/pciwebsite/congressapi/legislators/relationshipupdate",
                dataType: "json",
                contentType: "application/json",
                success: function (jqXhr, textStatus) {
                    var obj = jQuery.parseJSON( jqXhr.responseText);
					if(obj.Success=='true'){
                        alert('Entry Saved Successfully!');
                    }else{
                        alert(obj.message);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("error " + xhr.responseText);
                    
                },
            },
              create: {
                type: "post",
                url: "http://dev.pciaa.net/pciwebsite/congressapi/legislators/relationshipcreate",
                dataType: "json",
                contentType: "application/json",
                success: function (jqXhr, textStatus) {
                   var obj = jQuery.parseJSON( jqXhr.responseText);
					if(obj.Success=='true'){
                        alert('Entry Saved Successfully!');
                    }else{
                        alert(obj.message);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("error " + xhr.responseText);
                    
                },
            },
             destroy: {
                type: "post",
                url: "http://dev.pciaa.net/pciwebsite/congressapi/legislators/relationshipdelete",
                dataType: "json",
                contentType: "application/json",
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("error " + xhr.responseText);
                    
                },
            },
            parameterMap: function (options, type) {
                if (type === 'read') {
                    return {
                        LegislatorId: relationshipViewModel.LegislatorId
                    };
                }
                
                //pass the model to the url
                if (type !== "read") {
                    
           				 return kendo.stringify(options);
          		}
                
              // if (type !== "read" ) {
           	//			 return {LegislatorRelationship: kendo.stringify(options)};
          //		}
                
            }
        },
       
      schema: 
        {
			model: relationshipModel
        }
    })
});





function relationsDetailShow(e) {
     masterUid = e.view.params.uid;   

    var model = legislatorsDataSource.getByUid(masterUid);

    relationshipViewModel.set("LegislatorId", model.LegislatorId);
    relationshipViewModel.dataSource.read();

    $("#relations-listview").kendoMobileListView({ dataSource: relationshipViewModel.dataSource, template: $("#relationsListViewTemplate").html() });
}


function relationsListViewDataBindInit(e) 
{
    e.view.element.find("#relations-listview")
        .kendoMobileListView
        (
            { 
             //   dataSource:  relationDataDataSource,
                template: $("#relationsListViewTemplate").html(),
             }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true,
                touchstart: relationstouchstart,
                tap: relationsnavigate,
               // swipe: relationsswipe
            }
        );
    
    
      e.view.element.find("#collapsible").kendoMobileButtonGroup();
}

function relationsnavigate(e) 
{
    masterUid = $(e.touch.currentTarget).data("uid");
    
    kendo.mobile.application.navigate("views/legislatorPciRelation.html?uid=" + masterUid);
}

function relationsswipe(e) 
{
    var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
    
    button.expand().duration(200).play();
}

function relationstouchstart(e) 
{
    var target = $(e.touch.initialTouch),
        listview = $("#relations-listview").data("kendoMobileListView"),
        model,
        button = $(e.touch.target).find("[data-role=button]:visible");

    if (target.closest("[data-role=button]")[0]) 
    {
        model =  relationshipViewModel.dataSource.getByUid($(e.touch.target).attr("data-uid"));
        relationshipViewModeldataSource.remove(model);

        //prevent `swipe`
        this.events.cancel();
        e.event.stopPropagation();
    } 
    else if (button[0]) 
    {
        button.hide();

        //prevent `swipe`
        this.events.cancel();
    } 
    else 
    {
        listview.items().find("[data-role=button]:visible").hide();
    }
}





///detail page scripts
function relationDetailShow(e) {
    masterUid = e.view.params.uid;

    var model = relationshipViewModel.dataSource.getByUid(masterUid);

    kendo.bind(e.view.element, model, kendo.mobile.ui);


 //   $("#relations-listview").kendoMobileListView({ dataSource: relationshipViewModel.dataSource, template: $("#relationsListViewTemplate").html() });
    
}

function addRelationship(personId){
      var item = {  
       // Id: personId,    //$("#txtFirstName").val(),
        PersonId: personId,    //$("#txtFirstName").val(),
		LegislatorId: parseInt(relationshipViewModel.LegislatorId),    //$("#txtLastName").val()
        Notes:'',    //$("#txtLastName").val()
        ImageUrl:'',    //$("#txtLastName").val(),
        FullName: '',
        Company: '',
        EmailAddress: '',  
        WorkPhone: '',  
        StreetAddress: '',  
        Title: ''         
		}
 
		relationshipViewModel.dataSource.add(item);
		relationshipViewModel.dataSource.sync();

}


function relationDetailInit(e) 
{
    var view = e.view;
    
    view.element.find("#back").data("kendoMobileBackButton").bind("click", function(e) 
    {
        e.preventDefault();
        
       view.loader.hide();
       kendo.mobile.application.navigate("#:back");
        
        
        
      //  relationshipViewModel.dataSource.one
       // (
       //     "change", function() 
//			{
 //               view.loader.hide();addNavigate
  //              kendo.mobile.application.navigate("#:back");
   //     	}  
    //    );

        //view.loader.show();
       //  relationshipViewModel.dataSource.cancelChanges();   
    }); 
}


    function save(e) {
        var item = relationshipViewModel.dataSource.getByUid(masterUid);
        var notes= $("#notes").val();
        item.set("Notes", notes);
        relationshipViewModel.dataSource.sync();    
    }


    function del(e) {
        var item = relationshipViewModel.dataSource.getByUid(masterUid);
        relationshipViewModel.dataSource.remove(item);
        relationshipViewModel.dataSource.sync();    

    }

function addNavigate(e) 
{
    var itemUID = $(e.touch.currentTarget).data("uid");
    
    kendo.mobile.application.navigate("views/legislator.html?uid=" + itemUID);
}

function relationshipSelectNavigate(e) 
{
    var itemUID = $(e.touch.currentTarget).data("uid");
    var item = profileViewModel.dataSource.getByUid(itemUID);
    var personId=item.PersonId;

    
    //now add the person
    addRelationship(personId);
    
    
    
   // kendo.mobile.application.navigate("views/legislatorPciRelation.html);
    
}


////add form code
function relationDetailAddInit(e) 
{
   // profileViewModel.dataSource.read();

    
       e.view.element.find("#relationsadd-listview")
        .kendoMobileListView
        (
            { 
                dataSource: profileViewModel.dataSource,
                template: $("#relationsAddListViewTemplate").html(),
                filterable: {
                autoFilter: false
        }

            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true,
              //  touchstart: legislatorstouchstart,
                tap: relationshipSelectNavigate,
              //  swipe: legislatorsswipe
            }
        );
    
}

