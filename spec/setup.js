import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { server } from './mocks/server.js'

Enzyme.configure({ adapter: new Adapter() });

// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())
