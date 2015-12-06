// Define all global variables used throughout the entire solution.
var apiLoginUrl = "https://sts-dev.pciaa.net/api/pci/signin/issue";
var apiBaseServiceUrl = "http://dev.pciaa.net/pciwebsite/congressapi/legislators/";
var scope = "http://dev.pciaa.net/";
var token = null;
var personId = null;

function loginListViewDataInit(e)
{
    $("#loginForm input").keyup
    (
        function (e)
        { //inputs on login view should call authenticateUser() method on 'enter'
            if (e.keyCode === 13)
            {
                authenticateUser();

                $(this).blur(); //iOS likes to keep the keyboard open ... so remove focus to close it
            }
        }
    );
}

function loginListViewDataShow(e)
{
    var rememberMe = localStorage.getItem("RememberMe");
    var email = null;
    
    if (rememberMe === "true")
    {
        email = localStorage.getItem("Email");

        $("#email").val(email);
        $("#rememberme").data("kendoMobileSwitch").check(true);
    }
}

function authenticateUser()
{
    var allValid = true;
    var isValid = true;
    var validator = $("#loginForm").kendoValidator
        (
            {
                validateOnBlur: false
            }
        ).data("kendoValidator");

    $('#loginForm input').each
            (
                function ()
                {
                    $(this).parent().parent().find("li").find("span").removeClass('invalid');

                    isValid = validator.validateInput($(this));

                    if (!isValid)
                    {
                        if (allValid)
                        {
                            allValid = false;
                        }

                        $(this).parent().parent().find("li").find("span").addClass('invalid');

                        //return isValid;
                    }
                }
            );

    if (allValid)
    {
        var rememberme = $("#rememberme").data("kendoMobileSwitch");
        var email = $("#email").val();
        var password = $("#password").val();
        var $msg = $("#login-message");

        if (rememberme.check())
        {
            // Update email in local storage, in case of update.
            localStorage.setItem("Email", email);
        }

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
}

function loginRememberMeSwitchChange(e)
{
    if (e.checked)
    {
        var email = $("#email").val();

        localStorage.setItem("RememberMe", "true");
        localStorage.setItem("Email", email);
    }
    else
    {
        localStorage.setItem("RememberMe", "false");
        localStorage.setItem("Email", null);
    }
}