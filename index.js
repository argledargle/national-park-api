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
    for (let i = 0; i < responseJson.items.length; i++){
    // we have to append our results from the responseJson to our results
    // doing this in our loop will loop through all results, allowing us
    // to display:
    //  Full name
    //  Description
    //  Website URL (link)
    //  Address
      $('#results-list').append(
        `<li><h3>${responseJson.items[i].snippet.title}</h3>
        <p>${responseJson.items[i].snippet.description}</p>
        <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
        </li>`
      )};
    //display the results section  
    $('#results').removeClass('hidden');
  };
  