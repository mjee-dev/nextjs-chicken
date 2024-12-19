import List from "../../models/list";
import connectToDatabase from "@/app/lib/mongodb";

// https://typescript-eslint.io/rules/no-unused-vars
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const boardDetail = await List.findById(params.id);

        if (!boardDetail) {
            return new Response("Not Found", { status: 404 });
        }
        return new Response(JSON.stringify({ data : boardDetail}), {status: 200});
    } catch (error) {
        console.error(`Error fetching detail: ${error}`);
        return new Response("Internal Server Error", { status: 500 });
    }
}