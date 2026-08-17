export async function onRequestGet(context) {
  const { results } = await context.env.DB.prepare("SELECT * FROM words").all();

  return Response.json(results);
}
