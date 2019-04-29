"use strict";

function stringSanitizer(str)
{
	//Sanitizes a string by getting rid of all stuff like:
	//HTML tags
	//URLs
	//curly brackets, straight brackets, and their contents
	//The following characters: ~, #, @, $, %, ^, _, +, =
	//Character combinations like $(, (), {}, [], :\, :/, ~/, etc

	let tempstr1;
	let tempstr2;
	let j;
	let changed = false;

	for (let i = 0; i < str.length; i++)
	{
		if (i < str.length - 1)
		{
			switch (str[i] + str[i + 1])
			{
				case '$(': //These are all two-character combinations
				case '()':
				case '{}':
				case '[]':
				case ':\\':
				case ':/':
				case '~/':
					tempstr1 = str.slice(0, i);
					tempstr2 = str.slice(i + 2, str.length);
					str = tempstr1.concat(tempstr2);
					changed = true;
					break;
			}
		}

		if (i < str.length - 7);
		{
			switch (str[i] + str[i + 1] + str[i + 2] + str[i + 3] + str[i + 4] + str[i + 5] + str[i + 6])
			{
				case 'http://':
				case 'https:/':
					//Find the end of the URL:
					j = i;
					while (str[j] != ' ' && j < str.length) {j++;}
					tempstr1 = str.slice(0, i);
					tempstr2 = str.slice(j, str.length);
					str = tempstr1.concat(tempstr2);
					changed = true;
					break;
			}	
		}
		switch (str[i])
		{
			case '~': //These will be for removing a single problematic character
			case '#':
			case '@':
			case '$':
			case '%':
			case '^':
			case '_':
			case '+':
			case '=':
			case '}': //closing brackets just off by themselves for some reason
			case ']':
			case '>':
				tempstr1 = str.slice(0, i);
				tempstr2 = str.slice(i + 1, str.length);
				str = tempstr1.concat(tempstr2);
				changed = true;
				break;
			case '{': //opening brackets or HTML tags
			case '[':
			case '<':
				//Find the end of the brackets:
				j = i;
				while (!(str[j] == ']' || str[j] == '}' || str[j] == '>') && j < str.length) {j++;}
				tempstr1 = str.slice(0, i);
				tempstr2 = str.slice(j, str.length);
				str = tempstr1.concat(tempstr2);
				changed = true;
				break;
		}

	}

	if (changed) {return stringSanitizer(str);}
	else {return str;}
}


module.exports = stringSanitizer;