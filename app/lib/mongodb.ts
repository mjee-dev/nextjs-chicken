import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const MONGO_URI = process.env.MONGODB_URI || "";

console.log("◽◽ Connecting to MongoDB ◽◽");

// global 객체 : Node.js 환경에서 애플리케이션 전체에서 공유되므로, 연결 상태가 유지 (이미 연결되어 있는 경우 새 연결 생성하지 않음)
if (!global._mongoClientPromise) {
  client = new MongoClient(MONGO_URI); // 기본 URI 설정
  clientPromise = client.connect();
  global._mongoClientPromise = clientPromise;   // 전역 객체에 저장

  console.log(`◽◽ 전역 객체에 클라이언트 생성, DB 연결되었습니다. ◽◽`);
} else {
  clientPromise = global._mongoClientPromise;   // 기존 객체 사용
  console.log('◽◽ 이미 전역 객체에 저장된 클라이언트 DB 연결을 재사용합니다. ◽◽');
}

// 클라이언트 반환
export const getClient = async () => {
  if (!client) {
    client = await clientPromise;   // 기존 연결을 반환
  }
  return client;
};

// 데이터베이스 반환
export const getDatabase = async (dbName: string) => {
  const client = await getClient();
  return client.db(dbName);
};

/* 
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
 */