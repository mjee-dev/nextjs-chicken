import { ListType } from "@/app/api/models/list";
import Link from "next/link";
import { format } from "date-fns";

 async function fetchBoardList():Promise<ListType[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/list`, { cache : "no-store"});   //최신 데이터 가져오기, 필요에 따라 "force-cache"로 변경

    if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
    }

    const res = await response.json();
    console.log(`## 게시판 Response => ${JSON.stringify(res)}`);

    return res.data;
}

export default async function List() {
    let boardList: ListType[] = [];

    try {
        boardList = await fetchBoardList();
    } catch (error) {
        console.error(`Error fetching board list : ${error}`);
        return <div>Error loading the list. Please try again later.</div>;
    }

    if (!boardList.length) {
        return <div>데이터가 없습니다.</div>;
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            {boardList.map((item) => (
                <div className="card-body" key={item._id?.toString()}>
                    <Link href={`/list/${item._id?.toString()}`}>
                        <ul>
                            <li>
                                <h2 className="card-title">{item.title}</h2> key: {item._id?.toString()}
                            </li>
                            <li>
                                <p>{item.content}</p>
                            </li>
                            {/* 날짜 포맷팅이 필요하다면 주석 해제 */}
                            <li>
                                <p>
                                    {format(new Date(item.createdAt), "yyyy-MM-dd HH:mm")}
                                </p>
                            </li>
                        </ul>
                    </Link>
                </div>
            ))}
        </div>
    );
}
