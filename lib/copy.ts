/** Product UI copy. Named screen exports keep unrelated copy out of mobile bundles. */
export type Tone = 'hinglish' | 'indianEnglish';
export const toneForLanguages = (languages: readonly string[]): Tone => languages.includes('Hindi') ? 'hinglish' : 'indianEnglish';
export interface CopyLine { indianEnglish: string; hinglish: string; context?: string }
export const commonCopy = {
  "offline": {
    "indianEnglish": "You’re offline. Reconnect to load films and send votes.",
    "hinglish": "You’re offline. Reconnect to load films and send votes.",
    "context": "App and public polls · offline connection status; plain operational message"
  },
  "good_company_great_stories": {
    "indianEnglish": "GOOD COMPANY. GREAT STORIES.",
    "hinglish": "GOOD COMPANY. GREAT STORIES.",
    "context": "Shared app shell · good company great stories"
  },
  "a_small_screen_a_big_night": {
    "indianEnglish": "A SMALL SCREEN. A BIG NIGHT.",
    "hinglish": "A SMALL SCREEN. A BIG NIGHT.",
    "context": "Shared app shell · a small screen a big night"
  },
  "separator": {
    "indianEnglish": ".",
    "hinglish": ".",
    "context": "Shared app shell · separator"
  },
  "find_tonight_s_picks": {
    "indianEnglish": "Find tonight’s picks ",
    "hinglish": "Find tonight’s picks ",
    "context": "Shared app shell · find tonight s picks"
  },
  "add_a_title_or_try_a_mood_on_tonight": {
    "indianEnglish": "Add two picks. Give the group something to disagree about.",
    "hinglish": "2 picks daalo. Group ko kuch options toh milein.",
    "context": "Shortlist sheet · empty supporting line"
  },
  "the_best_nights_start_with_a_few_picks": {
    "indianEnglish": "Empty shortlist, full confusion.",
    "hinglish": "Shortlist khaali, confusion full.",
    "context": "Shortlist sheet · empty headline"
  },
  "your_tonight_shortlist": {
    "indianEnglish": "Your tonight shortlist",
    "hinglish": "Your tonight shortlist",
    "context": "Shared app shell · your tonight shortlist"
  },
  "me": {
    "indianEnglish": "Me",
    "hinglish": "Me",
    "context": "Shared app shell · me"
  },
  "shortlist": {
    "indianEnglish": "Shortlist",
    "hinglish": "Shortlist",
    "context": "Shared app shell · shortlist"
  },
  "search": {
    "indianEnglish": "Search",
    "hinglish": "Search",
    "context": "Shared app shell · search"
  },
  "tonight": {
    "indianEnglish": "Tonight",
    "hinglish": "Tonight",
    "context": "Shared app shell · tonight"
  },
  "main_navigation": {
    "indianEnglish": "Main navigation",
    "hinglish": "Main navigation",
    "context": "Shared app shell · main navigation"
  },
  "original_generated_artwork_this_product_is_not_endorsed_or_certif": {
    "indianEnglish": "Original generated artwork. This product is not endorsed or certified by TMDb. Ratings and India availability are illustrative.",
    "hinglish": "Original generated artwork. This product is not endorsed or certified by TMDb. Ratings and India availability are illustrative.",
    "context": "Shared app shell · original generated artwork this product is not endorsed or certif"
  },
  "india_only_built_for_movie_nights": {
    "indianEnglish": "India only · Built for movie nights",
    "hinglish": "India only · Built for movie nights",
    "context": "Shared app shell · india only built for movie nights"
  },
  "getting_ready": {
    "indianEnglish": "Getting ready",
    "hinglish": "Getting ready",
    "context": "Shared app shell · getting ready"
  },
  "kya_dekhein": {
    "indianEnglish": "What shall we watch?",
    "hinglish": "What shall we watch?",
    "context": "Shared app shell · kya dekhein"
  },
  "value_home": {
    "indianEnglish": "{p1} home",
    "hinglish": "{p1} home",
    "context": "Shared app shell · value home"
  },
  "skip_to_content": {
    "indianEnglish": "Skip to content",
    "hinglish": "Skip to content",
    "context": "Shared app shell · skip to content"
  },
  "separator_2": {
    "indianEnglish": "▴ ▰",
    "hinglish": "▴ ▰",
    "context": "Shared app shell · separator 2"
  },
  "9_41": {
    "indianEnglish": "9:41",
    "hinglish": "9:41",
    "context": "Shared app shell · 9 41"
  },
  "made_for_your_kind_of_people": {
    "indianEnglish": "MADE FOR YOUR KIND OF PEOPLE",
    "hinglish": "MADE FOR YOUR KIND OF PEOPLE",
    "context": "Shared app shell · made for your kind of people"
  },
  "more_movie_nights": {
    "indianEnglish": "More movie nights.",
    "hinglish": "More movie nights.",
    "context": "Shared app shell · more movie nights"
  },
  "less_scrolling": {
    "indianEnglish": "Less scrolling.",
    "hinglish": "Less scrolling.",
    "context": "Shared app shell · less scrolling"
  },
  "loading_picks": {
    "indianEnglish": "Loading picks",
    "hinglish": "Loading picks",
    "context": "Shared app shell · loading picks"
  },
  "loading": {
    "indianEnglish": "Loading…",
    "hinglish": "Loading…",
    "context": "Shared app shell · loading"
  },
  "getting_your_next_movie_night_ready": {
    "indianEnglish": "Finding the film. You find the people.",
    "hinglish": "Film hum dhoondhte hain. Tum log bulao.",
    "context": "App loading · visible line alongside shimmer"
  },
  "dismiss_notification": {
    "indianEnglish": "Dismiss notification",
    "hinglish": "Dismiss notification",
    "context": "Shared app shell · dismiss notification"
  },
  "close_sheet": {
    "indianEnglish": "Close sheet",
    "hinglish": "Close sheet",
    "context": "Shared app shell · close sheet"
  },
  "separator_3": {
    "indianEnglish": ", ",
    "hinglish": ", ",
    "context": "Shared app shell · separator 3"
  },
  "sr": {
    "indianEnglish": "SR",
    "hinglish": "SR",
    "context": "Shared app shell · sr"
  },
  "nk": {
    "indianEnglish": "NK",
    "hinglish": "NK",
    "context": "Shared app shell · nk"
  },
  "am": {
    "indianEnglish": "AM",
    "hinglish": "AM",
    "context": "Shared app shell · am"
  },
  "value_value_value_shortlist": {
    "indianEnglish": "{p1} {p2} {p3} shortlist",
    "hinglish": "{p1} {p2} {p3} shortlist",
    "context": "Shared app shell · value value value shortlist"
  },
  "add": {
    "indianEnglish": "Add",
    "hinglish": "Add",
    "context": "Shared app shell · add"
  },
  "remove": {
    "indianEnglish": "Remove",
    "hinglish": "Remove",
    "context": "Shared app shell · remove"
  },
  "to": {
    "indianEnglish": "to",
    "hinglish": "to",
    "context": "Shared app shell · to"
  },
  "from": {
    "indianEnglish": "from",
    "hinglish": "from",
    "context": "Shared app shell · from"
  },
  "loading_poster": {
    "indianEnglish": "Loading poster",
    "hinglish": "Loading poster",
    "context": "Shared app shell · loading poster"
  },
  "try_again": {
    "indianEnglish": "Try again",
    "hinglish": "Try again",
    "context": "Shared app shell · try again"
  },
  "something_didn_t_load_let_s_give_it_another_take": {
    "indianEnglish": "This page couldn’t load. Please try again.",
    "hinglish": "This page couldn’t load. Please try again.",
    "context": "Global page error · plain retry explanation"
  },
  "intermission": {
    "indianEnglish": "load.",
    "hinglish": "load.",
    "context": "Global error heading · suffix"
  },
  "a_little": {
    "indianEnglish": "Unable to ",
    "hinglish": "Unable to ",
    "context": "Global error heading · prefix"
  },
  "less_scrolling_more_movie_nights_a_mobile_first_prototype_for_pic": {
    "indianEnglish": "Less scrolling, more movie nights. A mobile-first prototype for picking what to watch together in India.",
    "hinglish": "Less scrolling, more movie nights. A mobile-first prototype for picking what to watch together in India.",
    "context": "Shared app shell · less scrolling more movie nights a mobile first prototype for pic"
  },
  "s_value": {
    "indianEnglish": "%s · {p1}",
    "hinglish": "%s · {p1}",
    "context": "Shared app shell · s value"
  },
  "back_to_tonight": {
    "indianEnglish": "Back to tonight",
    "hinglish": "Back to tonight",
    "context": "Shared app shell · back to tonight"
  },
  "that_page_isn_t_in_tonight_s_lineup": {
    "indianEnglish": "This page isn’t available. Check the link or return Home.",
    "hinglish": "This page isn’t available. Check the link or return Home.",
    "context": "Shared app shell · that page isn t in tonight s lineup"
  },
  "right_company": {
    "indianEnglish": "",
    "hinglish": "",
    "context": "Shared app shell · right company"
  },
  "wrong_screen": {
    "indianEnglish": "Page not found.",
    "hinglish": "Page not found.",
    "context": "Shared app shell · wrong screen"
  },
  "closes_value": {
    "indianEnglish": "Closes {p1}",
    "hinglish": "Closes {p1}",
    "context": "Shared app shell · closes value"
  },
  "initials_fallback": {
    "indianEnglish": "YOU",
    "hinglish": "YOU",
    "context": "Shared app shell · initials fallback"
  },
  "pick": {
    "indianEnglish": "pick",
    "hinglish": "pick",
    "context": "Shared app shell · pick"
  },
  "picks": {
    "indianEnglish": "picks",
    "hinglish": "picks",
    "context": "Shared app shell · picks"
  },
  "title": {
    "indianEnglish": "title",
    "hinglish": "title",
    "context": "Shared app shell · title"
  },
  "titles": {
    "indianEnglish": "titles",
    "hinglish": "titles",
    "context": "Shared app shell · titles"
  },
  "friend": {
    "indianEnglish": "friend",
    "hinglish": "friend",
    "context": "Shared app shell · friend"
  },
  "friends": {
    "indianEnglish": "friends",
    "hinglish": "friends",
    "context": "Shared app shell · friends"
  },
  "season": {
    "indianEnglish": "season",
    "hinglish": "season",
    "context": "Shared app shell · season"
  },
  "seasons": {
    "indianEnglish": "seasons",
    "hinglish": "seasons",
    "context": "Shared app shell · seasons"
  },
  "minutes": {
    "indianEnglish": "{count} min",
    "hinglish": "{count} min",
    "context": "Shared app shell · minutes"
  },
  "seasons_label": {
    "indianEnglish": "{count} {unit}",
    "hinglish": "{count} {unit}",
    "context": "Shared app shell · seasons label"
  },
  "price": {
    "indianEnglish": "₹{amount}{suffix}",
    "hinglish": "₹{amount}{suffix}",
    "context": "Shared app shell · price"
  },
  "meta_pair": {
    "indianEnglish": "{first} · {second}",
    "hinglish": "{first} · {second}",
    "context": "Shared app shell · meta pair"
  },
  "price_suffix": {
    "indianEnglish": " · ₹{amount}",
    "hinglish": " · ₹{amount}",
    "context": "Shared app shell · price suffix"
  }
} as const;
export const kitCopy = {
  "0": {
    "indianEnglish": "0",
    "hinglish": "0",
    "context": "Developer kit · 0"
  },
  "10": {
    "indianEnglish": " / 10",
    "hinglish": " / 10",
    "context": "Developer kit · 10"
  },
  "this_is_the_data_preview_full_search_and_title_screens_arrive_in_": {
    "indianEnglish": "This is the data preview. Full search and title screens arrive in later phases. Movie artwork, when seeded, is from TMDb; this product is not endorsed or certified by TMDb.",
    "hinglish": "This is the data preview. Full search and title screens arrive in later phases. Movie artwork, when seeded, is from TMDb; this product is not endorsed or certified by TMDb.",
    "context": "Developer kit · this is the data preview full search and title screens arrive in "
  },
  "choose_one_of_the_60_seeded_titles_above": {
    "indianEnglish": "Choose one of the 60 seeded titles above.",
    "hinglish": "Choose one of the 60 seeded titles above.",
    "context": "Developer kit · choose one of the 60 seeded titles above"
  },
  "that_title_isn_t_in_this_library": {
    "indianEnglish": "That title isn’t in this library.",
    "hinglish": "That title isn’t in this library.",
    "context": "Developer kit · that title isn t in this library"
  },
  "genres_40_language_25_cast_director_25_rating_band_10_no_shared_g": {
    "indianEnglish": "Genres 40% · language 25% · cast/director 25% · rating band 10%. No shared genre: capped at 0.35 and excluded from recommendations. Ties use stable title IDs.",
    "hinglish": "Genres 40% · language 25% · cast/director 25% · rating band 10%. No shared genre: capped at 0.35 and excluded from recommendations. Ties use stable title IDs.",
    "context": "Developer kit · genres 40 language 25 cast director 25 rating band 10 no shared g"
  },
  "not_a_prediction": {
    "indianEnglish": " · not a prediction",
    "hinglish": " · not a prediction",
    "context": "Developer kit · not a prediction"
  },
  "similarity_score": {
    "indianEnglish": "Similarity score ",
    "hinglish": "Similarity score ",
    "context": "Developer kit · similarity score"
  },
  "no_similar_titles_in_these_languages_yet_try_editing_your_prefere": {
    "indianEnglish": "No similar titles in these languages yet. Try editing your preferences.",
    "hinglish": "No similar titles in these languages yet. Try editing your preferences.",
    "context": "Developer kit · no similar titles in these languages yet try editing your prefere"
  },
  "availability_is_illustrative_service_membership_does_not_include_": {
    "indianEnglish": "Availability is illustrative. Service membership does not include rentals or purchases.",
    "hinglish": "Availability is illustrative. Service membership does not include rentals or purchases.",
    "context": "Developer kit · availability is illustrative service membership does not include "
  },
  "extra_charge": {
    "indianEnglish": " · extra charge",
    "hinglish": " · extra charge",
    "context": "Developer kit · extra charge"
  },
  "your_service": {
    "indianEnglish": "Your OTT app",
    "hinglish": "Your OTT app",
    "context": "Developer kit · your service"
  },
  "where_to_watch_sample_offers": {
    "indianEnglish": "Where to watch · sample offers",
    "hinglish": "Where to watch · sample offers",
    "context": "Developer kit · where to watch sample offers"
  },
  "illustrative_rating_not_a_live_tmdb_score": {
    "indianEnglish": "Illustrative rating, not a live TMDb score.",
    "hinglish": "Illustrative rating, not a live TMDb score.",
    "context": "Developer kit · illustrative rating not a live tmdb score"
  },
  "show_matches": {
    "indianEnglish": "Show matches ",
    "hinglish": "Show matches ",
    "context": "Developer kit · show matches"
  },
  "any_language": {
    "indianEnglish": "Any language",
    "hinglish": "Any language",
    "context": "Developer kit · any language"
  },
  "language": {
    "indianEnglish": "Language",
    "hinglish": "Language",
    "context": "Developer kit · language"
  },
  "search_and_similar_picks_are_filtered_to_your_saved_languages": {
    "indianEnglish": "Search and similar picks are filtered to your saved languages.",
    "hinglish": "Search and similar picks are filtered to your saved languages.",
    "context": "Developer kit · search and similar picks are filtered to your saved languages"
  },
  "no_preference": {
    "indianEnglish": "No preference",
    "hinglish": "No preference",
    "context": "Developer kit · no preference"
  },
  "one_of_your_services": {
    "indianEnglish": "One of your OTT apps",
    "hinglish": "One of your OTT apps",
    "context": "Developer kit · one of your services"
  },
  "offers_are_ordered_using_your_saved_services": {
    "indianEnglish": "Offers are ordered using your saved OTT apps.",
    "hinglish": "Offers are ordered using your saved OTT apps.",
    "context": "Developer kit · offers are ordered using your saved services"
  },
  "free_only_preference_is_active": {
    "indianEnglish": "Free-only preference is active.",
    "hinglish": "Free-only preference is active.",
    "context": "Developer kit · free only preference is active"
  },
  "choose_a_title": {
    "indianEnglish": "Choose a title",
    "hinglish": "Choose a title",
    "context": "Developer kit · choose a title"
  },
  "start_with_a_title": {
    "indianEnglish": "Start with a title",
    "hinglish": "Start with a title",
    "context": "Developer kit · start with a title"
  },
  "why_these_go_together": {
    "indianEnglish": "Why these go together.",
    "hinglish": "Why these go together.",
    "context": "Developer kit · why these go together"
  },
  "no_match_in_your_selected_languages_try_another_spelling_or_edit_": {
    "indianEnglish": "No match in your selected languages. Try another spelling or edit your preferences.",
    "hinglish": "No match in your selected languages. Try another spelling or edit your preferences.",
    "context": "Developer kit · no match in your selected languages try another spelling or edit "
  },
  "kuch_aur_try_karein": {
    "indianEnglish": "Try another title?",
    "hinglish": "Try another title?",
    "context": "Developer kit · kuch aur try karein"
  },
  "value_min": {
    "indianEnglish": "{p1} min",
    "hinglish": "{p1} min",
    "context": "Developer kit · value min"
  },
  "separator": {
    "indianEnglish": " · ",
    "hinglish": " · ",
    "context": "Developer kit · separator"
  },
  "select_a_title_to_inspect_its_matches": {
    "indianEnglish": ". Select a title to inspect its matches.",
    "hinglish": ". Select a title to inspect its matches.",
    "context": "Developer kit · select a title to inspect its matches"
  },
  "for_value": {
    "indianEnglish": " for “{p1}”",
    "hinglish": " for “{p1}”",
    "context": "Developer kit · for value"
  },
  "search_catalog": {
    "indianEnglish": "Search catalogue",
    "hinglish": "Search catalogue",
    "context": "Developer kit · search catalog"
  },
  "try_panchayath_or_fahadh_faasil": {
    "indianEnglish": "Try panchayath or Fahadh Faasil",
    "hinglish": "Try panchayath or Fahadh Faasil",
    "context": "Developer kit · try panchayath or fahadh faasil"
  },
  "title_alternate_spelling_or_actor": {
    "indianEnglish": "Title, alternate spelling or actor",
    "hinglish": "Title, alternate spelling or actor",
    "context": "Developer kit · title alternate spelling or actor"
  },
  "find_something_familiar": {
    "indianEnglish": "Find something familiar.",
    "hinglish": "Find something familiar.",
    "context": "Developer kit · find something familiar"
  },
  "edit_preferences": {
    "indianEnglish": "Edit preferences ",
    "hinglish": "Edit preferences ",
    "context": "Developer kit · edit preferences"
  },
  "no_saved_languages_use_the_dropdown_below": {
    "indianEnglish": "No saved languages — use the dropdown below.",
    "hinglish": "No saved languages — use the dropdown below.",
    "context": "Developer kit · no saved languages use the dropdown below"
  },
  "no_saved_services_use_the_dropdown_below": {
    "indianEnglish": "No saved OTT apps — use the dropdown below.",
    "hinglish": "No saved OTT apps — use the dropdown below.",
    "context": "Developer kit · no saved services use the dropdown below"
  },
  "free_picks_only": {
    "indianEnglish": "Free picks only",
    "hinglish": "Free picks only",
    "context": "Developer kit · free picks only"
  },
  "your_saved_taste": {
    "indianEnglish": "YOUR SAVED TASTE",
    "hinglish": "YOUR SAVED TASTE",
    "context": "Developer kit · your saved taste"
  },
  "illustrative_data_india_only": {
    "indianEnglish": "Illustrative data · India only",
    "hinglish": "Illustrative data · India only",
    "context": "Developer kit · illustrative data india only"
  },
  "a_small_library_for_your_next_big_night": {
    "indianEnglish": "A small library for your next big night.",
    "hinglish": "A small library for your next big night.",
    "context": "Developer kit · a small library for your next big night"
  },
  "films_shows_eight_languages": {
    "indianEnglish": " films & web series. Eight languages.",
    "hinglish": " films & web series. Eight languages.",
    "context": "Developer kit · films shows eight languages"
  },
  "separator_2": {
    "indianEnglish": ".",
    "hinglish": ".",
    "context": "Developer kit · separator 2"
  },
  "clear_reasons": {
    "indianEnglish": "Clear reasons",
    "hinglish": "Clear reasons",
    "context": "Developer kit · clear reasons"
  },
  "good_picks": {
    "indianEnglish": "Good picks.",
    "hinglish": "Good picks.",
    "context": "Developer kit · good picks"
  },
  "p1_catalog_lab": {
    "indianEnglish": "P1 / CATALOG LAB",
    "hinglish": "P1 / CATALOG LAB",
    "context": "Developer kit · p1 catalog lab"
  },
  "back_to_design_kit": {
    "indianEnglish": " Back to design kit",
    "hinglish": " Back to design kit",
    "context": "Developer kit · back to design kit"
  },
  "loading_your_catalog": {
    "indianEnglish": "Loading your catalogue",
    "hinglish": "Loading your catalogue",
    "context": "Developer kit · loading your catalog"
  },
  "try_again": {
    "indianEnglish": "Try again",
    "hinglish": "Try again",
    "context": "Developer kit · try again"
  },
  "the_catalog_couldn_t_load_your_preferences_are_still_saved": {
    "indianEnglish": "The catalogue couldn’t load. Your preferences are still saved.",
    "hinglish": "The catalogue couldn’t load. Your preferences are still saved.",
    "context": "Developer kit · the catalog couldn t load your preferences are still saved"
  },
  "a_little_intermission": {
    "indianEnglish": "A little intermission.",
    "hinglish": "A little intermission.",
    "context": "Developer kit · a little intermission"
  },
  "sounds_like_a_plan": {
    "indianEnglish": "Sounds like a plan ",
    "hinglish": "Sounds like a plan ",
    "context": "Developer kit · sounds like a plan"
  },
  "sorted_now_who_s_bringing_the_popcorn": {
    "indianEnglish": "Sorted. Now, who’s bringing the popcorn?",
    "hinglish": "Sorted. Now, who’s bringing the popcorn?",
    "context": "Developer kit · sorted now who s bringing the popcorn"
  },
  "everyone_gets_a_say": {
    "indianEnglish": "Everyone gets a say.",
    "hinglish": "Everyone gets a say.",
    "context": "Developer kit · everyone gets a say"
  },
  "a_little_glass_a_gentle_spring_drag_this_sheet_down_press_escape_": {
    "indianEnglish": "A little glass, a gentle spring. Drag this sheet down, press Escape, or tap outside to close.",
    "hinglish": "A little glass, a gentle spring. Drag this sheet down, press Escape, or tap outside to close.",
    "context": "Developer kit · a little glass a gentle spring drag this sheet down press escape "
  },
  "tonight_is_taking_shape": {
    "indianEnglish": "Tonight is taking shape.",
    "hinglish": "Tonight is taking shape.",
    "context": "Developer kit · tonight is taking shape"
  },
  "quietly_confident": {
    "indianEnglish": "Quietly confident.",
    "hinglish": "Quietly confident.",
    "context": "Developer kit · quietly confident"
  },
  "you_re_seeing_the_full_p0_kit": {
    "indianEnglish": "You’re seeing the full P0 kit.",
    "hinglish": "You’re seeing the full P0 kit.",
    "context": "Developer kit · you re seeing the full p0 kit"
  },
  "a_little_more_to_explore": {
    "indianEnglish": "A little more to explore.",
    "hinglish": "A little more to explore.",
    "context": "Developer kit · a little more to explore"
  },
  "08_section_headers": {
    "indianEnglish": "08 / SECTION HEADERS",
    "hinglish": "08 / SECTION HEADERS",
    "context": "Developer kit · 08 section headers"
  },
  "reduced_motion_preferences_are_respected": {
    "indianEnglish": "Reduced-motion preferences are respected.",
    "hinglish": "Reduced-motion preferences are respected.",
    "context": "Developer kit · reduced motion preferences are respected"
  },
  "motion_should_feel_good": {
    "indianEnglish": "Motion should feel good.",
    "hinglish": "Motion should feel good.",
    "context": "Developer kit · motion should feel good"
  },
  "try_a_toast": {
    "indianEnglish": " Try a toast",
    "hinglish": " Try a toast",
    "context": "Developer kit · try a toast"
  },
  "added_to_tonight_snacks_next": {
    "indianEnglish": "Added to your shortlist.",
    "hinglish": "Added to your shortlist.",
    "context": "Developer kit · added to tonight snacks next"
  },
  "open_the_bottom_sheet": {
    "indianEnglish": " Open the bottom sheet",
    "hinglish": " Open the bottom sheet",
    "context": "Developer kit · open the bottom sheet"
  },
  "small_moments_big_feels": {
    "indianEnglish": "Small moments. Big feels.",
    "hinglish": "Small moments. Big feels.",
    "context": "Developer kit · small moments big feels"
  },
  "07_feedback": {
    "indianEnglish": "07 / FEEDBACK",
    "hinglish": "07 / FEEDBACK",
    "context": "Developer kit · 07 feedback"
  },
  "someone_has_to_start_the_plan": {
    "indianEnglish": "Someone has to start the plan.",
    "hinglish": "Someone has to start the plan.",
    "context": "Developer kit · someone has to start the plan"
  },
  "you": {
    "indianEnglish": "YOU",
    "hinglish": "YOU",
    "context": "Developer kit · you"
  },
  "three_friends_one_movie_night": {
    "indianEnglish": "Three friends. One movie night.",
    "hinglish": "Three friends. One movie night.",
    "context": "Developer kit · three friends one movie night"
  },
  "the_usual_suspects": {
    "indianEnglish": "The usual suspects",
    "hinglish": "The usual suspects",
    "context": "Developer kit · the usual suspects"
  },
  "better_with_your_people": {
    "indianEnglish": "Better with your people.",
    "hinglish": "Better with your people.",
    "context": "Developer kit · better with your people"
  },
  "06_people": {
    "indianEnglish": "06 / PEOPLE",
    "hinglish": "06 / PEOPLE",
    "context": "Developer kit · 06 people"
  },
  "generated_no_images": {
    "indianEnglish": "GENERATED / NO IMAGES",
    "hinglish": "GENERATED / NO IMAGES",
    "context": "Developer kit · generated no images"
  },
  "original_composition": {
    "indianEnglish": "Original composition",
    "hinglish": "Original composition",
    "context": "Developer kit · original composition"
  },
  "your_next_favourite": {
    "indianEnglish": "Your next favourite",
    "hinglish": "Your next favourite",
    "context": "Developer kit · your next favourite"
  },
  "loading_shimmer": {
    "indianEnglish": "LOADING / SHIMMER",
    "hinglish": "LOADING / SHIMMER",
    "context": "Developer kit · loading shimmer"
  },
  "loading": {
    "indianEnglish": "Loading",
    "hinglish": "Loading",
    "context": "Developer kit · loading"
  },
  "original_generated_key_art_2_3_tap_to_try_the_shortlist": {
    "indianEnglish": "Original generated key art · 2:3 · Tap + to try the shortlist",
    "hinglish": "Original generated key art · 2:3 · Tap + to try the shortlist",
    "context": "Developer kit · original generated key art 2 3 tap to try the shortlist"
  },
  "on_the_shortlist_good_taste": {
    "indianEnglish": "On the shortlist. Good taste!",
    "hinglish": "On the shortlist. Good taste!",
    "context": "Developer kit · on the shortlist good taste"
  },
  "taken_off_the_shortlist": {
    "indianEnglish": "Taken off the shortlist.",
    "hinglish": "Taken off the shortlist.",
    "context": "Developer kit · taken off the shortlist"
  },
  "every_pick_a_little_poster": {
    "indianEnglish": "Every pick, a little poster.",
    "hinglish": "Every pick, a little poster.",
    "context": "Developer kit · every pick a little poster"
  },
  "05_posters": {
    "indianEnglish": "05 / POSTERS",
    "hinglish": "05 / POSTERS",
    "context": "Developer kit · 05 posters"
  },
  "text_only_chips_with_accessible_lighter_provider_colours": {
    "indianEnglish": "Text-only chips, with accessible lighter provider colours.",
    "hinglish": "Text-only chips, with accessible lighter provider colours.",
    "context": "Developer kit · text only chips with accessible lighter provider colours"
  },
  "your_services_front_and_centre": {
    "indianEnglish": "Your OTT apps, front and centre.",
    "hinglish": "Your OTT apps, front and centre.",
    "context": "Developer kit · your services front and centre"
  },
  "try_mood_quick_start_on_home": {
    "indianEnglish": ". Try mood quick-start on Home.",
    "hinglish": ". Try mood quick-start on Home.",
    "context": "Developer kit · try mood quick start on home"
  },
  "selected": {
    "indianEnglish": "Selected: ",
    "hinglish": "Selected: ",
    "context": "Developer kit · selected"
  },
  "more_soon": {
    "indianEnglish": "More soon",
    "hinglish": "More soon",
    "context": "Developer kit · more soon"
  },
  "what_s_the_mood": {
    "indianEnglish": "What’s the mood?",
    "hinglish": "What’s the mood?",
    "context": "Developer kit · what s the mood"
  },
  "04_chips": {
    "indianEnglish": "04 / CHIPS",
    "hinglish": "04 / CHIPS",
    "context": "Developer kit · 04 chips"
  },
  "unavailable_for_now": {
    "indianEnglish": "Unavailable for now",
    "hinglish": "Unavailable for now",
    "context": "Developer kit · unavailable for now"
  },
  "nothing_to_save_yet": {
    "indianEnglish": "Nothing to save yet",
    "hinglish": "Nothing to save yet",
    "context": "Developer kit · nothing to save yet"
  },
  "pick_at_least_2_titles": {
    "indianEnglish": "Pick at least 2 titles",
    "hinglish": "Pick at least 2 titles",
    "context": "Developer kit · pick at least 2 titles"
  },
  "maybe_later": {
    "indianEnglish": "Maybe later ",
    "hinglish": "Maybe later ",
    "context": "Developer kit · maybe later"
  },
  "no_pressure_the_popcorn_can_wait": {
    "indianEnglish": "No pressure. The popcorn can wait.",
    "hinglish": "No pressure. The popcorn can wait.",
    "context": "Developer kit · no pressure the popcorn can wait"
  },
  "save_for_a_rainy_day": {
    "indianEnglish": " Save for a rainy day",
    "hinglish": " Save for a rainy day",
    "context": "Developer kit · save for a rainy day"
  },
  "saved_a_little_movie_night_inspiration": {
    "indianEnglish": "Saved a little movie-night inspiration.",
    "hinglish": "Saved a little movie-night inspiration.",
    "context": "Developer kit · saved a little movie night inspiration"
  },
  "put_it_to_the_group": {
    "indianEnglish": "Put it to the group ",
    "hinglish": "Put it to the group ",
    "context": "Developer kit · put it to the group"
  },
  "good_choice_tonight_is_looking_up": {
    "indianEnglish": "Good choice. Tonight is looking up.",
    "hinglish": "Good choice. Tonight is looking up.",
    "context": "Developer kit · good choice tonight is looking up"
  },
  "make_the_next_move": {
    "indianEnglish": "Make the next move.",
    "hinglish": "Make the next move.",
    "context": "Developer kit · make the next move"
  },
  "03_actions": {
    "indianEnglish": "03 / ACTIONS",
    "hinglish": "03 / ACTIONS",
    "context": "Developer kit · 03 actions"
  },
  "separator_3": {
    "indianEnglish": "Let’s watch a good film today.",
    "hinglish": "Let’s watch a good film today.",
    "context": "Developer kit · separator 3"
  },
  "mukta_a_little_hindi": {
    "indianEnglish": "MUKTA / A LITTLE HINDI",
    "hinglish": "MUKTA / A LITTLE HINDI",
    "context": "Developer kit · mukta a little hindi"
  },
  "good_films_great_company_plans_sorted": {
    "indianEnglish": "Good films. Great company. Plans, sorted.",
    "hinglish": "Good films. Great company. Plans, sorted.",
    "context": "Developer kit · good films great company plans sorted"
  },
  "inter_the_everyday_stuff": {
    "indianEnglish": "INTER / THE EVERYDAY STUFF",
    "hinglish": "INTER / THE EVERYDAY STUFF",
    "context": "Developer kit · inter the everyday stuff"
  },
  "separator_4": {
    "indianEnglish": "?",
    "hinglish": "?",
    "context": "Developer kit · separator 4"
  },
  "kya_dekhein": {
    "indianEnglish": "What shall we watch",
    "hinglish": "What shall we watch",
    "context": "Developer kit · kya dekhein"
  },
  "bricolage_grotesque_display": {
    "indianEnglish": "BRICOLAGE GROTESQUE / DISPLAY",
    "hinglish": "BRICOLAGE GROTESQUE / DISPLAY",
    "context": "Developer kit · bricolage grotesque display"
  },
  "a_little_main_character_energy": {
    "indianEnglish": "A little main-character energy.",
    "hinglish": "A little main-character energy.",
    "context": "Developer kit · a little main character energy"
  },
  "02_type": {
    "indianEnglish": "02 / TYPE",
    "hinglish": "02 / TYPE",
    "context": "Developer kit · 02 type"
  },
  "after_dark_in_colour": {
    "indianEnglish": "After dark, in colour.",
    "hinglish": "After dark, in colour.",
    "context": "Developer kit · after dark in colour"
  },
  "01_colour": {
    "indianEnglish": "01 / COLOUR",
    "hinglish": "01 / COLOUR",
    "context": "Developer kit · 01 colour"
  },
  "every_title_one_deterministic_design_colour_follows_mood_shapes_f": {
    "indianEnglish": "Every title, one deterministic design. Colour follows mood; shapes follow genre. Provider dots mark your included OTT apps.",
    "hinglish": "Every title, one deterministic design. Colour follows mood; shapes follow genre. Provider dots mark your included OTT apps.",
    "context": "Developer kit · every title one deterministic design colour follows mood shapes f"
  },
  "the_whole_cinema_wall": {
    "indianEnglish": "The whole cinema wall.",
    "hinglish": "The whole cinema wall.",
    "context": "Developer kit · the whole cinema wall"
  },
  "68_original_compositions": {
    "indianEnglish": "68 / ORIGINAL COMPOSITIONS",
    "hinglish": "68 / ORIGINAL COMPOSITIONS",
    "context": "Developer kit · 68 original compositions"
  },
  "explore_the_seeded_catalog": {
    "indianEnglish": "Explore the seeded catalogue ",
    "hinglish": "Explore the seeded catalogue ",
    "context": "Developer kit · explore the seeded catalog"
  },
  "foundation_v0_1": {
    "indianEnglish": " FOUNDATION / V0.1",
    "hinglish": " FOUNDATION / V0.1",
    "context": "Developer kit · foundation v0 1"
  },
  "go_on_press_all_the_buttons": {
    "indianEnglish": "Go on, press all the buttons.",
    "hinglish": "Go on, press all the buttons.",
    "context": "Developer kit · go on press all the buttons"
  },
  "design_kit": {
    "indianEnglish": " design kit.",
    "hinglish": " design kit.",
    "context": "Developer kit · design kit"
  },
  "the": {
    "indianEnglish": "The ",
    "hinglish": "The ",
    "context": "Developer kit · the"
  },
  "material": {
    "indianEnglish": "material",
    "hinglish": "material",
    "context": "Developer kit · material"
  },
  "movie_night": {
    "indianEnglish": "Movie-night",
    "hinglish": "Movie-night",
    "context": "Developer kit · movie night"
  },
  "the_look_the_feel_the_little_things": {
    "indianEnglish": "THE LOOK. THE FEEL. THE LITTLE THINGS.",
    "hinglish": "THE LOOK. THE FEEL. THE LITTLE THINGS.",
    "context": "Developer kit · the look the feel the little things"
  },
  "dil_khush_mood_sorted": {
    "indianEnglish": "A feel-good film for tonight",
    "hinglish": "A feel-good film for tonight",
    "context": "Developer kit · dil khush mood sorted"
  },
  "golden_days": {
    "indianEnglish": "Golden Days",
    "hinglish": "Golden Days",
    "context": "Developer kit · golden days"
  },
  "one_more_plot_twist": {
    "indianEnglish": "One more plot twist",
    "hinglish": "One more plot twist",
    "context": "Developer kit · one more plot twist"
  },
  "after_hours": {
    "indianEnglish": "After Hours",
    "hinglish": "After Hours",
    "context": "Developer kit · after hours"
  },
  "catalog_lab": {
    "indianEnglish": "Catalog lab",
    "hinglish": "Catalog lab",
    "context": "Developer kit · catalog lab"
  },
  "value_generated_posters_and_friday_movie_night_poll_details": {
    "indianEnglish": "{p1} generated posters and Friday movie night poll details",
    "hinglish": "{p1} generated posters and Friday movie night poll details",
    "context": "Developer kit · value generated posters and friday movie night poll details"
  },
  "open_value_title_og_image": {
    "indianEnglish": "Open {p1}-title OG image",
    "hinglish": "Open {p1}-title OG image",
    "context": "Developer kit · open value title og image"
  },
  "titles": {
    "indianEnglish": " titles",
    "hinglish": " titles",
    "context": "Developer kit · titles"
  },
  "friday_movie_night": {
    "indianEnglish": "Friday movie night",
    "hinglish": "Friday movie night",
    "context": "Developer kit · friday movie night"
  },
  "1200_630_open_an_image_for_full_size_the_outline_marks_the_center": {
    "indianEnglish": " · 1200 × 630. Open an image for full size. The outline marks the centred square crop; all posters stay inside it. Deadlines use India time.",
    "hinglish": " · 1200 × 630. Open an image for full size. The outline marks the centred square crop; all posters stay inside it. Deadlines use India time.",
    "context": "Developer kit · 1200 630 open an image for full size the outline marks the center"
  },
  "poll_share_cards": {
    "indianEnglish": "Poll share cards",
    "hinglish": "Poll share cards",
    "context": "Developer kit · poll share cards"
  }
} as const;
export const shortlistCopy = {
  "review_shortlist": {
    "indianEnglish": "Review shortlist",
    "hinglish": "Review shortlist",
    "context": "Shortlist / discovery deck · review shortlist"
  },
  "try_another_title_for_a_fresh_set_of_matches": {
    "indianEnglish": "Try another title for a fresh set of matches.",
    "hinglish": "Try another title for a fresh set of matches.",
    "context": "Shortlist / discovery deck · try another title for a fresh set of matches"
  },
  "your_shortlist_is_ready_for_the_group": {
    "indianEnglish": "The shortlist is ready. Let the group chat do its thing.",
    "hinglish": "Shortlist ready. Ab group chat ko kaam do.",
    "context": "Discovery deck · finished supporting line"
  },
  "that_s_the_deck_yaar": {
    "indianEnglish": "You’ve reached the last pick.",
    "hinglish": "You’ve reached the last pick.",
    "context": "Shortlist / discovery deck · that s the deck yaar"
  },
  "four_picks_one_great_night": {
    "indianEnglish": "Four picks. One decision. We believe in you.",
    "hinglish": "Chaar picks. Ek decision. Ho jayega.",
    "context": "Discovery deck · full shortlist completion"
  },
  "4_shortlisted": {
    "indianEnglish": " / 4 shortlisted",
    "hinglish": " / 4 shortlisted",
    "context": "Shortlist / discovery deck · 4 shortlisted"
  },
  "right_to_shortlist_left_to_skip_up_to_save": {
    "indianEnglish": "Right to shortlist · left to skip · up to save",
    "hinglish": "Right to shortlist · left to skip · up to save",
    "context": "Shortlist / discovery deck · right to shortlist left to skip up to save"
  },
  "find_your_next_pick": {
    "indianEnglish": "Find your next pick",
    "hinglish": "Find your next pick",
    "context": "Shortlist / discovery deck · find your next pick"
  },
  "next_possibility": {
    "indianEnglish": "Next possibility.",
    "hinglish": "Next possibility.",
    "context": "Shortlist / discovery deck · next possibility"
  },
  "saved_for_another_night": {
    "indianEnglish": "Saved for another night.",
    "hinglish": "Saved for another night.",
    "context": "Shortlist / discovery deck · saved for another night"
  },
  "added_to_tonight": {
    "indianEnglish": "Added to tonight.",
    "hinglish": "Added to tonight.",
    "context": "Shortlist / discovery deck · added to tonight"
  },
  "shortlist": {
    "indianEnglish": "Shortlist",
    "hinglish": "Shortlist",
    "context": "Shortlist / discovery deck · shortlist"
  },
  "watchlist": {
    "indianEnglish": "Watchlist",
    "hinglish": "Watchlist",
    "context": "Shortlist / discovery deck · watchlist"
  },
  "skip": {
    "indianEnglish": "Skip",
    "hinglish": "Skip",
    "context": "Shortlist / discovery deck · skip"
  },
  "watchlist_2": {
    "indianEnglish": "WATCHLIST",
    "hinglish": "WATCHLIST",
    "context": "Shortlist / discovery deck · watchlist 2"
  },
  "skip_2": {
    "indianEnglish": "SKIP",
    "hinglish": "SKIP",
    "context": "Shortlist / discovery deck · skip 2"
  },
  "shortlist_2": {
    "indianEnglish": "SHORTLIST",
    "hinglish": "SHORTLIST",
    "context": "Shortlist / discovery deck · shortlist 2"
  },
  "add_to_shortlist": {
    "indianEnglish": "Add to shortlist",
    "hinglish": "Add to shortlist",
    "context": "Shortlist / discovery deck · add to shortlist"
  },
  "shortlisted": {
    "indianEnglish": "Shortlisted",
    "hinglish": "Shortlisted",
    "context": "Shortlist / discovery deck · shortlisted"
  },
  "added_to_shortlist": {
    "indianEnglish": "Added. A contender enters the chat.",
    "hinglish": "Added. Ek contender aur.",
    "context": "Shortlist · successful add toast"
  },
  "removed": {
    "indianEnglish": "Removed.",
    "hinglish": "Removed.",
    "context": "Shortlist / discovery deck · removed"
  },
  "4_is_plenty_yaar": {
    "indianEnglish": "Four picks. Any more and we need another poll.",
    "hinglish": "Chaar picks. Aur hue toh ek aur poll chahiye.",
    "context": "Shortlist · fifth-add limit toast and swap heading"
  },
  "remove": {
    "indianEnglish": "Remove",
    "hinglish": "Remove",
    "context": "Shortlist / discovery deck · remove"
  },
  "value_of_4_picks_everyone_gets_a_say": {
    "indianEnglish": "{p1} of 4 picks. Everyone gets a say.",
    "hinglish": "{p1} of 4 picks. Everyone gets a say.",
    "context": "Shortlist / discovery deck · value of 4 picks everyone gets a say"
  },
  "remove_sample_picks_and_choose_catalog_titles_to_start_a_poll": {
    "indianEnglish": "Remove sample picks and choose catalogue titles to start a poll.",
    "hinglish": "Remove sample picks and choose catalogue titles to start a poll.",
    "context": "Shortlist / discovery deck · remove sample picks and choose catalog titles to start a poll"
  },
  "pick_at_least_2_titles": {
    "indianEnglish": "Pick at least 2 titles",
    "hinglish": "Pick at least 2 titles",
    "context": "Shortlist / discovery deck · pick at least 2 titles"
  },
  "ask_the_group": {
    "indianEnglish": "Ask the group",
    "hinglish": "Ask the group",
    "context": "Shortlist / discovery deck · ask the group"
  },
  "drag_the_grip_to_reorder_swipe_a_card_sideways_to_remove": {
    "indianEnglish": "Drag the grip to reorder. Swipe a card sideways to remove.",
    "hinglish": "Drag the grip to reorder. Swipe a card sideways to remove.",
    "context": "Shortlist / discovery deck · drag the grip to reorder swipe a card sideways to remove"
  },
  "keep_my_four": {
    "indianEnglish": "Keep my four",
    "hinglish": "Keep my four",
    "context": "Shortlist / discovery deck · keep my four"
  },
  "replace": {
    "indianEnglish": " replace?",
    "hinglish": " replace?",
    "context": "Shortlist / discovery deck · replace"
  },
  "the_new_title": {
    "indianEnglish": "the new title",
    "hinglish": "the new title",
    "context": "Shortlist / discovery deck · the new title"
  },
  "which_pick_should": {
    "indianEnglish": "Which pick should ",
    "hinglish": "Which pick should ",
    "context": "Shortlist / discovery deck · which pick should"
  },
  "try_again": {
    "indianEnglish": "Try again",
    "hinglish": "Try again",
    "context": "Shortlist / discovery deck · try again"
  },
  "we_couldn_t_load_the_shortlist": {
    "indianEnglish": "We couldn’t load the shortlist.",
    "hinglish": "We couldn’t load the shortlist.",
    "context": "Shortlist / discovery deck · we couldn t load the shortlist"
  },
  "your_picks_need_another_take": {
    "indianEnglish": "Shortlist unavailable.",
    "hinglish": "Shortlist unavailable.",
    "context": "Shortlist · load failure heading"
  },
  "remove_value": {
    "indianEnglish": "Remove {p1}",
    "hinglish": "Remove {p1}",
    "context": "Shortlist / discovery deck · remove value"
  },
  "move_value_down": {
    "indianEnglish": "Move {p1} down",
    "hinglish": "Move {p1} down",
    "context": "Shortlist / discovery deck · move value down"
  },
  "move_value_up": {
    "indianEnglish": "Move {p1} up",
    "hinglish": "Move {p1} up",
    "context": "Shortlist / discovery deck · move value up"
  },
  "drag_to_reorder_value": {
    "indianEnglish": "Drag to reorder {p1}",
    "hinglish": "Drag to reorder {p1}",
    "context": "Shortlist / discovery deck · drag to reorder value"
  },
  "swap_this_one": {
    "indianEnglish": "Swap this one",
    "hinglish": "Swap this one",
    "context": "Shortlist / discovery deck · swap this one"
  },
  "catalog_pick": {
    "indianEnglish": "Saved title",
    "hinglish": "Saved title",
    "context": "Shortlist / discovery deck · catalog pick"
  },
  "loading_title": {
    "indianEnglish": "Loading title",
    "hinglish": "Loading title",
    "context": "Shortlist / discovery deck · loading title"
  }
} as const;
export const homeCopy = {
  "try_other_languages": {
    "indianEnglish": "Try other languages",
    "hinglish": "Try other languages",
    "context": "Home · try other languages"
  },
  "picks_match_these_preferences_yet": {
    "indianEnglish": " picks match these preferences yet.",
    "hinglish": " picks match these preferences yet.",
    "context": "Home · picks match these preferences yet"
  },
  "no": {
    "indianEnglish": "No ",
    "hinglish": "No ",
    "context": "Home · no"
  },
  "thoda_sa_plot_twist": {
    "indianEnglish": "This mood needs a wider search.",
    "hinglish": "Is mood ke liye search thoda badhaate hain.",
    "context": "Home mood sheet · no picks"
  },
  "replaces_your_current_shortlist_then_ask_the_group": {
    "indianEnglish": "Replaces your current shortlist. Then ask the group.",
    "hinglish": "Replaces your current shortlist. Then ask the group.",
    "context": "Home · replaces your current shortlist then ask the group"
  },
  "a_group_shortlist_needs_at_least_two_picks": {
    "indianEnglish": "A group shortlist needs at least two picks.",
    "hinglish": "A group shortlist needs at least two picks.",
    "context": "Home · a group shortlist needs at least two picks"
  },
  "put_these_to_the_group": {
    "indianEnglish": "Put these to the group ",
    "hinglish": "Put these to the group ",
    "context": "Home · put these to the group"
  },
  "in_this_small_catalog": {
    "indianEnglish": " in this small catalogue.",
    "hinglish": " in this small catalogue.",
    "context": "Home · in this small catalog"
  },
  "matching": {
    "indianEnglish": " matching ",
    "hinglish": " matching ",
    "context": "Home · matching"
  },
  "just": {
    "indianEnglish": "Just ",
    "hinglish": "Just ",
    "context": "Home · just"
  },
  "loading_pick": {
    "indianEnglish": "Loading pick",
    "hinglish": "Loading pick",
    "context": "Home · loading pick"
  },
  "the_picks_didn_t_load_close_this_sheet_and_give_it_another_try": {
    "indianEnglish": "The picks didn’t load. Close this sheet and give it another try.",
    "hinglish": "The picks didn’t load. Close this sheet and give it another try.",
    "context": "Home · the picks didn t load close this sheet and give it another try"
  },
  "a_few_contenders_for_the_group": {
    "indianEnglish": "Mood set. Now for the debate.",
    "hinglish": "Mood set. Ab bas debate baaki hai.",
    "context": "Home mood sheet · supporting line; up to four picks"
  },
  "value_sorted": {
    "indianEnglish": "{p1}? Sorted.",
    "hinglish": "{p1}? Sorted.",
    "context": "Home · value sorted"
  },
  "tonight": {
    "indianEnglish": "Tonight",
    "hinglish": "Tonight",
    "context": "Home · tonight"
  },
  "voted_closes": {
    "indianEnglish": " voted · closes ",
    "hinglish": " voted · closes ",
    "context": "Home · voted closes"
  },
  "of": {
    "indianEnglish": " of ",
    "hinglish": " of ",
    "context": "Home · of"
  },
  "in_the_spotlight": {
    "indianEnglish": "IN THE SPOTLIGHT",
    "hinglish": "IN THE SPOTLIGHT",
    "context": "Home · in the spotlight"
  },
  "trending_this_week": {
    "indianEnglish": "Trending this week",
    "hinglish": "Trending this week",
    "context": "Home · trending this week"
  },
  "value_you_ll_love": {
    "indianEnglish": "{p1} you’ll love",
    "hinglish": "{p1} you’ll love",
    "context": "Home · value you ll love"
  },
  "already_in_your_corner": {
    "indianEnglish": "ALREADY IN YOUR CORNER",
    "hinglish": "ALREADY IN YOUR CORNER",
    "context": "Home · already in your corner"
  },
  "on_your_services": {
    "indianEnglish": "On your OTT apps",
    "hinglish": "On your OTT apps",
    "context": "Home · on your services"
  },
  "free_to_watch": {
    "indianEnglish": "Free to watch",
    "hinglish": "Free to watch",
    "context": "Home · free to watch"
  },
  "tonight_we_want": {
    "indianEnglish": "Tonight we want…",
    "hinglish": "Tonight we want…",
    "context": "Home · tonight we want"
  },
  "skip_the_kuch_bhi": {
    "indianEnglish": "PICK A MOOD",
    "hinglish": "PICK A MOOD",
    "context": "Home · skip the kuch bhi"
  },
  "adjust_my_preferences": {
    "indianEnglish": "Adjust my preferences",
    "hinglish": "Adjust my preferences",
    "context": "Home · adjust my preferences"
  },
  "no_titles_match_this_mix_of_services_and_languages_yet": {
    "indianEnglish": "No titles match this mix of OTT apps and languages yet.",
    "hinglish": "No titles match this mix of OTT apps and languages yet.",
    "context": "Home · no titles match this mix of services and languages yet"
  },
  "no_free_picks_in_your_selected_languages_yet_our_sample_catalog_i": {
    "indianEnglish": "No free picks in your selected languages yet. Our sample catalogue is still small.",
    "hinglish": "No free picks in your selected languages yet. Our sample catalogue is still small.",
    "context": "Home · no free picks in your selected languages yet our sample catalog i"
  },
  "your_next_favourite_is_out_there": {
    "indianEnglish": "The plan is ready. The picks need a rethink.",
    "hinglish": "Plan ready hai. Picks thode badalte hain.",
    "context": "Home · no matching titles headline"
  },
  "next_pick": {
    "indianEnglish": "Next pick",
    "hinglish": "Next pick",
    "context": "Home · next pick"
  },
  "show_pick_value_value": {
    "indianEnglish": "Show pick {p1}: {p2}",
    "hinglish": "Show pick {p1}: {p2}",
    "context": "Home · show pick value value"
  },
  "previous_pick": {
    "indianEnglish": "Previous pick",
    "hinglish": "Previous pick",
    "context": "Home · previous pick"
  },
  "take_a_closer_look": {
    "indianEnglish": "Take a closer look ",
    "hinglish": "Take a closer look ",
    "context": "Home · take a closer look"
  },
  "separator": {
    "indianEnglish": " · ",
    "hinglish": " · ",
    "context": "Home · separator"
  },
  "a_little_inspiration_to_start": {
    "indianEnglish": "A little inspiration to start",
    "hinglish": "A little inspiration to start",
    "context": "Home · a little inspiration to start"
  },
  "no_subscription_needed": {
    "indianEnglish": "No subscription needed",
    "hinglish": "No subscription needed",
    "context": "Home · no subscription needed"
  },
  "value_min": {
    "indianEnglish": "{p1} min",
    "hinglish": "{p1} min",
    "context": "Home · value min"
  },
  "series": {
    "indianEnglish": "Web series",
    "hinglish": "Web series",
    "context": "Home · series"
  },
  "tonight_s_contender": {
    "indianEnglish": " TONIGHT’S CONTENDER",
    "hinglish": " TONIGHT’S CONTENDER",
    "context": "Home · tonight s contender"
  },
  "tonight_s_picks": {
    "indianEnglish": "Tonight’s picks",
    "hinglish": "Tonight’s picks",
    "context": "Home · tonight s picks"
  },
  "search_titles": {
    "indianEnglish": "Search titles",
    "hinglish": "Search titles",
    "context": "Home · search titles"
  },
  "less_scrolling_more_cinema": {
    "indianEnglish": "LESS SCROLLING. MORE CINEMA.",
    "hinglish": "LESS SCROLLING. MORE CINEMA.",
    "context": "Home · less scrolling more cinema"
  },
  "edit_your_preferences": {
    "indianEnglish": "Edit your preferences ",
    "hinglish": "Edit your preferences ",
    "context": "Home · edit your preferences"
  },
  "no_picks_here_just_yet_try_another_language": {
    "indianEnglish": "Nothing here yet. Try another language; keep the plan.",
    "hinglish": "Yahan abhi kuch nahi. Language badlo, plan nahi.",
    "context": "Home rail · empty state"
  },
  "value_picks_sorted_open_shortlist_to_see_them": {
    "indianEnglish": "{p1} picks. The group chat can take it from here.",
    "hinglish": "{p1} picks ready. Ab group chat ki baari.",
    "context": "Home · mood shortlist success toast"
  },
  "cast": {
    "indianEnglish": "Cast",
    "hinglish": "Cast",
    "context": "Home · cast"
  },
  "director": {
    "indianEnglish": "Director",
    "hinglish": "Director",
    "context": "Home · director"
  },
  "value_valuevalue_kya_plan_hai": {
    "indianEnglish": "{p1} {p2}{p3}. What shall we watch?",
    "hinglish": "{p1} {p2}{p3}. Kya plan hai?",
    "context": "Home · value valuevalue kya plan hai"
  },
  "late_night": {
    "indianEnglish": "late night",
    "hinglish": "late night",
    "context": "Home · late night"
  },
  "on_your_value": {
    "indianEnglish": "On your {p1}",
    "hinglish": "On your {p1}",
    "context": "Home · on your value"
  },
  "free_on_value": {
    "indianEnglish": "Free on {p1}",
    "hinglish": "Free on {p1}",
    "context": "Home · free on value"
  },
  "no_offer_listed": {
    "indianEnglish": "No offer listed",
    "hinglish": "No offer listed",
    "context": "Home · no offer listed"
  },
  "morning": {
    "indianEnglish": "morning",
    "hinglish": "morning",
    "context": "Home · morning"
  },
  "afternoon": {
    "indianEnglish": "afternoon",
    "hinglish": "afternoon",
    "context": "Home · afternoon"
  },
  "evening": {
    "indianEnglish": "evening",
    "hinglish": "evening",
    "context": "Home · evening"
  },
  "night": {
    "indianEnglish": "night",
    "hinglish": "night",
    "context": "Home · night"
  }
} as const;
export const welcomeCopy = {
  "0": {
    "indianEnglish": " / 0",
    "hinglish": " / 0",
    "context": "Onboarding · 0"
  },
  "skip_for_now": {
    "indianEnglish": "Skip for now",
    "hinglish": "Skip for now",
    "context": "Onboarding · skip for now"
  },
  "continue": {
    "indianEnglish": "Continue",
    "hinglish": "Continue",
    "context": "Onboarding · continue"
  },
  "let_s_make_a_night_of_it": {
    "indianEnglish": "Finish setup",
    "hinglish": "Finish setup",
    "context": "Onboarding · final action button"
  },
  "save_preferences": {
    "indianEnglish": "Save preferences",
    "hinglish": "Save preferences",
    "context": "Onboarding · save preferences"
  },
  "your_seat_in_the_group_is_saved": {
    "indianEnglish": "One less introduction in the group chat.",
    "hinglish": "Group chat mein introduction sorted.",
    "context": "Onboarding step 3 · completion hint"
  },
  "no_preference_we_ll_keep_every_language_open": {
    "indianEnglish": "No preference? We’ll keep every language open.",
    "hinglish": "No preference? We’ll keep every language open.",
    "context": "Onboarding · no preference we ll keep every language open"
  },
  "value_languages_one_great_night": {
    "indianEnglish": "{p1} languages. One great night.",
    "hinglish": "{p1} languages. One great night.",
    "context": "Onboarding · value languages one great night"
  },
  "no_subscriptions_you_can_still_explore": {
    "indianEnglish": "No subscriptions? You can still explore.",
    "hinglish": "No subscriptions? You can still explore.",
    "context": "Onboarding · no subscriptions you can still explore"
  },
  "value_services_plenty_of_possibilities": {
    "indianEnglish": "{p1} OTT apps. Plenty of possibilities.",
    "hinglish": "{p1} OTT apps. Plenty of possibilities.",
    "context": "Onboarding · value services plenty of possibilities"
  },
  "free_picks_good_nights_zero_subscriptions": {
    "indianEnglish": "Free picks. Good nights. Zero subscriptions.",
    "hinglish": "Free picks. Good nights. Zero subscriptions.",
    "context": "Onboarding · free picks good nights zero subscriptions"
  },
  "just_for_this_device_no_account_no_signup": {
    "indianEnglish": "Just for this device. No account, no signup.",
    "hinglish": "Just for this device. No account, no signup.",
    "context": "Onboarding · just for this device no account no signup"
  },
  "value_avatar": {
    "indianEnglish": "{p1} avatar",
    "hinglish": "{p1} avatar",
    "context": "Onboarding · value avatar"
  },
  "choose_your_avatar": {
    "indianEnglish": "Choose your avatar",
    "hinglish": "Choose your avatar",
    "context": "Onboarding · choose your avatar"
  },
  "pick_your_little_alter_ego": {
    "indianEnglish": "Choose an avatar",
    "hinglish": "Choose an avatar",
    "context": "Onboarding · pick your little alter ego"
  },
  "what_s_your_movie_night_name": {
    "indianEnglish": "What’s your movie-night name?",
    "hinglish": "What’s your movie-night name?",
    "context": "Onboarding · what s your movie night name"
  },
  "optional": {
    "indianEnglish": "optional",
    "hinglish": "optional",
    "context": "Onboarding · optional"
  },
  "your_name": {
    "indianEnglish": "Your name ",
    "hinglish": "Your name ",
    "context": "Onboarding · your name"
  },
  "good_stories_travel_so_can_your_taste": {
    "indianEnglish": "Good stories travel. So can your taste.",
    "hinglish": "Good stories travel. So can your taste.",
    "context": "Onboarding · good stories travel so can your taste"
  },
  "separator": {
    "indianEnglish": "A good story is worth your time.",
    "hinglish": "A good story is worth your time.",
    "context": "Onboarding · separator"
  },
  "none_yet_show_me_free_stuff": {
    "indianEnglish": "Show me free films",
    "hinglish": "Show me free films",
    "context": "Onboarding · none yet show me free stuff"
  },
  "phone_plan_and_family_logins_count_too": {
    "indianEnglish": "Phone plan and family logins count too.",
    "hinglish": "Phone plan and family logins count too.",
    "context": "Onboarding · phone plan and family logins count too"
  },
  "a_first_name_a_nickname_your_group_chat_alias_keep_it_you": {
    "indianEnglish": "The name they’ll thank when the film is good.",
    "hinglish": "Film achhi nikli toh thanks isi naam ko milega.",
    "context": "Onboarding step 3 · optional-name description"
  },
  "one_language_or_a_whole_mix_there_s_room_for_every_kind_of_movie_": {
    "indianEnglish": "Subtitles have entered the chat. Pick your languages.",
    "hinglish": "Subtitles bhi hain. Apni languages chuno.",
    "context": "Onboarding step 2 · language selection description"
  },
  "we_ll_bring_the_picks_you_bring_the_subscriptions_choose_as_many_": {
    "indianEnglish": "Choose the OTT apps you can access. You can select more than one.",
    "hinglish": "Choose the OTT apps you can access. You can select more than one.",
    "context": "Onboarding · we ll bring the picks you bring the subscriptions choose as many "
  },
  "every_group_has_a_main_character": {
    "indianEnglish": "EVERY GROUP HAS A MAIN CHARACTER.",
    "hinglish": "EVERY GROUP HAS A MAIN CHARACTER.",
    "context": "Onboarding · every group has a main character"
  },
  "great_stories_speak_your_language": {
    "indianEnglish": "GREAT STORIES SPEAK YOUR LANGUAGE.",
    "hinglish": "GREAT STORIES SPEAK YOUR LANGUAGE.",
    "context": "Onboarding · great stories speak your language"
  },
  "your_sofa_your_subscriptions": {
    "indianEnglish": "YOUR OTT APPS. YOUR CHOICE.",
    "hinglish": "YOUR OTT APPS. YOUR CHOICE.",
    "context": "Onboarding · your sofa your subscriptions"
  },
  "setup_progress": {
    "indianEnglish": "Setup progress",
    "hinglish": "Setup progress",
    "context": "Onboarding · setup progress"
  },
  "0_2": {
    "indianEnglish": "0",
    "hinglish": "0",
    "context": "Onboarding · 0 2"
  },
  "cancel": {
    "indianEnglish": "Cancel",
    "hinglish": "Cancel",
    "context": "Onboarding · cancel"
  },
  "previous_step": {
    "indianEnglish": "Previous step",
    "hinglish": "Previous step",
    "context": "Onboarding · previous step"
  },
  "your_people_your_picks_your_night": {
    "indianEnglish": "Your people. Your picks. Your night.",
    "hinglish": "Your people. Your picks. Your night.",
    "context": "Onboarding · your people your picks your night"
  },
  "the_good_part_starts_now": {
    "indianEnglish": "THE GOOD PART STARTS NOW",
    "hinglish": "THE GOOD PART STARTS NOW",
    "context": "Onboarding · the good part starts now"
  },
  "opening_tonight": {
    "indianEnglish": "Opening tonight",
    "hinglish": "Opening tonight",
    "context": "Onboarding · opening tonight"
  },
  "what_should_friends_call_you": {
    "indianEnglish": "What should friends call you?",
    "hinglish": "What should friends call you?",
    "context": "Onboarding · what should friends call you"
  },
  "what_do_you_watch_in": {
    "indianEnglish": "Which languages do you watch in?",
    "hinglish": "Which languages do you watch in?",
    "context": "Onboarding · what do you watch in"
  },
  "which_apps_do_you_pay_for": {
    "indianEnglish": "Which OTT apps do you use?",
    "hinglish": "Which OTT apps do you use?",
    "context": "Onboarding · which apps do you pay for"
  },
  "ready_title": {
    "indianEnglish": "Ready. The group chat has a plan.",
    "hinglish": "Ready. Ab group chat ke paas plan hai.",
    "context": "Onboarding completion · one-second celebration"
  }
} as const;
export const pollCreateCopy = {
  "creating_poll": {
    "indianEnglish": "Creating poll",
    "hinglish": "Creating poll",
    "context": "Poll creation · creating poll"
  },
  "copy_link": {
    "indianEnglish": "Copy link",
    "hinglish": "Copy link",
    "context": "Poll creation · copy link"
  },
  "send_to_whatsapp": {
    "indianEnglish": "Send to WhatsApp",
    "hinglish": "Send to WhatsApp",
    "context": "Poll creation · send to whatsapp"
  },
  "creating_your_poll": {
    "indianEnglish": "Creating your poll…",
    "hinglish": "Creating your poll…",
    "context": "Poll creation · creating your poll"
  },
  "local_demo_mode_votes_sync_across_tabs_on_this_device_only": {
    "indianEnglish": "Local demo mode: votes sync across tabs on this device only.",
    "hinglish": "Local demo mode: votes sync across tabs on this device only.",
    "context": "Poll creation · local demo mode votes sync across tabs on this device only"
  },
  "friends_can_vote_from_any_phone_using_the_shared_link_use_a_publi": {
    "indianEnglish": "Share the link with your group. Friends can vote on their phones without signing up.",
    "hinglish": "Share the link with your group. Friends can vote on their phones without signing up.",
    "context": "Poll creation · friends can vote from any phone using the shared link use a publi"
  },
  "thumbs_up_or_down_no_app_no_signup": {
    "indianEnglish": "Thumbs up or down. No app. No signup.",
    "hinglish": "Thumbs up or down. No app. No signup.",
    "context": "Poll creation · thumbs up or down no app no signup"
  },
  "choose_a_deadline": {
    "indianEnglish": "Choose a deadline",
    "hinglish": "Choose a deadline",
    "context": "Poll creation · choose a deadline"
  },
  "closes_value": {
    "indianEnglish": "Closes {p1}",
    "hinglish": "Closes {p1}",
    "context": "Poll creation · closes value"
  },
  "movie_night": {
    "indianEnglish": "Movie night",
    "hinglish": "Movie night",
    "context": "Poll creation · movie night"
  },
  "your_group": {
    "indianEnglish": "Your group",
    "hinglish": "Your group",
    "context": "Poll creation · your group"
  },
  "your_friends_will_see": {
    "indianEnglish": "YOUR FRIENDS WILL SEE",
    "hinglish": "YOUR FRIENDS WILL SEE",
    "context": "Poll creation · your friends will see"
  },
  "live_voter_preview": {
    "indianEnglish": "Live voter preview",
    "hinglish": "Live voter preview",
    "context": "Poll creation · live voter preview"
  },
  "snacks_are_sorted_you_choose_the_film": {
    "indianEnglish": "One film. Fewer messages about choosing it.",
    "hinglish": "Ek film. Choose karne pe kam messages.",
    "context": "Poll creation · optional note placeholder"
  },
  "optional": {
    "indianEnglish": "(optional)",
    "hinglish": "(optional)",
    "context": "Poll creation · optional"
  },
  "a_little_note": {
    "indianEnglish": "A little note ",
    "hinglish": "A little note ",
    "context": "Poll creation · a little note"
  },
  "choose_a_time_that_s_still_ahead_of_us": {
    "indianEnglish": "Choose a time that’s still ahead of us.",
    "hinglish": "Choose a time that’s still ahead of us.",
    "context": "Poll creation · choose a time that s still ahead of us"
  },
  "custom_deadline": {
    "indianEnglish": "Custom deadline",
    "hinglish": "Custom deadline",
    "context": "Poll creation · custom deadline"
  },
  "custom": {
    "indianEnglish": "Custom",
    "hinglish": "Custom",
    "context": "Poll creation · custom"
  },
  "tonight_9_pm": {
    "indianEnglish": "Tonight 9 pm",
    "hinglish": "Tonight 9 pm",
    "context": "Poll creation · tonight 9 pm"
  },
  "1_hr": {
    "indianEnglish": "1 hr",
    "hinglish": "1 hr",
    "context": "Poll creation · 1 hr"
  },
  "30_min": {
    "indianEnglish": "30 min",
    "hinglish": "30 min",
    "context": "Poll creation · 30 min"
  },
  "when_do_we_decide": {
    "indianEnglish": "When do we decide?",
    "hinglish": "When do we decide?",
    "context": "Poll creation · when do we decide"
  },
  "poll_name": {
    "indianEnglish": "Poll name",
    "hinglish": "Poll name",
    "context": "Poll creation · poll name"
  },
  "your_name_so_friends_know_who_s_asking": {
    "indianEnglish": "Your name, so friends know who’s asking",
    "hinglish": "Your name, so friends know who’s asking",
    "context": "Poll creation · your name so friends know who s asking"
  },
  "flatmates_college_gang": {
    "indianEnglish": "Flatmates, College gang",
    "hinglish": "Flatmates, College gang",
    "context": "Poll creation · flatmates college gang"
  },
  "which_group_is_this_for": {
    "indianEnglish": "Which group is this for?",
    "hinglish": "Which group is this for?",
    "context": "Poll creation · which group is this for"
  },
  "find_tonight_s_picks": {
    "indianEnglish": "Find tonight’s picks",
    "hinglish": "Find tonight’s picks",
    "context": "Poll creation · find tonight s picks"
  },
  "add_2_4_catalog_titles_to_your_shortlist": {
    "indianEnglish": "Add 2–4 catalogue titles to your shortlist.",
    "hinglish": "Add 2–4 catalogue titles to your shortlist.",
    "context": "Poll creation · add 2 4 catalog titles to your shortlist"
  },
  "start_with_two_good_options": {
    "indianEnglish": "A poll needs a little competition.",
    "hinglish": "Poll hai. Thoda competition toh chahiye.",
    "context": "Poll creation · empty shortlist heading"
  },
  "your_picks_their_vote_sorted": {
    "indianEnglish": "You made a shortlist. That already counts as planning.",
    "hinglish": "Shortlist ban gayi. Itna planning toh kaafi hai.",
    "context": "Poll creation · subtitle"
  },
  "ask_the_group": {
    "indianEnglish": "Ask the group.",
    "hinglish": "Ask the group.",
    "context": "Poll creation · ask the group"
  },
  "less_debate_more_movie": {
    "indianEnglish": "LESS DEBATE. MORE MOVIE.",
    "hinglish": "LESS DEBATE. MORE MOVIE.",
    "context": "Poll creation · less debate more movie"
  },
  "tonight": {
    "indianEnglish": " Tonight",
    "hinglish": " Tonight",
    "context": "Poll creation · tonight"
  },
  "could_not_create_this_poll_try_again": {
    "indianEnglish": "Could not create this poll. Try again.",
    "hinglish": "Could not create this poll. Try again.",
    "context": "Poll creation · could not create this poll try again"
  },
  "value_vote_for_tonight_s_picture_value": {
    "indianEnglish": "{p1}, vote, or it’s “anything is fine” all over again. {p2}",
    "hinglish": "{p1}, vote do, warna phir se “kuch bhi” chalega. {p2}",
    "context": "Poll · baseline share text; contextual variants used at send time"
  },
  "give_the_poll_a_name_and_a_future_deadline": {
    "indianEnglish": "Give the poll a name and a future deadline.",
    "hinglish": "Give the poll a name and a future deadline.",
    "context": "Poll creation · give the poll a name and a future deadline"
  },
  "your_name_helps_friends_know_who_s_asking": {
    "indianEnglish": "Your name helps friends know who’s asking.",
    "hinglish": "Your name helps friends know who’s asking.",
    "context": "Poll creation · your name helps friends know who s asking"
  },
  "enter_a_group_name_before_creating_the_poll": {
    "indianEnglish": "Enter a group name before creating the poll.",
    "hinglish": "Enter a group name before creating the poll.",
    "context": "Poll creation · enter a group name before creating the poll"
  },
  "value_movie_night": {
    "indianEnglish": "{p1} movie night",
    "hinglish": "{p1} movie night",
    "context": "Poll creation · value movie night"
  }
} as const;
export const voterCopy = {
  "80": {
    "indianEnglish": "/80",
    "hinglish": "/80",
    "context": "Voter / live results · 80"
  },
  "not_now": {
    "indianEnglish": "Not now",
    "hinglish": "Not now",
    "context": "Voter / live results · not now"
  },
  "save_my_vote": {
    "indianEnglish": "Save my vote",
    "hinglish": "Save my vote",
    "context": "Voter / live results · save my vote"
  },
  "first_name": {
    "indianEnglish": "First name",
    "hinglish": "First name",
    "context": "Voter / live results · first name"
  },
  "no_signup_so_friends_know_it_s_you": {
    "indianEnglish": "No signup. So friends know it’s you.",
    "hinglish": "No signup. So friends know it’s you.",
    "context": "Voter / live results · no signup so friends know it s you"
  },
  "who_s_joining_tonight": {
    "indianEnglish": "Who’s joining tonight?",
    "hinglish": "Who’s joining tonight?",
    "context": "Voter / live results · who s joining tonight"
  },
  "just_your_first_name": {
    "indianEnglish": "JUST YOUR FIRST NAME",
    "hinglish": "JUST YOUR FIRST NAME",
    "context": "Voter / live results · just your first name"
  },
  "local_demo_mode_votes_sync_across_tabs_on_this_browser_only_creat": {
    "indianEnglish": "Local demo mode: votes sync across tabs on this browser only. Creator controls use this browser’s local identity.",
    "hinglish": "Local demo mode: votes sync across tabs on this browser only. Creator controls use this browser’s local identity.",
    "context": "Voter / live results · local demo mode votes sync across tabs on this browser only creat"
  },
  "votes_sync_across_devices_keep_this_browser_s_storage_to_retain_y": {
    "indianEnglish": "Votes sync across devices. Keep this browser’s storage to retain your votes and creator controls. No account needed.",
    "hinglish": "Votes sync across devices. Keep this browser’s storage to retain your votes and creator controls. No account needed.",
    "context": "Voter / live results · votes sync across devices keep this browser s storage to retain y"
  },
  "about_this_prototype": {
    "indianEnglish": "About this prototype",
    "hinglish": "About this prototype",
    "context": "Voter / live results · about this prototype"
  },
  "ratings_tmdb_this_product_is_not_endorsed_or_certified_by_tmdb_av": {
    "indianEnglish": "Ratings: TMDb. This product is not endorsed or certified by TMDb. Availability is illustrative.",
    "hinglish": "Ratings: TMDb. This product is not endorsed or certified by TMDb. Availability is illustrative.",
    "context": "Voter / live results · ratings tmdb this product is not endorsed or certified by tmdb av"
  },
  "get_the_app": {
    "indianEnglish": "Get the app",
    "hinglish": "Get the app",
    "context": "Voter / live results · get the app"
  },
  "see_results": {
    "indianEnglish": "See results ",
    "hinglish": "See results ",
    "context": "Voter / live results · see results"
  },
  "simulate_friends": {
    "indianEnglish": "Simulate friends",
    "hinglish": "Simulate friends",
    "context": "Voter / live results · simulate friends"
  },
  "friends_are_voting": {
    "indianEnglish": "Friends are voting…",
    "hinglish": "Friends are voting…",
    "context": "Voter / live results · friends are voting"
  },
  "separator": {
    "indianEnglish": " · ",
    "hinglish": " · ",
    "context": "Voter / live results · separator"
  },
  "your_group": {
    "indianEnglish": "Your group",
    "hinglish": "Your group",
    "context": "Voter / live results · your group"
  },
  "separator_2": {
    "indianEnglish": "”",
    "hinglish": "”",
    "context": "Voter / live results · separator 2"
  },
  "separator_3": {
    "indianEnglish": "“",
    "hinglish": "“",
    "context": "Voter / live results · separator 3"
  },
  "show_the_winner": {
    "indianEnglish": "Show the winner",
    "hinglish": "Show the winner",
    "context": "Voter / live results · show the winner"
  },
  "tonight": {
    "indianEnglish": "Tonight: ",
    "hinglish": "Tonight: ",
    "context": "Voter / live results · tonight"
  },
  "pick_another_night": {
    "indianEnglish": "Pick another night",
    "hinglish": "Pick another night",
    "context": "Voter / live results · pick another night"
  },
  "no_winner_to_call_start_a_fresh_night": {
    "indianEnglish": "No votes, no winner. Try another movie night.",
    "hinglish": "Votes nahi aaye, winner nahi hai. Nayi movie night try karein.",
    "context": "Closed poll · factual no-winner explanation"
  },
  "no_votes_this_time": {
    "indianEnglish": "The group chat had other plans.",
    "hinglish": "Group chat ke kuch aur plans the.",
    "context": "Closed poll · zero-vote empty state"
  },
  "done": {
    "indianEnglish": "Done",
    "hinglish": "Done",
    "context": "Voter / live results · done"
  },
  "voted": {
    "indianEnglish": " voted",
    "hinglish": " voted",
    "context": "Voter / live results · voted"
  },
  "of": {
    "indianEnglish": " of ",
    "hinglish": " of ",
    "context": "Voter / live results · of"
  },
  "send": {
    "indianEnglish": "Send",
    "hinglish": "Send",
    "context": "Voter / live results · send"
  },
  "seen_it_total_paisa_vasool": {
    "indianEnglish": "Seen it. Would bring the group along.",
    "hinglish": "Dekhi hai. Group ke saath phir dekh lenge.",
    "context": "Voter · optional take after all cards are rated"
  },
  "optional": {
    "indianEnglish": "(optional)",
    "hinglish": "(optional)",
    "context": "Voter / live results · optional"
  },
  "any_thoughts": {
    "indianEnglish": "Any thoughts? ",
    "hinglish": "Any thoughts? ",
    "context": "Voter / live results · any thoughts"
  },
  "thumbs_down_value": {
    "indianEnglish": "Thumbs down {p1}",
    "hinglish": "Thumbs down {p1}",
    "context": "Voter / live results · thumbs down value"
  },
  "thumbs_up_value": {
    "indianEnglish": "Thumbs up {p1}",
    "hinglish": "Thumbs up {p1}",
    "context": "Voter / live results · thumbs up value"
  },
  "tmdb": {
    "indianEnglish": "TMDb",
    "hinglish": "TMDb",
    "context": "Voter / live results · tmdb"
  },
  "provider_unlisted": {
    "indianEnglish": "Provider unlisted",
    "hinglish": "Provider unlisted",
    "context": "Voter / live results · provider unlisted"
  },
  "on_value": {
    "indianEnglish": "on {p1}",
    "hinglish": "on {p1}",
    "context": "Voter / live results · on value"
  },
  "call_it": {
    "indianEnglish": "Call it",
    "hinglish": "Call it",
    "context": "Voter / live results · call it"
  },
  "copy_voting_link": {
    "indianEnglish": "Copy voting link",
    "hinglish": "Copy voting link",
    "context": "Voter / live results · copy voting link"
  },
  "open_voter_view_and_copy_the_address": {
    "indianEnglish": "Open voter view and copy the address.",
    "hinglish": "Open voter view and copy the address.",
    "context": "Voter / live results · open voter view and copy the address"
  },
  "voting_link_copied": {
    "indianEnglish": "Voting link copied.",
    "hinglish": "Voting link copied.",
    "context": "Voter / live results · voting link copied"
  },
  "open_voter_view": {
    "indianEnglish": "Open voter view",
    "hinglish": "Open voter view",
    "context": "Voter / live results · open voter view"
  },
  "most_up_minus_down_wins_ties_go_to_the_higher_tmdb_rating": {
    "indianEnglish": "Most up minus down wins. The creator can toss a tie; otherwise, the higher TMDb rating decides.",
    "hinglish": "Most up minus down wins. The creator can toss a tie; otherwise, the higher TMDb rating decides.",
    "context": "Voter / live results · most up minus down wins ties go to the higher tmdb rating"
  },
  "who_voted": {
    "indianEnglish": "Who voted",
    "hinglish": "Who voted",
    "context": "Voter / live results · who voted"
  },
  "net": {
    "indianEnglish": "Net ",
    "hinglish": "Net ",
    "context": "Voter / live results · net"
  },
  "down": {
    "indianEnglish": " down",
    "hinglish": " down",
    "context": "Voter / live results · down"
  },
  "up": {
    "indianEnglish": " up · ",
    "hinglish": " up · ",
    "context": "Voter / live results · up"
  },
  "waiting_for_votes": {
    "indianEnglish": "The plan is ready. The votes are taking their time.",
    "hinglish": "Plan ready hai. Votes apna time le rahe hain.",
    "context": "Results · zero-vote waiting headline"
  },
  "the_race_is_on": {
    "indianEnglish": "The race is on",
    "hinglish": "The race is on",
    "context": "Voter / live results · the race is on"
  },
  "the_group_has_spoken": {
    "indianEnglish": "The group has spoken",
    "hinglish": "The group has spoken",
    "context": "Voter / live results · the group has spoken"
  },
  "live_tally": {
    "indianEnglish": "Live tally",
    "hinglish": "Live tally",
    "context": "Voter / live results · live tally"
  },
  "thumbs_up_for_yes_down_for_not_tonight": {
    "indianEnglish": "Thumbs up for yes. Down for not tonight.",
    "hinglish": "Thumbs up for yes. Down for not tonight.",
    "context": "Voter / live results · thumbs up for yes down for not tonight"
  },
  "value_wants_to_watch_something_vote": {
    "indianEnglish": "{p1} brought options. You bring the deciding vote.",
    "hinglish": "{p1} options laaye hain. Ab tumhari vote ki baari.",
    "context": "Voter · invitation with real creator name"
  },
  "a_friend": {
    "indianEnglish": "A friend",
    "hinglish": "A friend",
    "context": "Voter / live results · a friend"
  },
  "value_s_group_movie_night": {
    "indianEnglish": "{p1}’s group movie night",
    "hinglish": "{p1}’s group movie night",
    "context": "Voter / live results · value s group movie night"
  },
  "checking_time": {
    "indianEnglish": "Checking time…",
    "hinglish": "Checking time…",
    "context": "Voter / live results · checking time"
  },
  "voting_closed": {
    "indianEnglish": "Voting closed",
    "hinglish": "Voting closed",
    "context": "Voter / live results · voting closed"
  },
  "separator_4": {
    "indianEnglish": ".",
    "hinglish": ".",
    "context": "Voter / live results · separator 4"
  },
  "value_home": {
    "indianEnglish": "{p1} home",
    "hinglish": "{p1} home",
    "context": "Voter / live results · value home"
  },
  "voting_closed_before_the_demo_finished": {
    "indianEnglish": "Voting closed before the demo finished.",
    "hinglish": "Voting closed before the demo finished.",
    "context": "Voter / live results · voting closed before the demo finished"
  },
  "great_cast_let_s_watch_together": {
    "indianEnglish": "Great cast. Let’s watch together.",
    "hinglish": "Great cast. Let’s watch together.",
    "context": "Voter / live results · great cast let s watch together"
  },
  "arjun": {
    "indianEnglish": "Arjun",
    "hinglish": "Arjun",
    "context": "Voter / live results · arjun"
  },
  "this_gets_my_double_yes": {
    "indianEnglish": "This gets my double yes.",
    "hinglish": "This gets my double yes.",
    "context": "Voter / live results · this gets my double yes"
  },
  "meera": {
    "indianEnglish": "Meera",
    "hinglish": "Meera",
    "context": "Voter / live results · meera"
  },
  "perfect_for_tonight_snacks_on_me": {
    "indianEnglish": "A good choice for tonight.",
    "hinglish": "A good choice for tonight.",
    "context": "Voter / live results · perfect for tonight snacks on me"
  },
  "kabir": {
    "indianEnglish": "Kabir",
    "hinglish": "Kabir",
    "context": "Voter / live results · kabir"
  },
  "riya": {
    "indianEnglish": "Riya",
    "hinglish": "Riya",
    "context": "Voter / live results · riya"
  },
  "could_not_close_this_poll": {
    "indianEnglish": "Could not close this poll.",
    "hinglish": "Could not close this poll.",
    "context": "Voter / live results · could not close this poll"
  },
  "could_not_save_try_again": {
    "indianEnglish": "Your vote didn’t save. Please try again.",
    "hinglish": "Vote save nahi hua. Ek baar phir try karein.",
    "context": "Voter · vote failure; plain translation, no joke"
  },
  "vote_saved": {
    "indianEnglish": "Vote saved. One less “anything is fine”.",
    "hinglish": "Vote saved. Ek “kuch bhi” kam.",
    "context": "Voter · successful vote toast"
  },
  "could_not_send_try_again": {
    "indianEnglish": "Could not send. Try again.",
    "hinglish": "Could not send. Try again.",
    "context": "Voter / live results · could not send try again"
  },
  "thoughts_sent": {
    "indianEnglish": "Thoughts sent.",
    "hinglish": "Thoughts sent.",
    "context": "Voter / live results · thoughts sent"
  },
  "find_tonight_s_picks": {
    "indianEnglish": "Find tonight’s picks",
    "hinglish": "Find tonight’s picks",
    "context": "Voter / live results · find tonight s picks"
  },
  "try_again": {
    "indianEnglish": "Try again",
    "hinglish": "Try again",
    "context": "Voter / live results · try again"
  },
  "that_poll_doesn_t_exist_here_ask_your_friend_for_the_latest_link_": {
    "indianEnglish": "That poll doesn’t exist here. Ask your friend for the latest link, or start a fresh movie night.",
    "hinglish": "That poll doesn’t exist here. Ask your friend for the latest link, or start a fresh movie night.",
    "context": "Voter / live results · that poll doesn t exist here ask your friend for the latest link "
  },
  "we_couldn_t_load_this_poll_check_your_connection_and_try_again": {
    "indianEnglish": "We couldn’t load this poll. Check your connection and try again.",
    "hinglish": "We couldn’t load this poll. Check your connection and try again.",
    "context": "Voter / live results · we couldn t load this poll check your connection and try again"
  },
  "this_night_is_off_the_reel": {
    "indianEnglish": "Poll not found.",
    "hinglish": "Poll not found.",
    "context": "Poll · invalid ID heading"
  },
  "a_little_intermission": {
    "indianEnglish": "Poll unavailable.",
    "hinglish": "Poll unavailable.",
    "context": "Poll · load failure heading"
  },
  "loading_movie_night": {
    "indianEnglish": "Loading movie night",
    "hinglish": "Loading movie night",
    "context": "Voter / live results · loading movie night"
  },
  "this_poll_could_not_be_saved_check_browser_storage": {
    "indianEnglish": "This poll could not be saved. Check browser storage.",
    "hinglish": "This poll could not be saved. Check browser storage.",
    "context": "Voter / live results · this poll could not be saved check browser storage"
  },
  "allow_browser_storage_to_vote_in_this_prototype": {
    "indianEnglish": "Allow browser storage to vote in this prototype.",
    "hinglish": "Allow browser storage to vote in this prototype.",
    "context": "Voter / live results · allow browser storage to vote in this prototype"
  },
  "vote_in_10_seconds_no_app_needed": {
    "indianEnglish": "Vote in 10 seconds, no app needed",
    "hinglish": "Vote in 10 seconds, no app needed",
    "context": "Voter / live results · vote in 10 seconds no app needed"
  },
  "movie_night": {
    "indianEnglish": "Movie night",
    "hinglish": "Movie night",
    "context": "Voter / live results · movie night"
  },
  "movie_night_on_value": {
    "indianEnglish": "Movie night on {p1}",
    "hinglish": "Movie night on {p1}",
    "context": "Voter / live results · movie night on value"
  },
  "movie_night_results": {
    "indianEnglish": "Movie night results",
    "hinglish": "Movie night results",
    "context": "Voter / live results · movie night results"
  },
  "back_to_tonight": {
    "indianEnglish": "Back to tonight",
    "hinglish": "Back to tonight",
    "context": "Voter / live results · back to tonight"
  },
  "the_movie_night_couldn_t_load_check_your_connection_and_give_it_a": {
    "indianEnglish": "The movie night couldn’t load. Check your connection and try again.",
    "hinglish": "The movie night couldn’t load. Check your connection and try again.",
    "context": "Poll · route error explanation"
  },
  "separator_5": {
    "indianEnglish": "↻",
    "hinglish": "↻",
    "context": "Voter / live results · separator 5"
  },
  "waiting_count": {
    "indianEnglish": "{count} voted. The rest left you on read.",
    "hinglish": "{count} ne vote kiya. Baaki abhi “seen” pe hain.",
    "context": "Results · open poll with votes; count is live, read status is playful not telemetry"
  },
  "tie_line": {
    "indianEnglish": "It's a tie. Toss for it?",
    "hinglish": "Tie ho gaya. Toss karein?",
    "context": "Results · equal top net scores before a creator toss; button appears only before any check-in"
  },
  "late_line": {
    "indianEnglish": "Bit late. The group went with {title}.",
    "hinglish": "Late ho gaye. Group ne {title} chun li.",
    "context": "Closed voter page · shown only to a device with no vote"
  },
  "sticky_progress": {
    "indianEnglish": "{count} of {total} voted. Your call.",
    "hinglish": "{count} of {total} voted. Ab tumhari choice.",
    "context": "Voter · sticky progress; Done stays disabled until every card has a vote"
  },
  "toss": {
    "indianEnglish": "Toss",
    "hinglish": "Toss",
    "context": "voter: creator tie-break action/status. Toss is saved once for all voters."
  },
  "tossing": {
    "indianEnglish": "Tossing…",
    "hinglish": "Tossing…",
    "context": "voter: creator tie-break action/status. Toss is saved once for all voters."
  },
  "toss_saved": {
    "indianEnglish": "Decided by toss",
    "hinglish": "Decided by toss",
    "context": "voter: creator tie-break action/status. Toss is saved once for all voters."
  },
  "toss_failed": {
    "indianEnglish": "Could not toss. Check your connection and try again.",
    "hinglish": "Could not toss. Check your connection and try again.",
    "context": "voter: creator tie-break action/status. Toss is saved once for all voters."
  }
} as const;
export const artworkCopy = {
  "on_your_value": {
    "indianEnglish": "On your {p1}",
    "hinglish": "On your {p1}",
    "context": "Generated artwork · on your value"
  },
  "tonight": {
    "indianEnglish": "TONIGHT",
    "hinglish": "TONIGHT",
    "context": "Generated artwork · tonight"
  },
  "separator": {
    "indianEnglish": " · ",
    "hinglish": " · ",
    "context": "Generated artwork · separator"
  },
  "s1": {
    "indianEnglish": "S1",
    "hinglish": "S1",
    "context": "Generated artwork · s1"
  },
  "s1_svalue": {
    "indianEnglish": "S1–S{p1}",
    "hinglish": "S1–S{p1}",
    "context": "Generated artwork · s1 svalue"
  },
  "series": {
    "indianEnglish": "WEB SERIES · ",
    "hinglish": "WEB SERIES · ",
    "context": "Generated artwork · series"
  },
  "cinema": {
    "indianEnglish": "CINEMA",
    "hinglish": "CINEMA",
    "context": "Generated artwork · cinema"
  },
  "value_generated_valuevalue": {
    "indianEnglish": "{p1} · generated {p2}{p3}",
    "hinglish": "{p1} · generated {p2}{p3}",
    "context": "Generated artwork · value generated valuevalue"
  },
  "on_your_value_2": {
    "indianEnglish": " · On your {p1}",
    "hinglish": " · On your {p1}",
    "context": "Generated artwork · on your value 2"
  }
} as const;
export const profileCopy = {
  "clear_local_data": {
    "indianEnglish": "Clear local data",
    "hinglish": "Clear local data",
    "context": "Me · clear local data"
  },
  "keep_my_movie_nights": {
    "indianEnglish": "Keep my movie nights",
    "hinglish": "Keep my movie nights",
    "context": "Me · keep my movie nights"
  },
  "this_clears_your_local_data_and_device_identity_shared_polls_stay": {
    "indianEnglish": "This clears your local data and device identity. Shared polls stay online, but this device will lose their creator controls and its existing votes. This can’t be undone.",
    "hinglish": "This clears your local data and device identity. Shared polls stay online, but this device will lose their creator controls and its existing votes. This can’t be undone.",
    "context": "Me · this clears your local data and device identity shared polls stay"
  },
  "start_fresh_on_this_device": {
    "indianEnglish": "Start fresh on this device?",
    "hinglish": "Start fresh on this device?",
    "context": "Me · start fresh on this device"
  },
  "reset_prototype": {
    "indianEnglish": "Reset prototype",
    "hinglish": "Reset prototype",
    "context": "Me · reset prototype"
  },
  "clear_this_device_s_profile_saved_picks_searches_and_local_polls": {
    "indianEnglish": "Clear this device’s profile, saved picks, searches and local polls.",
    "hinglish": "Clear this device’s profile, saved picks, searches and local polls.",
    "context": "Me · clear this device s profile saved picks searches and local polls"
  },
  "a_fresh_start": {
    "indianEnglish": "A fresh start?",
    "hinglish": "A fresh start?",
    "context": "Me · a fresh start"
  },
  "allow_session_storage_to_switch_brands": {
    "indianEnglish": "Allow session storage to switch brands.",
    "hinglish": "Allow session storage to switch brands.",
    "context": "Me · allow session storage to switch brands"
  },
  "welcome_to_value": {
    "indianEnglish": "Welcome to {p1}.",
    "hinglish": "Welcome to {p1}.",
    "context": "Me · welcome to value"
  },
  "tester_session_brand": {
    "indianEnglish": "Tester session brand",
    "hinglish": "Tester session brand",
    "context": "Me · tester session brand"
  },
  "same_movie_nights_a_different_brand_for_this_tester_tab": {
    "indianEnglish": "Same movie nights. A different brand for this tester tab.",
    "hinglish": "Same movie nights. A different brand for this tester tab.",
    "context": "Me · same movie nights a different brand for this tester tab"
  },
  "try_a_different_name": {
    "indianEnglish": "Try a different name",
    "hinglish": "Try a different name",
    "context": "Me · try a different name"
  },
  "plan_a_movie_night": {
    "indianEnglish": "Plan a movie night ",
    "hinglish": "Plan a movie night ",
    "context": "Me · plan a movie night"
  },
  "shortlist_a_couple_of_titles_then_ask_the_group_your_movie_nights": {
    "indianEnglish": "Pick two films. Ask the group. Make “soon” a little more specific.",
    "hinglish": "Do films chuno. Group se poochho. “Kabhi” ko plan banao.",
    "context": "Me · empty poll history supporting line"
  },
  "your_people_one_great_pick": {
    "indianEnglish": "The group chat has potential. Give it a plan.",
    "hinglish": "Group chat mein potential hai. Ek plan do.",
    "context": "Me · empty poll history heading"
  },
  "finished": {
    "indianEnglish": "Finished",
    "hinglish": "Finished",
    "context": "Me · finished"
  },
  "open": {
    "indianEnglish": "Open",
    "hinglish": "Open",
    "context": "Me · open"
  },
  "movie_nights": {
    "indianEnglish": "movie nights",
    "hinglish": "movie nights",
    "context": "Me · movie nights"
  },
  "movie_night": {
    "indianEnglish": "movie night",
    "hinglish": "movie night",
    "context": "Me · movie night"
  },
  "earlier_movie_nights": {
    "indianEnglish": "Earlier movie nights",
    "hinglish": "Earlier movie nights",
    "context": "Me · earlier movie nights"
  },
  "loading_your_polls": {
    "indianEnglish": "Loading your polls",
    "hinglish": "Loading your polls",
    "context": "Me · loading your polls"
  },
  "try_again": {
    "indianEnglish": "Try again",
    "hinglish": "Try again",
    "context": "Me · try again"
  },
  "a_little_intermission": {
    "indianEnglish": "Poll history unavailable.",
    "hinglish": "Poll history unavailable.",
    "context": "Me · history failure heading"
  },
  "my_polls": {
    "indianEnglish": "My polls",
    "hinglish": "My polls",
    "context": "Me · my polls"
  },
  "find_a_favourite": {
    "indianEnglish": "Find a favourite ",
    "hinglish": "Find a favourite ",
    "context": "Me · find a favourite"
  },
  "save_a_title_when_it_catches_your_eye_it_ll_be_waiting_here": {
    "indianEnglish": "Save the ones you keep saying you’ll watch.",
    "hinglish": "Jo “kabhi dekhenge” bolte ho, yahan save kar lo.",
    "context": "Me · empty watchlist description"
  },
  "for_another_good_night": {
    "indianEnglish": "Empty watchlist. What about next weekend?",
    "hinglish": "Watchlist khaali hai. Agle weekend ka kya?",
    "context": "Me · empty watchlist heading"
  },
  "remove": {
    "indianEnglish": "Remove",
    "hinglish": "Remove",
    "context": "Me · remove"
  },
  "remove_value_from_watchlist": {
    "indianEnglish": "Remove {p1} from watchlist",
    "hinglish": "Remove {p1} from watchlist",
    "context": "Me · remove value from watchlist"
  },
  "watchlist": {
    "indianEnglish": "Watchlist ",
    "hinglish": "Watchlist ",
    "context": "Me · watchlist"
  },
  "edit_services_languages": {
    "indianEnglish": "Edit OTT apps & languages ",
    "hinglish": "Edit OTT apps & languages ",
    "context": "Me · edit services languages"
  },
  "any_language_let_the_story_decide": {
    "indianEnglish": "Any language. Let the story decide.",
    "hinglish": "Any language. Let the story decide.",
    "context": "Me · any language let the story decide"
  },
  "my_languages": {
    "indianEnglish": "My languages",
    "hinglish": "My languages",
    "context": "Me · my languages"
  },
  "no_subscriptions_selected_all_doors_open": {
    "indianEnglish": "No subscriptions selected. All doors open.",
    "hinglish": "No subscriptions selected. All doors open.",
    "context": "Me · no subscriptions selected all doors open"
  },
  "free_picks_only_no_subscription_needed": {
    "indianEnglish": "Free picks only. No subscription needed.",
    "hinglish": "Free picks only. No subscription needed.",
    "context": "Me · free picks only no subscription needed"
  },
  "my_services": {
    "indianEnglish": "My OTT apps",
    "hinglish": "My OTT apps",
    "context": "Me · my services"
  },
  "save_profile": {
    "indianEnglish": "Save profile",
    "hinglish": "Save profile",
    "context": "Me · save profile"
  },
  "value_avatar": {
    "indianEnglish": "{p1} avatar",
    "hinglish": "{p1} avatar",
    "context": "Me · value avatar"
  },
  "choose_your_avatar": {
    "indianEnglish": "Choose your avatar",
    "hinglish": "Choose your avatar",
    "context": "Me · choose your avatar"
  },
  "what_should_friends_call_you": {
    "indianEnglish": "What should friends call you?",
    "hinglish": "What should friends call you?",
    "context": "Me · what should friends call you"
  },
  "looking_good_profile_saved": {
    "indianEnglish": "Looking good. Profile saved.",
    "hinglish": "Looking good. Profile saved.",
    "context": "Me · looking good profile saved"
  },
  "edit_name_avatar": {
    "indianEnglish": "Edit name & avatar",
    "hinglish": "Edit name & avatar",
    "context": "Me · edit name avatar"
  },
  "cancel_editing": {
    "indianEnglish": "Cancel editing",
    "hinglish": "Cancel editing",
    "context": "Me · cancel editing"
  },
  "good_company_great_taste": {
    "indianEnglish": "Good company. Great taste.",
    "hinglish": "Good company. Great taste.",
    "context": "Me · good company great taste"
  },
  "separator": {
    "indianEnglish": ".",
    "hinglish": ".",
    "context": "Me · separator"
  },
  "your_movie_nights": {
    "indianEnglish": "Your movie nights",
    "hinglish": "Your movie nights",
    "context": "Me · your movie nights"
  },
  "your_little_cinema_corner": {
    "indianEnglish": "YOUR FILM CORNER",
    "hinglish": "YOUR FILM CORNER",
    "context": "Me · section eyebrow, quiet beside empty-state personality"
  },
  "your_first_shared_pick_belongs_here": {
    "indianEnglish": "Your first shared pick belongs here.",
    "hinglish": "Your first shared pick belongs here.",
    "context": "Me · your first shared pick belongs here"
  },
  "no_plans_in_motion_start_something_good": {
    "indianEnglish": "No plans in motion. Start something good.",
    "hinglish": "No plans in motion. Start something good.",
    "context": "Me · no plans in motion start something good"
  },
  "closes_value": {
    "indianEnglish": "Closes {p1}",
    "hinglish": "Closes {p1}",
    "context": "Me · closes value"
  },
  "value_value_voted": {
    "indianEnglish": "{p1} {p2} voted",
    "hinglish": "{p1} {p2} voted",
    "context": "Me · value value voted"
  },
  "friends_have": {
    "indianEnglish": "friends have",
    "hinglish": "friends have",
    "context": "Me · friends have"
  },
  "friend_has": {
    "indianEnglish": "friend has",
    "hinglish": "friend has",
    "context": "Me · friend has"
  },
  "no_votes_this_time_another_night_awaits": {
    "indianEnglish": "No votes this time. Another night awaits.",
    "hinglish": "No votes this time. Another night awaits.",
    "context": "Me · no votes this time another night awaits"
  },
  "tonight_value": {
    "indianEnglish": "Tonight: {p1}",
    "hinglish": "Tonight: {p1}",
    "context": "Me · tonight value"
  },
  "browser_storage_couldn_t_be_cleared_please_try_again": {
    "indianEnglish": "Browser storage couldn’t be cleared. Please try again.",
    "hinglish": "Browser storage couldn’t be cleared. Please try again.",
    "context": "Me · browser storage couldn t be cleared please try again"
  },
  "your_movie_nights_couldn_t_load_check_your_connection_and_try_aga": {
    "indianEnglish": "Your movie nights couldn’t load. Check your connection and try again.",
    "hinglish": "Your movie nights couldn’t load. Check your connection and try again.",
    "context": "Me · your movie nights couldn t load check your connection and try aga"
  },
  "local_demo_mode": {
    "indianEnglish": "local demo mode",
    "hinglish": "local demo mode",
    "context": "Me · local demo mode"
  },
  "avatar_sunset": {
    "indianEnglish": "Sunset",
    "hinglish": "Sunset",
    "context": "Me · avatar sunset"
  },
  "avatar_lagoon": {
    "indianEnglish": "Lagoon",
    "hinglish": "Lagoon",
    "context": "Me · avatar lagoon"
  },
  "avatar_berry": {
    "indianEnglish": "Berry",
    "hinglish": "Berry",
    "context": "Me · avatar berry"
  },
  "avatar_amber": {
    "indianEnglish": "Amber",
    "hinglish": "Amber",
    "context": "Me · avatar amber"
  },
  "avatar_midnight": {
    "indianEnglish": "Midnight",
    "hinglish": "Midnight",
    "context": "Me · avatar midnight"
  },
  "avatar_forest": {
    "indianEnglish": "Forest",
    "hinglish": "Forest",
    "context": "Me · avatar forest"
  },
  "avatar_rose": {
    "indianEnglish": "Rose",
    "hinglish": "Rose",
    "context": "Me · avatar rose"
  },
  "avatar_violet": {
    "indianEnglish": "Violet",
    "hinglish": "Violet",
    "context": "Me · avatar violet"
  },
  "group_summary": {
    "indianEnglish": "{group} · {count} {nights} · last: {winner}",
    "hinglish": "{group} · {count} {nights} · last: {winner}",
    "context": "Me · group summary"
  },
  "no_winner_yet": {
    "indianEnglish": "No winner yet",
    "hinglish": "No winner yet",
    "context": "Me · no winner yet"
  }
} as const;
export const searchCopy = {
  "provider_availability_is_illustrative_rentals_are_never_labelled_": {
    "indianEnglish": "Provider availability is illustrative. Rentals are never labelled as included in your subscription.",
    "hinglish": "Provider availability is illustrative. Rentals are never labelled as included in your subscription.",
    "context": "Search · provider availability is illustrative rentals are never labelled "
  },
  "panchayat": {
    "indianEnglish": "Panchayat",
    "hinglish": "Panchayat",
    "context": "Search · panchayat"
  },
  "jersey": {
    "indianEnglish": "Jersey",
    "hinglish": "Jersey",
    "context": "Search · jersey"
  },
  "try": {
    "indianEnglish": "Try ",
    "hinglish": "Try ",
    "context": "Search · try"
  },
  "try_a_shorter_spelling_or_a_familiar_face": {
    "indianEnglish": ". Check the spelling, or try an actor’s name.",
    "hinglish": ". Spelling check karein, ya actor ka naam try karein.",
    "context": "Search · no-result suggestion after quoted query"
  },
  "in_this_small_catalog": {
    "indianEnglish": " in this small catalogue",
    "hinglish": " in this small catalogue",
    "context": "Search · in this small catalog"
  },
  "among_our_free_picks": {
    "indianEnglish": " among our free picks",
    "hinglish": " among our free picks",
    "context": "Search · among our free picks"
  },
  "separator": {
    "indianEnglish": "”",
    "hinglish": "”",
    "context": "Search · separator"
  },
  "no_match_for": {
    "indianEnglish": "No match for “",
    "hinglish": "No match for “",
    "context": "Search · no match for"
  },
  "picture_abhi_baaki_hai": {
    "indianEnglish": "We couldn’t find that one either.",
    "hinglish": "Yeh title humein bhi nahi mila.",
    "context": "Search · completed search with no results"
  },
  "in_the_catalog": {
    "indianEnglish": " in the catalogue",
    "hinglish": " in the catalogue",
    "context": "Search · in the catalog"
  },
  "separator_2": {
    "indianEnglish": " · ",
    "hinglish": " · ",
    "context": "Search · separator 2"
  },
  "people": {
    "indianEnglish": "People",
    "hinglish": "People",
    "context": "Search · people"
  },
  "series": {
    "indianEnglish": "Web series",
    "hinglish": "Web series",
    "context": "Search · series"
  },
  "film": {
    "indianEnglish": "Film",
    "hinglish": "Film",
    "context": "Search · film"
  },
  "titles": {
    "indianEnglish": "Titles",
    "hinglish": "Titles",
    "context": "Search · titles"
  },
  "people_2": {
    "indianEnglish": " people",
    "hinglish": " people",
    "context": "Search · people 2"
  },
  "titles_2": {
    "indianEnglish": " titles · ",
    "hinglish": " titles · ",
    "context": "Search · titles 2"
  },
  "searching": {
    "indianEnglish": "Searching",
    "hinglish": "Searching",
    "context": "Search · searching"
  },
  "try_panchayat": {
    "indianEnglish": "Try Panchayat",
    "hinglish": "Try Panchayat",
    "context": "Search · try panchayat"
  },
  "search_didn_t_load_try_another_title": {
    "indianEnglish": "Search didn’t load. Try another title.",
    "hinglish": "Search didn’t load. Try another title.",
    "context": "Search · search didn t load try another title"
  },
  "a_little_intermission": {
    "indianEnglish": "Search unavailable.",
    "hinglish": "Search unavailable.",
    "context": "Search · request failure heading"
  },
  "manjummel_boys": {
    "indianEnglish": "Manjummel Boys",
    "hinglish": "Manjummel Boys",
    "context": "Search · manjummel boys"
  },
  "jailer": {
    "indianEnglish": "Jailer",
    "hinglish": "Jailer",
    "context": "Search · jailer"
  },
  "try_panchayat_jailer_manjummel_boys": {
    "indianEnglish": "Try: Panchayat, Jailer, Manjummel Boys",
    "hinglish": "Try: Panchayat, Jailer, Manjummel Boys",
    "context": "Search · try panchayat jailer manjummel boys"
  },
  "start_with_a_favourite": {
    "indianEnglish": "Start with the film you keep recommending.",
    "hinglish": "Woh film se shuru karo jo sabko recommend karte ho.",
    "context": "Search · no query yet"
  },
  "your_next_rabbit_hole_starts_here": {
    "indianEnglish": "A film, a web series, that actor whose name you almost remember.",
    "hinglish": "Film, web series, ya woh actor jiska naam yaad aa raha tha.",
    "context": "Search · empty supporting line"
  },
  "clear_history": {
    "indianEnglish": "Clear history",
    "hinglish": "Clear history",
    "context": "Search · clear history"
  },
  "recent_searches": {
    "indianEnglish": "Recent searches",
    "hinglish": "Recent searches",
    "context": "Search · recent searches"
  },
  "edit_preferences": {
    "indianEnglish": "Edit preferences",
    "hinglish": "Edit preferences",
    "context": "Search · edit preferences"
  },
  "free_picks_only": {
    "indianEnglish": "Free picks only · ",
    "hinglish": "Free picks only · ",
    "context": "Search · free picks only"
  },
  "clear_search": {
    "indianEnglish": "Clear search",
    "hinglish": "Clear search",
    "context": "Search · clear search"
  },
  "films_shows_people": {
    "indianEnglish": "Films, web series, actors…",
    "hinglish": "Films, web series, actors…",
    "context": "Search · films shows people"
  },
  "search_titles_or_people": {
    "indianEnglish": "Search titles or people",
    "hinglish": "Search titles or people",
    "context": "Search · search titles or people"
  },
  "a_title_a_familiar_face_a_little_inspiration": {
    "indianEnglish": "A title, a familiar face, a little inspiration.",
    "hinglish": "A title, a familiar face, a little inspiration.",
    "context": "Search · a title a familiar face a little inspiration"
  },
  "separator_3": {
    "indianEnglish": "?",
    "hinglish": "?",
    "context": "Search · separator 3"
  },
  "kya_dekhein": {
    "indianEnglish": "What are we watching",
    "hinglish": "Kya dekhein",
    "context": "Search · headline"
  },
  "one_good_film_leads_to_another": {
    "indianEnglish": "ONE GOOD FILM LEADS TO ANOTHER",
    "hinglish": "ONE GOOD FILM LEADS TO ANOTHER",
    "context": "Search · one good film leads to another"
  }
} as const;
export const resultsCopy = {
  "show_result": {
    "indianEnglish": "Show result",
    "hinglish": "Show result",
    "context": "Winner reveal · show result"
  },
  "separator": {
    "indianEnglish": ".",
    "hinglish": ".",
    "context": "Winner reveal · separator"
  },
  "a_shared_snapshot_of": {
    "indianEnglish": "A shared snapshot of ",
    "hinglish": "A shared snapshot of ",
    "context": "Winner reveal · a shared snapshot of"
  },
  "tonight": {
    "indianEnglish": "Tonight: ",
    "hinglish": "Tonight: ",
    "context": "Winner reveal · tonight"
  },
  "that_result_is_unavailable": {
    "indianEnglish": "That result is unavailable.",
    "hinglish": "That result is unavailable.",
    "context": "Winner reveal · that result is unavailable"
  },
  "down": {
    "indianEnglish": " down",
    "hinglish": " down",
    "context": "Winner reveal · down"
  },
  "up": {
    "indianEnglish": " up · ",
    "hinglish": " up · ",
    "context": "Winner reveal · up"
  },
  "the_other_contenders": {
    "indianEnglish": "The other contenders",
    "hinglish": "The other contenders",
    "context": "Winner reveal · the other contenders"
  },
  "whatsapp_shares_the_link_attach_a_downloaded_image_if_you_want_th": {
    "indianEnglish": "WhatsApp shares the link. Attach a downloaded image if you want the card too.",
    "hinglish": "WhatsApp shares the link. Attach a downloaded image if you want the card too.",
    "context": "Winner reveal · whatsapp shares the link attach a downloaded image if you want th"
  },
  "share_result_on_whatsapp": {
    "indianEnglish": "Share result on WhatsApp",
    "hinglish": "Share result on WhatsApp",
    "context": "Winner reveal · share result on whatsapp"
  },
  "download_1080_1920_story": {
    "indianEnglish": "Download 1080×1920 story",
    "hinglish": "Download 1080×1920 story",
    "context": "Winner reveal · download 1080 1920 story"
  },
  "download_1200_630": {
    "indianEnglish": "Download 1200×630",
    "hinglish": "Download 1200×630",
    "context": "Winner reveal · download 1200 630"
  },
  "share_result": {
    "indianEnglish": "Share result",
    "hinglish": "Share result",
    "context": "Winner reveal · share result"
  },
  "making_your_cards": {
    "indianEnglish": "Giving this decision its own poster…",
    "hinglish": "Is decision ka poster bana rahe hain…",
    "context": "Winner · card preparation loading label"
  },
  "separator_2": {
    "indianEnglish": "”",
    "hinglish": "”",
    "context": "Winner reveal · separator 2"
  },
  "separator_3": {
    "indianEnglish": "“",
    "hinglish": "“",
    "context": "Winner reveal · separator 3"
  },
  "your_group": {
    "indianEnglish": "Your group",
    "hinglish": "Your group",
    "context": "Winner reveal · your group"
  },
  "separate_payment_may_apply": {
    "indianEnglish": " Separate payment may apply.",
    "hinglish": " Separate payment may apply.",
    "context": "Winner reveal · separate payment may apply"
  },
  "availability_is_illustrative": {
    "indianEnglish": "Availability is illustrative.",
    "hinglish": "Availability is illustrative.",
    "context": "Winner reveal · availability is illustrative"
  },
  "watch_on": {
    "indianEnglish": "Watch on ",
    "hinglish": "Watch on ",
    "context": "Winner reveal · watch on"
  },
  "tonight_2": {
    "indianEnglish": "Tonight:",
    "hinglish": "Tonight:",
    "context": "Winner reveal · tonight 2"
  },
  "the_group_has_spoken": {
    "indianEnglish": "Decision made. Popcorn ready?",
    "hinglish": "Faisla ho gaya. Popcorn ready?",
    "context": "Winner reveal · celebratory eyebrow"
  },
  "and_tonight_goes_to": {
    "indianEnglish": "A brief pause for dramatic effect.",
    "hinglish": "Thoda pause. Drama toh banta hai.",
    "context": "Winner reveal · drumroll before winner"
  },
  "close_winner_reveal": {
    "indianEnglish": "Close winner reveal",
    "hinglish": "Close winner reveal",
    "context": "Winner reveal · close winner reveal"
  },
  "tonight_value": {
    "indianEnglish": "Tonight: {p1}",
    "hinglish": "Tonight: {p1}",
    "context": "Winner reveal · tonight value"
  },
  "cards_ready_below_tap_share_result_again_to_open_your_share_sheet": {
    "indianEnglish": "Cards ready below. Tap Share result again to open your share sheet.",
    "hinglish": "Cards ready below. Tap Share result again to open your share sheet.",
    "context": "Winner reveal · cards ready below tap share result again to open your share sheet"
  },
  "cards_ready_download_a_size_or_share_the_result_link_on_whatsapp": {
    "indianEnglish": "Cards ready. Download a size, or share the result link on WhatsApp.",
    "hinglish": "Cards ready. Download a size, or share the result link on WhatsApp.",
    "context": "Winner reveal · cards ready download a size or share the result link on whatsapp"
  },
  "value_the_group_has_decided": {
    "indianEnglish": "{p1}. We actually picked something.",
    "hinglish": "{p1}. Aaj sach mein kuch choose kar liya.",
    "context": "Winner · native share message"
  },
  "could_not_render_the_cards_please_try_again": {
    "indianEnglish": "Could not render the cards. Please try again.",
    "hinglish": "Could not render the cards. Please try again.",
    "context": "Winner reveal · could not render the cards please try again"
  },
  "value_of_value_said_yesvalue": {
    "indianEnglish": "{p1} of {p2} said yes{p3}",
    "hinglish": "{p1} of {p2} said yes{p3}",
    "context": "Winner reveal · value of value said yesvalue"
  },
  "value_said_not_tonight": {
    "indianEnglish": " · {p1} said not tonight",
    "hinglish": " · {p1} said not tonight",
    "context": "Winner reveal · value said not tonight"
  },
  "voting_closed": {
    "indianEnglish": "Voting closed",
    "hinglish": "Voting closed",
    "context": "Winner reveal · voting closed"
  },
  "valuevaluem_values_left": {
    "indianEnglish": "{p1}{p2}m {p3}s left",
    "hinglish": "{p1}{p2}m {p3}s left",
    "context": "Winner reveal · valuevaluem values left"
  },
  "valueh": {
    "indianEnglish": "{p1}h ",
    "hinglish": "{p1}h ",
    "context": "Winner reveal · valueh"
  },
  "group_streak": {
    "indianEnglish": "{group} · {count} movie nights together",
    "hinglish": "{group} · {count} movie nights together",
    "context": "Winner reveal · group streak"
  }
} as const;
export const titleCopy = {
  "open_shortlist_value_picks": {
    "indianEnglish": "Open shortlist, {p1} picks",
    "hinglish": "Open shortlist, {p1} picks",
    "context": "Title page · open shortlist value picks"
  },
  "share_title": {
    "indianEnglish": "Share title",
    "hinglish": "Share title",
    "context": "Title page · share title"
  },
  "saved_to_watchlist": {
    "indianEnglish": "Saved to watchlist.",
    "hinglish": "Saved to watchlist.",
    "context": "Title page · saved to watchlist"
  },
  "removed_from_watchlist": {
    "indianEnglish": "Removed from watchlist.",
    "hinglish": "Removed from watchlist.",
    "context": "Title page · removed from watchlist"
  },
  "add_to_watchlist": {
    "indianEnglish": "Add to watchlist",
    "hinglish": "Add to watchlist",
    "context": "Title page · add to watchlist"
  },
  "remove_from_watchlist": {
    "indianEnglish": "Remove from watchlist",
    "hinglish": "Remove from watchlist",
    "context": "Title page · remove from watchlist"
  },
  "separator": {
    "indianEnglish": "×",
    "hinglish": "×",
    "context": "Title page · separator"
  },
  "close_share_options": {
    "indianEnglish": "Close share options",
    "hinglish": "Close share options",
    "context": "Title page · close share options"
  },
  "share_on_whatsapp": {
    "indianEnglish": "Share on WhatsApp ",
    "hinglish": "Share on WhatsApp ",
    "context": "Title page · share on whatsapp"
  },
  "original_generated_key_art_this_product_is_not_endorsed_or_certif": {
    "indianEnglish": "Original generated key art. This product is not endorsed or certified by TMDb. Ratings are illustrative snapshots.",
    "hinglish": "Original generated key art. This product is not endorsed or certified by TMDb. Ratings are illustrative snapshots.",
    "context": "Title page · original generated key art this product is not endorsed or certif"
  },
  "pick_a_thumb_to_save_your_take": {
    "indianEnglish": "Pick a thumb to save your take.",
    "hinglish": "Pick a thumb to save your take.",
    "context": "Title page · pick a thumb to save your take"
  },
  "save_take": {
    "indianEnglish": "Save take",
    "hinglish": "Save take",
    "context": "Title page · save take"
  },
  "your_take_is_saved": {
    "indianEnglish": "Saved. Your future self has a review to consult.",
    "hinglish": "Saved. Agli baar apna review kaam aayega.",
    "context": "Title · personal take saved toast"
  },
  "worth_staying_up_for": {
    "indianEnglish": "Worth recommending to the group chat?",
    "hinglish": "Group chat mein recommend karne layak?",
    "context": "Title · optional personal take placeholder"
  },
  "optional": {
    "indianEnglish": "(optional)",
    "hinglish": "(optional)",
    "context": "Title page · optional"
  },
  "one_line_take": {
    "indianEnglish": "One-line take ",
    "hinglish": "One-line take ",
    "context": "Title page · one line take"
  },
  "loved_it": {
    "indianEnglish": "Loved it",
    "hinglish": "Loved it",
    "context": "Title page · loved it"
  },
  "liked_it": {
    "indianEnglish": "Liked it",
    "hinglish": "Liked it",
    "context": "Title page · liked it"
  },
  "not_for_me": {
    "indianEnglish": "Not for me",
    "hinglish": "Not for me",
    "context": "Title page · not for me"
  },
  "your_rating_is_saved": {
    "indianEnglish": "Your rating is saved.",
    "hinglish": "Your rating is saved.",
    "context": "Title page · your rating is saved"
  },
  "your_take_saved_just_for_you": {
    "indianEnglish": "Your take. Saved just for you.",
    "hinglish": "Your take. Saved just for you.",
    "context": "Title page · your take saved just for you"
  },
  "seen_it": {
    "indianEnglish": "Seen it?",
    "hinglish": "Seen it?",
    "context": "Title page · seen it"
  },
  "directed_by": {
    "indianEnglish": "Directed by ",
    "hinglish": "Directed by ",
    "context": "Title page · directed by"
  },
  "the_familiar_faces": {
    "indianEnglish": "The familiar faces",
    "hinglish": "The familiar faces",
    "context": "Title page · the familiar faces"
  },
  "read_more": {
    "indianEnglish": "Read more",
    "hinglish": "Read more",
    "context": "Title page · read more"
  },
  "show_less": {
    "indianEnglish": "Show less",
    "hinglish": "Show less",
    "context": "Title page · show less"
  },
  "the_story": {
    "indianEnglish": "The story",
    "hinglish": "The story",
    "context": "Title page · the story"
  },
  "matching_picks_in_this_small_catalog_try_turning_off_the_service_": {
    "indianEnglish": " matching picks in this small catalogue. Try turning off the OTT app filter for more.",
    "hinglish": " matching picks in this small catalogue. Try turning off the OTT app filter for more.",
    "context": "Title page · matching picks in this small catalog try turning off the service "
  },
  "no_matching_picks_on_these_services_yet_turn_off_the_filter_to_ex": {
    "indianEnglish": "No matching picks on these OTT apps yet. Turn off the filter to explore more.",
    "hinglish": "No matching picks on these OTT apps yet. Turn off the filter to explore more.",
    "context": "Title page · no matching picks on these services yet turn off the filter to ex"
  },
  "value_only": {
    "indianEnglish": "{p1} only",
    "hinglish": "{p1} only",
    "context": "Title page · value only"
  },
  "free_only_preferences_apply_to_the_other_recommendations": {
    "indianEnglish": "Free-only preferences apply to the other recommendations.",
    "hinglish": "Free-only preferences apply to the other recommendations.",
    "context": "Title page · free only preferences apply to the other recommendations"
  },
  "originals_and_remakes_stay_pinned_even_on_other_apps": {
    "indianEnglish": "Originals and remakes stay pinned, even on other apps.",
    "hinglish": "Originals and remakes stay pinned, even on other apps.",
    "context": "Title page · originals and remakes stay pinned even on other apps"
  },
  "only_what_s_on_my_services": {
    "indianEnglish": " Only what’s on my OTT apps",
    "hinglish": " Only what’s on my OTT apps",
    "context": "Title page · only what s on my services"
  },
  "more_like_this": {
    "indianEnglish": "More like this",
    "hinglish": "More like this",
    "context": "Title page · more like this"
  },
  "find_more_like_this": {
    "indianEnglish": "Find more like this",
    "hinglish": "Find more like this",
    "context": "Title page · find more like this"
  },
  "availability_is_illustrative_check_price_and_access_with_the_prov": {
    "indianEnglish": "Availability is illustrative. Check price and access with the provider. Links may open the provider homepage.",
    "hinglish": "Availability is illustrative. Check price and access with the provider. Links may open the provider homepage.",
    "context": "Title page · availability is illustrative check price and access with the prov"
  },
  "watch_on": {
    "indianEnglish": "Watch on ",
    "hinglish": "Watch on ",
    "context": "Title page · watch on"
  },
  "watch_on_value_value_opens_in_new_tab": {
    "indianEnglish": "Watch on {p1} ({p2}, opens in new tab)",
    "hinglish": "Watch on {p1} ({p2}, opens in new tab)",
    "context": "Title page · watch on value value opens in new tab"
  },
  "subscription": {
    "indianEnglish": "Subscription",
    "hinglish": "Subscription",
    "context": "Title page · subscription"
  },
  "extra": {
    "indianEnglish": " extra",
    "hinglish": " extra",
    "context": "Title page · extra"
  },
  "free_tier": {
    "indianEnglish": "Free tier",
    "hinglish": "Free tier",
    "context": "Title page · free tier"
  },
  "you_have_this": {
    "indianEnglish": "You have this",
    "hinglish": "You have this",
    "context": "Title page · you have this"
  },
  "in_india": {
    "indianEnglish": "in India",
    "hinglish": "in India",
    "context": "Title page · in india"
  },
  "where_to_watch": {
    "indianEnglish": "Where to watch ",
    "hinglish": "Where to watch ",
    "context": "Title page · where to watch"
  },
  "no_group_votes_yet": {
    "indianEnglish": "No post-watch ratings yet",
    "hinglish": "No post-watch ratings yet",
    "context": "Title page · no group votes yet"
  },
  "group_votes_unavailable": {
    "indianEnglish": "Group ratings unavailable",
    "hinglish": "Group ratings unavailable",
    "context": "Title page · group votes unavailable"
  },
  "value_picked_this_value_votes": {
    "indianEnglish": "{p1}% liked it · {p2} ratings",
    "hinglish": "{p1}% liked it · {p2} ratings",
    "context": "Title page · value picked this value votes"
  },
  "your_groups": {
    "indianEnglish": "Your groups",
    "hinglish": "Your groups",
    "context": "Title page · your groups"
  },
  "illustrative_score_10": {
    "indianEnglish": "Illustrative score / 10",
    "hinglish": "Illustrative score / 10",
    "context": "Title page · illustrative score 10"
  },
  "tmdb": {
    "indianEnglish": "TMDb",
    "hinglish": "TMDb",
    "context": "Title page · tmdb"
  },
  "ratings": {
    "indianEnglish": "Ratings",
    "hinglish": "Ratings",
    "context": "Title page · ratings"
  },
  "separator_2": {
    "indianEnglish": " · ",
    "hinglish": " · ",
    "context": "Title page · separator 2"
  },
  "value_min": {
    "indianEnglish": "{p1} min",
    "hinglish": "{p1} min",
    "context": "Title page · value min"
  },
  "back": {
    "indianEnglish": " Back",
    "hinglish": " Back",
    "context": "Title page · back"
  },
  "shared_bring_the_gang": {
    "indianEnglish": "Shared. Let the opinions arrive.",
    "hinglish": "Shared. Ab opinions aayenge.",
    "context": "Title · share success toast"
  },
  "tonight_on_value": {
    "indianEnglish": "Tonight on {p1}?",
    "hinglish": "Tonight on {p1}?",
    "context": "Title page · tonight on value"
  },
  "value_tonight_on_value": {
    "indianEnglish": "{p1} — tonight on {p2}?",
    "hinglish": "{p1} — tonight on {p2}?",
    "context": "Title page · value tonight on value"
  },
  "free": {
    "indianEnglish": "Free",
    "hinglish": "Free",
    "context": "Title page · free"
  },
  "buy": {
    "indianEnglish": "Buy",
    "hinglish": "Buy",
    "context": "Title page · buy"
  },
  "rent": {
    "indianEnglish": "Rent",
    "hinglish": "Rent",
    "context": "Title page · rent"
  },
  "stream": {
    "indianEnglish": "Stream",
    "hinglish": "Stream",
    "context": "Title page · stream"
  },
  "title_not_found": {
    "indianEnglish": "Title not found",
    "hinglish": "Title not found",
    "context": "Title page · title not found"
  },
  "value_tonight_on_value_2": {
    "indianEnglish": "{p1} — tonight on {p2}",
    "hinglish": "{p1} — tonight on {p2}",
    "context": "Title page · value tonight on value 2"
  },
  "not_on_your_apps_value": {
    "indianEnglish": "Not on your apps · {p1}",
    "hinglish": "Not on your apps · {p1}",
    "context": "Title page · not on your apps value"
  },
  "no_subscription_streaming_listed": {
    "indianEnglish": "no subscription streaming listed",
    "hinglish": "no subscription streaming listed",
    "context": "Title page · no subscription streaming listed"
  },
  "streaming_on_value": {
    "indianEnglish": "streaming on {p1}",
    "hinglish": "streaming on {p1}",
    "context": "Title page · streaming on value"
  },
  "value_remake": {
    "indianEnglish": "{p1} remake",
    "hinglish": "{p1} remake",
    "context": "Title page · value remake"
  },
  "original_value_version": {
    "indianEnglish": "Original {p1} version",
    "hinglish": "Original {p1} version",
    "context": "Title page · original value version"
  }
} as const;
export const shareCardCopy = {
  "india_availability_is_illustrative": {
    "indianEnglish": "India · Availability is illustrative",
    "hinglish": "India · Availability is illustrative",
    "context": "Server-rendered share card · india availability is illustrative"
  },
  "your_next_movie_night": {
    "indianEnglish": "your next movie night",
    "hinglish": "your next movie night",
    "context": "Server-rendered share card · your next movie night"
  },
  "on": {
    "indianEnglish": "on ",
    "hinglish": "on ",
    "context": "Server-rendered share card · on"
  },
  "separator": {
    "indianEnglish": " · ",
    "hinglish": " · ",
    "context": "Server-rendered share card · separator"
  },
  "tonight_s_contender": {
    "indianEnglish": " · Tonight’s contender",
    "hinglish": " · Tonight’s contender",
    "context": "Server-rendered share card · tonight s contender"
  },
  "svalue": {
    "indianEnglish": "–S{p1}",
    "hinglish": "–S{p1}",
    "context": "Server-rendered share card · svalue"
  },
  "series_s1": {
    "indianEnglish": "WEB SERIES · S1",
    "hinglish": "WEB SERIES · S1",
    "context": "Server-rendered share card · series s1"
  },
  "title_not_found": {
    "indianEnglish": "Title not found",
    "hinglish": "Title not found",
    "context": "Server-rendered share card · title not found"
  },
  "no_app_needed": {
    "indianEnglish": "no app needed",
    "hinglish": "no app needed",
    "context": "Server-rendered share card · no app needed"
  },
  "vote_in_10_seconds": {
    "indianEnglish": "Vote in 10 seconds,",
    "hinglish": "Vote in 10 seconds,",
    "context": "Server-rendered share card · vote in 10 seconds"
  },
  "separator_2": {
    "indianEnglish": ".",
    "hinglish": ".",
    "context": "Server-rendered share card · separator 2"
  },
  "unknown_title": {
    "indianEnglish": "Unknown title.",
    "hinglish": "Unknown title.",
    "context": "Server-rendered share card · unknown title"
  },
  "a_complete_poll_link_is_required": {
    "indianEnglish": "A complete poll link is required.",
    "hinglish": "A complete poll link is required.",
    "context": "Server-rendered share card · a complete poll link is required"
  },
  "down": {
    "indianEnglish": " down",
    "hinglish": " down",
    "context": "Server-rendered share card · down"
  },
  "up": {
    "indianEnglish": " up · ",
    "hinglish": " up · ",
    "context": "Server-rendered share card · up"
  },
  "more_takes_in_the_result_link": {
    "indianEnglish": " more takes in the result link",
    "hinglish": " more takes in the result link",
    "context": "Server-rendered share card · more takes in the result link"
  },
  "separator_3": {
    "indianEnglish": "+",
    "hinglish": "+",
    "context": "Server-rendered share card · separator 3"
  },
  "separator_4": {
    "indianEnglish": "”",
    "hinglish": "”",
    "context": "Server-rendered share card · separator 4"
  },
  "separator_5": {
    "indianEnglish": "“",
    "hinglish": "“",
    "context": "Server-rendered share card · separator 5"
  },
  "tonight": {
    "indianEnglish": "Tonight: ",
    "hinglish": "Tonight: ",
    "context": "Server-rendered share card · tonight"
  },
  "unknown_title_2": {
    "indianEnglish": "Unknown title",
    "hinglish": "Unknown title",
    "context": "Server-rendered share card · unknown title 2"
  },
  "a_completed_result_is_required": {
    "indianEnglish": "A completed result is required",
    "hinglish": "A completed result is required",
    "context": "Server-rendered share card · a completed result is required"
  },
  "invalid_result": {
    "indianEnglish": "Invalid result",
    "hinglish": "Invalid result",
    "context": "Server-rendered share card · invalid result"
  },
  "result_too_large": {
    "indianEnglish": "Result too large",
    "hinglish": "Result too large",
    "context": "Server-rendered share card · result too large"
  }
} as const;
export const installCopy = {
  "separator": {
    "indianEnglish": ".",
    "hinglish": ".",
    "context": "PWA installation · separator"
  },
  "icon_not_found": {
    "indianEnglish": "Icon not found",
    "hinglish": "Icon not found",
    "context": "PWA installation · icon not found"
  }
} as const;
export const catalogCopy = {
  "not_on_value_value": {
    "indianEnglish": "Not on {p1} · {p2}",
    "hinglish": "Not on {p1} · {p2}",
    "context": "Catalogue availability / similarity · not on value value"
  },
  "no_streaming_offer_listed": {
    "indianEnglish": "no streaming offer listed",
    "hinglish": "no streaming offer listed",
    "context": "Catalogue availability / similarity · no streaming offer listed"
  },
  "streaming_on_value": {
    "indianEnglish": "streaming on {p1}",
    "hinglish": "streaming on {p1}",
    "context": "Catalogue availability / similarity · streaming on value"
  },
  "a_different_direction_to_explore": {
    "indianEnglish": "A different direction to explore",
    "hinglish": "A different direction to explore",
    "context": "Catalogue availability / similarity · a different direction to explore"
  },
  "similar_rating_band": {
    "indianEnglish": "Similar rating band",
    "hinglish": "Similar rating band",
    "context": "Catalogue availability / similarity · similar rating band"
  },
  "with_value": {
    "indianEnglish": "With {p1}",
    "hinglish": "With {p1}",
    "context": "Catalogue availability / similarity · with value"
  },
  "same_director": {
    "indianEnglish": "Same director",
    "hinglish": "Same director",
    "context": "Catalogue availability / similarity · same director"
  }
} as const;
export const pollErrorsCopy = {
  "only_the_creator_can_call_it": {
    "indianEnglish": "Only the creator can call it.",
    "hinglish": "Only the creator can call it.",
    "context": "Poll errors · only the creator can call it"
  },
  "vote_on_every_pick_first_then_add_up_to_80_characters": {
    "indianEnglish": "Vote on every pick first, then add up to 80 characters.",
    "hinglish": "Vote on every pick first, then add up to 80 characters.",
    "context": "Poll errors · vote on every pick first then add up to 80 characters"
  },
  "voting_is_closed": {
    "indianEnglish": "Voting is closed.",
    "hinglish": "Voting is closed.",
    "context": "Poll errors · voting is closed"
  },
  "add_a_first_name_and_a_take_of_up_to_80_characters": {
    "indianEnglish": "Add a first name and a take of up to 80 characters.",
    "hinglish": "Add a first name and a take of up to 80 characters.",
    "context": "Poll errors · add a first name and a take of up to 80 characters"
  },
  "this_vote_cannot_be_cast": {
    "indianEnglish": "This vote cannot be cast.",
    "hinglish": "This vote cannot be cast.",
    "context": "Poll errors · this vote cannot be cast"
  },
  "a_poll_title_is_unavailable": {
    "indianEnglish": "A poll title is unavailable.",
    "hinglish": "A poll title is unavailable.",
    "context": "Poll errors · a poll title is unavailable"
  },
  "this_poll_link_is_incomplete": {
    "indianEnglish": "This poll link is incomplete.",
    "hinglish": "This poll link is incomplete.",
    "context": "Poll errors · this poll link is incomplete"
  },
  "choose_catalog_titles_for_this_poll": {
    "indianEnglish": "Choose catalogue titles for this poll.",
    "hinglish": "Choose catalogue titles for this poll.",
    "context": "Poll errors · choose catalog titles for this poll"
  },
  "choose_two_to_four_picks_and_a_future_deadline": {
    "indianEnglish": "Choose two to four picks and a future deadline.",
    "hinglish": "Choose two to four picks and a future deadline.",
    "context": "Poll errors · choose two to four picks and a future deadline"
  },
  "could_not_allocate_a_poll_link_try_again": {
    "indianEnglish": "Could not allocate a poll link. Try again.",
    "hinglish": "Could not allocate a poll link. Try again.",
    "context": "Poll errors · could not allocate a poll link try again"
  },
  "movie_night": {
    "indianEnglish": "Movie night",
    "hinglish": "Movie night",
    "context": "Poll errors · movie night"
  },
  "voter": {
    "indianEnglish": "Voter",
    "hinglish": "Voter",
    "context": "Poll errors · voter"
  },
  "this_poll_is_not_on_the_server_ask_for_a_new_link": {
    "indianEnglish": "This poll is not on the server. Ask for a new link.",
    "hinglish": "This poll is not on the server. Ask for a new link.",
    "context": "Poll errors · this poll is not on the server ask for a new link"
  },
  "the_poll_was_not_created": {
    "indianEnglish": "The poll was not created.",
    "hinglish": "The poll was not created.",
    "context": "Poll errors · the poll was not created"
  },
  "your_name_helps_friends_know_who_s_asking": {
    "indianEnglish": "Your name helps friends know who’s asking.",
    "hinglish": "Your name helps friends know who’s asking.",
    "context": "Poll errors · your name helps friends know who s asking"
  },
  "your_polls_could_not_be_loaded": {
    "indianEnglish": "Your polls could not be loaded.",
    "hinglish": "Your polls could not be loaded.",
    "context": "Poll errors · your polls could not be loaded"
  },
  "simulated_voters_are_available_in_local_demo_mode_only": {
    "indianEnglish": "Simulated voters are available in local demo mode only.",
    "hinglish": "Simulated voters are available in local demo mode only.",
    "context": "Poll errors · simulated voters are available in local demo mode only"
  },
  "the_poll_service_returned_an_invalid_poll": {
    "indianEnglish": "The poll server returned an invalid poll.",
    "hinglish": "The poll server returned an invalid poll.",
    "context": "Poll errors · the poll service returned an invalid poll"
  },
  "could_not_reach_the_poll_service_check_the_supabase_setup_and_try": {
    "indianEnglish": "Could not reach the poll server. Check the Supabase setup and try again.",
    "hinglish": "Could not reach the poll server. Check the Supabase setup and try again.",
    "context": "Poll errors · could not reach the poll service check the supabase setup and try"
  },
  "supabase_setup_is_incomplete_run_the_pending_sql_files_in_supabas": {
    "indianEnglish": "Supabase setup is incomplete. Run the pending SQL files in supabase/migrations in the SQL editor.",
    "hinglish": "Supabase setup is incomplete. Run the pending SQL files in supabase/migrations in the SQL editor.",
    "context": "Poll errors · supabase setup is incomplete run the pending sql files in supabas"
  },
  "rate_limit": {
    "indianEnglish": "You can create up to 20 polls per device each day. Try again tomorrow (UTC).",
    "hinglish": "You can create up to 20 polls per device each day. Try again tomorrow (UTC).",
    "context": "Poll errors · rate limit"
  },
  "group_name_limit": {
    "indianEnglish": "Keep the group name within 60 characters.",
    "hinglish": "Keep the group name within 60 characters.",
    "context": "Poll errors · group name limit"
  },
  "device_required": {
    "indianEnglish": "Allow browser storage, then try again.",
    "hinglish": "Allow browser storage, then try again.",
    "context": "Poll errors · device required"
  },
  "choose_future": {
    "indianEnglish": "Choose a future deadline.",
    "hinglish": "Choose a future deadline.",
    "context": "Poll errors · choose future"
  },
  "name_required": {
    "indianEnglish": "Please enter your name.",
    "hinglish": "Please enter your name.",
    "context": "Poll errors · name required"
  },
  "unknown_option": {
    "indianEnglish": "This title is not an option in this poll.",
    "hinglish": "This title is not an option in this poll.",
    "context": "Poll errors · unknown option"
  },
  "complete_ballot": {
    "indianEnglish": "Vote on every title before adding a comment.",
    "hinglish": "Vote on every title before adding a comment.",
    "context": "Poll errors · complete ballot"
  },
  "invalid_choices": {
    "indianEnglish": "Choose two to four different titles.",
    "hinglish": "Choose two to four different titles.",
    "context": "Poll errors · invalid choices"
  }
} as const;
export const brandCopy = {
  "dekho_tagline": {
    "indianEnglish": "What shall we watch? Sorted.",
    "hinglish": "What shall we watch? Sorted.",
    "context": "Brand tagline · dekho tagline"
  },
  "watchadda_tagline": {
    "indianEnglish": "Your group’s film corner.",
    "hinglish": "Your group’s film corner.",
    "context": "Brand tagline · watchadda tagline"
  }
} as const;
export const labelsCopy = {
  "stream": {
    "indianEnglish": "Watch with subscription",
    "hinglish": "Watch with subscription",
    "context": "Filter labels · stream"
  },
  "rent": {
    "indianEnglish": "Rent",
    "hinglish": "Rent",
    "context": "Filter labels · rent"
  },
  "buy": {
    "indianEnglish": "Buy",
    "hinglish": "Buy",
    "context": "Filter labels · buy"
  },
  "free": {
    "indianEnglish": "Free",
    "hinglish": "Free",
    "context": "Filter labels · free"
  },
  "movie": {
    "indianEnglish": "Film",
    "hinglish": "Film",
    "context": "Filter labels · movie"
  },
  "series": {
    "indianEnglish": "Web series",
    "hinglish": "Web series",
    "context": "Filter labels · series"
  },
  "Laugh": {
    "indianEnglish": "Laugh",
    "hinglish": "Laugh",
    "context": "Filter labels · Laugh"
  },
  "Edge-of-seat": {
    "indianEnglish": "Edge-of-seat",
    "hinglish": "Edge-of-seat",
    "context": "Filter labels · Edge-of-seat"
  },
  "Family": {
    "indianEnglish": "Family",
    "hinglish": "Family",
    "context": "Filter labels · Family"
  },
  "Feel-good": {
    "indianEnglish": "Feel-good",
    "hinglish": "Feel-good",
    "context": "Filter labels · Feel-good"
  },
  "Mind-bender": {
    "indianEnglish": "Mind-bender",
    "hinglish": "Mind-bender",
    "context": "Filter labels · Mind-bender"
  },
  "Drama night": {
    "indianEnglish": "Drama night",
    "hinglish": "Drama night",
    "context": "Filter labels · Drama night"
  }
} as const;
export const checkinCopy = {
  "lovedHeadline": {
    "indianEnglish": "{group} loved",
    "hinglish": "{group} loved",
    "context": "Post-watch / verdict · lovedHeadline"
  },
  "likedHeadline": {
    "indianEnglish": "{group} liked",
    "hinglish": "{group} liked",
    "context": "Post-watch / verdict · likedHeadline"
  },
  "splitHeadline": {
    "indianEnglish": "{group} were split on",
    "hinglish": "{group} were split on",
    "context": "Post-watch / verdict · splitHeadline"
  },
  "lovedStat": {
    "indianEnglish": "{count} of {total} loved it",
    "hinglish": "{count} of {total} loved it",
    "context": "Post-watch / verdict · lovedStat"
  },
  "likedStat": {
    "indianEnglish": "{count} of {total} liked it",
    "hinglish": "{count} of {total} liked it",
    "context": "Post-watch / verdict · likedStat"
  },
  "splitStat": {
    "indianEnglish": "{count} of {total} liked it",
    "hinglish": "{count} of {total} liked it",
    "context": "Post-watch / verdict · splitStat"
  },
  "whatNext": {
    "indianEnglish": "Good night. Next plan?",
    "hinglish": "Achhi raat thi. Agla plan?",
    "context": "Verdict · next-picks heading"
  },
  "voteNext": {
    "indianEnglish": "Vote on the next one",
    "hinglish": "Vote on the next one",
    "context": "Post-watch / verdict · voteNext"
  },
  "attributedTake": {
    "indianEnglish": "“{take}” — {name}",
    "hinglish": "“{take}” — {name}",
    "context": "Post-watch / verdict · attributedTake"
  },
  "verdictPreviews": {
    "indianEnglish": "Post-watch verdict cards",
    "hinglish": "Post-watch verdict cards",
    "context": "Post-watch / verdict · verdictPreviews"
  },
  "previewLoved": {
    "indianEnglish": "Loved",
    "hinglish": "Loved",
    "context": "Post-watch / verdict · previewLoved"
  },
  "previewLiked": {
    "indianEnglish": "Liked",
    "hinglish": "Liked",
    "context": "Post-watch / verdict · previewLiked"
  },
  "previewSplit": {
    "indianEnglish": "Split",
    "hinglish": "Split",
    "context": "Post-watch / verdict · previewSplit"
  },
  "previewAlt": {
    "indianEnglish": "{mood} verdict card — {format}",
    "hinglish": "{mood} verdict card — {format}",
    "context": "Post-watch / verdict · previewAlt"
  },
  "wideFormat": {
    "indianEnglish": "Wide",
    "hinglish": "Wide",
    "context": "Post-watch / verdict · wideFormat"
  },
  "storyFormat": {
    "indianEnglish": "Story",
    "hinglish": "Story",
    "context": "Post-watch / verdict · storyFormat"
  },
  "question": {
    "indianEnglish": "Watched {title}? Be honest.",
    "hinglish": "{title} dekhi? Sach sach batana.",
    "context": "Post-watch prompt · no yesterday claim; can appear after six hours"
  },
  "yes": {
    "indianEnglish": "Yes",
    "hinglish": "Yes",
    "context": "Post-watch / verdict · yes"
  },
  "later": {
    "indianEnglish": "Not yet",
    "hinglish": "Not yet",
    "context": "Post-watch / verdict · later"
  },
  "skipped": {
    "indianEnglish": "Skipped it",
    "hinglish": "Skipped it",
    "context": "Post-watch / verdict · skipped"
  },
  "down": {
    "indianEnglish": "Thumbs down",
    "hinglish": "Thumbs down",
    "context": "Post-watch / verdict · down"
  },
  "up": {
    "indianEnglish": "Thumbs up",
    "hinglish": "Thumbs up",
    "context": "Post-watch / verdict · up"
  },
  "loved": {
    "indianEnglish": "Loved it",
    "hinglish": "Loved it",
    "context": "Post-watch / verdict · loved"
  },
  "take": {
    "indianEnglish": "One line about the film (optional)",
    "hinglish": "One line about the film (optional)",
    "context": "Post-watch / verdict · take"
  },
  "save": {
    "indianEnglish": "Save check-in",
    "hinglish": "Save check-in",
    "context": "Post-watch / verdict · save"
  },
  "saving": {
    "indianEnglish": "Saving your check-in",
    "hinglish": "Saving your check-in",
    "context": "Post-watch / verdict · saving"
  },
  "thanks": {
    "indianEnglish": "Saved. The group now has a review department.",
    "hinglish": "Saved. Group ka review department shuru.",
    "context": "Check-in · successful submission confirmation"
  },
  "verdict": {
    "indianEnglish": "Group verdict",
    "hinglish": "Group verdict",
    "context": "Post-watch / verdict · verdict"
  },
  "summary": {
    "indianEnglish": "{watched} of {total} watched · {loved} loved it",
    "hinglish": "{watched} of {total} watched · {loved} loved it",
    "context": "Post-watch / verdict · summary"
  },
  "shareSummary": {
    "indianEnglish": "{group}: {loved} of {total} loved it",
    "hinglish": "{group}: {loved} of {total} loved it",
    "context": "Post-watch / verdict · shareSummary"
  },
  "share": {
    "indianEnglish": "Share the verdict",
    "hinglish": "Share the verdict",
    "context": "Post-watch / verdict · share"
  },
  "next": {
    "indianEnglish": "Pick the next one",
    "hinglish": "Pick the next one",
    "context": "Post-watch / verdict · next"
  },
  "nextTag": {
    "indianEnglish": "What next? Vote on tonight’s picks",
    "hinglish": "What next? Vote on tonight’s picks",
    "context": "Post-watch / verdict · nextTag"
  },
  "group": {
    "indianEnglish": "Your group",
    "hinglish": "Your group",
    "context": "Post-watch / verdict · group"
  },
  "error": {
    "indianEnglish": "Could not load or save check-ins. Please try again.",
    "hinglish": "Could not load or save check-ins. Please try again.",
    "context": "Post-watch / verdict · error"
  },
  "retry": {
    "indianEnglish": "Try again",
    "hinglish": "Try again",
    "context": "Post-watch / verdict · retry"
  },
  "loading": {
    "indianEnglish": "Loading check-ins",
    "hinglish": "Loading check-ins",
    "context": "Post-watch / verdict · loading"
  },
  "empty": {
    "indianEnglish": "The credits rolled. The reviews are still arriving.",
    "hinglish": "Credits khatam. Reviews abhi aa rahe hain.",
    "context": "Group verdict · no check-ins yet"
  },
  "prepare": {
    "indianEnglish": "Making your verdict cards",
    "hinglish": "Making your verdict cards",
    "context": "Post-watch / verdict · prepare"
  },
  "wide": {
    "indianEnglish": "Download 1200 × 630",
    "hinglish": "Download 1200 × 630",
    "context": "Post-watch / verdict · wide"
  },
  "story": {
    "indianEnglish": "Download 1080 × 1920",
    "hinglish": "Download 1080 × 1920",
    "context": "Post-watch / verdict · story"
  },
  "whatsapp": {
    "indianEnglish": "Share verdict on WhatsApp",
    "hinglish": "Share verdict on WhatsApp",
    "context": "Post-watch / verdict · whatsapp"
  },
  "ready": {
    "indianEnglish": "Cards ready. Download an image to attach, or share the link.",
    "hinglish": "Cards ready. Download an image to attach, or share the link.",
    "context": "Post-watch / verdict · ready"
  },
  "invalid": {
    "indianEnglish": "A valid group verdict is required.",
    "hinglish": "A valid group verdict is required.",
    "context": "Post-watch / verdict · invalid"
  },
  "rating": {
    "indianEnglish": "How was it?",
    "hinglish": "How was it?",
    "context": "Post-watch / verdict · rating"
  },
  "close": {
    "indianEnglish": "Close",
    "hinglish": "Close",
    "context": "Post-watch / verdict · close"
  },
  "nextError": {
    "indianEnglish": "Could not find the next picks. Please try again.",
    "hinglish": "Could not find the next picks. Please try again.",
    "context": "Post-watch / verdict · nextError"
  }
} as const;
export const momentsCopy = {
  "greeting_friday_0": {
    "indianEnglish": "{name}It’s Friday. Your group chat is probably stuck on “anything is fine”.",
    "hinglish": "{name}Friday hai. Group chat mein abhi “kuch bhi” chal raha hoga.",
    "context": "Home greeting · friday · rotating variant 1; name includes optional comma"
  },
  "greeting_friday_1": {
    "indianEnglish": "{name}Friday evening. Let’s turn the group chat into a plan.",
    "hinglish": "{name}Friday evening. Group chat ko plan bana dete hain.",
    "context": "Home greeting · friday · rotating variant 2; name includes optional comma"
  },
  "greeting_friday_2": {
    "indianEnglish": "{name}The weekend is here. The film decision is still loading.",
    "hinglish": "{name}Weekend aa gaya. Film ka decision abhi loading hai.",
    "context": "Home greeting · friday · rotating variant 3; name includes optional comma"
  },
  "greeting_weekday_0": {
    "indianEnglish": "{name}A long day deserves a shorter film debate.",
    "hinglish": "{name}Din lamba tha. Film ki debate chhoti rakhte hain.",
    "context": "Home greeting · weekday · rotating variant 1; name includes optional comma"
  },
  "greeting_weekday_1": {
    "indianEnglish": "{name}The day is done. The group chat has one job left.",
    "hinglish": "{name}Din khatam. Group chat ka ek kaam baaki hai.",
    "context": "Home greeting · weekday · rotating variant 2; name includes optional comma"
  },
  "greeting_weekday_2": {
    "indianEnglish": "{name}Tonight’s plan: choose a film before it gets too late.",
    "hinglish": "{name}Aaj ka plan: der hone se pehle film choose kar lo.",
    "context": "Home greeting · weekday · rotating variant 3; name includes optional comma"
  },
  "greeting_weekend_0": {
    "indianEnglish": "{name}Weekend afternoon. A film is a perfectly good plan.",
    "hinglish": "{name}Weekend afternoon. Film dekhna bhi plan hi hai.",
    "context": "Home greeting · weekend · rotating variant 1; name includes optional comma"
  },
  "greeting_weekend_1": {
    "indianEnglish": "{name}An afternoon with no agenda. We can fix that.",
    "hinglish": "{name}Afternoon khaali hai. Plan bana lete hain.",
    "context": "Home greeting · weekend · rotating variant 2; name includes optional comma"
  },
  "greeting_weekend_2": {
    "indianEnglish": "{name}The weekend has room for one good film.",
    "hinglish": "{name}Weekend mein ek achhi film ki jagah toh hai.",
    "context": "Home greeting · weekend · rotating variant 3; name includes optional comma"
  },
  "greeting_late_0": {
    "indianEnglish": "{name}Still up? Let’s spend less time choosing.",
    "hinglish": "{name}Abhi tak jaag rahe ho? Choose karne mein kam time lagao.",
    "context": "Home greeting · late · rotating variant 1; name includes optional comma"
  },
  "greeting_late_1": {
    "indianEnglish": "{name}Late-night plans deserve a quick vote.",
    "hinglish": "{name}Raat ho gayi. Ek quick vote kar lo.",
    "context": "Home greeting · late · rotating variant 2; name includes optional comma"
  },
  "greeting_late_2": {
    "indianEnglish": "{name}One film, or another hour of scrolling?",
    "hinglish": "{name}Ek film, ya ek ghanta aur scrolling?",
    "context": "Home greeting · late · rotating variant 3; name includes optional comma"
  },
  "greeting_anytime_0": {
    "indianEnglish": "{name}The group chat could use a plan.",
    "hinglish": "{name}Group chat ko ek plan chahiye.",
    "context": "Home greeting · anytime · rotating variant 1; name includes optional comma"
  },
  "greeting_anytime_1": {
    "indianEnglish": "{name}Pick the film. The opinions will arrive on their own.",
    "hinglish": "{name}Film chuno. Opinions apne aap aa jayenge.",
    "context": "Home greeting · anytime · rotating variant 2; name includes optional comma"
  },
  "greeting_anytime_2": {
    "indianEnglish": "{name}A little planning. A lot less scrolling.",
    "hinglish": "{name}Thodi planning. Thodi kam scrolling.",
    "context": "Home greeting · anytime · rotating variant 3; name includes optional comma"
  },
  "share_friday_0": {
    "indianEnglish": "{group}, it’s Friday. Vote before “anything is fine” wins again. {link}",
    "hinglish": "{group}, Friday hai. Vote do, warna phir “kuch bhi” jeetega. {link}",
    "context": "Poll WhatsApp draft · friday · rotating variant 1; group and URL supplied"
  },
  "share_friday_1": {
    "indianEnglish": "{group}, the weekend has started. Let’s give it a film. Vote: {link}",
    "hinglish": "{group}, weekend shuru. Ab film choose karo. Vote: {link}",
    "context": "Poll WhatsApp draft · friday · rotating variant 2; group and URL supplied"
  },
  "share_friday_2": {
    "indianEnglish": "{group}, one Friday decision we can finish in ten seconds. Vote: {link}",
    "hinglish": "{group}, Friday ka ek decision dus second mein. Vote: {link}",
    "context": "Poll WhatsApp draft · friday · rotating variant 3; group and URL supplied"
  },
  "share_weekday_0": {
    "indianEnglish": "{group}, long day, short vote. Pick tonight’s film: {link}",
    "hinglish": "{group}, din lamba tha. Vote chhota sa hai. Film chuno: {link}",
    "context": "Poll WhatsApp draft · weekday · rotating variant 1; group and URL supplied"
  },
  "share_weekday_1": {
    "indianEnglish": "{group}, vote, or it’s “anything is fine” all over again. {link}",
    "hinglish": "{group}, vote do, warna phir se “kuch bhi” chalega. {link}",
    "context": "Poll WhatsApp draft · weekday · rotating variant 2; group and URL supplied"
  },
  "share_weekday_2": {
    "indianEnglish": "{group}, the plan has options now. Your vote is the next step: {link}",
    "hinglish": "{group}, plan ke options ready. Ab tumhari vote: {link}",
    "context": "Poll WhatsApp draft · weekday · rotating variant 3; group and URL supplied"
  },
  "share_weekend_0": {
    "indianEnglish": "{group}, the afternoon is free. Let’s give it a film. Vote: {link}",
    "hinglish": "{group}, afternoon khaali hai. Film choose kar lo. Vote: {link}",
    "context": "Poll WhatsApp draft · weekend · rotating variant 1; group and URL supplied"
  },
  "share_weekend_1": {
    "indianEnglish": "{group}, a film counts as a weekend plan. Pick one: {link}",
    "hinglish": "{group}, film bhi weekend plan hai. Ek choose karo: {link}",
    "context": "Poll WhatsApp draft · weekend · rotating variant 2; group and URL supplied"
  },
  "share_weekend_2": {
    "indianEnglish": "{group}, vote now. We can debate the ending later. {link}",
    "hinglish": "{group}, abhi vote do. Ending pe debate baad mein. {link}",
    "context": "Poll WhatsApp draft · weekend · rotating variant 3; group and URL supplied"
  },
  "share_late_0": {
    "indianEnglish": "{group}, still up? One quick vote, then a film: {link}",
    "hinglish": "{group}, jaag rahe ho? Ek quick vote, phir film: {link}",
    "context": "Poll WhatsApp draft · late · rotating variant 1; group and URL supplied"
  },
  "share_late_1": {
    "indianEnglish": "{group}, let’s choose before this becomes tomorrow’s plan. Vote: {link}",
    "hinglish": "{group}, kal ka plan banne se pehle choose kar lo. Vote: {link}",
    "context": "Poll WhatsApp draft · late · rotating variant 2; group and URL supplied"
  },
  "share_late_2": {
    "indianEnglish": "{group}, less scrolling, more film. Late-night vote: {link}",
    "hinglish": "{group}, scrolling kam, film zyada. Raat ki vote: {link}",
    "context": "Poll WhatsApp draft · late · rotating variant 3; group and URL supplied"
  },
  "share_anytime_0": {
    "indianEnglish": "{group}, vote, or it’s “anything is fine” all over again. {link}",
    "hinglish": "{group}, vote do, warna phir se “kuch bhi” chalega. {link}",
    "context": "Poll WhatsApp draft · anytime · rotating variant 1; group and URL supplied"
  },
  "share_anytime_1": {
    "indianEnglish": "{group}, we have options. Now we need opinions. Vote: {link}",
    "hinglish": "{group}, options aa gaye. Ab opinions chahiye. Vote: {link}",
    "context": "Poll WhatsApp draft · anytime · rotating variant 2; group and URL supplied"
  },
  "share_anytime_2": {
    "indianEnglish": "{group}, one film. One quick group decision. Vote: {link}",
    "hinglish": "{group}, ek film. Ek quick decision. Vote: {link}",
    "context": "Poll WhatsApp draft · anytime · rotating variant 3; group and URL supplied"
  }
} as const;
export const copy = { moments: momentsCopy, checkin: checkinCopy, common: commonCopy, kit: kitCopy, shortlist: shortlistCopy, home: homeCopy, welcome: welcomeCopy, pollCreate: pollCreateCopy, voter: voterCopy, artwork: artworkCopy, profile: profileCopy, search: searchCopy, results: resultsCopy, title: titleCopy, shareCard: shareCardCopy, install: installCopy, catalog: catalogCopy, pollErrors: pollErrorsCopy, brand: brandCopy, labels: labelsCopy } as const;
export type CopyScreen = keyof typeof copy;
export function formatCopy(line: CopyLine, params: Record<string, unknown> = {}, tone: Tone = 'indianEnglish'): string { return line[tone].replace(/\{(\w+)\}/g, (placeholder, name: string) => Object.hasOwn(params, name) ? String(params[name]) : placeholder); }
/** Convenience for tests/tools; UI imports the specific screen to enable tree shaking. */
export function text<S extends CopyScreen>(screen: S, key: keyof typeof copy[S], params: Record<string, unknown> = {}, tone: Tone = 'indianEnglish'): string { return formatCopy(copy[screen][key] as CopyLine, params, tone); }
