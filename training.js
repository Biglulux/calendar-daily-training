var tsPrevDate = SimpleCalendar.api.timestamp();

function dayPassed(dNewDate)
{
	dateTime = {year: dNewDate.date.year, month: dNewDate.date.month, day: dNewDate.date.day, hour: dNewDate.date.hour, minute: dNewDate.date.minute, second: dNewDate.date.second};
	tsNewDate = await SimpleCalendar.api.dateToTimestamp(dateTime);
	sIntr = tsNewDate - tsPrevDate;
	objIntr = await SimpleCalendar.api.secondsToInterval(sIntr);

	//need to get number of days in each month passed (so need to check each month between old and new timestamp, then convert the months/years to days only, then return a the days to add to activity.progress
}


async function IncrementDailyLearning(dCurDate)
{
	if (dayPassed(dCurDate))
	{
		const arPCchars = await game.actors.directory.documents.filter(target => (target.type === "character"));
		for (let i = 0; i < arPCchars.length; i++)
		{
			try
			{
				let arCat = await arPCchars[i].getFlag("5e-training", "categories");
				var catId;
				arCat.forEach((cat) => {
					if (cat.name == "Daily Learning")
					{
						catId = cat.id;
					}
				});
						
				var arActivities = await CrashTNT.getActivitiesForActor(arPCchars[i].name);
				arActivities.forEach((activity) => {
					if (activity.category == catId && activity.progress < activity.completionAt)
					{
						CrashTNT.updateActivityProgress(arPCchars[i].name, activity.name, activity.progress += 1);
					}
				});
			}
			catch (err)
			{
				continue;
			}
		}
	}
}

Hooks.on(SimpleCalendar.Hooks.DateTimeChange, IncrementDailyLearning());