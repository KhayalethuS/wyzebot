import { ConnectectionCheck, ListCharaters } from './db_conn';
import { MongoClient } from 'mongodb';

describe('MongoDB', () => {

    afterEach(() => {
      jest.restoreAllMocks();
    });


    describe('Connect to MongoDB', () => {
        it('should connect to mongo db', async () => {
          const actual = await ConnectectionCheck();
          expect(actual).toEqual(true);
        });
    });

  });