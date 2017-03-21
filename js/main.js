function getAndSetAjaxData() {
	$.ajax({
	    url: 'http://deghq.com/yapp/front-labs/interns032017/data.json',
	    type: 'GET',
	    success: function (data) {
	        var manipulateData = function() {
				return {
					init: function() {
						this.setSelectOptions($('#notificationType'), data.notifications.type);
						this.setSelectOptions($('#notificationTime'), data.notifications.time);
						this.setSelectOptions($('#calendarName'), data.calendar.users);
						this.setSelectOptions($('#calendarShowAs'), data.calendar.showAs.values);
						this.setSelectOptions($('#privacy'), data.eventType);
						this.setSelectOptions($('#moreActions'), data.moreActions.values);
				    },
				    setSelectOptions: function(elemId, dataType) {
				    	var container = '';
				    	for(i in dataType) {
				    		container += '<option value="' + dataType[i] + '">' 
				    			+ dataType[i] + 
				    		'</option>';
				    	}
				    	$(elemId).append(container);
				    }
				}
	        };
	        manipulateData().init();
	    }
	});
}
function eventDataHandler(name, 
		allDay, 
		repeat, 
		email, 
		inviteOthers, 
		modifyEvent, 
		seeGuestList, 
		privacy, 
		moreActions, 
		location,
		description,
		notificationType,
		notificationTimeNumber,
		notificationTime,
		calendarName,
		calendarShowAs) {
    var eventData = JSON.parse(localStorage.getItem('eventDataInfo')) || [];
    eventData.push({
    	name: name,
    	duration: {
    		allDay: allDay,
    		repeat: repeat
    	},
    	guestInfo: {
    		email: email, 
        	inviteOthers: inviteOthers, 
        	modifyEvent: modifyEvent, 
        	seeGuestList: seeGuestList
    	},
    	privacy: privacy,
    	moreActions: moreActions,
    	eventDetails: {
    		location: location,
    		description: description
    	},
    	notifications: {
    		type: notificationType,
    		time: notificationTimeNumber + ' ' + notificationTime
    	},
    	calendar: {
    		name: calendarName,
    		showAs: calendarShowAs
    	}
    	
    });
    localStorage.setItem('eventDataInfo', JSON.stringify(eventData));
    console.log(JSON.parse(localStorage['eventDataInfo']));
}
function init() {
	getAndSetAjaxData();
	$('.saveEventData').on('click', function() {
		eventDataHandler(
			$('#input-name').val(),
			$('#all-day')[0].checked, 
			$('#repeat')[0].checked, 
			$('#add-guests').val(), 
			$('#invite-others')[0].checked, 
			$('#modify-event')[0].checked,
			$('#guest-list')[0].checked,
			$("#privacy option:selected").val(),
			$("#moreActions option:selected").val(),
			$('#eventLocation').val(),
			$('#eventDescription').val(),
			$("#notificationType option:selected").val(),
			$('#notificationTimeNumber').val(),
			$("#notificationTime option:selected").val(),
			$("#calendarName option:selected").val(),
			$("#calendarShowAs option:selected").val()
		);
	});
}
$(document).ready(init);