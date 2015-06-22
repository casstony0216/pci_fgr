  function mobileListViewFiltering() {
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                }
            },
            sort: {
                field: "ProductName",
                dir: "desc"
            },
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            pageSize: 50
        });

        $("#filterable-listview").kendoMobileListView({
            dataSource: dataSource,
            template: $("#mobile-listview-filtering-template").text(),
            filterable: {
                field: "ProductName",
                operator: "startswith"
            },
            endlessScroll: true
        });
    }

