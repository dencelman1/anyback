

function update(
    key,
    value,
    days,
) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days * 24 * 60 * 60 * 1000));
		var expires = "; expires="+date.toGMTString();
	}
	else {
        var expires = "";
    }

	document.cookie = key + "=" + value + expires + "; path=/";
}

function get(
    key,
) {
	
	var nameEQ = key + "=";
	var ca = document.cookie.split(';');

	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		
		while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
		}

		if (c.indexOf(nameEQ) == 0) {
			var findValue = c.substring(nameEQ.length,c.length)
			return findValue;
		}

	}
	return undefined;
}

function delete_(key) {
	update(key, "", -1);
}


var Cookie = {
    get,
    delete: delete_,
    update,
}

export default Cookie;
