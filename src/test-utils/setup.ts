import { testConn } from './testConn';

// clears database connection before each test run
// process.exit to resolve promise (sometimes Node issue)
testConn(true).then(() => process.exit());