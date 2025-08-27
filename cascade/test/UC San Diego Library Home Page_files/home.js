//---
// A11y Hacks
//---
$(document).ready(function(){
    $("#uc-emergency").before('<a class="sr-only" href="#s-lch-widget-20962">Chat with us</a>');
    $("nav").attr('aria-label', 'Main');
    $("footer").attr('aria-label', 'Footer');
});

//---
// HOURS
//---
$(document).ready(function(){
	$("#lpw-hours-glb .lpw-hours-open").html(lpw.hours.drawHoursByLocation("geisel-library-building"));
	$("#lpw-hours-sca .lpw-hours-open").html(lpw.hours.drawHoursByLocation("special-collections"));
	$("#lpw-hours-aud .lpw-hours-open").html(lpw.hours.drawHoursByLocation("audreys-cafe"));
	$("#lpw-hours-blb .lpw-hours-open").html(lpw.hours.drawHoursByLocation("wongavery-library"));
});

//---
// HOURS: Seating availability
//---

const SEATING_DATA = 'https://waitz.io/live/ucsd-geisel';
const SEATING_DATA_REFREASH_RATE = 30000; // 30 seconds

$(document).ready(function(){
	$.support.cors = true;
	lpw.home_page_waitz_fun.getSeatingData();
	setInterval(function(){lpw.home_page_waitz_fun.getSeatingData();}, SEATING_DATA_REFREASH_RATE);
});

// NAMESPACING
var lpw = lpw || {};
lpw.home_page_waitz_fun = lpw.home_page_waitz_fun || {};

// FUNCTIONS
(function(){

	//---
	// Function to get Waitz data, clear container, make card, and output card to container
	//---
	this.getSeatingData = () => {
	
		$.support.cors = true;

		$.ajax({
	
			type: 'GET',
			url: SEATING_DATA
	
		}).done(function(response){

			$('#lpw-hours-glb .lpw-hours-note').html('&#160;'); // Blank out container with NBSP for refresh
			$('#lpw-hours-blb .lpw-hours-note').html('&#160;'); // Ditto

			let glbCards = [];
			let glbHours = $('#lpw-hours-glb .lpw-hours-open').text();

			for(let i = 0; i < response.data.length; i++)
			{
				let thisLocation = response.data[i];
				if (thisLocation.name === "Geisel Library")
				{
					let thisLocationCard = lpw.home_page_waitz_fun.makeCard(thisLocation.people, thisLocation.capacity, thisLocation.isOpen, thisLocation.hourSummary);
					glbCards.push(thisLocationCard);
					break;
				}
			}

			if (glbCards[0] !== '' && glbHours !== 'Closed')
			{
				$('#lpw-hours-glb .lpw-hours-note').html(glbCards[0]); // Append GLB cards to GLB container
			}

			let blbCards = [];
			let blbHours = $('#lpw-hours-blb .lpw-hours-open').text();

			for(let i = 0; i < response.data.length; i++)
			{
				let thisLocation = response.data[i];
				if (thisLocation.name === "WongAvery Library")
				{
					let thisLocationCard = lpw.home_page_waitz_fun.makeCard(thisLocation.people, thisLocation.capacity, thisLocation.isOpen, thisLocation.hourSummary);
					blbCards.push(thisLocationCard);
					break;
				}
			}

			if (blbCards[0] !== '' && blbHours !== 'Closed')
			{
				$('#lpw-hours-blb .lpw-hours-note').html(blbCards[0]); // Append BLB cards to BLB container
			}

		});
	}

	//---
	// Function to generate a card for each location
	//---
	this.makeCard = (people, capacity, is_open, hour_summary) => {
		
		const busyness = Math.round((people / capacity) * 100);
		const available_seats = (people > capacity) ? 0 : capacity - people;
		let summary;
		
		if (busyness < 45)
		{
			summary = 'Not Busy';
		}
		else if (busyness < 72)
		{
			summary = 'Busy';
		}
		else
		{
			summary = 'Very Busy';
		}

		const card_html = `${summary}`; //`${hour_summary} (${summary})`;

		return (is_open) ? card_html : '';
	}

}).apply(lpw.home_page_waitz_fun);