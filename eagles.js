// This is an example of how we'd use AJAX to update the page
// the drop down will call this function and update the div
var position;

// I think we should use a hash table to store the stats
// this will make it easier to save after making two calls to API
var statsHash = {};

var teamName;
var teamCity;

function updateStats(){

	// this will set "position" to the text of the selected item in your drop down list
	position = select1.options[select1.selectedIndex].innerHTML;
	// then we'll call another function to make a call to an API using that position
	sendRequest1();
	sendRequest2();

}

// here we send a request to the stats API
function sendRequest1(){

	const request1 = new XMLHttpRequest();
	request1.onreadystatechange = function() {handleResponse(request1, 18);};
	// call to api
	request1.open("GET", "https://api.mysportsfeeds.com/v2.0/pull/nfl/2018-regular/team_stats_totals.json?team=phi", true);
	// authorization code (64 bit encoded)
	request1.setRequestHeader("Authorization","Basic MDE1YWViOGMtMDJkYS00MDQ1LTljYzMtMjM4YjJmOk1ZU1BPUlRTRkVFRFM=");
	request1.send();
}
function sendRequest2(){

	const request2 = new XMLHttpRequest();
	request2.onreadystatechange = function() {handleResponse(request2, 17);};
	// call to api
	request2.open("GET", "https://api.mysportsfeeds.com/v2.0/pull/nfl/2017-2018-regular/team_stats_totals.json?team=phi", true);
	// authorization code (64 bit encoded)
	request2.setRequestHeader("Authorization","Basic MDE1YWViOGMtMDJkYS00MDQ1LTljYzMtMjM4YjJmOk1ZU1BPUlRTRkVFRFM=");
	request2.send();
}

// here we handle the response
function handleResponse(request, season){
	// http requests status codes
	// 0 = unsent, 1 = opened, 2 = headers recieved, 3 = loading, 4 = done
	if(request.readyState == 4) {
		if(request.status == 200){
			// create an object that has the response stored in it (from JSON data)
			var teamStats = JSON.parse(request.responseText);
			storeStats(teamStats, season);
		}
		else{
			console.log("ERROR: " + request.statusText);
		}
	}
}

// parameter is just stats from "handleResponse()"
function storeStats(st, season){
	if(season == 17){
		statsHash['Season17'] = {};
		statsHash.Season17 = st.teamStatsTotals[0].stats;
	}
	else{
		statsHash['Season18'] = {};
		statsHash.Season18 = st.teamStatsTotals[0].stats;
		teamName = st.teamStatsTotals[0].team.name;
		teamCity = st.teamStatsTotals[0].team.city;
	}

	if(statsHash.hasOwnProperty('Season18') && statsHash.hasOwnProperty('Season17')){
		writeStats();
	}
}

// here we parse through the json data we recieved, and store the stats we want to use
function writeStats(){

	console.log(teamCity + " " + teamName);

	// adding elements recieved to the table
	if(position == "QB"){

		// pass stats
		var passGrossYards18 = statsHash.Season18.passing.passGrossYards;
		var passAttempts18 = statsHash.Season18.passing.passAttempts;
		var passCompletions18 = statsHash.Season18.passing.passCompletions;
		var passTDs18 = statsHash.Season18.passing.passTD;
		var passPct18 = statsHash.Season18.passing.passPct;
		var passYardsPerAtt18 = statsHash.Season18.passing.passYardsPerAtt;
		var passInt18 = statsHash.Season18.passing.passInt;
		var passSacks18 = statsHash.Season18.passing.passSacks;
		var passGrossYards17 = statsHash.Season17.passing.passGrossYards;
		var passAttempts17 = statsHash.Season17.passing.passAttempts;
		var passCompletions17 = statsHash.Season17.passing.passCompletions;
		var passTDs17 = statsHash.Season17.passing.passTD;
		var passPct17 = statsHash.Season17.passing.passPct;
		var passYardsPerAtt17 = statsHash.Season17.passing.passYardsPerAtt;
		var passInt17 = statsHash.Season17.passing.passInt;
		var passSacks17 = statsHash.Season17.passing.passSacks;

		document.getElementById("stats").innerHTML = "<br><table><tr><th>Stat Description</th><th><strong>2017</strong></th><th><strong>2018</strong></th><th>Charts</th>"
													+ "</tr><tr><td>Passing Yards" + "</td><td>" + passGrossYards17
													+ "</td><td>" + passGrossYards18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Passing Attempts" + "</td><td>" + passAttempts17
													+ "</td><td>" + passAttempts18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Passing Completions" + "</td><td>" + passCompletions17
													+ "</td><td>" + passCompletions18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Passing TDs" + "</td><td>" + passTDs17
													+ "</td><td>" + passTDs18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Pass Percentage" + "</td><td>" + passPct17
													+ "</td><td>" + passPct18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Pass Yards Per Attempt" + "</td><td>" + passYardsPerAtt17
													+ "</td><td>" + passYardsPerAtt18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Interceptions" + "</td><td>" + passInt17
													+ "</td><td>" + passInt18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Quarterback Sacked" + "</td><td>" + passSacks17
													+ "</td><td>" + passSacks18 + "</td><td>Chart Here" + "</td></table>"
	}
	else if(position == "RB"){

		// rush stats
		var rushAttempts18 = statsHash.Season18.rushing.rushAttempts;
		var rushYards18 = statsHash.Season18.rushing.rushYards;
		var rushTDs18 = statsHash.Season18.rushing.rushTD;
		var rushAverage18 = statsHash.Season18.rushing.rushAverage;
		var rush1stDowns18 = statsHash.Season18.rushing.rush1stDowns;
		var rushFumbles18 = statsHash.Season18.rushing.rushFumbles;
		var rushAttempts17 = statsHash.Season17.rushing.rushAttempts;
		var rushYards17 = statsHash.Season17.rushing.rushYards;
		var rushTDs17 = statsHash.Season17.rushing.rushTD;
		var rushAverage17 = statsHash.Season17.rushing.rushAverage;
		var rush1stDowns17 = statsHash.Season17.rushing.rush1stDowns;
		var rushFumbles17 = statsHash.Season17.rushing.rushFumbles;

		document.getElementById("stats").innerHTML = "<br><table><tr><th>Stat Description</th><th><strong>2017</strong></th><th><strong>2018</strong></th><th>Charts</th>"
													+ "</tr><tr><td>Rushing Attempts" + "</td><td>" + rushAttempts17
													+ "</td><td>" + rushAttempts18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Rushing Yards" + "</td><td>" + rushYards17
													+ "</td><td>" + rushYards18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Average Yards Per Attempt" + "</td><td>" + rushAverage17
													+ "</td><td>" + rushAverage18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Rushing TDs" + "</td><td>" + rushTDs17
													+ "</td><td>" + rushTDs18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Rushing 1st Downs" + "</td><td>" + rush1stDowns17
													+ "</td><td>" + rush1stDowns18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Rushing Fumbles" + "</td><td>" + rushFumbles17
													+ "</td><td>" + rushFumbles18 + "</td><td>Chart Here" + "</td></table>"
	} 
	else{

		// receiving stats
		var receptions18 = statsHash.Season18.receiving.receptions;
		var recYards18 = statsHash.Season18.receiving.recYards;
		var recTDs18 = statsHash.Season18.receiving.recTD;
		var recAverage18 = statsHash.Season18.receiving.recAverage;
		var rec1stDowns18 = statsHash.Season18.receiving.rec1stDowns;
		var recFumbles18 = statsHash.Season18.receiving.recFumbles;
		var receptions17 = statsHash.Season17.receiving.receptions;
		var recYards17 = statsHash.Season17.receiving.recYards;
		var recTDs17 = statsHash.Season17.receiving.recTD;
		var recAverage17 = statsHash.Season17.receiving.recAverage;
		var rec1stDowns17 = statsHash.Season17.receiving.rec1stDowns;
		var recFumbles17 = statsHash.Season17.receiving.recFumbles;

		document.getElementById("stats").innerHTML = "<br><table><tr><th>Stat Description</th><th><strong>2017</strong></th><th><strong>2018</strong></th><th>Charts</th>"
													+ "</tr><tr><td>Receptions" + "</td><td>" + receptions17
													+ "</td><td>" + receptions18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Reception Yards" + "</td><td>" + recYards17
													+ "</td><td>" + recYards18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Average Yards Per Reception" + "</td><td>" + recAverage17
													+ "</td><td>" + recAverage18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Reception TDs" + "</td><td>" + recTDs17
													+ "</td><td>" + recTDs18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Reception 1st Downs" + "</td><td>" + rec1stDowns17
													+ "</td><td>" + rec1stDowns18 + "</td><td>Chart Here"
													+ "</tr><tr><td>Reception Fumbles" + "</td><td>" + recFumbles17
													+ "</td><td>" + recFumbles18 + "</td><td>Chart Here" + "</td></table>"
	}

}

function clearStats(){
	document.getElementById("stats").innerHTML = "<p>Select a position above to see the 2017 to 2018 comparison.</p>";
}