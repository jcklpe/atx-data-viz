//- data data data data data

//- function for updating charts


const endpoint = 'https://data.austintexas.gov/resource/7d8e-dm7r.json';

console.log(endpoint);

async function requestDayCount(dayNum, type)
{
    //fetch the endpoint data
    const response = await fetch(endpoint);

    //convert the fetched data to json format
    const rideInfo = await response.json();


    //filter the array based on the day of the week number
    let dayArray = rideInfo.filter(aRide => aRide.day_of_week == dayNum || aRide.vehicle_type == type);

    //determine the number of days that are in the filtered array
    return dayArray.length;
    console.log("dayArray");
};

const mondayBikeRideCount = requestDayCount(1, "bicycle");
const tuesdayBikeRideCount = requestDayCount(2, "bicycle");
const wednesdayBikeRideCount = requestDayCount(3, "bicycle");
const thursdayBikeRideCount = requestDayCount(4, "bicycle");
const fridayBikeRideCount = requestDayCount(5, "bicycle");
const saturdayBikeRideCount = requestDayCount(6, "bicycle");
const sundayBikeRideCount = requestDayCount(7, "bicycle");


const mondayScooterRideCount = requestDayCount(1, "scooter");
const tuesdayScooterRideCount = requestDayCount(2, "scooter");
const wednesdayScooterRideCount = requestDayCount(3, "scooter");
const thursdayScooterRideCount = requestDayCount(4, "scooter");
const fridayScooterRideCount = requestDayCount(5, "scooter");
const saturdayScooterRideCount = requestDayCount(6, "scooter");
const sundayScooterRideCount = requestDayCount(7, "scooter");


//NOTE: The below was my original solution to the above problem but I figured I should go ahead and learn proper modern syntax etc. Also I wasn't sure how well that delay would play with the chart graphs.

//NOTE: Whew, I just finished the genericized version. Dang that took me awhile. Never done .then or async stuff. I'm glad I did because it's rewarding making stuff cleaner but yeesh is that thing finicky. I wish you could just save the returned value to a globally scoped variable instead of having to call .then each time. Apparently globally scoped await functions are on the way though so that's cool.
// const rideInfoz = [];
// fetch(endpoint)
//     .then(blob => blob.json())
//     .then(data => rideInfoz.push(...data));

// setTimeout(function ()
// {
//     var mondayRides = rideInfoz.filter(aRide => aRide.day_of_week == 1);
//     console.log(mondayRides);
// }, 6000);




//NOTE: this below is obviously the original get ajax GET operation supplied with the repo. I didn't end up using it because I was having trouble with scoping. And also I don't really know jQuery that well except for manipulating visuals. I've never used it much for manipulating data and it seems that it would be better to just keep learning esNext stuff.
// $.ajax({
//     url: "https://data.austintexas.gov/resource/7d8e-dm7r.json",
//     type: "GET",
//     data: {
//         $limit: 5000
//     }
// }).done(function (data)
// {
//     console.log(data);