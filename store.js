import eventstore from 'eventstore';
export const es = eventstore({
  type: 'redis',
  host: 'redis.ralexanderson.com',                          // optional
  port: 6379,                                 // optional
  db: 0,                                      // optional
  prefix: 'eventstore',                       // optional
  eventsCollectionName: 'events',             // optional
  snapshotsCollectionName: 'snapshots',       // optional
  //timeout: 10000,
});

es.init(() => {
  const skip = 0;
  const limit = -1;
  /*es.getEvents(skip, limit, (err, evts) => {
    console.log(evts);
  });*/
});
