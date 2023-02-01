function userInformationHTML(user) {
    /* same function like below
    user is the Object thats returnde from the GitHub API
    This Object has many methods (console.log(user)) */
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)         
            </span>
            /* this is the link to the users gitHub */
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function repoInformationHTML(repos) {
    /* repos is the object returned from the GitHub API */
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {
        /* else: map-method is like forEach and returnes an array */
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
            /* this part just shows the result: A list with all repos... */
}


function fetchGitHubInformation(event) {
    /* the oninput event from github.html */
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    var username = $("#gh-username").val();
    /* jQuery to get take thevalue of variable with id gh-username */
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);
        /* this is to display a animated loader (a loading-GIF) */

        $.when(
            /* when is a jQ promice method which takes a function */
            $.getJSON(`https://api.github.com/users/${username}`),
            /* that function is another function. This takes the user GITHUB-API */
            $.getJSON(`https://api.github.com/users/${username}/repos`)
        ).then(
            function(firstResponse, secondResponse) {
                /* when this is done, then we get a respose from getJSON function with respose function */
                /* since we get 2 APIs, we need 2 arguments and we get two responses */
                var userData = firstResponse[0];
                var repoData = secondResponse[0];
                /* When we do two calls, the when() method packs a response up into arrays.
                And each one is the first element of the array.*/
                $("#gh-user-data").html(userInformationHTML(userData));
                /* the respomse is now set into the another function from the div */
                $("#gh-repo-data").html(repoInformationHTML(repoData));
            },
            function(errorResponse) {
                if (errorResponse.status === 404) {
                    /* thats a not found error */
                    $("#gh-user-data").html(
                        `<h2>No info found for user ${username}</h2>`);
                } else if (errorResponse.status === 403) {
                    var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
                    $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
                    /* this error comes as github protection if too many requests 
                    we get how long to wait and give the information to the user */
                } else {
                    console.log(errorResponse);
                    $("#gh-user-data").html(
                        `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                        /* if its another error we get this */
                }
            });
}

$(document).ready(fetchGitHubInformation);
/* this provides my repos at the beginning */