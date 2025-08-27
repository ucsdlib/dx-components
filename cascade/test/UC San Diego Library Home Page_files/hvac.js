// Home page (version 3)
(function(){
    fetch('https://library.ucsd.edu/lpw-staging/_files/hvac-closures/closure-data.json')
        .then(res => res.json())
        .then(data => {
            const datesArray = Object.entries(data)
            const sortedArray = datesArray.sort(([, a], [, b])=>(
                Number(a["closure-start-time"]) - Number(b["closure-start-time"])
            ))
            const hvacContainer = document.getElementById('hvac-notice')
            sortedArray? hvacContainer.style.display = "block":'';
            var outputObj = {
                floors: [],
                closureStr :`<i class="glyphicon glyphicon-warning-sign"></i><strong> `
            } 
            sortedArray.map(area =>{
                // Options for PST conversion
                const options = { timeZone: 'America/Los_Angeles', hour12: false };

                // Convert current time to PST
                const todayPSTString = new Date().toLocaleDateString('en-US', options);
                const todayPST = new Date(todayPSTString);

                // Convert start and end times to PST
                const startPSTString = new Date(Number(area[1]['closure-start-time'])).toLocaleDateString('en-US', options);
                const endPSTString = new Date(Number(area[1]['closure-end-time'])).toLocaleDateString('en-US', options);

                const startPST = new Date(startPSTString);
                const endPST = new Date(endPSTString);
                let floorNum = area[0].slice(-1)
                floorNum += 'th';
                if (todayPST >= startPST && todayPST <= endPST) {
                    outputObj.floors.push(floorNum);
                    // closureStr +=`Geisel Library: ${floorNum} Floor closed for essential work related to the <a href="https://library.ucsd.edu/visit/library-hvac-renewal.html">Geisel Library HVAC Project</a>.`;
                }else{
                    console.log('Either closures have already happened or they have not happened yet. See data definition.' );
                }
            return outputObj;    
            })
        const p = document.createElement('p')
        if( outputObj.floors.length === 1){
            outputObj.closureStr += `Geisel Library: The ${outputObj.floors[0]} Floor is closed for essential work related to the <a href="https://library.ucsd.edu/visit/library-hvac-renewal.html">Geisel Library HVAC Project</a>.</strong>`;
        }else if(outputObj.floors.length === 2){
            outputObj.closureStr += `Geisel Library: The ${outputObj.floors[0]} and ${outputObj.floors[1]} Floors are closed for essential work related to the <a href="https://library.ucsd.edu/visit/library-hvac-renewal.html">Geisel Library HVAC Project</a>.</strong>`;
        }else if(outputObj.floors.length > 2){
            let finalIdx = outputObj.floors.length - 1;
            outputObj.closureStr += `Geisel Library: The `;
            outputObj.floors.forEach((floor, idx) =>{
                idx !== finalIdx? outputObj.closureStr += `${floor}, ` :  outputObj.closureStr += `and ${floor}`;
            })
            outputObj.closureStr += ` Floors are closed for essential work related to the <a href="https://library.ucsd.edu/visit/library-hvac-renewal.html">Geisel Library HVAC Project</a>.</strong>`;
        }
        p.innerHTML = outputObj.closureStr; //.slice(0,-10);
        hvacContainer.append(p)
        })})()