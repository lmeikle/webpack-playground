import './style.css';
import printMe from './print.js';
import MyImage from './Random.png';
import { file, parse } from './globals.js';

/**if ('serviceWorker' in navigator)
{
	window.addEventListener('load', () =>
	{
		navigator.serviceWorker.register('/sw.js').then(registration =>
		{
			console.log('SW registered: ', registration);
		}).catch(registrationError =>
		{
			console.log('SW registration failed: ', registrationError);
		});
	});
}*/
	
if (process.env.NODE_ENV !== 'production')
{
	console.log('Looks like we are in development mode!');
}

function component() {
	var element = document.createElement('div');

	let s = _.join(['Hellosdfsdfsdf', 'webpack'], ' ');
	//element.innerHTML = "Hello Laura";
	element.classList.add('hello');

	element.innerHTML = join([s, 'final'], ' ');

	// Add the image to our existing div.
	var myIcon = new Image();
	myIcon.src = MyImage;
	element.appendChild(myIcon);

	var btn = document.createElement('button');
	btn.innerHTML = 'Click me and check the console!';
	btn.onclick = printMe;
	element.appendChild(btn);

	return element;
}

document.body.appendChild(component());