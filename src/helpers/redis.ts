import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',  
  port: 6379,       
  db: 0,         
});

export default redis;
