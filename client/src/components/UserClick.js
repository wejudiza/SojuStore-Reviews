// function to track which element was clicked
// function to track which widget the click happened in
// function to track what time
import dt from 'moment';

export default function getDT() {
  console.log(dt().format());
  return dt().format();
}
