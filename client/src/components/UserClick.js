// function to track which element was clicked
// function to track which widget the click happened in
// function to track what time
import dt from 'moment';
import axios from 'axios';

export default function sendClickInfo(widget, element) {
  const body = {
    element,
    widget,
    time: dt().format()
  };

  axios.post('api/interactions', body)
    .then(() => console.log('Interaction logged'))
    .catch((err) => console.log(err));
}
