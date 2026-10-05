export async function onRequestPost(context) {
  try {
    const { topic } = await context.request.json()

    const cleanTopic = String(topic || '').trim()

    if (!cleanTopic) {
      return Response.json(
        { error: 'Topic is required.' },
        { status: 400 }
      )
    }

    if (cleanTopic.length > 100) {
      return Response.json(
        { error: 'Topic is too long.' },
        { status: 400 }
      )
    }

    if (!context.env.OPENAI_API_KEY) {
      return Response.json(
        { error: 'OpenAI API key is not configured.' },
        { status: 500 }
      )
    }

    const prompt = `
Create a pool of concrete physical objects for a
lexical-retrieval naming exercise.

USER CATEGORY:
"${cleanTopic}"

Interpret the user's phrase semantically.

The phrase may describe an environment, category,
activity, location, or type of object.

Return physical objects that a normal person would
strongly associate with the category.

Examples:

"kitchen item"
refrigerator
toaster
spatula
colander
whisk
cutting board
kettle
blender
measuring cup
can opener

"soccer clothing"
jersey
shorts
soccer socks
cleats
shin guards
goalkeeper gloves
training bib
captain armband

"house room"
doorknob
baseboard
light switch
electrical outlet
door hinge
window
curtain rod
air vent
thermostat
ceiling fan

"guitar equipment"
guitar pick
amplifier
guitar strap
capo
tuner
effects pedal
instrument cable
microphone
guitar stand

RULES:

1. Return exactly 30 objects when possible.
2. Physical objects only.
3. Each object must be visually identifiable in a photograph.
4. Each object must be strongly associated with the user's category.
5. Do not return people.
6. Do not return activities.
7. Do not return abstract concepts.
8. Do not return organizations.
9. Do not return events.
10. Prefer common everyday object names.
11. Avoid obscure terminology unless the category is specialized.
12. Do not explain the answers.
13. Return ONE object per line.
14. Do not number the lines.
15. Do not use bullets.
`

    const openAIResponse = await fetch(
      'https://api.openai.com/v1/responses',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization:
            `Bearer ${context.env.OPENAI_API_KEY}`,
        },

        body: JSON.stringify({
          model: 'gpt-6-luna',
          input: prompt,
        }),
      }
    )

    if (!openAIResponse.ok) {
      const errorText =
        await openAIResponse.text()

      console.error(
        'OpenAI error:',
        openAIResponse.status,
        errorText
      )

      return Response.json(
        {
          error:
            'Could not generate objects.',
        },
        { status: 502 }
      )
    }

    const data =
      await openAIResponse.json()

    const outputText =
      data.output
        ?.flatMap(
          (item) => item.content || []
        )
        ?.filter(
          (item) =>
            item.type === 'output_text'
        )
        ?.map(
          (item) => item.text || ''
        )
        ?.join('\n')
        ?.trim() || ''

    const words =
      outputText
        .split('\n')
        .map((word) =>
          word
            .replace(
              /^[-•*\d.)\s]+/,
              ''
            )
            .trim()
        )
        .filter(Boolean)
        .filter(
          (word) =>
            word.length <= 50
        )

    const uniqueWords =
      [...new Set(words)]
        .slice(0, 30)

    if (!uniqueWords.length) {
      return Response.json(
        {
          error:
            'No objects were generated.',
        },
        { status: 502 }
      )
    }

    return Response.json({
      topic: cleanTopic,
      words: uniqueWords,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error:
          'Could not generate object pool.',
      },
      { status: 500 }
    )
  }
}