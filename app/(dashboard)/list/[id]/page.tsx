import NotFound from "@/app/not-found";
import { BoardType } from "@/app/api/models/list";
import { format } from "date-fns";

const fetchBoardDetail = async (id: string): Promise<BoardType | null> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/list/${id}`);
    if (!response.ok) {
        return null;    // 배열[]이 아닌 객체{}에서 title 등 속성 접근
    }
    const res = await response.json();
    console.log(`Res data => ${JSON.stringify(res)}`);
    
    return res.data;
}

export default async function ListDetail({ params } : { params : { id : string }}) {
    //const boardDetail = await fetchBoardDetail(params.id);
    const { id } = await params;    // Next.js에서 `params`는 비동기적으로 처리되는 경우가 있으므로 동기적으로 접근하면 에러 발생
    const boardDetail = await fetchBoardDetail(id);
    
    if (!boardDetail) {
        return NotFound();
    }

    return (
        <div className="shadow-xl card bg-base-100 w-96">
            <div className="card-body">
                <ul>
                    <li>
                        <h2 className="card-title">{boardDetail.title}</h2>
                        <span>
                            {format(new Date(boardDetail.createdAt), "yyyy-MM-dd HH:mm")}
                        </span>
                    </li>
                    <li><p>{boardDetail.content}</p></li>
                </ul>

            </div>
        </div>
    );
}