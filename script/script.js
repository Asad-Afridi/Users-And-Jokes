document.getElementById("login").addEventListener("click", async function(event){

  //This is to stop the page from reloading when the button is clicked.
  event.preventDefault();

  var profiles = [];

  for(let i = 0; i < 40; i++){
    let object = await getObject();
    profiles.push(object);
  }

  var parsedObjects = "";

  for(let item of profiles){
    parsedObjects += getProfileItem(item);
  }

  document.getElementById("profile-container").classList.remove("login-container");
  document.getElementById("profile-container").classList.add("profile-container");
  document.getElementById("profile-container").innerHTML = parsedObjects;

});


async function getObject(){
  return {user: await getUser(),activity: await getActivity(), joke: await getJoke()};
}

async function getUser(){
  const userAPI = "https://randomuser.me/api/";
  return fetch(userAPI)
          .then((response) => {return response.json()})
          .then((json) => {return parseUser(json)})
          .catch(error => {console.log(error)});
}

function parseUser(json){
  let user = {};
  user.gender = json.results[0].gender;
  user.firstName = json.results[0].name.first;
  user.lastName = json.results[0].name.last;
  user.picture = json.results[0].picture.large;
  return user;
}

async function getJoke(){
  const jokeAPI = "https://official-joke-api.appspot.com/random_joke";
  return fetch(jokeAPI)
          .then((response) => {return response.json()})
          .then((json) => {return {setup: json.setup, punchline: json.punchline};
          })
          .catch(error => {console.log(error)});

}

async function getActivity(){
  const activityAPI = "https://www.boredapi.com/api/activity";
  return fetch(activityAPI)
          .then((response) => {return response.json()})
          .then((json) => {
            return json.activity;
          })
          .catch(error => {console.log(error)});
}

function getProfileItem(object){
  let profileItem = "";

  profileItem += "<div class='profile-item'>";
  profileItem += "<img src='" + object.user.picture + "' />";
  profileItem += '<div class="profile-info">'
  profileItem += '<h2>' + object.user.firstName + ' ' + object.user.lastName + '</h2>';
  profileItem += '<h5>' + object.user.gender + '</h5>';

  profileItem += '<p class="heading">Favorite Activity:</p>';
  profileItem += '<p>' + object.activity + '</p>';

  if(object.joke !== undefined){
    profileItem += '<p class="heading">Favorite Joke:</p>';
    profileItem += '<p>' + object.joke.setup + '</p>';
    profileItem += '<p>' + object.joke.punchline + '</p>';
  }

  profileItem += '</div>';
  profileItem += '</div>';

  return profileItem;
}
