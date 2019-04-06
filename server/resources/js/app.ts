/**
 * import bootstrap
 */
import 'bootstrap';
import Greeter from './greeter';

let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet());

/**
 * Now do some jquery
 */

$('.toast').toast('show');
