export async function onRequestGet(context) {
  try {
    if (!context.env.DB) {
      return Response.json({ error: "DB binding is missing" }, { status: 500 });
    }

    const { results } = await context.env.DB.prepare(
      "SELECT * FROM words",
    ).all();

    return Response.json(results);
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
}
// export async function onRequestGet(context) {
//   const { results } = await context.env.DB.prepare("SELECT * FROM words").all();

//   return Response.json(results);
// }
