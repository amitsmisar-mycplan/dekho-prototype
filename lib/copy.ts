/** Product UI copy. Named screen exports keep unrelated copy out of mobile bundles. */
export type Tone = 'hinglish' | 'indianEnglish';
export const toneForLanguages = (languages: readonly string[]): Tone => languages.includes('Hindi') ? 'hinglish' : 'indianEnglish';
export interface CopyLine { indianEnglish: string; hinglish: string }
export const commonCopy = {
  "good_company_great_stories": {
    "indianEnglish": "GOOD COMPANY. GREAT STORIES.",
    "hinglish": "GOOD COMPANY. GREAT STORIES."
  },
  "a_small_screen_a_big_night": {
    "indianEnglish": "A SMALL SCREEN. A BIG NIGHT.",
    "hinglish": "A SMALL SCREEN. A BIG NIGHT."
  },
  "separator": {
    "indianEnglish": ".",
    "hinglish": "."
  },
  "find_tonight_s_picks": {
    "indianEnglish": "Find tonight’s picks ",
    "hinglish": "Find tonight’s picks "
  },
  "add_a_title_or_try_a_mood_on_tonight": {
    "indianEnglish": "Add a title or try a mood on Tonight.",
    "hinglish": "Add a title or try a mood on Tonight."
  },
  "the_best_nights_start_with_a_few_picks": {
    "indianEnglish": "The best nights start with a few picks.",
    "hinglish": "The best nights start with a few picks."
  },
  "your_tonight_shortlist": {
    "indianEnglish": "Your tonight shortlist",
    "hinglish": "Your tonight shortlist"
  },
  "me": {
    "indianEnglish": "Me",
    "hinglish": "Me"
  },
  "shortlist": {
    "indianEnglish": "Shortlist",
    "hinglish": "Shortlist"
  },
  "search": {
    "indianEnglish": "Search",
    "hinglish": "Search"
  },
  "tonight": {
    "indianEnglish": "Tonight",
    "hinglish": "Tonight"
  },
  "main_navigation": {
    "indianEnglish": "Main navigation",
    "hinglish": "Main navigation"
  },
  "original_generated_artwork_this_product_is_not_endorsed_or_certif": {
    "indianEnglish": "Original generated artwork. This product is not endorsed or certified by TMDb. Ratings and India availability are illustrative.",
    "hinglish": "Original generated artwork. This product is not endorsed or certified by TMDb. Ratings and India availability are illustrative."
  },
  "india_only_built_for_movie_nights": {
    "indianEnglish": "India only · Built for movie nights",
    "hinglish": "India only · Built for movie nights"
  },
  "getting_ready": {
    "indianEnglish": "Getting ready",
    "hinglish": "Getting ready"
  },
  "kya_dekhein": {
    "indianEnglish": "What shall we watch?",
    "hinglish": "What shall we watch?"
  },
  "value_home": {
    "indianEnglish": "{p1} home",
    "hinglish": "{p1} home"
  },
  "skip_to_content": {
    "indianEnglish": "Skip to content",
    "hinglish": "Skip to content"
  },
  "separator_2": {
    "indianEnglish": "▴ ▰",
    "hinglish": "▴ ▰"
  },
  "9_41": {
    "indianEnglish": "9:41",
    "hinglish": "9:41"
  },
  "made_for_your_kind_of_people": {
    "indianEnglish": "MADE FOR YOUR KIND OF PEOPLE",
    "hinglish": "MADE FOR YOUR KIND OF PEOPLE"
  },
  "more_movie_nights": {
    "indianEnglish": "More movie nights.",
    "hinglish": "More movie nights."
  },
  "less_scrolling": {
    "indianEnglish": "Less scrolling.",
    "hinglish": "Less scrolling."
  },
  "loading_picks": {
    "indianEnglish": "Loading picks",
    "hinglish": "Loading picks"
  },
  "loading": {
    "indianEnglish": "Loading…",
    "hinglish": "Loading…"
  },
  "getting_your_next_movie_night_ready": {
    "indianEnglish": "Getting your next movie night ready",
    "hinglish": "Getting your next movie night ready"
  },
  "dismiss_notification": {
    "indianEnglish": "Dismiss notification",
    "hinglish": "Dismiss notification"
  },
  "close_sheet": {
    "indianEnglish": "Close sheet",
    "hinglish": "Close sheet"
  },
  "separator_3": {
    "indianEnglish": ", ",
    "hinglish": ", "
  },
  "sr": {
    "indianEnglish": "SR",
    "hinglish": "SR"
  },
  "nk": {
    "indianEnglish": "NK",
    "hinglish": "NK"
  },
  "am": {
    "indianEnglish": "AM",
    "hinglish": "AM"
  },
  "value_value_value_shortlist": {
    "indianEnglish": "{p1} {p2} {p3} shortlist",
    "hinglish": "{p1} {p2} {p3} shortlist"
  },
  "add": {
    "indianEnglish": "Add",
    "hinglish": "Add"
  },
  "remove": {
    "indianEnglish": "Remove",
    "hinglish": "Remove"
  },
  "to": {
    "indianEnglish": "to",
    "hinglish": "to"
  },
  "from": {
    "indianEnglish": "from",
    "hinglish": "from"
  },
  "loading_poster": {
    "indianEnglish": "Loading poster",
    "hinglish": "Loading poster"
  },
  "try_again": {
    "indianEnglish": "Try again",
    "hinglish": "Try again"
  },
  "something_didn_t_load_let_s_give_it_another_take": {
    "indianEnglish": "Something didn’t load. Let’s give it another take.",
    "hinglish": "Something didn’t load. Let’s give it another take."
  },
  "intermission": {
    "indianEnglish": "intermission.",
    "hinglish": "intermission."
  },
  "a_little": {
    "indianEnglish": "A little",
    "hinglish": "A little"
  },
  "less_scrolling_more_movie_nights_a_mobile_first_prototype_for_pic": {
    "indianEnglish": "Less scrolling, more movie nights. A mobile-first prototype for picking what to watch together in India.",
    "hinglish": "Less scrolling, more movie nights. A mobile-first prototype for picking what to watch together in India."
  },
  "s_value": {
    "indianEnglish": "%s · {p1}",
    "hinglish": "%s · {p1}"
  },
  "back_to_tonight": {
    "indianEnglish": "Back to tonight",
    "hinglish": "Back to tonight"
  },
  "that_page_isn_t_in_tonight_s_lineup": {
    "indianEnglish": "That page isn’t in tonight’s lineup.",
    "hinglish": "That page isn’t in tonight’s lineup."
  },
  "right_company": {
    "indianEnglish": "right company.",
    "hinglish": "right company."
  },
  "wrong_screen": {
    "indianEnglish": "Wrong screen,",
    "hinglish": "Wrong screen,"
  },
  "closes_value": {
    "indianEnglish": "Closes {p1}",
    "hinglish": "Closes {p1}"
  },
  "initials_fallback": {
    "indianEnglish": "YOU",
    "hinglish": "YOU"
  },
  "pick": {
    "indianEnglish": "pick",
    "hinglish": "pick"
  },
  "picks": {
    "indianEnglish": "picks",
    "hinglish": "picks"
  },
  "title": {
    "indianEnglish": "title",
    "hinglish": "title"
  },
  "titles": {
    "indianEnglish": "titles",
    "hinglish": "titles"
  },
  "friend": {
    "indianEnglish": "friend",
    "hinglish": "friend"
  },
  "friends": {
    "indianEnglish": "friends",
    "hinglish": "friends"
  },
  "season": {
    "indianEnglish": "season",
    "hinglish": "season"
  },
  "seasons": {
    "indianEnglish": "seasons",
    "hinglish": "seasons"
  },
  "minutes": {
    "indianEnglish": "{count} min",
    "hinglish": "{count} min"
  },
  "seasons_label": {
    "indianEnglish": "{count} {unit}",
    "hinglish": "{count} {unit}"
  },
  "price": {
    "indianEnglish": "₹{amount}{suffix}",
    "hinglish": "₹{amount}{suffix}"
  },
  "meta_pair": {
    "indianEnglish": "{first} · {second}",
    "hinglish": "{first} · {second}"
  },
  "price_suffix": {
    "indianEnglish": " · ₹{amount}",
    "hinglish": " · ₹{amount}"
  }
} as const;
export const kitCopy = {
  "0": {
    "indianEnglish": "0",
    "hinglish": "0"
  },
  "10": {
    "indianEnglish": " / 10",
    "hinglish": " / 10"
  },
  "this_is_the_data_preview_full_search_and_title_screens_arrive_in_": {
    "indianEnglish": "This is the data preview. Full search and title screens arrive in later phases. Movie artwork, when seeded, is from TMDb; this product is not endorsed or certified by TMDb.",
    "hinglish": "This is the data preview. Full search and title screens arrive in later phases. Movie artwork, when seeded, is from TMDb; this product is not endorsed or certified by TMDb."
  },
  "choose_one_of_the_60_seeded_titles_above": {
    "indianEnglish": "Choose one of the 60 seeded titles above.",
    "hinglish": "Choose one of the 60 seeded titles above."
  },
  "that_title_isn_t_in_this_library": {
    "indianEnglish": "That title isn’t in this library.",
    "hinglish": "That title isn’t in this library."
  },
  "genres_40_language_25_cast_director_25_rating_band_10_no_shared_g": {
    "indianEnglish": "Genres 40% · language 25% · cast/director 25% · rating band 10%. No shared genre: capped at 0.35 and excluded from recommendations. Ties use stable title IDs.",
    "hinglish": "Genres 40% · language 25% · cast/director 25% · rating band 10%. No shared genre: capped at 0.35 and excluded from recommendations. Ties use stable title IDs."
  },
  "not_a_prediction": {
    "indianEnglish": " · not a prediction",
    "hinglish": " · not a prediction"
  },
  "similarity_score": {
    "indianEnglish": "Similarity score ",
    "hinglish": "Similarity score "
  },
  "no_similar_titles_in_these_languages_yet_try_editing_your_prefere": {
    "indianEnglish": "No similar titles in these languages yet. Try editing your preferences.",
    "hinglish": "No similar titles in these languages yet. Try editing your preferences."
  },
  "availability_is_illustrative_service_membership_does_not_include_": {
    "indianEnglish": "Availability is illustrative. Service membership does not include rentals or purchases.",
    "hinglish": "Availability is illustrative. Service membership does not include rentals or purchases."
  },
  "extra_charge": {
    "indianEnglish": " · extra charge",
    "hinglish": " · extra charge"
  },
  "your_service": {
    "indianEnglish": "Your OTT app",
    "hinglish": "Your OTT app"
  },
  "where_to_watch_sample_offers": {
    "indianEnglish": "Where to watch · sample offers",
    "hinglish": "Where to watch · sample offers"
  },
  "illustrative_rating_not_a_live_tmdb_score": {
    "indianEnglish": "Illustrative rating, not a live TMDb score.",
    "hinglish": "Illustrative rating, not a live TMDb score."
  },
  "show_matches": {
    "indianEnglish": "Show matches ",
    "hinglish": "Show matches "
  },
  "any_language": {
    "indianEnglish": "Any language",
    "hinglish": "Any language"
  },
  "language": {
    "indianEnglish": "Language",
    "hinglish": "Language"
  },
  "search_and_similar_picks_are_filtered_to_your_saved_languages": {
    "indianEnglish": "Search and similar picks are filtered to your saved languages.",
    "hinglish": "Search and similar picks are filtered to your saved languages."
  },
  "no_preference": {
    "indianEnglish": "No preference",
    "hinglish": "No preference"
  },
  "one_of_your_services": {
    "indianEnglish": "One of your OTT apps",
    "hinglish": "One of your OTT apps"
  },
  "offers_are_ordered_using_your_saved_services": {
    "indianEnglish": "Offers are ordered using your saved OTT apps.",
    "hinglish": "Offers are ordered using your saved OTT apps."
  },
  "free_only_preference_is_active": {
    "indianEnglish": "Free-only preference is active.",
    "hinglish": "Free-only preference is active."
  },
  "choose_a_title": {
    "indianEnglish": "Choose a title",
    "hinglish": "Choose a title"
  },
  "start_with_a_title": {
    "indianEnglish": "Start with a title",
    "hinglish": "Start with a title"
  },
  "why_these_go_together": {
    "indianEnglish": "Why these go together.",
    "hinglish": "Why these go together."
  },
  "no_match_in_your_selected_languages_try_another_spelling_or_edit_": {
    "indianEnglish": "No match in your selected languages. Try another spelling or edit your preferences.",
    "hinglish": "No match in your selected languages. Try another spelling or edit your preferences."
  },
  "kuch_aur_try_karein": {
    "indianEnglish": "Try another title?",
    "hinglish": "Try another title?"
  },
  "value_min": {
    "indianEnglish": "{p1} min",
    "hinglish": "{p1} min"
  },
  "separator": {
    "indianEnglish": " · ",
    "hinglish": " · "
  },
  "select_a_title_to_inspect_its_matches": {
    "indianEnglish": ". Select a title to inspect its matches.",
    "hinglish": ". Select a title to inspect its matches."
  },
  "for_value": {
    "indianEnglish": " for “{p1}”",
    "hinglish": " for “{p1}”"
  },
  "search_catalog": {
    "indianEnglish": "Search catalogue",
    "hinglish": "Search catalogue"
  },
  "try_panchayath_or_fahadh_faasil": {
    "indianEnglish": "Try panchayath or Fahadh Faasil",
    "hinglish": "Try panchayath or Fahadh Faasil"
  },
  "title_alternate_spelling_or_actor": {
    "indianEnglish": "Title, alternate spelling or actor",
    "hinglish": "Title, alternate spelling or actor"
  },
  "find_something_familiar": {
    "indianEnglish": "Find something familiar.",
    "hinglish": "Find something familiar."
  },
  "edit_preferences": {
    "indianEnglish": "Edit preferences ",
    "hinglish": "Edit preferences "
  },
  "no_saved_languages_use_the_dropdown_below": {
    "indianEnglish": "No saved languages — use the dropdown below.",
    "hinglish": "No saved languages — use the dropdown below."
  },
  "no_saved_services_use_the_dropdown_below": {
    "indianEnglish": "No saved OTT apps — use the dropdown below.",
    "hinglish": "No saved OTT apps — use the dropdown below."
  },
  "free_picks_only": {
    "indianEnglish": "Free picks only",
    "hinglish": "Free picks only"
  },
  "your_saved_taste": {
    "indianEnglish": "YOUR SAVED TASTE",
    "hinglish": "YOUR SAVED TASTE"
  },
  "illustrative_data_india_only": {
    "indianEnglish": "Illustrative data · India only",
    "hinglish": "Illustrative data · India only"
  },
  "a_small_library_for_your_next_big_night": {
    "indianEnglish": "A small library for your next big night.",
    "hinglish": "A small library for your next big night."
  },
  "films_shows_eight_languages": {
    "indianEnglish": " films & web series. Eight languages.",
    "hinglish": " films & web series. Eight languages."
  },
  "separator_2": {
    "indianEnglish": ".",
    "hinglish": "."
  },
  "clear_reasons": {
    "indianEnglish": "Clear reasons",
    "hinglish": "Clear reasons"
  },
  "good_picks": {
    "indianEnglish": "Good picks.",
    "hinglish": "Good picks."
  },
  "p1_catalog_lab": {
    "indianEnglish": "P1 / CATALOG LAB",
    "hinglish": "P1 / CATALOG LAB"
  },
  "back_to_design_kit": {
    "indianEnglish": " Back to design kit",
    "hinglish": " Back to design kit"
  },
  "loading_your_catalog": {
    "indianEnglish": "Loading your catalogue",
    "hinglish": "Loading your catalogue"
  },
  "try_again": {
    "indianEnglish": "Try again",
    "hinglish": "Try again"
  },
  "the_catalog_couldn_t_load_your_preferences_are_still_saved": {
    "indianEnglish": "The catalogue couldn’t load. Your preferences are still saved.",
    "hinglish": "The catalogue couldn’t load. Your preferences are still saved."
  },
  "a_little_intermission": {
    "indianEnglish": "A little intermission.",
    "hinglish": "A little intermission."
  },
  "sounds_like_a_plan": {
    "indianEnglish": "Sounds like a plan ",
    "hinglish": "Sounds like a plan "
  },
  "sorted_now_who_s_bringing_the_popcorn": {
    "indianEnglish": "Sorted. Now, who’s bringing the popcorn?",
    "hinglish": "Sorted. Now, who’s bringing the popcorn?"
  },
  "everyone_gets_a_say": {
    "indianEnglish": "Everyone gets a say.",
    "hinglish": "Everyone gets a say."
  },
  "a_little_glass_a_gentle_spring_drag_this_sheet_down_press_escape_": {
    "indianEnglish": "A little glass, a gentle spring. Drag this sheet down, press Escape, or tap outside to close.",
    "hinglish": "A little glass, a gentle spring. Drag this sheet down, press Escape, or tap outside to close."
  },
  "tonight_is_taking_shape": {
    "indianEnglish": "Tonight is taking shape.",
    "hinglish": "Tonight is taking shape."
  },
  "quietly_confident": {
    "indianEnglish": "Quietly confident.",
    "hinglish": "Quietly confident."
  },
  "you_re_seeing_the_full_p0_kit": {
    "indianEnglish": "You’re seeing the full P0 kit.",
    "hinglish": "You’re seeing the full P0 kit."
  },
  "a_little_more_to_explore": {
    "indianEnglish": "A little more to explore.",
    "hinglish": "A little more to explore."
  },
  "08_section_headers": {
    "indianEnglish": "08 / SECTION HEADERS",
    "hinglish": "08 / SECTION HEADERS"
  },
  "reduced_motion_preferences_are_respected": {
    "indianEnglish": "Reduced-motion preferences are respected.",
    "hinglish": "Reduced-motion preferences are respected."
  },
  "motion_should_feel_good": {
    "indianEnglish": "Motion should feel good.",
    "hinglish": "Motion should feel good."
  },
  "try_a_toast": {
    "indianEnglish": " Try a toast",
    "hinglish": " Try a toast"
  },
  "added_to_tonight_snacks_next": {
    "indianEnglish": "Added to your shortlist.",
    "hinglish": "Added to your shortlist."
  },
  "open_the_bottom_sheet": {
    "indianEnglish": " Open the bottom sheet",
    "hinglish": " Open the bottom sheet"
  },
  "small_moments_big_feels": {
    "indianEnglish": "Small moments. Big feels.",
    "hinglish": "Small moments. Big feels."
  },
  "07_feedback": {
    "indianEnglish": "07 / FEEDBACK",
    "hinglish": "07 / FEEDBACK"
  },
  "someone_has_to_start_the_plan": {
    "indianEnglish": "Someone has to start the plan.",
    "hinglish": "Someone has to start the plan."
  },
  "you": {
    "indianEnglish": "YOU",
    "hinglish": "YOU"
  },
  "three_friends_one_movie_night": {
    "indianEnglish": "Three friends. One movie night.",
    "hinglish": "Three friends. One movie night."
  },
  "the_usual_suspects": {
    "indianEnglish": "The usual suspects",
    "hinglish": "The usual suspects"
  },
  "better_with_your_people": {
    "indianEnglish": "Better with your people.",
    "hinglish": "Better with your people."
  },
  "06_people": {
    "indianEnglish": "06 / PEOPLE",
    "hinglish": "06 / PEOPLE"
  },
  "generated_no_images": {
    "indianEnglish": "GENERATED / NO IMAGES",
    "hinglish": "GENERATED / NO IMAGES"
  },
  "original_composition": {
    "indianEnglish": "Original composition",
    "hinglish": "Original composition"
  },
  "your_next_favourite": {
    "indianEnglish": "Your next favourite",
    "hinglish": "Your next favourite"
  },
  "loading_shimmer": {
    "indianEnglish": "LOADING / SHIMMER",
    "hinglish": "LOADING / SHIMMER"
  },
  "loading": {
    "indianEnglish": "Loading",
    "hinglish": "Loading"
  },
  "original_generated_key_art_2_3_tap_to_try_the_shortlist": {
    "indianEnglish": "Original generated key art · 2:3 · Tap + to try the shortlist",
    "hinglish": "Original generated key art · 2:3 · Tap + to try the shortlist"
  },
  "on_the_shortlist_good_taste": {
    "indianEnglish": "On the shortlist. Good taste!",
    "hinglish": "On the shortlist. Good taste!"
  },
  "taken_off_the_shortlist": {
    "indianEnglish": "Taken off the shortlist.",
    "hinglish": "Taken off the shortlist."
  },
  "every_pick_a_little_poster": {
    "indianEnglish": "Every pick, a little poster.",
    "hinglish": "Every pick, a little poster."
  },
  "05_posters": {
    "indianEnglish": "05 / POSTERS",
    "hinglish": "05 / POSTERS"
  },
  "text_only_chips_with_accessible_lighter_provider_colours": {
    "indianEnglish": "Text-only chips, with accessible lighter provider colours.",
    "hinglish": "Text-only chips, with accessible lighter provider colours."
  },
  "your_services_front_and_centre": {
    "indianEnglish": "Your OTT apps, front and centre.",
    "hinglish": "Your OTT apps, front and centre."
  },
  "try_mood_quick_start_on_home": {
    "indianEnglish": ". Try mood quick-start on Home.",
    "hinglish": ". Try mood quick-start on Home."
  },
  "selected": {
    "indianEnglish": "Selected: ",
    "hinglish": "Selected: "
  },
  "more_soon": {
    "indianEnglish": "More soon",
    "hinglish": "More soon"
  },
  "what_s_the_mood": {
    "indianEnglish": "What’s the mood?",
    "hinglish": "What’s the mood?"
  },
  "04_chips": {
    "indianEnglish": "04 / CHIPS",
    "hinglish": "04 / CHIPS"
  },
  "unavailable_for_now": {
    "indianEnglish": "Unavailable for now",
    "hinglish": "Unavailable for now"
  },
  "nothing_to_save_yet": {
    "indianEnglish": "Nothing to save yet",
    "hinglish": "Nothing to save yet"
  },
  "pick_at_least_2_titles": {
    "indianEnglish": "Pick at least 2 titles",
    "hinglish": "Pick at least 2 titles"
  },
  "maybe_later": {
    "indianEnglish": "Maybe later ",
    "hinglish": "Maybe later "
  },
  "no_pressure_the_popcorn_can_wait": {
    "indianEnglish": "No pressure. The popcorn can wait.",
    "hinglish": "No pressure. The popcorn can wait."
  },
  "save_for_a_rainy_day": {
    "indianEnglish": " Save for a rainy day",
    "hinglish": " Save for a rainy day"
  },
  "saved_a_little_movie_night_inspiration": {
    "indianEnglish": "Saved a little movie-night inspiration.",
    "hinglish": "Saved a little movie-night inspiration."
  },
  "put_it_to_the_group": {
    "indianEnglish": "Put it to the group ",
    "hinglish": "Put it to the group "
  },
  "good_choice_tonight_is_looking_up": {
    "indianEnglish": "Good choice. Tonight is looking up.",
    "hinglish": "Good choice. Tonight is looking up."
  },
  "make_the_next_move": {
    "indianEnglish": "Make the next move.",
    "hinglish": "Make the next move."
  },
  "03_actions": {
    "indianEnglish": "03 / ACTIONS",
    "hinglish": "03 / ACTIONS"
  },
  "separator_3": {
    "indianEnglish": "Let’s watch a good film today.",
    "hinglish": "Let’s watch a good film today."
  },
  "mukta_a_little_hindi": {
    "indianEnglish": "MUKTA / A LITTLE HINDI",
    "hinglish": "MUKTA / A LITTLE HINDI"
  },
  "good_films_great_company_plans_sorted": {
    "indianEnglish": "Good films. Great company. Plans, sorted.",
    "hinglish": "Good films. Great company. Plans, sorted."
  },
  "inter_the_everyday_stuff": {
    "indianEnglish": "INTER / THE EVERYDAY STUFF",
    "hinglish": "INTER / THE EVERYDAY STUFF"
  },
  "separator_4": {
    "indianEnglish": "?",
    "hinglish": "?"
  },
  "kya_dekhein": {
    "indianEnglish": "What shall we watch",
    "hinglish": "What shall we watch"
  },
  "bricolage_grotesque_display": {
    "indianEnglish": "BRICOLAGE GROTESQUE / DISPLAY",
    "hinglish": "BRICOLAGE GROTESQUE / DISPLAY"
  },
  "a_little_main_character_energy": {
    "indianEnglish": "A little main-character energy.",
    "hinglish": "A little main-character energy."
  },
  "02_type": {
    "indianEnglish": "02 / TYPE",
    "hinglish": "02 / TYPE"
  },
  "after_dark_in_colour": {
    "indianEnglish": "After dark, in colour.",
    "hinglish": "After dark, in colour."
  },
  "01_colour": {
    "indianEnglish": "01 / COLOUR",
    "hinglish": "01 / COLOUR"
  },
  "every_title_one_deterministic_design_colour_follows_mood_shapes_f": {
    "indianEnglish": "Every title, one deterministic design. Colour follows mood; shapes follow genre. Provider dots mark your included OTT apps.",
    "hinglish": "Every title, one deterministic design. Colour follows mood; shapes follow genre. Provider dots mark your included OTT apps."
  },
  "the_whole_cinema_wall": {
    "indianEnglish": "The whole cinema wall.",
    "hinglish": "The whole cinema wall."
  },
  "68_original_compositions": {
    "indianEnglish": "68 / ORIGINAL COMPOSITIONS",
    "hinglish": "68 / ORIGINAL COMPOSITIONS"
  },
  "explore_the_seeded_catalog": {
    "indianEnglish": "Explore the seeded catalogue ",
    "hinglish": "Explore the seeded catalogue "
  },
  "foundation_v0_1": {
    "indianEnglish": " FOUNDATION / V0.1",
    "hinglish": " FOUNDATION / V0.1"
  },
  "go_on_press_all_the_buttons": {
    "indianEnglish": "Go on, press all the buttons.",
    "hinglish": "Go on, press all the buttons."
  },
  "design_kit": {
    "indianEnglish": " design kit.",
    "hinglish": " design kit."
  },
  "the": {
    "indianEnglish": "The ",
    "hinglish": "The "
  },
  "material": {
    "indianEnglish": "material",
    "hinglish": "material"
  },
  "movie_night": {
    "indianEnglish": "Movie-night",
    "hinglish": "Movie-night"
  },
  "the_look_the_feel_the_little_things": {
    "indianEnglish": "THE LOOK. THE FEEL. THE LITTLE THINGS.",
    "hinglish": "THE LOOK. THE FEEL. THE LITTLE THINGS."
  },
  "dil_khush_mood_sorted": {
    "indianEnglish": "A feel-good film for tonight",
    "hinglish": "A feel-good film for tonight"
  },
  "golden_days": {
    "indianEnglish": "Golden Days",
    "hinglish": "Golden Days"
  },
  "one_more_plot_twist": {
    "indianEnglish": "One more plot twist",
    "hinglish": "One more plot twist"
  },
  "after_hours": {
    "indianEnglish": "After Hours",
    "hinglish": "After Hours"
  },
  "catalog_lab": {
    "indianEnglish": "Catalog lab",
    "hinglish": "Catalog lab"
  },
  "value_generated_posters_and_friday_movie_night_poll_details": {
    "indianEnglish": "{p1} generated posters and Friday movie night poll details",
    "hinglish": "{p1} generated posters and Friday movie night poll details"
  },
  "open_value_title_og_image": {
    "indianEnglish": "Open {p1}-title OG image",
    "hinglish": "Open {p1}-title OG image"
  },
  "titles": {
    "indianEnglish": " titles",
    "hinglish": " titles"
  },
  "friday_movie_night": {
    "indianEnglish": "Friday movie night",
    "hinglish": "Friday movie night"
  },
  "1200_630_open_an_image_for_full_size_the_outline_marks_the_center": {
    "indianEnglish": " · 1200 × 630. Open an image for full size. The outline marks the centered square crop; all posters stay inside it. Deadlines use India time.",
    "hinglish": " · 1200 × 630. Open an image for full size. The outline marks the centered square crop; all posters stay inside it. Deadlines use India time."
  },
  "poll_share_cards": {
    "indianEnglish": "Poll share cards",
    "hinglish": "Poll share cards"
  }
} as const;
export const shortlistCopy = {
  "review_shortlist": {
    "indianEnglish": "Review shortlist",
    "hinglish": "Review shortlist"
  },
  "try_another_title_for_a_fresh_set_of_matches": {
    "indianEnglish": "Try another title for a fresh set of matches.",
    "hinglish": "Try another title for a fresh set of matches."
  },
  "your_shortlist_is_ready_for_the_group": {
    "indianEnglish": "Your shortlist is ready for the group.",
    "hinglish": "Your shortlist is ready for the group."
  },
  "that_s_the_deck_yaar": {
    "indianEnglish": "You’ve reached the last pick.",
    "hinglish": "You’ve reached the last pick."
  },
  "four_picks_one_great_night": {
    "indianEnglish": "Four picks for a good evening.",
    "hinglish": "Four picks for some timepass."
  },
  "4_shortlisted": {
    "indianEnglish": " / 4 shortlisted",
    "hinglish": " / 4 shortlisted"
  },
  "right_to_shortlist_left_to_skip_up_to_save": {
    "indianEnglish": "Right to shortlist · left to skip · up to save",
    "hinglish": "Right to shortlist · left to skip · up to save"
  },
  "find_your_next_pick": {
    "indianEnglish": "Find your next pick",
    "hinglish": "Find your next pick"
  },
  "next_possibility": {
    "indianEnglish": "Next possibility.",
    "hinglish": "Next possibility."
  },
  "saved_for_another_night": {
    "indianEnglish": "Saved for another night.",
    "hinglish": "Saved for another night."
  },
  "added_to_tonight": {
    "indianEnglish": "Added to tonight.",
    "hinglish": "Added to tonight."
  },
  "shortlist": {
    "indianEnglish": "Shortlist",
    "hinglish": "Shortlist"
  },
  "watchlist": {
    "indianEnglish": "Watchlist",
    "hinglish": "Watchlist"
  },
  "skip": {
    "indianEnglish": "Skip",
    "hinglish": "Skip"
  },
  "watchlist_2": {
    "indianEnglish": "WATCHLIST",
    "hinglish": "WATCHLIST"
  },
  "skip_2": {
    "indianEnglish": "SKIP",
    "hinglish": "SKIP"
  },
  "shortlist_2": {
    "indianEnglish": "SHORTLIST",
    "hinglish": "SHORTLIST"
  },
  "add_to_shortlist": {
    "indianEnglish": "Add to shortlist",
    "hinglish": "Add to shortlist"
  },
  "shortlisted": {
    "indianEnglish": "Shortlisted",
    "hinglish": "Shortlisted"
  },
  "added_to_shortlist": {
    "indianEnglish": "Added to shortlist.",
    "hinglish": "Added to shortlist."
  },
  "removed": {
    "indianEnglish": "Removed.",
    "hinglish": "Removed."
  },
  "4_is_plenty_yaar": {
    "indianEnglish": "Four picks are enough.",
    "hinglish": "Four picks are enough."
  },
  "remove": {
    "indianEnglish": "Remove",
    "hinglish": "Remove"
  },
  "value_of_4_picks_everyone_gets_a_say": {
    "indianEnglish": "{p1} of 4 picks. Everyone gets a say.",
    "hinglish": "{p1} of 4 picks. Everyone gets a say."
  },
  "remove_sample_picks_and_choose_catalog_titles_to_start_a_poll": {
    "indianEnglish": "Remove sample picks and choose catalogue titles to start a poll.",
    "hinglish": "Remove sample picks and choose catalogue titles to start a poll."
  },
  "pick_at_least_2_titles": {
    "indianEnglish": "Pick at least 2 titles",
    "hinglish": "Pick at least 2 titles"
  },
  "ask_the_group": {
    "indianEnglish": "Ask the group",
    "hinglish": "Ask the group"
  },
  "drag_the_grip_to_reorder_swipe_a_card_sideways_to_remove": {
    "indianEnglish": "Drag the grip to reorder. Swipe a card sideways to remove.",
    "hinglish": "Drag the grip to reorder. Swipe a card sideways to remove."
  },
  "keep_my_four": {
    "indianEnglish": "Keep my four",
    "hinglish": "Keep my four"
  },
  "replace": {
    "indianEnglish": " replace?",
    "hinglish": " replace?"
  },
  "the_new_title": {
    "indianEnglish": "the new title",
    "hinglish": "the new title"
  },
  "which_pick_should": {
    "indianEnglish": "Which pick should ",
    "hinglish": "Which pick should "
  },
  "try_again": {
    "indianEnglish": "Try again",
    "hinglish": "Try again"
  },
  "we_couldn_t_load_the_shortlist": {
    "indianEnglish": "We couldn’t load the shortlist.",
    "hinglish": "We couldn’t load the shortlist."
  },
  "your_picks_need_another_take": {
    "indianEnglish": "Your picks need another take.",
    "hinglish": "Your picks need another take."
  },
  "remove_value": {
    "indianEnglish": "Remove {p1}",
    "hinglish": "Remove {p1}"
  },
  "move_value_down": {
    "indianEnglish": "Move {p1} down",
    "hinglish": "Move {p1} down"
  },
  "move_value_up": {
    "indianEnglish": "Move {p1} up",
    "hinglish": "Move {p1} up"
  },
  "drag_to_reorder_value": {
    "indianEnglish": "Drag to reorder {p1}",
    "hinglish": "Drag to reorder {p1}"
  },
  "swap_this_one": {
    "indianEnglish": "Swap this one",
    "hinglish": "Swap this one"
  },
  "catalog_pick": {
    "indianEnglish": "Saved title",
    "hinglish": "Saved title"
  },
  "loading_title": {
    "indianEnglish": "Loading title",
    "hinglish": "Loading title"
  }
} as const;
export const homeCopy = {
  "try_other_languages": {
    "indianEnglish": "Try other languages",
    "hinglish": "Try other languages"
  },
  "picks_match_these_preferences_yet": {
    "indianEnglish": " picks match these preferences yet.",
    "hinglish": " picks match these preferences yet."
  },
  "no": {
    "indianEnglish": "No ",
    "hinglish": "No "
  },
  "thoda_sa_plot_twist": {
    "indianEnglish": "Try a different mood.",
    "hinglish": "Try a different mood."
  },
  "replaces_your_current_shortlist_then_ask_the_group": {
    "indianEnglish": "Replaces your current shortlist. Then ask the group.",
    "hinglish": "Replaces your current shortlist. Then ask the group."
  },
  "a_group_shortlist_needs_at_least_two_picks": {
    "indianEnglish": "A group shortlist needs at least two picks.",
    "hinglish": "A group shortlist needs at least two picks."
  },
  "put_these_to_the_group": {
    "indianEnglish": "Put these to the group ",
    "hinglish": "Put these to the group "
  },
  "in_this_small_catalog": {
    "indianEnglish": " in this small catalogue.",
    "hinglish": " in this small catalogue."
  },
  "matching": {
    "indianEnglish": " matching ",
    "hinglish": " matching "
  },
  "just": {
    "indianEnglish": "Just ",
    "hinglish": "Just "
  },
  "loading_pick": {
    "indianEnglish": "Loading pick",
    "hinglish": "Loading pick"
  },
  "the_picks_didn_t_load_close_this_sheet_and_give_it_another_try": {
    "indianEnglish": "The picks didn’t load. Close this sheet and give it another try.",
    "hinglish": "The picks didn’t load. Close this sheet and give it another try."
  },
  "a_few_contenders_for_the_group": {
    "indianEnglish": "A few contenders for the group.",
    "hinglish": "A few contenders for the group."
  },
  "value_sorted": {
    "indianEnglish": "{p1}? Sorted.",
    "hinglish": "{p1}? Sorted."
  },
  "tonight": {
    "indianEnglish": "Tonight",
    "hinglish": "Tonight"
  },
  "voted_closes": {
    "indianEnglish": " voted · closes ",
    "hinglish": " voted · closes "
  },
  "of": {
    "indianEnglish": " of ",
    "hinglish": " of "
  },
  "in_the_spotlight": {
    "indianEnglish": "IN THE SPOTLIGHT",
    "hinglish": "IN THE SPOTLIGHT"
  },
  "trending_this_week": {
    "indianEnglish": "Trending this week",
    "hinglish": "Trending this week"
  },
  "value_you_ll_love": {
    "indianEnglish": "{p1} you’ll love",
    "hinglish": "{p1} you’ll love"
  },
  "already_in_your_corner": {
    "indianEnglish": "ALREADY IN YOUR CORNER",
    "hinglish": "ALREADY IN YOUR CORNER"
  },
  "on_your_services": {
    "indianEnglish": "On your OTT apps",
    "hinglish": "On your OTT apps"
  },
  "free_to_watch": {
    "indianEnglish": "Free to watch",
    "hinglish": "Free to watch"
  },
  "tonight_we_want": {
    "indianEnglish": "Tonight we want…",
    "hinglish": "Tonight we want…"
  },
  "skip_the_kuch_bhi": {
    "indianEnglish": "PICK A MOOD",
    "hinglish": "PICK A MOOD"
  },
  "adjust_my_preferences": {
    "indianEnglish": "Adjust my preferences",
    "hinglish": "Adjust my preferences"
  },
  "no_titles_match_this_mix_of_services_and_languages_yet": {
    "indianEnglish": "No titles match this mix of OTT apps and languages yet.",
    "hinglish": "No titles match this mix of OTT apps and languages yet."
  },
  "no_free_picks_in_your_selected_languages_yet_our_sample_catalog_i": {
    "indianEnglish": "No free picks in your selected languages yet. Our sample catalogue is still small.",
    "hinglish": "No free picks in your selected languages yet. Our sample catalogue is still small."
  },
  "your_next_favourite_is_out_there": {
    "indianEnglish": "Your next favourite is out there.",
    "hinglish": "Your next favourite is out there."
  },
  "next_pick": {
    "indianEnglish": "Next pick",
    "hinglish": "Next pick"
  },
  "show_pick_value_value": {
    "indianEnglish": "Show pick {p1}: {p2}",
    "hinglish": "Show pick {p1}: {p2}"
  },
  "previous_pick": {
    "indianEnglish": "Previous pick",
    "hinglish": "Previous pick"
  },
  "take_a_closer_look": {
    "indianEnglish": "Take a closer look ",
    "hinglish": "Take a closer look "
  },
  "separator": {
    "indianEnglish": " · ",
    "hinglish": " · "
  },
  "a_little_inspiration_to_start": {
    "indianEnglish": "A little inspiration to start",
    "hinglish": "A little inspiration to start"
  },
  "no_subscription_needed": {
    "indianEnglish": "No subscription needed",
    "hinglish": "No subscription needed"
  },
  "value_min": {
    "indianEnglish": "{p1} min",
    "hinglish": "{p1} min"
  },
  "series": {
    "indianEnglish": "Web series",
    "hinglish": "Web series"
  },
  "tonight_s_contender": {
    "indianEnglish": " TONIGHT’S CONTENDER",
    "hinglish": " TONIGHT’S CONTENDER"
  },
  "tonight_s_picks": {
    "indianEnglish": "Tonight’s picks",
    "hinglish": "Tonight’s picks"
  },
  "search_titles": {
    "indianEnglish": "Search titles",
    "hinglish": "Search titles"
  },
  "less_scrolling_more_cinema": {
    "indianEnglish": "LESS SCROLLING. MORE CINEMA.",
    "hinglish": "LESS SCROLLING. MORE CINEMA."
  },
  "edit_your_preferences": {
    "indianEnglish": "Edit your preferences ",
    "hinglish": "Edit your preferences "
  },
  "no_picks_here_just_yet_try_another_language": {
    "indianEnglish": "No picks here just yet. Try another language.",
    "hinglish": "No picks here just yet. Try another language."
  },
  "value_picks_sorted_open_shortlist_to_see_them": {
    "indianEnglish": "{p1} picks sorted. Open Shortlist to see them.",
    "hinglish": "{p1} picks sorted. Open Shortlist to see them."
  },
  "cast": {
    "indianEnglish": "Cast",
    "hinglish": "Cast"
  },
  "director": {
    "indianEnglish": "Director",
    "hinglish": "Director"
  },
  "value_valuevalue_kya_plan_hai": {
    "indianEnglish": "{p1} {p2}{p3}. What shall we watch?",
    "hinglish": "{p1} {p2}{p3}. Kya plan hai?"
  },
  "late_night": {
    "indianEnglish": "late night",
    "hinglish": "late night"
  },
  "on_your_value": {
    "indianEnglish": "On your {p1}",
    "hinglish": "On your {p1}"
  },
  "free_on_value": {
    "indianEnglish": "Free on {p1}",
    "hinglish": "Free on {p1}"
  },
  "no_offer_listed": {
    "indianEnglish": "No offer listed",
    "hinglish": "No offer listed"
  },
  "morning": {
    "indianEnglish": "morning",
    "hinglish": "morning"
  },
  "afternoon": {
    "indianEnglish": "afternoon",
    "hinglish": "afternoon"
  },
  "evening": {
    "indianEnglish": "evening",
    "hinglish": "evening"
  },
  "night": {
    "indianEnglish": "night",
    "hinglish": "night"
  }
} as const;
export const welcomeCopy = {
  "0": {
    "indianEnglish": " / 0",
    "hinglish": " / 0"
  },
  "skip_for_now": {
    "indianEnglish": "Skip for now",
    "hinglish": "Skip for now"
  },
  "continue": {
    "indianEnglish": "Continue",
    "hinglish": "Continue"
  },
  "let_s_make_a_night_of_it": {
    "indianEnglish": "Let’s make a night of it",
    "hinglish": "Let’s make a night of it"
  },
  "save_preferences": {
    "indianEnglish": "Save preferences",
    "hinglish": "Save preferences"
  },
  "your_seat_in_the_group_is_saved": {
    "indianEnglish": "Your seat in the group is saved.",
    "hinglish": "Your seat in the group is saved."
  },
  "no_preference_we_ll_keep_every_language_open": {
    "indianEnglish": "No preference? We’ll keep every language open.",
    "hinglish": "No preference? We’ll keep every language open."
  },
  "value_languages_one_great_night": {
    "indianEnglish": "{p1} languages. One great night.",
    "hinglish": "{p1} languages. One great night."
  },
  "no_subscriptions_you_can_still_explore": {
    "indianEnglish": "No subscriptions? You can still explore.",
    "hinglish": "No subscriptions? You can still explore."
  },
  "value_services_plenty_of_possibilities": {
    "indianEnglish": "{p1} OTT apps. Plenty of possibilities.",
    "hinglish": "{p1} OTT apps. Plenty of possibilities."
  },
  "free_picks_good_nights_zero_subscriptions": {
    "indianEnglish": "Free picks. Good nights. Zero subscriptions.",
    "hinglish": "Free picks. Good nights. Zero subscriptions."
  },
  "just_for_this_device_no_account_no_signup": {
    "indianEnglish": "Just for this device. No account, no signup.",
    "hinglish": "Just for this device. No account, no signup."
  },
  "value_avatar": {
    "indianEnglish": "{p1} avatar",
    "hinglish": "{p1} avatar"
  },
  "choose_your_avatar": {
    "indianEnglish": "Choose your avatar",
    "hinglish": "Choose your avatar"
  },
  "pick_your_little_alter_ego": {
    "indianEnglish": "Choose an avatar",
    "hinglish": "Choose an avatar"
  },
  "what_s_your_movie_night_name": {
    "indianEnglish": "What’s your movie-night name?",
    "hinglish": "What’s your movie-night name?"
  },
  "optional": {
    "indianEnglish": "optional",
    "hinglish": "optional"
  },
  "your_name": {
    "indianEnglish": "Your name ",
    "hinglish": "Your name "
  },
  "good_stories_travel_so_can_your_taste": {
    "indianEnglish": "Good stories travel. So can your taste.",
    "hinglish": "Good stories travel. So can your taste."
  },
  "separator": {
    "indianEnglish": "A good story is worth your time.",
    "hinglish": "A good story is worth your time."
  },
  "none_yet_show_me_free_stuff": {
    "indianEnglish": "Show me free films",
    "hinglish": "Show me free films"
  },
  "phone_plan_and_family_logins_count_too": {
    "indianEnglish": "Phone plan and family logins count too.",
    "hinglish": "Phone plan and family logins count too."
  },
  "a_first_name_a_nickname_your_group_chat_alias_keep_it_you": {
    "indianEnglish": "A first name, a nickname, your group-chat alias. Keep it you.",
    "hinglish": "A first name, a nickname, your group-chat alias. Keep it you."
  },
  "one_language_or_a_whole_mix_there_s_room_for_every_kind_of_movie_": {
    "indianEnglish": "One language or a whole mix. There’s room for every kind of movie night.",
    "hinglish": "One language or a whole mix. There’s room for every kind of movie night."
  },
  "we_ll_bring_the_picks_you_bring_the_subscriptions_choose_as_many_": {
    "indianEnglish": "Choose the OTT apps you can access. You can select more than one.",
    "hinglish": "Choose the OTT apps you can access. You can select more than one."
  },
  "every_group_has_a_main_character": {
    "indianEnglish": "EVERY GROUP HAS A MAIN CHARACTER.",
    "hinglish": "EVERY GROUP HAS A MAIN CHARACTER."
  },
  "great_stories_speak_your_language": {
    "indianEnglish": "GREAT STORIES SPEAK YOUR LANGUAGE.",
    "hinglish": "GREAT STORIES SPEAK YOUR LANGUAGE."
  },
  "your_sofa_your_subscriptions": {
    "indianEnglish": "YOUR OTT APPS. YOUR CHOICE.",
    "hinglish": "YOUR OTT APPS. YOUR CHOICE."
  },
  "setup_progress": {
    "indianEnglish": "Setup progress",
    "hinglish": "Setup progress"
  },
  "0_2": {
    "indianEnglish": "0",
    "hinglish": "0"
  },
  "cancel": {
    "indianEnglish": "Cancel",
    "hinglish": "Cancel"
  },
  "previous_step": {
    "indianEnglish": "Previous step",
    "hinglish": "Previous step"
  },
  "your_people_your_picks_your_night": {
    "indianEnglish": "Your people. Your picks. Your night.",
    "hinglish": "Your people. Your picks. Your night."
  },
  "the_good_part_starts_now": {
    "indianEnglish": "THE GOOD PART STARTS NOW",
    "hinglish": "THE GOOD PART STARTS NOW"
  },
  "opening_tonight": {
    "indianEnglish": "Opening tonight",
    "hinglish": "Opening tonight"
  },
  "what_should_friends_call_you": {
    "indianEnglish": "What should friends call you?",
    "hinglish": "What should friends call you?"
  },
  "what_do_you_watch_in": {
    "indianEnglish": "Which languages do you watch in?",
    "hinglish": "Which languages do you watch in?"
  },
  "which_apps_do_you_pay_for": {
    "indianEnglish": "Which OTT apps do you use?",
    "hinglish": "Which OTT apps do you use?"
  },
  "ready_title": {
    "indianEnglish": "Ready. Let’s choose a film.",
    "hinglish": "Ready. Chalo, kya dekhein?"
  }
} as const;
export const pollCreateCopy = {
  "creating_poll": {
    "indianEnglish": "Creating poll",
    "hinglish": "Creating poll"
  },
  "copy_link": {
    "indianEnglish": "Copy link",
    "hinglish": "Copy link"
  },
  "send_to_whatsapp": {
    "indianEnglish": "Send to WhatsApp",
    "hinglish": "Send to WhatsApp"
  },
  "creating_your_poll": {
    "indianEnglish": "Creating your poll…",
    "hinglish": "Creating your poll…"
  },
  "local_demo_mode_votes_sync_across_tabs_on_this_device_only": {
    "indianEnglish": "Local demo mode: votes sync across tabs on this device only.",
    "hinglish": "Local demo mode: votes sync across tabs on this device only."
  },
  "friends_can_vote_from_any_phone_using_the_shared_link_use_a_publi": {
    "indianEnglish": "Share the link with your group. Friends can vote on their phones without signing up.",
    "hinglish": "Share the link with your group. Friends can vote on their phones without signing up."
  },
  "thumbs_up_or_down_no_app_no_signup": {
    "indianEnglish": "Thumbs up or down. No app. No signup.",
    "hinglish": "Thumbs up or down. No app. No signup."
  },
  "choose_a_deadline": {
    "indianEnglish": "Choose a deadline",
    "hinglish": "Choose a deadline"
  },
  "closes_value": {
    "indianEnglish": "Closes {p1}",
    "hinglish": "Closes {p1}"
  },
  "movie_night": {
    "indianEnglish": "Movie night",
    "hinglish": "Movie night"
  },
  "your_group": {
    "indianEnglish": "Your group",
    "hinglish": "Your group"
  },
  "your_friends_will_see": {
    "indianEnglish": "YOUR FRIENDS WILL SEE",
    "hinglish": "YOUR FRIENDS WILL SEE"
  },
  "live_voter_preview": {
    "indianEnglish": "Live voter preview",
    "hinglish": "Live voter preview"
  },
  "snacks_are_sorted_you_choose_the_film": {
    "indianEnglish": "Let’s choose a film everyone wants to watch.",
    "hinglish": "Let’s choose a film everyone wants to watch."
  },
  "optional": {
    "indianEnglish": "(optional)",
    "hinglish": "(optional)"
  },
  "a_little_note": {
    "indianEnglish": "A little note ",
    "hinglish": "A little note "
  },
  "choose_a_time_that_s_still_ahead_of_us": {
    "indianEnglish": "Choose a time that’s still ahead of us.",
    "hinglish": "Choose a time that’s still ahead of us."
  },
  "custom_deadline": {
    "indianEnglish": "Custom deadline",
    "hinglish": "Custom deadline"
  },
  "custom": {
    "indianEnglish": "Custom",
    "hinglish": "Custom"
  },
  "tonight_9_pm": {
    "indianEnglish": "Tonight 9 pm",
    "hinglish": "Tonight 9 pm"
  },
  "1_hr": {
    "indianEnglish": "1 hr",
    "hinglish": "1 hr"
  },
  "30_min": {
    "indianEnglish": "30 min",
    "hinglish": "30 min"
  },
  "when_do_we_decide": {
    "indianEnglish": "When do we decide?",
    "hinglish": "When do we decide?"
  },
  "poll_name": {
    "indianEnglish": "Poll name",
    "hinglish": "Poll name"
  },
  "your_name_so_friends_know_who_s_asking": {
    "indianEnglish": "Your name, so friends know who’s asking",
    "hinglish": "Your name, so friends know who’s asking"
  },
  "flatmates_college_gang": {
    "indianEnglish": "Flatmates, College gang",
    "hinglish": "Flatmates, College gang"
  },
  "which_group_is_this_for": {
    "indianEnglish": "Which group is this for?",
    "hinglish": "Which group is this for?"
  },
  "find_tonight_s_picks": {
    "indianEnglish": "Find tonight’s picks",
    "hinglish": "Find tonight’s picks"
  },
  "add_2_4_catalog_titles_to_your_shortlist": {
    "indianEnglish": "Add 2–4 catalogue titles to your shortlist.",
    "hinglish": "Add 2–4 catalogue titles to your shortlist."
  },
  "start_with_two_good_options": {
    "indianEnglish": "Start with two good options.",
    "hinglish": "Start with two good options."
  },
  "your_picks_their_vote_sorted": {
    "indianEnglish": "Your picks. Your group’s vote.",
    "hinglish": "Your picks. Your group’s vote. Bas, sorted."
  },
  "ask_the_group": {
    "indianEnglish": "Ask the group.",
    "hinglish": "Ask the group."
  },
  "less_debate_more_movie": {
    "indianEnglish": "LESS DEBATE. MORE MOVIE.",
    "hinglish": "LESS DEBATE. MORE MOVIE."
  },
  "tonight": {
    "indianEnglish": " Tonight",
    "hinglish": " Tonight"
  },
  "could_not_create_this_poll_try_again": {
    "indianEnglish": "Could not create this poll. Try again.",
    "hinglish": "Could not create this poll. Try again."
  },
  "value_vote_for_tonight_s_picture_value": {
    "indianEnglish": "{p1}, vote for tonight’s picture 🎬 {p2}",
    "hinglish": "{p1}, vote for tonight’s picture 🎬 {p2}"
  },
  "give_the_poll_a_name_and_a_future_deadline": {
    "indianEnglish": "Give the poll a name and a future deadline.",
    "hinglish": "Give the poll a name and a future deadline."
  },
  "your_name_helps_friends_know_who_s_asking": {
    "indianEnglish": "Your name helps friends know who’s asking.",
    "hinglish": "Your name helps friends know who’s asking."
  },
  "enter_a_group_name_before_creating_the_poll": {
    "indianEnglish": "Enter a group name before creating the poll.",
    "hinglish": "Enter a group name before creating the poll."
  },
  "value_movie_night": {
    "indianEnglish": "{p1} movie night",
    "hinglish": "{p1} movie night"
  }
} as const;
export const voterCopy = {
  "80": {
    "indianEnglish": "/80",
    "hinglish": "/80"
  },
  "not_now": {
    "indianEnglish": "Not now",
    "hinglish": "Not now"
  },
  "save_my_vote": {
    "indianEnglish": "Save my vote",
    "hinglish": "Save my vote"
  },
  "first_name": {
    "indianEnglish": "First name",
    "hinglish": "First name"
  },
  "no_signup_so_friends_know_it_s_you": {
    "indianEnglish": "No signup. So friends know it’s you.",
    "hinglish": "No signup. So friends know it’s you."
  },
  "who_s_joining_tonight": {
    "indianEnglish": "Who’s joining tonight?",
    "hinglish": "Who’s joining tonight?"
  },
  "just_your_first_name": {
    "indianEnglish": "JUST YOUR FIRST NAME",
    "hinglish": "JUST YOUR FIRST NAME"
  },
  "local_demo_mode_votes_sync_across_tabs_on_this_browser_only_creat": {
    "indianEnglish": "Local demo mode: votes sync across tabs on this browser only. Creator controls use this browser’s local identity.",
    "hinglish": "Local demo mode: votes sync across tabs on this browser only. Creator controls use this browser’s local identity."
  },
  "votes_sync_across_devices_keep_this_browser_s_storage_to_retain_y": {
    "indianEnglish": "Votes sync across devices. Keep this browser’s storage to retain your votes and creator controls. No account needed.",
    "hinglish": "Votes sync across devices. Keep this browser’s storage to retain your votes and creator controls. No account needed."
  },
  "about_this_prototype": {
    "indianEnglish": "About this prototype",
    "hinglish": "About this prototype"
  },
  "ratings_tmdb_this_product_is_not_endorsed_or_certified_by_tmdb_av": {
    "indianEnglish": "Ratings: TMDb. This product is not endorsed or certified by TMDb. Availability is illustrative.",
    "hinglish": "Ratings: TMDb. This product is not endorsed or certified by TMDb. Availability is illustrative."
  },
  "get_the_app": {
    "indianEnglish": "Get the app",
    "hinglish": "Get the app"
  },
  "see_results": {
    "indianEnglish": "See results ",
    "hinglish": "See results "
  },
  "simulate_friends": {
    "indianEnglish": "Simulate friends",
    "hinglish": "Simulate friends"
  },
  "friends_are_voting": {
    "indianEnglish": "Friends are voting…",
    "hinglish": "Friends are voting…"
  },
  "separator": {
    "indianEnglish": " · ",
    "hinglish": " · "
  },
  "your_group": {
    "indianEnglish": "Your group",
    "hinglish": "Your group"
  },
  "separator_2": {
    "indianEnglish": "”",
    "hinglish": "”"
  },
  "separator_3": {
    "indianEnglish": "“",
    "hinglish": "“"
  },
  "show_the_winner": {
    "indianEnglish": "Show the winner",
    "hinglish": "Show the winner"
  },
  "tonight": {
    "indianEnglish": "Tonight: ",
    "hinglish": "Tonight: "
  },
  "pick_another_night": {
    "indianEnglish": "Pick another night",
    "hinglish": "Pick another night"
  },
  "no_winner_to_call_start_a_fresh_night": {
    "indianEnglish": "No winner to call. Start a fresh night?",
    "hinglish": "No winner to call. Start a fresh night?"
  },
  "no_votes_this_time": {
    "indianEnglish": "No votes this time.",
    "hinglish": "No votes this time."
  },
  "done": {
    "indianEnglish": "Done",
    "hinglish": "Done"
  },
  "voted": {
    "indianEnglish": " voted",
    "hinglish": " voted"
  },
  "of": {
    "indianEnglish": " of ",
    "hinglish": " of "
  },
  "send": {
    "indianEnglish": "Send",
    "hinglish": "Send"
  },
  "seen_it_total_paisa_vasool": {
    "indianEnglish": "Seen it. Worth watching together.",
    "hinglish": "Seen it. Total paisa vasool."
  },
  "optional": {
    "indianEnglish": "(optional)",
    "hinglish": "(optional)"
  },
  "any_thoughts": {
    "indianEnglish": "Any thoughts? ",
    "hinglish": "Any thoughts? "
  },
  "thumbs_down_value": {
    "indianEnglish": "Thumbs down {p1}",
    "hinglish": "Thumbs down {p1}"
  },
  "thumbs_up_value": {
    "indianEnglish": "Thumbs up {p1}",
    "hinglish": "Thumbs up {p1}"
  },
  "tmdb": {
    "indianEnglish": "TMDb",
    "hinglish": "TMDb"
  },
  "provider_unlisted": {
    "indianEnglish": "Provider unlisted",
    "hinglish": "Provider unlisted"
  },
  "on_value": {
    "indianEnglish": "on {p1}",
    "hinglish": "on {p1}"
  },
  "call_it": {
    "indianEnglish": "Call it",
    "hinglish": "Call it"
  },
  "copy_voting_link": {
    "indianEnglish": "Copy voting link",
    "hinglish": "Copy voting link"
  },
  "open_voter_view_and_copy_the_address": {
    "indianEnglish": "Open voter view and copy the address.",
    "hinglish": "Open voter view and copy the address."
  },
  "voting_link_copied": {
    "indianEnglish": "Voting link copied.",
    "hinglish": "Voting link copied."
  },
  "open_voter_view": {
    "indianEnglish": "Open voter view",
    "hinglish": "Open voter view"
  },
  "most_up_minus_down_wins_ties_go_to_the_higher_tmdb_rating": {
    "indianEnglish": "Most up minus down wins. Ties go to the higher TMDb rating.",
    "hinglish": "Most up minus down wins. Ties go to the higher TMDb rating."
  },
  "who_voted": {
    "indianEnglish": "Who voted",
    "hinglish": "Who voted"
  },
  "net": {
    "indianEnglish": "Net ",
    "hinglish": "Net "
  },
  "down": {
    "indianEnglish": " down",
    "hinglish": " down"
  },
  "up": {
    "indianEnglish": " up · ",
    "hinglish": " up · "
  },
  "waiting_for_votes": {
    "indianEnglish": "Waiting for votes…",
    "hinglish": "Waiting for votes…"
  },
  "the_race_is_on": {
    "indianEnglish": "The race is on",
    "hinglish": "The race is on"
  },
  "the_group_has_spoken": {
    "indianEnglish": "The group has spoken",
    "hinglish": "The group has spoken"
  },
  "live_tally": {
    "indianEnglish": "Live tally",
    "hinglish": "Live tally"
  },
  "thumbs_up_for_yes_down_for_not_tonight": {
    "indianEnglish": "Thumbs up for yes. Down for not tonight.",
    "hinglish": "Thumbs up for yes. Down for not tonight."
  },
  "value_wants_to_watch_something_vote": {
    "indianEnglish": "{p1} wants to watch something. Vote!",
    "hinglish": "{p1} wants to watch something. Vote!"
  },
  "a_friend": {
    "indianEnglish": "A friend",
    "hinglish": "A friend"
  },
  "value_s_group_movie_night": {
    "indianEnglish": "{p1}’s group movie night",
    "hinglish": "{p1}’s group movie night"
  },
  "checking_time": {
    "indianEnglish": "Checking time…",
    "hinglish": "Checking time…"
  },
  "voting_closed": {
    "indianEnglish": "Voting closed",
    "hinglish": "Voting closed"
  },
  "separator_4": {
    "indianEnglish": ".",
    "hinglish": "."
  },
  "value_home": {
    "indianEnglish": "{p1} home",
    "hinglish": "{p1} home"
  },
  "voting_closed_before_the_demo_finished": {
    "indianEnglish": "Voting closed before the demo finished.",
    "hinglish": "Voting closed before the demo finished."
  },
  "great_cast_let_s_watch_together": {
    "indianEnglish": "Great cast. Let’s watch together.",
    "hinglish": "Great cast. Let’s watch together."
  },
  "arjun": {
    "indianEnglish": "Arjun",
    "hinglish": "Arjun"
  },
  "this_gets_my_double_yes": {
    "indianEnglish": "This gets my double yes.",
    "hinglish": "This gets my double yes."
  },
  "meera": {
    "indianEnglish": "Meera",
    "hinglish": "Meera"
  },
  "perfect_for_tonight_snacks_on_me": {
    "indianEnglish": "A good choice for tonight.",
    "hinglish": "A good choice for tonight."
  },
  "kabir": {
    "indianEnglish": "Kabir",
    "hinglish": "Kabir"
  },
  "riya": {
    "indianEnglish": "Riya",
    "hinglish": "Riya"
  },
  "could_not_close_this_poll": {
    "indianEnglish": "Could not close this poll.",
    "hinglish": "Could not close this poll."
  },
  "could_not_save_try_again": {
    "indianEnglish": "Could not save. Try again.",
    "hinglish": "Could not save. Try again."
  },
  "vote_saved": {
    "indianEnglish": "Vote saved.",
    "hinglish": "Vote saved."
  },
  "could_not_send_try_again": {
    "indianEnglish": "Could not send. Try again.",
    "hinglish": "Could not send. Try again."
  },
  "thoughts_sent": {
    "indianEnglish": "Thoughts sent.",
    "hinglish": "Thoughts sent."
  },
  "find_tonight_s_picks": {
    "indianEnglish": "Find tonight’s picks",
    "hinglish": "Find tonight’s picks"
  },
  "try_again": {
    "indianEnglish": "Try again",
    "hinglish": "Try again"
  },
  "that_poll_doesn_t_exist_here_ask_your_friend_for_the_latest_link_": {
    "indianEnglish": "That poll doesn’t exist here. Ask your friend for the latest link, or start a fresh movie night.",
    "hinglish": "That poll doesn’t exist here. Ask your friend for the latest link, or start a fresh movie night."
  },
  "we_couldn_t_load_this_poll_check_your_connection_and_try_again": {
    "indianEnglish": "We couldn’t load this poll. Check your connection and try again.",
    "hinglish": "We couldn’t load this poll. Check your connection and try again."
  },
  "this_night_is_off_the_reel": {
    "indianEnglish": "This night is off the reel.",
    "hinglish": "This night is off the reel."
  },
  "a_little_intermission": {
    "indianEnglish": "A little intermission.",
    "hinglish": "A little intermission."
  },
  "loading_movie_night": {
    "indianEnglish": "Loading movie night",
    "hinglish": "Loading movie night"
  },
  "this_poll_could_not_be_saved_check_browser_storage": {
    "indianEnglish": "This poll could not be saved. Check browser storage.",
    "hinglish": "This poll could not be saved. Check browser storage."
  },
  "allow_browser_storage_to_vote_in_this_prototype": {
    "indianEnglish": "Allow browser storage to vote in this prototype.",
    "hinglish": "Allow browser storage to vote in this prototype."
  },
  "vote_in_10_seconds_no_app_needed": {
    "indianEnglish": "Vote in 10 seconds, no app needed",
    "hinglish": "Vote in 10 seconds, no app needed"
  },
  "movie_night": {
    "indianEnglish": "Movie night",
    "hinglish": "Movie night"
  },
  "movie_night_on_value": {
    "indianEnglish": "Movie night on {p1}",
    "hinglish": "Movie night on {p1}"
  },
  "movie_night_results": {
    "indianEnglish": "Movie night results",
    "hinglish": "Movie night results"
  },
  "back_to_tonight": {
    "indianEnglish": "Back to tonight",
    "hinglish": "Back to tonight"
  },
  "the_movie_night_couldn_t_load_check_your_connection_and_give_it_a": {
    "indianEnglish": "The movie night couldn’t load. Check your connection and give it another take.",
    "hinglish": "The movie night couldn’t load. Check your connection and give it another take."
  },
  "separator_5": {
    "indianEnglish": "↻",
    "hinglish": "↻"
  }
} as const;
export const artworkCopy = {
  "on_your_value": {
    "indianEnglish": "On your {p1}",
    "hinglish": "On your {p1}"
  },
  "tonight": {
    "indianEnglish": "TONIGHT",
    "hinglish": "TONIGHT"
  },
  "separator": {
    "indianEnglish": " · ",
    "hinglish": " · "
  },
  "s1": {
    "indianEnglish": "S1",
    "hinglish": "S1"
  },
  "s1_svalue": {
    "indianEnglish": "S1–S{p1}",
    "hinglish": "S1–S{p1}"
  },
  "series": {
    "indianEnglish": "WEB SERIES · ",
    "hinglish": "WEB SERIES · "
  },
  "cinema": {
    "indianEnglish": "CINEMA",
    "hinglish": "CINEMA"
  },
  "value_generated_valuevalue": {
    "indianEnglish": "{p1} · generated {p2}{p3}",
    "hinglish": "{p1} · generated {p2}{p3}"
  },
  "on_your_value_2": {
    "indianEnglish": " · On your {p1}",
    "hinglish": " · On your {p1}"
  }
} as const;
export const profileCopy = {
  "clear_local_data": {
    "indianEnglish": "Clear local data",
    "hinglish": "Clear local data"
  },
  "keep_my_movie_nights": {
    "indianEnglish": "Keep my movie nights",
    "hinglish": "Keep my movie nights"
  },
  "this_clears_your_local_data_and_device_identity_shared_polls_stay": {
    "indianEnglish": "This clears your local data and device identity. Shared polls stay online, but this device will lose their creator controls and its existing votes. This can’t be undone.",
    "hinglish": "This clears your local data and device identity. Shared polls stay online, but this device will lose their creator controls and its existing votes. This can’t be undone."
  },
  "start_fresh_on_this_device": {
    "indianEnglish": "Start fresh on this device?",
    "hinglish": "Start fresh on this device?"
  },
  "reset_prototype": {
    "indianEnglish": "Reset prototype",
    "hinglish": "Reset prototype"
  },
  "clear_this_device_s_profile_saved_picks_searches_and_local_polls": {
    "indianEnglish": "Clear this device’s profile, saved picks, searches and local polls.",
    "hinglish": "Clear this device’s profile, saved picks, searches and local polls."
  },
  "a_fresh_start": {
    "indianEnglish": "A fresh start?",
    "hinglish": "A fresh start?"
  },
  "allow_session_storage_to_switch_brands": {
    "indianEnglish": "Allow session storage to switch brands.",
    "hinglish": "Allow session storage to switch brands."
  },
  "welcome_to_value": {
    "indianEnglish": "Welcome to {p1}.",
    "hinglish": "Welcome to {p1}."
  },
  "tester_session_brand": {
    "indianEnglish": "Tester session brand",
    "hinglish": "Tester session brand"
  },
  "same_movie_nights_a_different_brand_for_this_tester_tab": {
    "indianEnglish": "Same movie nights. A different brand for this tester tab.",
    "hinglish": "Same movie nights. A different brand for this tester tab."
  },
  "try_a_different_name": {
    "indianEnglish": "Try a different name",
    "hinglish": "Try a different name"
  },
  "plan_a_movie_night": {
    "indianEnglish": "Plan a movie night ",
    "hinglish": "Plan a movie night "
  },
  "shortlist_a_couple_of_titles_then_ask_the_group_your_movie_nights": {
    "indianEnglish": "Shortlist a couple of titles, then ask the group. Your movie nights will live here.",
    "hinglish": "Shortlist a couple of titles, then ask the group. Your movie nights will live here."
  },
  "your_people_one_great_pick": {
    "indianEnglish": "Your people. One great pick.",
    "hinglish": "Your people. One great pick."
  },
  "finished": {
    "indianEnglish": "Finished",
    "hinglish": "Finished"
  },
  "open": {
    "indianEnglish": "Open",
    "hinglish": "Open"
  },
  "movie_nights": {
    "indianEnglish": "movie nights",
    "hinglish": "movie nights"
  },
  "movie_night": {
    "indianEnglish": "movie night",
    "hinglish": "movie night"
  },
  "earlier_movie_nights": {
    "indianEnglish": "Earlier movie nights",
    "hinglish": "Earlier movie nights"
  },
  "loading_your_polls": {
    "indianEnglish": "Loading your polls",
    "hinglish": "Loading your polls"
  },
  "try_again": {
    "indianEnglish": "Try again",
    "hinglish": "Try again"
  },
  "a_little_intermission": {
    "indianEnglish": "A little intermission.",
    "hinglish": "A little intermission."
  },
  "my_polls": {
    "indianEnglish": "My polls",
    "hinglish": "My polls"
  },
  "find_a_favourite": {
    "indianEnglish": "Find a favourite ",
    "hinglish": "Find a favourite "
  },
  "save_a_title_when_it_catches_your_eye_it_ll_be_waiting_here": {
    "indianEnglish": "Save a title when it catches your eye. It’ll be waiting here.",
    "hinglish": "Save a title when it catches your eye. It’ll be waiting here."
  },
  "for_another_good_night": {
    "indianEnglish": "For another good night.",
    "hinglish": "For another good night."
  },
  "remove": {
    "indianEnglish": "Remove",
    "hinglish": "Remove"
  },
  "remove_value_from_watchlist": {
    "indianEnglish": "Remove {p1} from watchlist",
    "hinglish": "Remove {p1} from watchlist"
  },
  "watchlist": {
    "indianEnglish": "Watchlist ",
    "hinglish": "Watchlist "
  },
  "edit_services_languages": {
    "indianEnglish": "Edit OTT apps & languages ",
    "hinglish": "Edit OTT apps & languages "
  },
  "any_language_let_the_story_decide": {
    "indianEnglish": "Any language. Let the story decide.",
    "hinglish": "Any language. Let the story decide."
  },
  "my_languages": {
    "indianEnglish": "My languages",
    "hinglish": "My languages"
  },
  "no_subscriptions_selected_all_doors_open": {
    "indianEnglish": "No subscriptions selected. All doors open.",
    "hinglish": "No subscriptions selected. All doors open."
  },
  "free_picks_only_no_subscription_needed": {
    "indianEnglish": "Free picks only. No subscription needed.",
    "hinglish": "Free picks only. No subscription needed."
  },
  "my_services": {
    "indianEnglish": "My OTT apps",
    "hinglish": "My OTT apps"
  },
  "save_profile": {
    "indianEnglish": "Save profile",
    "hinglish": "Save profile"
  },
  "value_avatar": {
    "indianEnglish": "{p1} avatar",
    "hinglish": "{p1} avatar"
  },
  "choose_your_avatar": {
    "indianEnglish": "Choose your avatar",
    "hinglish": "Choose your avatar"
  },
  "what_should_friends_call_you": {
    "indianEnglish": "What should friends call you?",
    "hinglish": "What should friends call you?"
  },
  "looking_good_profile_saved": {
    "indianEnglish": "Looking good. Profile saved.",
    "hinglish": "Looking good. Profile saved."
  },
  "edit_name_avatar": {
    "indianEnglish": "Edit name & avatar",
    "hinglish": "Edit name & avatar"
  },
  "cancel_editing": {
    "indianEnglish": "Cancel editing",
    "hinglish": "Cancel editing"
  },
  "good_company_great_taste": {
    "indianEnglish": "Good company. Great taste.",
    "hinglish": "Good company. Great taste."
  },
  "separator": {
    "indianEnglish": ".",
    "hinglish": "."
  },
  "your_movie_nights": {
    "indianEnglish": "Your movie nights",
    "hinglish": "Your movie nights"
  },
  "your_little_cinema_corner": {
    "indianEnglish": "YOUR FILM CORNER",
    "hinglish": "APNA FILM CORNER"
  },
  "your_first_shared_pick_belongs_here": {
    "indianEnglish": "Your first shared pick belongs here.",
    "hinglish": "Your first shared pick belongs here."
  },
  "no_plans_in_motion_start_something_good": {
    "indianEnglish": "No plans in motion. Start something good.",
    "hinglish": "No plans in motion. Start something good."
  },
  "closes_value": {
    "indianEnglish": "Closes {p1}",
    "hinglish": "Closes {p1}"
  },
  "value_value_voted": {
    "indianEnglish": "{p1} {p2} voted",
    "hinglish": "{p1} {p2} voted"
  },
  "friends_have": {
    "indianEnglish": "friends have",
    "hinglish": "friends have"
  },
  "friend_has": {
    "indianEnglish": "friend has",
    "hinglish": "friend has"
  },
  "no_votes_this_time_another_night_awaits": {
    "indianEnglish": "No votes this time. Another night awaits.",
    "hinglish": "No votes this time. Another night awaits."
  },
  "tonight_value": {
    "indianEnglish": "Tonight: {p1}",
    "hinglish": "Tonight: {p1}"
  },
  "browser_storage_couldn_t_be_cleared_please_try_again": {
    "indianEnglish": "Browser storage couldn’t be cleared. Please try again.",
    "hinglish": "Browser storage couldn’t be cleared. Please try again."
  },
  "your_movie_nights_couldn_t_load_check_your_connection_and_try_aga": {
    "indianEnglish": "Your movie nights couldn’t load. Check your connection and try again.",
    "hinglish": "Your movie nights couldn’t load. Check your connection and try again."
  },
  "local_demo_mode": {
    "indianEnglish": "local demo mode",
    "hinglish": "local demo mode"
  },
  "avatar_sunset": {
    "indianEnglish": "Sunset",
    "hinglish": "Sunset"
  },
  "avatar_lagoon": {
    "indianEnglish": "Lagoon",
    "hinglish": "Lagoon"
  },
  "avatar_berry": {
    "indianEnglish": "Berry",
    "hinglish": "Berry"
  },
  "avatar_amber": {
    "indianEnglish": "Amber",
    "hinglish": "Amber"
  },
  "avatar_midnight": {
    "indianEnglish": "Midnight",
    "hinglish": "Midnight"
  },
  "avatar_forest": {
    "indianEnglish": "Forest",
    "hinglish": "Forest"
  },
  "avatar_rose": {
    "indianEnglish": "Rose",
    "hinglish": "Rose"
  },
  "avatar_violet": {
    "indianEnglish": "Violet",
    "hinglish": "Violet"
  },
  "group_summary": {
    "indianEnglish": "{group} · {count} {nights} · last: {winner}",
    "hinglish": "{group} · {count} {nights} · last: {winner}"
  },
  "no_winner_yet": {
    "indianEnglish": "No winner yet",
    "hinglish": "No winner yet"
  }
} as const;
export const searchCopy = {
  "provider_availability_is_illustrative_rentals_are_never_labelled_": {
    "indianEnglish": "Provider availability is illustrative. Rentals are never labelled as included in your subscription.",
    "hinglish": "Provider availability is illustrative. Rentals are never labelled as included in your subscription."
  },
  "panchayat": {
    "indianEnglish": "Panchayat",
    "hinglish": "Panchayat"
  },
  "jersey": {
    "indianEnglish": "Jersey",
    "hinglish": "Jersey"
  },
  "try": {
    "indianEnglish": "Try ",
    "hinglish": "Try "
  },
  "try_a_shorter_spelling_or_a_familiar_face": {
    "indianEnglish": ". Try a shorter spelling or a familiar face.",
    "hinglish": ". Try a shorter spelling or a familiar face."
  },
  "in_this_small_catalog": {
    "indianEnglish": " in this small catalogue",
    "hinglish": " in this small catalogue"
  },
  "among_our_free_picks": {
    "indianEnglish": " among our free picks",
    "hinglish": " among our free picks"
  },
  "separator": {
    "indianEnglish": "”",
    "hinglish": "”"
  },
  "no_match_for": {
    "indianEnglish": "No match for “",
    "hinglish": "No match for “"
  },
  "picture_abhi_baaki_hai": {
    "indianEnglish": "Your next favourite is still out there.",
    "hinglish": "Your next favourite is still out there."
  },
  "in_the_catalog": {
    "indianEnglish": " in the catalogue",
    "hinglish": " in the catalogue"
  },
  "separator_2": {
    "indianEnglish": " · ",
    "hinglish": " · "
  },
  "people": {
    "indianEnglish": "People",
    "hinglish": "People"
  },
  "series": {
    "indianEnglish": "Web series",
    "hinglish": "Web series"
  },
  "film": {
    "indianEnglish": "Film",
    "hinglish": "Film"
  },
  "titles": {
    "indianEnglish": "Titles",
    "hinglish": "Titles"
  },
  "people_2": {
    "indianEnglish": " people",
    "hinglish": " people"
  },
  "titles_2": {
    "indianEnglish": " titles · ",
    "hinglish": " titles · "
  },
  "searching": {
    "indianEnglish": "Searching",
    "hinglish": "Searching"
  },
  "try_panchayat": {
    "indianEnglish": "Try Panchayat",
    "hinglish": "Try Panchayat"
  },
  "search_didn_t_load_try_another_title": {
    "indianEnglish": "Search didn’t load. Try another title.",
    "hinglish": "Search didn’t load. Try another title."
  },
  "a_little_intermission": {
    "indianEnglish": "A little intermission.",
    "hinglish": "A little intermission."
  },
  "manjummel_boys": {
    "indianEnglish": "Manjummel Boys",
    "hinglish": "Manjummel Boys"
  },
  "jailer": {
    "indianEnglish": "Jailer",
    "hinglish": "Jailer"
  },
  "try_panchayat_jailer_manjummel_boys": {
    "indianEnglish": "Try: Panchayat, Jailer, Manjummel Boys",
    "hinglish": "Try: Panchayat, Jailer, Manjummel Boys"
  },
  "start_with_a_favourite": {
    "indianEnglish": "Start with a favourite.",
    "hinglish": "Start with a favourite."
  },
  "your_next_rabbit_hole_starts_here": {
    "indianEnglish": "Search for a film, web series or favourite actor.",
    "hinglish": "Search for a film, web series or favourite actor."
  },
  "clear_history": {
    "indianEnglish": "Clear history",
    "hinglish": "Clear history"
  },
  "recent_searches": {
    "indianEnglish": "Recent searches",
    "hinglish": "Recent searches"
  },
  "edit_preferences": {
    "indianEnglish": "Edit preferences",
    "hinglish": "Edit preferences"
  },
  "free_picks_only": {
    "indianEnglish": "Free picks only · ",
    "hinglish": "Free picks only · "
  },
  "clear_search": {
    "indianEnglish": "Clear search",
    "hinglish": "Clear search"
  },
  "films_shows_people": {
    "indianEnglish": "Films, web series, actors…",
    "hinglish": "Films, web series, actors…"
  },
  "search_titles_or_people": {
    "indianEnglish": "Search titles or people",
    "hinglish": "Search titles or people"
  },
  "a_title_a_familiar_face_a_little_inspiration": {
    "indianEnglish": "A title, a familiar face, a little inspiration.",
    "hinglish": "A title, a familiar face, a little inspiration."
  },
  "separator_3": {
    "indianEnglish": "?",
    "hinglish": "?"
  },
  "kya_dekhein": {
    "indianEnglish": "What shall we watch",
    "hinglish": "Kya dekhein"
  },
  "one_good_film_leads_to_another": {
    "indianEnglish": "ONE GOOD FILM LEADS TO ANOTHER",
    "hinglish": "ONE GOOD FILM LEADS TO ANOTHER"
  }
} as const;
export const resultsCopy = {
  "show_result": {
    "indianEnglish": "Show result",
    "hinglish": "Show result"
  },
  "separator": {
    "indianEnglish": ".",
    "hinglish": "."
  },
  "a_shared_snapshot_of": {
    "indianEnglish": "A shared snapshot of ",
    "hinglish": "A shared snapshot of "
  },
  "tonight": {
    "indianEnglish": "Tonight: ",
    "hinglish": "Tonight: "
  },
  "that_result_is_unavailable": {
    "indianEnglish": "That result is unavailable.",
    "hinglish": "That result is unavailable."
  },
  "down": {
    "indianEnglish": " down",
    "hinglish": " down"
  },
  "up": {
    "indianEnglish": " up · ",
    "hinglish": " up · "
  },
  "the_other_contenders": {
    "indianEnglish": "The other contenders",
    "hinglish": "The other contenders"
  },
  "whatsapp_shares_the_link_attach_a_downloaded_image_if_you_want_th": {
    "indianEnglish": "WhatsApp shares the link. Attach a downloaded image if you want the card too.",
    "hinglish": "WhatsApp shares the link. Attach a downloaded image if you want the card too."
  },
  "share_result_on_whatsapp": {
    "indianEnglish": "Share result on WhatsApp",
    "hinglish": "Share result on WhatsApp"
  },
  "download_1080_1920_story": {
    "indianEnglish": "Download 1080×1920 story",
    "hinglish": "Download 1080×1920 story"
  },
  "download_1200_630": {
    "indianEnglish": "Download 1200×630",
    "hinglish": "Download 1200×630"
  },
  "share_result": {
    "indianEnglish": "Share result",
    "hinglish": "Share result"
  },
  "making_your_cards": {
    "indianEnglish": "Making your cards…",
    "hinglish": "Making your cards…"
  },
  "separator_2": {
    "indianEnglish": "”",
    "hinglish": "”"
  },
  "separator_3": {
    "indianEnglish": "“",
    "hinglish": "“"
  },
  "your_group": {
    "indianEnglish": "Your group",
    "hinglish": "Your group"
  },
  "separate_payment_may_apply": {
    "indianEnglish": " Separate payment may apply.",
    "hinglish": " Separate payment may apply."
  },
  "availability_is_illustrative": {
    "indianEnglish": "Availability is illustrative.",
    "hinglish": "Availability is illustrative."
  },
  "watch_on": {
    "indianEnglish": "Watch on ",
    "hinglish": "Watch on "
  },
  "tonight_2": {
    "indianEnglish": "Tonight:",
    "hinglish": "Tonight:"
  },
  "the_group_has_spoken": {
    "indianEnglish": "THE GROUP HAS SPOKEN",
    "hinglish": "THE GROUP HAS SPOKEN"
  },
  "and_tonight_goes_to": {
    "indianEnglish": "And tonight goes to…",
    "hinglish": "And tonight goes to…"
  },
  "close_winner_reveal": {
    "indianEnglish": "Close winner reveal",
    "hinglish": "Close winner reveal"
  },
  "tonight_value": {
    "indianEnglish": "Tonight: {p1}",
    "hinglish": "Tonight: {p1}"
  },
  "cards_ready_below_tap_share_result_again_to_open_your_share_sheet": {
    "indianEnglish": "Cards ready below. Tap Share result again to open your share sheet.",
    "hinglish": "Cards ready below. Tap Share result again to open your share sheet."
  },
  "cards_ready_download_a_size_or_share_the_result_link_on_whatsapp": {
    "indianEnglish": "Cards ready. Download a size, or share the result link on WhatsApp.",
    "hinglish": "Cards ready. Download a size, or share the result link on WhatsApp."
  },
  "value_the_group_has_decided": {
    "indianEnglish": "{p1} — the group has decided.",
    "hinglish": "{p1} — the group has decided."
  },
  "could_not_render_the_cards_please_try_again": {
    "indianEnglish": "Could not render the cards. Please try again.",
    "hinglish": "Could not render the cards. Please try again."
  },
  "value_of_value_said_yesvalue": {
    "indianEnglish": "{p1} of {p2} said yes{p3}",
    "hinglish": "{p1} of {p2} said yes{p3}"
  },
  "value_said_not_tonight": {
    "indianEnglish": " · {p1} said not tonight",
    "hinglish": " · {p1} said not tonight"
  },
  "voting_closed": {
    "indianEnglish": "Voting closed",
    "hinglish": "Voting closed"
  },
  "valuevaluem_values_left": {
    "indianEnglish": "{p1}{p2}m {p3}s left",
    "hinglish": "{p1}{p2}m {p3}s left"
  },
  "valueh": {
    "indianEnglish": "{p1}h ",
    "hinglish": "{p1}h "
  },
  "group_streak": {
    "indianEnglish": "{group} · {count} movie nights together",
    "hinglish": "{group} · {count} movie nights together"
  }
} as const;
export const titleCopy = {
  "open_shortlist_value_picks": {
    "indianEnglish": "Open shortlist, {p1} picks",
    "hinglish": "Open shortlist, {p1} picks"
  },
  "share_title": {
    "indianEnglish": "Share title",
    "hinglish": "Share title"
  },
  "saved_to_watchlist": {
    "indianEnglish": "Saved to watchlist.",
    "hinglish": "Saved to watchlist."
  },
  "removed_from_watchlist": {
    "indianEnglish": "Removed from watchlist.",
    "hinglish": "Removed from watchlist."
  },
  "add_to_watchlist": {
    "indianEnglish": "Add to watchlist",
    "hinglish": "Add to watchlist"
  },
  "remove_from_watchlist": {
    "indianEnglish": "Remove from watchlist",
    "hinglish": "Remove from watchlist"
  },
  "separator": {
    "indianEnglish": "×",
    "hinglish": "×"
  },
  "close_share_options": {
    "indianEnglish": "Close share options",
    "hinglish": "Close share options"
  },
  "share_on_whatsapp": {
    "indianEnglish": "Share on WhatsApp ",
    "hinglish": "Share on WhatsApp "
  },
  "original_generated_key_art_this_product_is_not_endorsed_or_certif": {
    "indianEnglish": "Original generated key art. This product is not endorsed or certified by TMDb. Ratings are illustrative snapshots.",
    "hinglish": "Original generated key art. This product is not endorsed or certified by TMDb. Ratings are illustrative snapshots."
  },
  "pick_a_thumb_to_save_your_take": {
    "indianEnglish": "Pick a thumb to save your take.",
    "hinglish": "Pick a thumb to save your take."
  },
  "save_take": {
    "indianEnglish": "Save take",
    "hinglish": "Save take"
  },
  "your_take_is_saved": {
    "indianEnglish": "Your take is saved.",
    "hinglish": "Your take is saved."
  },
  "worth_staying_up_for": {
    "indianEnglish": "Worth staying up for?",
    "hinglish": "Worth staying up for?"
  },
  "optional": {
    "indianEnglish": "(optional)",
    "hinglish": "(optional)"
  },
  "one_line_take": {
    "indianEnglish": "One-line take ",
    "hinglish": "One-line take "
  },
  "loved_it": {
    "indianEnglish": "Loved it",
    "hinglish": "Loved it"
  },
  "liked_it": {
    "indianEnglish": "Liked it",
    "hinglish": "Liked it"
  },
  "not_for_me": {
    "indianEnglish": "Not for me",
    "hinglish": "Not for me"
  },
  "your_rating_is_saved": {
    "indianEnglish": "Your rating is saved.",
    "hinglish": "Your rating is saved."
  },
  "your_take_saved_just_for_you": {
    "indianEnglish": "Your take. Saved just for you.",
    "hinglish": "Your take. Saved just for you."
  },
  "seen_it": {
    "indianEnglish": "Seen it?",
    "hinglish": "Seen it?"
  },
  "directed_by": {
    "indianEnglish": "Directed by ",
    "hinglish": "Directed by "
  },
  "the_familiar_faces": {
    "indianEnglish": "The familiar faces",
    "hinglish": "The familiar faces"
  },
  "read_more": {
    "indianEnglish": "Read more",
    "hinglish": "Read more"
  },
  "show_less": {
    "indianEnglish": "Show less",
    "hinglish": "Show less"
  },
  "the_story": {
    "indianEnglish": "The story",
    "hinglish": "The story"
  },
  "matching_picks_in_this_small_catalog_try_turning_off_the_service_": {
    "indianEnglish": " matching picks in this small catalogue. Try turning off the OTT app filter for more.",
    "hinglish": " matching picks in this small catalogue. Try turning off the OTT app filter for more."
  },
  "no_matching_picks_on_these_services_yet_turn_off_the_filter_to_ex": {
    "indianEnglish": "No matching picks on these OTT apps yet. Turn off the filter to explore more.",
    "hinglish": "No matching picks on these OTT apps yet. Turn off the filter to explore more."
  },
  "value_only": {
    "indianEnglish": "{p1} only",
    "hinglish": "{p1} only"
  },
  "free_only_preferences_apply_to_the_other_recommendations": {
    "indianEnglish": "Free-only preferences apply to the other recommendations.",
    "hinglish": "Free-only preferences apply to the other recommendations."
  },
  "originals_and_remakes_stay_pinned_even_on_other_apps": {
    "indianEnglish": "Originals and remakes stay pinned, even on other apps.",
    "hinglish": "Originals and remakes stay pinned, even on other apps."
  },
  "only_what_s_on_my_services": {
    "indianEnglish": " Only what’s on my OTT apps",
    "hinglish": " Only what’s on my OTT apps"
  },
  "more_like_this": {
    "indianEnglish": "More like this",
    "hinglish": "More like this"
  },
  "find_more_like_this": {
    "indianEnglish": "Find more like this",
    "hinglish": "Find more like this"
  },
  "availability_is_illustrative_check_price_and_access_with_the_prov": {
    "indianEnglish": "Availability is illustrative. Check price and access with the provider. Links may open the provider homepage.",
    "hinglish": "Availability is illustrative. Check price and access with the provider. Links may open the provider homepage."
  },
  "watch_on": {
    "indianEnglish": "Watch on ",
    "hinglish": "Watch on "
  },
  "watch_on_value_value_opens_in_new_tab": {
    "indianEnglish": "Watch on {p1} ({p2}, opens in new tab)",
    "hinglish": "Watch on {p1} ({p2}, opens in new tab)"
  },
  "subscription": {
    "indianEnglish": "Subscription",
    "hinglish": "Subscription"
  },
  "extra": {
    "indianEnglish": " extra",
    "hinglish": " extra"
  },
  "free_tier": {
    "indianEnglish": "Free tier",
    "hinglish": "Free tier"
  },
  "you_have_this": {
    "indianEnglish": "You have this",
    "hinglish": "You have this"
  },
  "in_india": {
    "indianEnglish": "in India",
    "hinglish": "in India"
  },
  "where_to_watch": {
    "indianEnglish": "Where to watch ",
    "hinglish": "Where to watch "
  },
  "no_group_votes_yet": {
    "indianEnglish": "No group votes yet",
    "hinglish": "No group votes yet"
  },
  "group_votes_unavailable": {
    "indianEnglish": "Group votes unavailable",
    "hinglish": "Group votes unavailable"
  },
  "value_picked_this_value_votes": {
    "indianEnglish": "{p1}% picked this · {p2} votes",
    "hinglish": "{p1}% picked this · {p2} votes"
  },
  "your_groups": {
    "indianEnglish": "Your groups",
    "hinglish": "Your groups"
  },
  "illustrative_score_10": {
    "indianEnglish": "Illustrative score / 10",
    "hinglish": "Illustrative score / 10"
  },
  "tmdb": {
    "indianEnglish": "TMDb",
    "hinglish": "TMDb"
  },
  "ratings": {
    "indianEnglish": "Ratings",
    "hinglish": "Ratings"
  },
  "separator_2": {
    "indianEnglish": " · ",
    "hinglish": " · "
  },
  "value_min": {
    "indianEnglish": "{p1} min",
    "hinglish": "{p1} min"
  },
  "back": {
    "indianEnglish": " Back",
    "hinglish": " Back"
  },
  "shared_bring_the_gang": {
    "indianEnglish": "Shared. Bring the gang.",
    "hinglish": "Shared. Bring the gang."
  },
  "tonight_on_value": {
    "indianEnglish": "Tonight on {p1}?",
    "hinglish": "Tonight on {p1}?"
  },
  "value_tonight_on_value": {
    "indianEnglish": "{p1} — tonight on {p2}?",
    "hinglish": "{p1} — tonight on {p2}?"
  },
  "free": {
    "indianEnglish": "Free",
    "hinglish": "Free"
  },
  "buy": {
    "indianEnglish": "Buy",
    "hinglish": "Buy"
  },
  "rent": {
    "indianEnglish": "Rent",
    "hinglish": "Rent"
  },
  "stream": {
    "indianEnglish": "Stream",
    "hinglish": "Stream"
  },
  "title_not_found": {
    "indianEnglish": "Title not found",
    "hinglish": "Title not found"
  },
  "value_tonight_on_value_2": {
    "indianEnglish": "{p1} — tonight on {p2}",
    "hinglish": "{p1} — tonight on {p2}"
  },
  "not_on_your_apps_value": {
    "indianEnglish": "Not on your apps · {p1}",
    "hinglish": "Not on your apps · {p1}"
  },
  "no_subscription_streaming_listed": {
    "indianEnglish": "no subscription streaming listed",
    "hinglish": "no subscription streaming listed"
  },
  "streaming_on_value": {
    "indianEnglish": "streaming on {p1}",
    "hinglish": "streaming on {p1}"
  },
  "value_remake": {
    "indianEnglish": "{p1} remake",
    "hinglish": "{p1} remake"
  },
  "original_value_version": {
    "indianEnglish": "Original {p1} version",
    "hinglish": "Original {p1} version"
  }
} as const;
export const shareCardCopy = {
  "india_availability_is_illustrative": {
    "indianEnglish": "India · Availability is illustrative",
    "hinglish": "India · Availability is illustrative"
  },
  "your_next_movie_night": {
    "indianEnglish": "your next movie night",
    "hinglish": "your next movie night"
  },
  "on": {
    "indianEnglish": "on ",
    "hinglish": "on "
  },
  "separator": {
    "indianEnglish": " · ",
    "hinglish": " · "
  },
  "tonight_s_contender": {
    "indianEnglish": " · Tonight’s contender",
    "hinglish": " · Tonight’s contender"
  },
  "svalue": {
    "indianEnglish": "–S{p1}",
    "hinglish": "–S{p1}"
  },
  "series_s1": {
    "indianEnglish": "WEB SERIES · S1",
    "hinglish": "WEB SERIES · S1"
  },
  "title_not_found": {
    "indianEnglish": "Title not found",
    "hinglish": "Title not found"
  },
  "no_app_needed": {
    "indianEnglish": "no app needed",
    "hinglish": "no app needed"
  },
  "vote_in_10_seconds": {
    "indianEnglish": "Vote in 10 seconds,",
    "hinglish": "Vote in 10 seconds,"
  },
  "separator_2": {
    "indianEnglish": ".",
    "hinglish": "."
  },
  "unknown_title": {
    "indianEnglish": "Unknown title.",
    "hinglish": "Unknown title."
  },
  "a_complete_poll_link_is_required": {
    "indianEnglish": "A complete poll link is required.",
    "hinglish": "A complete poll link is required."
  },
  "down": {
    "indianEnglish": " down",
    "hinglish": " down"
  },
  "up": {
    "indianEnglish": " up · ",
    "hinglish": " up · "
  },
  "more_takes_in_the_result_link": {
    "indianEnglish": " more takes in the result link",
    "hinglish": " more takes in the result link"
  },
  "separator_3": {
    "indianEnglish": "+",
    "hinglish": "+"
  },
  "separator_4": {
    "indianEnglish": "”",
    "hinglish": "”"
  },
  "separator_5": {
    "indianEnglish": "“",
    "hinglish": "“"
  },
  "tonight": {
    "indianEnglish": "Tonight: ",
    "hinglish": "Tonight: "
  },
  "unknown_title_2": {
    "indianEnglish": "Unknown title",
    "hinglish": "Unknown title"
  },
  "a_completed_result_is_required": {
    "indianEnglish": "A completed result is required",
    "hinglish": "A completed result is required"
  },
  "invalid_result": {
    "indianEnglish": "Invalid result",
    "hinglish": "Invalid result"
  },
  "result_too_large": {
    "indianEnglish": "Result too large",
    "hinglish": "Result too large"
  }
} as const;
export const installCopy = {
  "separator": {
    "indianEnglish": ".",
    "hinglish": "."
  },
  "icon_not_found": {
    "indianEnglish": "Icon not found",
    "hinglish": "Icon not found"
  }
} as const;
export const catalogCopy = {
  "not_on_value_value": {
    "indianEnglish": "Not on {p1} · {p2}",
    "hinglish": "Not on {p1} · {p2}"
  },
  "no_streaming_offer_listed": {
    "indianEnglish": "no streaming offer listed",
    "hinglish": "no streaming offer listed"
  },
  "streaming_on_value": {
    "indianEnglish": "streaming on {p1}",
    "hinglish": "streaming on {p1}"
  },
  "a_different_direction_to_explore": {
    "indianEnglish": "A different direction to explore",
    "hinglish": "A different direction to explore"
  },
  "similar_rating_band": {
    "indianEnglish": "Similar rating band",
    "hinglish": "Similar rating band"
  },
  "with_value": {
    "indianEnglish": "With {p1}",
    "hinglish": "With {p1}"
  },
  "same_director": {
    "indianEnglish": "Same director",
    "hinglish": "Same director"
  }
} as const;
export const pollErrorsCopy = {
  "only_the_creator_can_call_it": {
    "indianEnglish": "Only the creator can call it.",
    "hinglish": "Only the creator can call it."
  },
  "vote_on_every_pick_first_then_add_up_to_80_characters": {
    "indianEnglish": "Vote on every pick first, then add up to 80 characters.",
    "hinglish": "Vote on every pick first, then add up to 80 characters."
  },
  "voting_is_closed": {
    "indianEnglish": "Voting is closed.",
    "hinglish": "Voting is closed."
  },
  "add_a_first_name_and_a_take_of_up_to_80_characters": {
    "indianEnglish": "Add a first name and a take of up to 80 characters.",
    "hinglish": "Add a first name and a take of up to 80 characters."
  },
  "this_vote_cannot_be_cast": {
    "indianEnglish": "This vote cannot be cast.",
    "hinglish": "This vote cannot be cast."
  },
  "a_poll_title_is_unavailable": {
    "indianEnglish": "A poll title is unavailable.",
    "hinglish": "A poll title is unavailable."
  },
  "this_poll_link_is_incomplete": {
    "indianEnglish": "This poll link is incomplete.",
    "hinglish": "This poll link is incomplete."
  },
  "choose_catalog_titles_for_this_poll": {
    "indianEnglish": "Choose catalogue titles for this poll.",
    "hinglish": "Choose catalogue titles for this poll."
  },
  "choose_two_to_four_picks_and_a_future_deadline": {
    "indianEnglish": "Choose two to four picks and a future deadline.",
    "hinglish": "Choose two to four picks and a future deadline."
  },
  "could_not_allocate_a_poll_link_try_again": {
    "indianEnglish": "Could not allocate a poll link. Try again.",
    "hinglish": "Could not allocate a poll link. Try again."
  },
  "movie_night": {
    "indianEnglish": "Movie night",
    "hinglish": "Movie night"
  },
  "voter": {
    "indianEnglish": "Voter",
    "hinglish": "Voter"
  },
  "this_poll_is_not_on_the_server_ask_for_a_new_link": {
    "indianEnglish": "This poll is not on the server. Ask for a new link.",
    "hinglish": "This poll is not on the server. Ask for a new link."
  },
  "the_poll_was_not_created": {
    "indianEnglish": "The poll was not created.",
    "hinglish": "The poll was not created."
  },
  "your_name_helps_friends_know_who_s_asking": {
    "indianEnglish": "Your name helps friends know who’s asking.",
    "hinglish": "Your name helps friends know who’s asking."
  },
  "your_polls_could_not_be_loaded": {
    "indianEnglish": "Your polls could not be loaded.",
    "hinglish": "Your polls could not be loaded."
  },
  "simulated_voters_are_available_in_local_demo_mode_only": {
    "indianEnglish": "Simulated voters are available in local demo mode only.",
    "hinglish": "Simulated voters are available in local demo mode only."
  },
  "the_poll_service_returned_an_invalid_poll": {
    "indianEnglish": "The poll server returned an invalid poll.",
    "hinglish": "The poll server returned an invalid poll."
  },
  "could_not_reach_the_poll_service_check_the_supabase_setup_and_try": {
    "indianEnglish": "Could not reach the poll server. Check the Supabase setup and try again.",
    "hinglish": "Could not reach the poll server. Check the Supabase setup and try again."
  },
  "supabase_setup_is_incomplete_run_the_pending_sql_files_in_supabas": {
    "indianEnglish": "Supabase setup is incomplete. Run the pending SQL files in supabase/migrations in the SQL editor.",
    "hinglish": "Supabase setup is incomplete. Run the pending SQL files in supabase/migrations in the SQL editor."
  },
  "rate_limit": {
    "indianEnglish": "You can create up to 20 polls per device each day. Try again tomorrow (UTC).",
    "hinglish": "You can create up to 20 polls per device each day. Try again tomorrow (UTC)."
  },
  "group_name_limit": {
    "indianEnglish": "Keep the group name within 60 characters.",
    "hinglish": "Keep the group name within 60 characters."
  },
  "device_required": {
    "indianEnglish": "Allow browser storage, then try again.",
    "hinglish": "Allow browser storage, then try again."
  },
  "choose_future": {
    "indianEnglish": "Choose a future deadline.",
    "hinglish": "Choose a future deadline."
  },
  "name_required": {
    "indianEnglish": "Please enter your name.",
    "hinglish": "Please enter your name."
  },
  "unknown_option": {
    "indianEnglish": "This title is not an option in this poll.",
    "hinglish": "This title is not an option in this poll."
  },
  "complete_ballot": {
    "indianEnglish": "Vote on every title before adding a comment.",
    "hinglish": "Vote on every title before adding a comment."
  },
  "invalid_choices": {
    "indianEnglish": "Choose two to four different titles.",
    "hinglish": "Choose two to four different titles."
  }
} as const;
export const brandCopy = {
  "dekho_tagline": {
    "indianEnglish": "What shall we watch? Sorted.",
    "hinglish": "What shall we watch? Sorted."
  },
  "watchadda_tagline": {
    "indianEnglish": "Your group’s film corner.",
    "hinglish": "Your group’s film corner."
  }
} as const;
export const labelsCopy = {
  "stream": {
    "indianEnglish": "Watch with subscription",
    "hinglish": "Watch with subscription"
  },
  "rent": {
    "indianEnglish": "Rent",
    "hinglish": "Rent"
  },
  "buy": {
    "indianEnglish": "Buy",
    "hinglish": "Buy"
  },
  "free": {
    "indianEnglish": "Free",
    "hinglish": "Free"
  },
  "movie": {
    "indianEnglish": "Film",
    "hinglish": "Film"
  },
  "series": {
    "indianEnglish": "Web series",
    "hinglish": "Web series"
  },
  "Laugh": {
    "indianEnglish": "Laugh",
    "hinglish": "Laugh"
  },
  "Edge-of-seat": {
    "indianEnglish": "Edge-of-seat",
    "hinglish": "Edge-of-seat"
  },
  "Family": {
    "indianEnglish": "Family",
    "hinglish": "Family"
  },
  "Feel-good": {
    "indianEnglish": "Feel-good",
    "hinglish": "Feel-good"
  },
  "Mind-bender": {
    "indianEnglish": "Mind-bender",
    "hinglish": "Mind-bender"
  },
  "Drama night": {
    "indianEnglish": "Drama night",
    "hinglish": "Drama night"
  }
} as const;
export const copy = { common: commonCopy, kit: kitCopy, shortlist: shortlistCopy, home: homeCopy, welcome: welcomeCopy, pollCreate: pollCreateCopy, voter: voterCopy, artwork: artworkCopy, profile: profileCopy, search: searchCopy, results: resultsCopy, title: titleCopy, shareCard: shareCardCopy, install: installCopy, catalog: catalogCopy, pollErrors: pollErrorsCopy, brand: brandCopy, labels: labelsCopy } as const;
export type CopyScreen = keyof typeof copy;
export function formatCopy(line: CopyLine, params: Record<string, unknown> = {}, tone: Tone = 'indianEnglish'): string { return line[tone].replace(/\{(\w+)\}/g, (placeholder, name: string) => Object.hasOwn(params, name) ? String(params[name]) : placeholder); }
/** Convenience for tests/tools; UI imports the specific screen to enable tree shaking. */
export function text<S extends CopyScreen>(screen: S, key: keyof typeof copy[S], params: Record<string, unknown> = {}, tone: Tone = 'indianEnglish'): string { return formatCopy(copy[screen][key] as CopyLine, params, tone); }
