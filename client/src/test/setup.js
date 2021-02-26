import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/src/components/App.jsx';

Enzyme.configure({ adapter: new Adapter() });
