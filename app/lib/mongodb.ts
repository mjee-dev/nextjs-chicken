import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

// if(process.env.NODE_ENV === 'development') {

// }

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// 재연결 방지를 위한 캐싱 메커니즘
let cached = (global as any).mongoose;

if (!cached) {
// Next.js의 경우 개발할 땐 파일을 저장할 때마다 자바스크립트 파일들이 재실행되기 때문에 MongoClient.connect가 동시에 여러 개 실행될 수 있다.
// 이 경우 DB 입출력이 매우 느려지기 때문에, 이를 방지하기 위해 개발 중일 때 전역변수 global에 보관
  cached = (global as any).mongoose = { conn: null, promise: null };

}

async function connectToDatabase() {
  if (cached.conn) {
    console.log('◽◽ 캐싱된 커넥션을 사용합니다. ◽◽');
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
    .then((mongoose) => {
      console.log(`DB 커넥션이 생성되었습니다.`);
      return mongoose;
    })
    .catch((error) => {
        console.log(`DB 커넥션이 실패하였습니다. error: ${error}`);
        throw new Error('MongoDB connection Error');
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
