import { loadCopy } from './load-copy.mjs';
import { writeFile } from 'node:fs/promises';
const { copy } = await loadCopy();
const keys = [
 ...Object.keys(copy.moments).filter(k => k.startsWith('greeting_')).map(k => ['moments', k]),
 ...['friday','weekday','weekend','late','anytime'].map(k => ['moments', `share_${k}_0`]),
 ...['value_wants_to_watch_something_vote','sticky_progress','waiting_count','tie_line','late_line','could_not_save_try_again'].map(k => ['voter',k]),
 ...['the_group_has_spoken','and_tonight_goes_to'].map(k => ['results',k]),
 ...['question','thanks','lovedHeadline','likedHeadline','splitHeadline'].map(k => ['checkin',k]),
 ['home','a_few_contenders_for_the_group'], ['profile','for_another_good_night'],
 ['profile','shortlist_a_couple_of_titles_then_ask_the_group_your_movie_nights'],
 ['search','try_a_shorter_spelling_or_a_familiar_face'],
 ['common','the_best_nights_start_with_a_few_picks'],
 ['shortlist','4_is_plenty_yaar'], ['pollCreate','your_picks_their_vote_sorted'],
];
if (keys.length !== 40) throw Error(`Expected 40 rows, got ${keys.length}`);
const escape = value => value.replace(/\|/g,'\\|').replace(/\n/g,'<br>');
const lines = ['# Voice review: the top 40', '', 'Review in context. `{name}`, `{title}`, `{group}` and count placeholders are filled by the app. Indian English is for everyone; Hinglish is used only when Hindi is a saved viewing language. Mark cringe Y/N and suggest a better line. Keep buttons and errors clear.', '', '| Screen / key | Context | Hinglish | Indian English | Cringe? (Y/N) | Better line |', '| --- | --- | --- | --- | --- | --- |'];
for (const [screen,key] of keys) { const line=copy[screen]?.[key]; if(!line)throw Error(`Missing ${screen}.${key}`); lines.push(`| ${screen}.${key} | ${escape(line.context)} | ${escape(line.hinglish)} | ${escape(line.indianEnglish)} | | |`); }
await writeFile('docs/copy-review-top40.md', lines.join('\n')+'\n');
