import { StoresType } from "@/app/api/models/store";
import BasicMap from "@/app/map/BasicMap";
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
        <div className="w-full shadow-xl card bg-base-100">
            <div className="card-body">
                <ul>
                    <li className="py-2">
                        <h2 className="card-title">{storeDetail.name}</h2>
                    </li>
                    <li className="py-2"><p>📍 {storeDetail.location?.address}</p></li>
                    <li className="py-2"><p>📱 {storeDetail.tel}</p></li>
                    <li className="py-2">
                        <span>🔍 조회수 </span>
                        {storeDetail.viewCount}
                    </li>
                    <li className="py-2">
                        <span>🔜 {storeDetail.operateTime[0]}</span>
                        <span>🔚 {storeDetail.operateTime[1]}</span>
                    </li>
                    <li className="py-2">
                        <span>🗺 지도 영역 {storeDetail.location?.coordinates[0]} {storeDetail.location?.coordinates[1]}</span>
                        <BasicMap lat={storeDetail.location?.coordinates[0]} lng={storeDetail.location?.coordinates[1]} />
                    </li>
                    <li className="py-2">
                        <span>📆 생성일자</span>
                        <span>
                                {format(new Date(storeDetail.createdAt), "yyyy-MM-dd HH:mm")}
                        </span>
                    </li>
                </ul>

            </div>
        </div>
    );
}