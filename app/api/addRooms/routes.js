import { cookies } from "next/headers";

export async function POST(){
    try {
        const cookie = await cookies();
        const token = cookie.get('jwt')?.value;

         if (!token) {
                    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
                }
    } catch (error) {
        
    }
}