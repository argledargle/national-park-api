'use strict'

const apiKey = 'Co4X2mi1aYuaKp4urjFsk2bfL1GD02uxhnWiJSNi'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

// we have to format the text box, code below

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  };

// we need to display results, code below

function displayResults(responseJson) {
    // console log to help us figure out if we have the right data
    console.log(responseJson);
    // gotta clear out our previous results :)
    $('#results-list').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.data.length; i++){
    // we have to append our results from the responseJson to our results
    // doing this in our loop will loop through all results, allowing us
    // to display:
    //  Full name
    //  Description
    //  Website URL (link)
    //  Address
      $('#results-list').append(
        `<li><a href="${responseJson.data[i].url}" target="_blank"><h3>${responseJson.data[i].name}</h3></a>
        <p>${responseJson.data[i].description}</p>
        <p><a href="${responseJson.data[i].directionsurl}" target="_blank">Get directions</a></p>
        </li>`
      )};
    // can't forget to display it after we build it! :)  
    $('#results').removeClass('hidden');
  };

// now we need to get our results
  
// let's format our search
  function getParks(query, maxResults=50) {
    const params = {
      api_key: apiKey,
      stateCode: query,
      maxResults,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
// let's make sure our search is the right format
    console.log(url);
// now that we have the right format, we need to fetch  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }
// let's keep an eye on any action from the form and then do the stuff.
  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      const maxResults = $('#js-max-results').val();
      getParks(searchTerm, maxResults);
    });
  }
// can't forget to actually start the watchForm function.
  $(watchForm);