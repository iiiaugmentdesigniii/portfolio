export async function onRequestGet(context) {
  try {
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM words",
    ).all();

    return Response.json(results);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    const word = data.word;
    const definition = data.definition;
    const hints = JSON.stringify(data.hints);

    await context.env.DB.prepare(
      "INSERT INTO words (word, definition, hints) VALUES (?, ?, ?)",
    )
      .bind(word, definition, hints)
      .run();

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// export async function onRequestGet(context) {
//   try {
//     if (!context.env.DB) {
//       return Response.json({ error: "DB binding is missing" }, { status: 500 });
//     }

//     const { results } = await context.env.DB.prepare(
//       "SELECT * FROM words",
//     ).all();

//     return Response.json(results);
//   } catch (error) {
//     return Response.json(
//       {
//         error: error.message,
//       },
//       { status: 500 },
//     );
//   }
// }
// export async function onRequestGet(context) {
//   const { results } = await context.env.DB.prepare("SELECT * FROM words").all();

//   return Response.json(results);
// }
