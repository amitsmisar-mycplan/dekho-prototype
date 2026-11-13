# The friend with a plan

Our personality is the friend in the group chat who always has a plan. Witty, never mean, never preachy. We can notice the familiar ritual of choosing a film without making fun of anyone's taste, timing or identity.

Write like a WhatsApp message: short, lowercase-friendly, one idea per line. Prefer an observation over a punchline. Leave room for the film and the people. Not every label needs personality; one lead joke per state is usually enough. Do not imitate a campaign, copy a Zomato line/slogan, or quote song lyrics. This voice takes inspiration from playful, self-aware, conversational timing, not anybody else's words. Brief film-dialogue nods are optional, not a requirement; this pass uses original wording and the user's supplied starter table.

## Two voices, one friend

- **Hinglish:** only for people whose saved viewing languages include Hindi. Roman-script Hindi mixed naturally with English, like people actually text. No Devanagari UI sentences. Keep actions in clear English.
- **Indian English:** the same wit without Hindi words. Use film/movie, web series, OTT apps and ₹. Catalogue names and people's own comments are never translated or policed.
- Unknown voters and server-generated share images use Indian English. A saved Hindi preference changes client copy, including a WhatsApp draft at the moment it is created.
- This request replaces the earlier catalogue rule of at most one differing Hinglish entry per screen: different states now have their own natural translations. Keep the rendered experience restrained; don't put jokes into every heading and label.

## Where personality belongs

Greetings, empty states, waiting states, success toasts, share messages, winner/verdict moments, post-watch prompts and friendly loading lines. A good line knows what just happened. “Empty shortlist, full confusion” belongs to an empty shortlist, not an error. “Decision made. Popcorn ready?” belongs after a real winner exists.

## Where clarity wins

Buttons, errors, failures, privacy, deletion and anything about money must be plain, warm and clear. Examples: **Vote**, **Add to shortlist**, **Watch on Netflix**, **Your vote didn’t save. Please try again.** A direct Roman-Hindi error translation is fine; a joke is not. The supplied “Vote save nahi hua. Ek baar phir try karein.” is retained for the voter failure state. Never hide the next action behind wit. Offline copy states the connection requirement, without suggesting that unsent votes were saved.

Do not joke about religion, politics, bodies, regions or languages. Ban “lit”, “vibe check”, slang “OG”, forced puns, and smug or guilt-inducing lines. Never ridicule someone for not voting. “Left you on read” is a light group-chat observation, not telemetry: the app does not track message reads. Avoid personal accusations, deadlines framed as pressure, or claiming a response from someone who has not sent one.

## Moment selection

`lib/copy/moments.ts` selects from three greeting variants and three share variants for each context. All text remains authored in `lib/copy.ts`.

| Context | Browser-local time |
| --- | --- |
| Late night | 23:00–04:59, any day; takes priority |
| Friday evening | Friday 17:00–22:59 |
| Weekend afternoon | Saturday/Sunday 12:00–16:59 |
| Weekday night | Monday–Thursday 17:00–22:59 |
| Everyday fallback | Other times, including weekend evenings |

A per-tab sessionStorage counter rotates sequentially through each context/channel, avoiding adjacent repeats. Blocked storage falls back to in-memory rotation. Greetings rotate on a new Home visit, changed preferences, or a time-context boundary—not every render or minute. Share messages rotate only when explicitly preparing another WhatsApp draft. Server rendering is deterministic and never updates a counter. No real name is stored in the rotation key.

## Adapt the starters to the truth

- Friday uses the supplied “anything is fine” / “kuch bhi” observation, with the user's name when present.
- Waiting uses the actual voter count. It does not invent how many people saw a message.
- A tie offers a real creator-only toss, saved once for everyone. Without a toss, the higher TMDb rating remains the fallback. Use British/Indian spelling: favourite, colour, cancelled.
- Late-voter copy uses the actual winner and appears only for a device that did not vote.
- Check-ins say “Watched {title}?” rather than “last night”: the six-hour prompt may happen the same day.
- Never translate a group's name, a film title or a person's take. Keep the title/name visibly distinct from product copy.

## Review and maintenance

`npm run copy:review` exports every string, both voices and its Context into `docs/copy-review.md`. Context is editorial metadata and is removed from generated runtime modules. Context descriptions identify screens, state/action and runtime placeholders; legacy fragment keys remain for stable imports. Review a complete state in the browser, not a punchline in isolation.

Tests check boundaries, rotation, placeholder parity, Indian-English language rules, Roman script and plain control copy. Do not add clever copy to a money, privacy or failure message to satisfy a rewrite quota.
