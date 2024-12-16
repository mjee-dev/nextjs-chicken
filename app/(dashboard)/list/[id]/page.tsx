import NotFound from "@/app/not-found";

async function getData(id: string) {
    const response = await fetch(`/api/list/${id}`);
    if (!response.ok) {
        return null;
    }
    return response.json();
}

export default async function ListDetail({ params } : { params: {id: string}}) {
    const data = await getData(params.id);

    if (!data) {
        return NotFound();
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                    <ul>
                        <li><h2 className="card-title">{data.title}</h2></li>
                        <li><p>{data.content}</p></li>
                    </ul>
            </div>
       </div>
    );
}