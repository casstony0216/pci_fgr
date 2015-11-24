var apiLoginUrl = "https://sts-dev.pciaa.net/api/pci/signin/issue";
var apiBaseServiceUrl = "http://dev.pciaa.net/pciwebsite/congressapi/legislators/";
var scope = "http://dev.pciaa.net/";
var token = null;
var personId = null;

function authenticateUser()
{
    var email = $("#email").val();
    var password = $("#password").val();
    var $msg = $("#login-message");

    $.ajax({
        url: apiLoginUrl,
        data: { EmailAddress: email, Password: password, Scope: scope },
        dataType: "json",
        type: "POST",
        success: function (data)
        {
            if (data.AccessToken !== null)
            {
                token = data.AccessToken;

                var personIdPosition = token.toLowerCase().indexOf("&personid=") + 10;
                var firstNamePosition = token.toLowerCase().indexOf("&firstname=");

                personId = token.slice(personIdPosition, firstNamePosition);

                $msg.hide();

                app.navigate("views/legislators.html");
            }
            else
            {
                $msg.html("Access token returned with a null value.").show();
            }
        },
        error: function (xhr, status, error)
        {
            alert(xhr.responseText)
        }
    });
}