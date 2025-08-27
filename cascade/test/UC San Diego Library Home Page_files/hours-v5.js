/* Hours v5 -- A11y tweaks (SI) (2022-07-25) */

//-------------
// NAMESPACING
//-------------

var lpw = lpw || {}; // Library Public Website
lpw.hours = lpw.hours || {}; // Hours application

//-------------
// HOURS
//-------------

(function(){

	var data_cache_regular = {};
	var data_cache_special = {};

	var strings = {};
		strings.quarter_data_error = "QUARTER DATA NOT FOUND";
		strings.no_hours_data = "Unavailable";
		strings.data_url_prefix = "/hours/data/";
		strings.data_url_postfix = ".html";
		strings.regular_hours_id = "#regular-hours";
		strings.special_hours_id = "#special-hours";
		strings.invalid_location = "Invalid location";

	var location_data = [];

	var quarter_data =
		[
			{"quarter":"winter", "year":"2016", "start":"2016-01-04", "end":"2016-03-19"},
			{"quarter":"spring", "year":"2016", "start":"2016-03-24", "end":"2016-06-10"},
			{"quarter":"summer", "year":"2016", "start":"2016-06-27", "end":"2016-09-03"},
			{"quarter":"fall",   "year":"2016", "start":"2016-09-19", "end":"2016-12-10"},

			{"quarter":"winter", "year":"2017", "start":"2017-01-04", "end":"2017-03-25"},
			{"quarter":"spring", "year":"2017", "start":"2017-03-30", "end":"2017-06-16"},
			{"quarter":"summer", "year":"2017", "start":"2017-07-03", "end":"2017-09-09"},
			{"quarter":"fall",   "year":"2017", "start":"2017-09-25", "end":"2017-12-16"},

			{"quarter":"winter", "year":"2018", "start":"2018-01-03", "end":"2018-03-24"},
			{"quarter":"spring", "year":"2018", "start":"2018-03-28", "end":"2018-06-15"},
			{"quarter":"summer", "year":"2018", "start":"2018-07-02", "end":"2018-09-08"},
			{"quarter":"fall",   "year":"2018", "start":"2018-09-24", "end":"2018-12-15"},

			{"quarter":"winter", "year":"2019", "start":"2019-01-02", "end":"2019-03-23"},
			{"quarter":"spring", "year":"2019", "start":"2019-03-27", "end":"2019-06-14"},
			{"quarter":"summer", "year":"2019", "start":"2019-07-01", "end":"2019-09-07"},
			{"quarter":"fall",   "year":"2019", "start":"2019-09-23", "end":"2019-12-14"},

			{"quarter":"winter", "year":"2020", "start":"2020-01-02", "end":"2020-03-21"},
			{"quarter":"spring", "year":"2020", "start":"2020-03-25", "end":"2020-06-12"},
			{"quarter":"summer", "year":"2020", "start":"2020-06-29", "end":"2020-09-05"},
			{"quarter":"fall",   "year":"2020", "start":"2020-09-28", "end":"2020-12-19"},

			{"quarter":"winter", "year":"2021", "start":"2021-01-04", "end":"2021-03-20"},
			{"quarter":"spring", "year":"2021", "start":"2021-03-24", "end":"2021-06-11"},
			{"quarter":"summer", "year":"2021", "start":"2021-06-28", "end":"2021-09-04"},
			{"quarter":"fall",   "year":"2021", "start":"2021-09-20", "end":"2021-12-11"},

			{"quarter":"winter", "year":"2022", "start":"2022-01-03", "end":"2022-03-19"},
			{"quarter":"spring", "year":"2022", "start":"2022-03-23", "end":"2022-06-10"},
			{"quarter":"summer", "year":"2022", "start":"2022-06-27", "end":"2022-09-03"},
			{"quarter":"fall",   "year":"2022", "start":"2022-09-19", "end":"2022-12-10"},

			{"quarter":"winter", "year":"2023", "start":"2023-01-04", "end":"2023-03-25"},
			{"quarter":"spring", "year":"2023", "start":"2023-03-29", "end":"2023-06-16"},
			{"quarter":"summer", "year":"2023", "start":"2023-07-03", "end":"2023-09-09"},
			{"quarter":"fall",   "year":"2023", "start":"2023-09-25", "end":"2023-12-16"},

			{"quarter":"winter", "year":"2024", "start":"2024-01-03", "end":"2024-03-23"},
			{"quarter":"spring", "year":"2024", "start":"2024-03-27", "end":"2024-06-14"},
			{"quarter":"summer", "year":"2024", "start":"2024-06-15", "end":"2024-09-22"},
			{"quarter":"fall",   "year":"2024", "start":"2024-09-23", "end":"2024-12-14"},

			{"quarter":"winter", "year":"2025", "start":"2025-01-06", "end":"2025-03-22"},
			{"quarter":"spring", "year":"2025", "start":"2025-03-25", "end":"2025-06-28"},
			{"quarter":"summer", "year":"2025", "start":"2025-06-29", "end":"2025-09-21"},
			{"quarter":"fall",   "year":"2025", "start":"2025-09-22", "end":"2025-12-13"},

			{"quarter":"winter", "year":"2026", "start":"2026-01-02", "end":"2026-03-13"},
			{"quarter":"spring", "year":"2026", "start":"2026-03-29", "end":"2026-06-16"},
			{"quarter":"summer", "year":"2026", "start":"2026-06-17", "end":"2026-09-20"},
			{"quarter":"fall",   "year":"2026", "start":"2026-09-21", "end":"2026-12-12"},

			{"quarter":"winter", "year":"2027", "start":"2027-01-04", "end":"2027-03-12"},
			{"quarter":"spring", "year":"2027", "start":"2027-03-24", "end":"2027-06-04"},
			{"quarter":"summer", "year":"2027", "start":"2027-05-05", "end":"2027-09-19"},
			{"quarter":"fall",   "year":"2027", "start":"2027-09-20", "end":"2027-12-11"},

			{"quarter":"winter", "year":"2028", "start":"2028-01-05", "end":"2028-03-25"},
			{"quarter":"spring", "year":"2028", "start":"2028-03-29", "end":"2028-06-16"},
			{"quarter":"summer", "year":"2028", "start":"2028-06-17", "end":"2028-09-24"},
			{"quarter":"fall",   "year":"2028", "start":"2028-09-25", "end":"2028-12-16"},

			{"quarter":"winter", "year":"2029", "start":"2029-01-03", "end":"2029-03-24"},
			{"quarter":"spring", "year":"2029", "start":"2029-03-28", "end":"2029-06-15"},
			{"quarter":"summer", "year":"2029", "start":"2029-06-16", "end":"2029-09-15"}
		];
		// Note: 2024-2029 quarter data doesn't included summer sessions as the data wasn't availble from campus when this update was made (12/9/2021). Summer data for this period was set to the space between spring and fall.

	/**
	 * loadData -- Fetches and stores hours data.
	 */
	this.loadData = function(location, dateObject)
	{
		var url = lpw.hours.createDataUrl(location, dateObject);

		if (url !== strings.quarter_data_error)
		{
			if (typeof data_cache_regular[url] === "undefined") // Check cache
			{
				lpw.hours.loadDataHelper(url); // Load if not in cache
			}
		}

		return url;
	};

	/**
	 * loadDataHelper
	 */
	this.loadDataHelper = function(url)
	{

		$.ajax({url:url,async:false})

			.done
			(
				function(html)
				{
					// Cache parsed data
					data_cache_regular[url] = $.parseJSON($(html).filter(strings.regular_hours_id).text());
					data_cache_special[url] = $.parseJSON($(html).filter(strings.special_hours_id).text());
					
					html = null; // Discard fetched HTML
				}
			)

			.fail
			(
				function()
				{
					data_cache_regular[url] = [];
					data_cache_special[url] = {};
				}
			);
	};

	/**
	 * createDataUrl
	 */
	this.createDataUrl = function(location, dateObject)
	{
			var quarter_data = lpw.hours.getQuarterData(dateObject);
			if(quarter_data === strings.quarter_data_error)
			{
				return quarter_data;
			}
			else
			{
				return strings.data_url_prefix + quarter_data + location + strings.data_url_postfix;
			}
	};

	/**
	 * getHours -- Returns an object with the library hours of the given day.
	 *   @param {str} location
	 *   @param {obj} dateObject
	 *   @return {obj}
	 */
	this.getHours = function(location, dateObject)
	{
		var weekday = dateObject.getDay();
		var key = lpw.hours.loadData(location, dateObject);
		var data = {};

		if(
				key === strings.quarter_data_error ||
				data_cache_regular[key].length === 0 ||
				data_cache_regular[key][0] === "" ||
				data_cache_regular[key][0] === " – "
			)
		{
			data.isSpecial = false;
			data.hours = strings.no_hours_data;
		}
		else
		{
			var date = lpw.hours.checkSpecial(key, dateObject);

			if(date.isSpecial)
			{
				data.isSpecial = true;
				data.hours = date.hours;
				data.hours = data.hours.replace(/ /g, "&nbsp;").replace("&nbsp;–&nbsp;"," – "); // Adding non-breaking space betwwen time and period
				data.occasion = date.occasion;
			}
			else
			{
				data.isSpecial = false;
				data.hours = data_cache_regular[key][weekday];
				data.hours = data.hours.replace(/ /g, "&nbsp;").replace("&nbsp;–&nbsp;"," – "); // Adding non-breaking space betwwen time and period
			}
		
		}

		data.weekday = weekday;

		return data;
	};
	
	/**
	 * checkSpecial -- Returns an object with the special library hours data of the given day.
	 */
	this.checkSpecial = function(key, dateObject)
	{
		var startDate = null;
		var endDate = null;
		var special_hours = data_cache_special[key];
		var snowflake = {};
		snowflake.isSpecial = false;
		
		for(var i = 0; i < special_hours.length; i++)
		{
			if (special_hours[i].multi === true)
			{
				startDate = cmsDate(special_hours[i].start);	
				endDate = cmsDate(special_hours[i].end);

				if (dateObject >= startDate && dateObject <= endDate)
				{
					snowflake.isSpecial = true;
				}
			}
			else if(special_hours[i].multi === false)
			{
				startDate = cmsDate(special_hours[i].start);

				if (dateObject.getTime() === startDate.getTime()) // Need .getTime() to compare
				{
					snowflake.isSpecial = true;
				}
			}
			
			if(snowflake.isSpecial)
			{
				snowflake.occasion = special_hours[i].occasion;
				snowflake.hours = special_hours[i].hours;
				break;
			}

			startDate = null;
			endDate = null;
		}
		return snowflake;
	};
	
	/**
	 * getQuarterData -- Returns the UC San Diego Library quarter URL partial for
	 * 		the given date. The "quater URL partial" is used to load the right data
	 * 		file from the CMS. 
	 * 		
	 * 		Note: Library hours for a given quarter display from the quarter's
	 * 		start until the next quarter's start. The "end" date in the map refers
	 * 		to the actual academic quarter end date and is only used here in the
	 * 		case where a given quarter doesn't have a following quarter.
	 * 
	 *   @param {int} dateObject
	 *   @return {str}
	 */
	this.getQuarterData = function(dateObject)
	{
		var q = quarter_data;
		var output = strings.quarter_data_error;
	
		for(var i = 0; i < q.length; i++)
		{
			var quarter_start = cmsDate(q[i].start);
			var quarter_end = (typeof q[i+1] !== "undefined") ? cmsDate(q[i+1].start) : cmsDate(q[i].end);
		
			if(dateObject >= quarter_start && dateObject < quarter_end)	
			{
				output = q[i].year + "/" + q[i].quarter + "/";
				break;
			}
		}
		return(output);
	};

	/**
	 * draw
	 */
	this.draw = function(viewType, location, dateObject, LOCDATA)
	{
		location_data = LOCDATA; // Set local "global"

		var location_label = lpw.hours.getLocationLabel(location);
		var location_valid = (location_label.label !== strings.invalid_location) ? true : false;
		var output = "";

		if(location_valid)
		{
			switch(viewType)
			{
				case "month":
					output = lpw.hours.drawMonth(location, dateObject);
					break;

				case "week":
					//output += lpw.hours.drawWeekLabels(); // for use with "sun-sat-static-week"
					for(var i = 0; i < location_data.length; i++)
					{
						output += lpw.hours.drawWeek(location_data[i].id);
					}
					output = "<div class='hours-weekly'><h2>Locations</h2>" + output + "</div>";
					break;

				default:
					console.log("View not found.");
			}
		}
		return output;
	};

	/**
	 * getLocationLabel
	 */
	this.getLocationLabel = function(location)
	{

		var output = {};

		output.label = strings.invalid_location;

		for(var i = 0; i < location_data.length; i++)
		{
			if (location_data[i].id === location)
			{
				output.label = location_data[i].label;
				output.note = location_data[i].note;
				break;
			}
		}

		return output;
	};

	/**
	 * drawLocationMenu
	 */
	this.drawLocationMenu = function(location, dateObject)
	{
		var output = "<div class='loc-menu'><p>Switch location:</p><ul>";

		for(var i = 0; i < location_data.length; i++)
		{
			if (location_data[i].id !== location)
			{
				output += "<li><a href='?v=month&l=" + location_data[i].id + "&d=" + stdDate(dateObject) + "'>" + location_data[i].label + "</a></li>";
			}
		}

		output += "</ul></div>";
		return output;
	}

	/**
	 * drawMonth -- Draws the monthly view.
	 *   @param {str} location
	 *   @param {obj} dateObject
	 *   @return {str}
	 */
	this.drawMonth = function(location, dateObject)
	{
		var year = dateObject.getFullYear();
		var month = dateObject.getMonth();
		var length_this_month = daysInMonth(year,month);
		var this_days_hours;
		var today = new Date();
		var today = stdDate(today);
		var its_today = "";
		var this_day;
		var prev_query = "?v=month&l=" + location + "&d=" + pagerDate("Previous", dateObject);
		var next_query = "?v=month&l=" + location + "&d=" + pagerDate("Next", dateObject);
		var location_label = lpw.hours.getLocationLabel(location);
		var location_menu = lpw.hours.drawLocationMenu(location, dateObject);
		var location_note = (location_label.note != "") ? "<h3 class='loc-note'>" + location_label.note + "</h3>" : "";
		var output = "" +

			"<div class='month-header'>" +
				"<div class='loc-label'>" +
					"<h2>" + location_label.label + "</h2>" +
					location_note +
					"<a href='?'>Switch to weekly view &rarr;</a>" +
				"</div>" +
			"</div>" +

			"<div class='month-pager'>" + 
				"<div class='month-pager-title'>" + getPrettyMonth(month) + " " + year + "</div>" +
				"<div class='month-pager-control'><a href='"+prev_query+"'>&larr; Previous</a> <a href='"+next_query+"'>Next &rarr;</a></div>" +
			"</div>" +

			"<div class='col-labels'>" +
				"<div>Sunday</div>" +
				"<div>Monday</div>" +
				"<div>Tuesday</div>" +
				"<div>Wednesday</div>" +
				"<div>Thursday</div>" +
				"<div>Friday</div>" +
				"<div>Saturday</div>" +
			"</div>" +
			
			"<div class='flex'>";

		for(var i = 1; i <= length_this_month; i++)
		{
			this_day = new Date(year,month,i,1,0,0);
			this_days_hours = lpw.hours.getHours(location, this_day);
			its_today = (stdDate(this_day) === today) ? " its_today" : "";
			
			if(i === 1 && this_days_hours.weekday > 0)
			{
				for(j = 0; j < this_days_hours.weekday; j++)
				{
					output += "<div class='spacer'></div>";
				}
			}

			if(this_days_hours.isSpecial)
			{
				output += "" +
					"<div class='day special" + its_today+"'>" +
						"<div class='day-date'><span class='mobile-only'>" + getPrettyDay(this_days_hours.weekday) + ", " + getPrettyMonth(this_day.getMonth()) + "</span> " + i + "</div>" +
						"<div class='day-hours'>" + this_days_hours.hours + "</div>" +
						"<div class='day-occasion'>" + this_days_hours.occasion + "</div>" +
					"</div>";
			}
			else
			{
				output += "" +
					"<div class='day "+its_today+"'>" +
						"<div class='day-date'><span class='mobile-only'>" + getPrettyDay(this_days_hours.weekday) + ", " + getPrettyMonth(this_day.getMonth()) + "</span> " + i + "</div>" +
						"<div class='day-hours'>" + this_days_hours.hours + "</div>" +
					"</div>";
			}
				
			if(this_days_hours.weekday === 6)
			{
				output += "</div><div class='flex'>";
			}

			if(i === length_this_month && this_days_hours.weekday < 6)
			{
				for(j = 6; j > this_days_hours.weekday; j--)
				{
					output += "<div class='spacer'></div>";
				}
			}
		}
		output += "</div>";
		output = "<div class='hours-monthly'>" + output + location_menu + "</div>";

		return output;
	};

	/**
	 * drawWeek -- Draws the weekly view (Updated 2021-05-19)
	 * @param {String} location
	 */
	this.drawWeek = (location) => {
		let today = new Date();
		let todays_day_of_the_week = today.getDay();
		let one_weak = []; //nerve, here i born
		let this_day, this_days_hours, its_today;
		let location_label = lpw.hours.getLocationLabel(location);
		let location_note = (location_label.note != "") ? `<span>${location_label.note}</span>` : '';
		let output = `
			<div class='wv-location'>
				<h3>${location_label.label}</h3>
				${location_note}
				<a href='?v=month&l=${location}'>Switch to monthly view &rarr;</a>
			</div>
			<div id="wv-location-${location}" class="flex">
		`;

		// Build out the current week
		// Sun-Sat Static Version
		/*
		for(var i = 0; i < 7; i++)
		{
			one_weak[i] = new Date();
			one_weak[i] = one_weak[i].setDate(one_weak[i].getDate() - (todays_day_of_the_week - i));
			one_weak[i] = new Date(one_weak[i]);
		}	
		*/
		// Build out the current week
		// Next Seven Days Version
		for(let i = 0; i < 7; i++){
			one_weak[i] = new Date();
			one_weak[i] = one_weak[i].setDate(one_weak[i].getDate() + i);
			one_weak[i] = new Date(one_weak[i]);
		}	

		// Populate current week with hours data
		for(let i = 0; i < 7; i++){
			this_day = new Date(one_weak[i].getFullYear(),one_weak[i].getMonth(),one_weak[i].getDate(),1,0,0);
			this_days_hours = lpw.hours.getHours(location, this_day);
			its_today = (stdDate(this_day) === stdDate(today)) ? 'its_today' : '';
			yoyo = (its_today !== '') ? `Today's Hours (${getPrettyMonth(this_day.getMonth())}&nbsp;${this_day.getDate()})` : `${getPrettyDay(this_day.getDay())}, ${getPrettyMonth(this_day.getMonth())} ${this_day.getDate()}`;
			
			if(this_days_hours.isSpecial){
				output += `
					<div class='${its_today} special'>
						<div class='mobile-only'>${yoyo}</div>
						<div class='day-hours'>${this_days_hours.hours}</div>
						<div class='day-seats'></div>
						<div class='day-occasion'>${this_days_hours.occasion}</div>
					</div>
				`;
			}
			else{
				output += `
					<div class='${its_today}'>
						<div class='mobile-only'>${yoyo}</div>
						<div class='day-hours'>${this_days_hours.hours}</div>
						<div class='day-seats'></div>
					</div>
				`;
			}
		}

		output += '</div>';
		return output;
	};

	/**
	 * drawWeekLabels
	 */
	this.drawWeekLabels = function()
	{
		var today = new Date();
		var todays_day_of_the_week = today.getDay();
		var one_weak = []; //nerve, here i born
		var this_day, this_days_hours, its_today;

		var output = "" +
			"<div class='col-labels'>";

		// Build out the current week
		for(var i = 0; i < 7; i++)
		{
			one_weak[i] = new Date();
			one_weak[i] = one_weak[i].setDate(one_weak[i].getDate() - (todays_day_of_the_week - i));
			one_weak[i] = new Date(one_weak[i]);
		}	

		// Populate current week with hours data
		for(var i = 0; i < 7; i++)
		{
			this_day = new Date(one_weak[i].getFullYear(),one_weak[i].getMonth(),one_weak[i].getDate(),1,0,0);
			its_today = (stdDate(this_day) === stdDate(today)) ? "its_today" : "";
			
			output += "<div class='weekly-labels "+its_today+"'><b>"+ getPrettyDay(this_day.getDay()) + "</b><span>" + getPrettyMonth(this_day.getMonth()) + " " + this_day.getDate() + "</span></div>";
		}

		output += "</div>";
		return output;
	};

	/**
	 * drawHoursByLocation
	 */
	this.drawHoursByLocation = function(location)
	{
		var today = new Date();
		var dateObject = new Date(today.getFullYear(),today.getMonth(),today.getDate(),1,0,0);
		var output = lpw.hours.getHours(location,dateObject);
		return output.hours;
	}

	/**
	 * drawWeekMobile
	 */
	this.drawWeekMobile = function(location)
	{
		var today = new Date();
		var one_weak = []; //nerve, here i born
		var this_day, this_days_hours, css_class, fancy_day;
		var output = "";

		// Build out the current week
		for(var i = 0; i < 7; i++)
		{
			one_weak[i] = new Date();
			one_weak[i] = one_weak[i].setDate(one_weak[i].getDate() + i);
			one_weak[i] = new Date(one_weak[i]);
		}	

		// Populate current week with hours data
		for(var i = 0; i < 7; i++)
		{
			this_day = new Date(one_weak[i].getFullYear(),one_weak[i].getMonth(),one_weak[i].getDate(),1,0,0);
			this_days_hours = lpw.hours.getHours(location, this_day);
			css_class = (this_days_hours.isSpecial) ? "hours-special" : "hours-regular";			

			if (i == 0)
			{
				fancy_day = "Today";
			}
			else if(i == 1)
			{
				fancy_day = "Tomorrow";
			}
			else
			{
				fancy_day = getPrettyDay(this_day.getDay())
			}

			output += "" + 
					"<tr>" +
						"<td>" + fancy_day + "</td>" +
						"<td class='" + css_class + "'>" + this_days_hours.hours + "</td>" + 
					"</tr>";
		}

		return output;
	};

}).apply(lpw.hours);

//-------------
// FUNCTIONS
//-------------

/**
 * isEmpty -- Returns false if the given object is empty, returns true otherwise.
 *   @param {obj} obj
 *   @return {bool}
 */
function isEmpty(obj)
{
    return (Object.keys(obj).length === 0 && obj.constructor === Object) ? true : false;
}

/**
 * daysInMonth -- Returns number of days in a month.
 *   @param {int} year
 *   @param {int} month
 *   @return {int}
 */
function daysInMonth(year,month)
{
	var isLeapYear = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
	var monthLength = [31, (isLeapYear ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return monthLength[month];
}

/**
 * cmsDate -- Parses CMS date string and returns a Date object based on those values.
 *   @param {str} dateString
 *   @return {int}
 */
function cmsDate(cmsDateString)
{
	var temp = cmsDateString.split("-");
	var year = parseInt(temp[0]);
	var month = parseInt(temp[1]) - 1;
	var day = parseInt(temp[2]);

	return new Date(year,month,day,1,0,0);
}

/**
 * getPrettyMonth -- Returns the name of the month.
 *   @param {int} month
 *   @return {str}
 */
function getPrettyMonth(month)
{
	return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month];
}

/**
 * getPrettyDay -- Returns the name of the day.
 *   @param {int} day
 *   @return {str}
 */
function getPrettyDay(day)
{
	return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];
}

/**
 * stdDate -- Returns ISO 8601 date (YYYY-MM-DD).
 *   @param {obj} date
 *   @return {str}
 */
function stdDate(date)
{
	return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
}

/**
 * getUrlVars
 */

function getUrlVars()
{
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){vars[key]=value;});
	return vars;
}

/**
 * pagerDate
 *   @param {string} pagerType
 *   @param {object} dateObject
 *   @return {string}
 */

function pagerDate(pagerType, dateObject)
{
	var d = new Date(dateObject); // Need to create new Date, otherwise the sets below will update dateObject in addition to d

	switch(pagerType)
	{
		case "Previous":
			d.setDate(0);
			break;

		case "Next":
			d.setDate(1);
			d.setMonth(d.getMonth() + 1);
			break;

		default:
			console.log("Pager type not found.");
	}

	return stdDate(d);
}