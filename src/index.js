import _ from 'lodash';
import { $, jQuery } from 'jquery';
import { compareAsc, format } from 'date-fns';
import Icon from './icon.png';
import printMe from './print.js';

// format(new Date(2014, 1, 11), 'yyyy-MM-dd');
// => '2014-02-11'

// const dates = [
//   new Date(1995, 6, 2),
//   new Date(1987, 1, 11),
//   new Date(1989, 6, 10),
// ];
// dates.sort(compareAsc);
// => [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00
// ]
// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

btn.innerHTML = 'Click me and check the console!';
btn.onclick = printMe;

element.appendChild(btn);

  return element;
}

document.body.appendChild(component());