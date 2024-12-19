import NotFound from "@/app/not-found";
import { ListType } from "@/app/api/models/list";

const fetchBoardDetail = async (id: string): Promise<ListType | null> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/list/${id}`);
    if (!response.ok) {
        return null;    // 배열[]이 아닌 객체{}에서 title 등 속성 접근
    }
    const res = await response.json();
    console.log(`Res data => ${JSON.stringify(res)}`);
    
    return res.data;
}

export default async function ListDetail({ params} : { params : { id : string }}) {
    const boardDetail = await fetchBoardDetail(params.id);
    
    if (!boardDetail) {
        return NotFound();
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <ul>
                    <li><h2 className="card-title">{boardDetail.title}</h2></li>
                    <li><p>{boardDetail.content}</p></li>
                </ul>

            </div>
        </div>
    );
}