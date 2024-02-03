

function update(
    key,
    value,
    days,
) {
	
	var expires = (
		( days || "" )
		&& (
			"; expires=" +
			(
				(
					new Date( Date.now() + (days * 24 * 60 * 60 * 1000) )
				)
				.toGMTString()
			)
		)
	)
	
	value = ( JSON.stringify(value) || "undefined" );
	
	document.cookie = ( key + "=" + value + expires + "; path=/" )

	return ( value );
}

function get(
    key,
) {
	
	var
		nameEQ = key + "=",
		ca = document.cookie.split(';'),
		c, i
	;
	
	for( i = 0; i < ca.length; i++ ) {
		c = ca[i];
		
		while (c.charAt(0) == ' ') {
			c = c.substring( 1, c.length);
		}

		if (c.indexOf(nameEQ) === 0) {
			var value = c.substring(nameEQ.length, c.length)

			return value === 'undefined' ? undefined: JSON.parse(value);
		}

	}
	return undefined;
}

function deleteCookie(key) {
	update(key, "", -1)
}


var Cookie = {
	size: () => ( document.cookie.length ),
	
    get,
    update,
	

	delete: deleteCookie,
}

export default Cookie;
