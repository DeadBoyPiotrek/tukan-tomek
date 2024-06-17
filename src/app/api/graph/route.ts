import { prisma } from '@utils/db';
import { graphDataSchema } from '@/lib/schemas';
export async function POST(request: Request) {
  const body = await request.json();
  const result = graphDataSchema.safeParse({ graphData: body.data });

  if (result.success) {
    // write to db
    const data = await prisma.graph.create({
      data: { data: body.data },
    });
    // write id to local storage

    return Response.json(data, { status: 201 });
  }

  return Response.json(result.error.message, { status: 400 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return Response.json('Invalid request', { status: 400 });
  }
  const data = await prisma.graph.findUnique({
    where: { id },
  });

  return Response.json(data);
}
