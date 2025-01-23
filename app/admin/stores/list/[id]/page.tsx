import { StoresType } from "@/app/api/models/store";
import NotFound from "@/app/not-found";
import { format } from "date-fns";

const fetchDetail = async (id: string): Promise<StoresType | null> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/stores/list/${id}`);
    if (!response.ok) {
        return null;
    }
    const res = await response.json();
    console.log(`스토어 Response data => ${JSON.stringify(res)}`);

    return res.data;
}

export default async function StoreDetail({ params }: { params : {id : string}}) {
    const { id } = await params;
    console.log(`StoreDetail, id => ${id}`);
    const storeDetail = await fetchDetail(id);

    if (!storeDetail) {
        return NotFound();
    }

    return (
        <div className="shadow-xl card bg-base-100 w-96">
            <div className="card-body">
                <ul>
                    <li>
                        <h2 className="card-title">{storeDetail.name}</h2>
                    </li>
                    <li><p>📍 {storeDetail.location?.address}</p></li>
                    <li><p>📱 {storeDetail.tel}</p></li>
                    <li>
                        <p>
                            <span>🔍 조회수 </span>
                            {storeDetail.viewCount}
                        </p>
                    </li>
                    <li>
                        <p>
                            <span>🔜 {storeDetail.operateTime[0]}</span> 
                            <span>🔚 {storeDetail.operateTime[1]}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                            <span>🗺 지도 영역</span>
                            {storeDetail.location?.coordinates[0]}, {storeDetail.location?.coordinates[1]}
                        </p>
                    </li>
                    <li>
                        <p>
                            <span>📆 생성일자</span>
                            <span>
                                 {format(new Date(storeDetail.createdAt), "yyyy-MM-dd HH:mm")}
                            </span>
                        </p>
                    </li>
                </ul>

            </div>
        </div>
    );
}