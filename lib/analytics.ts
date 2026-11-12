type Event = 'onboarding_step' | 'onboarding_complete' | 'preferences_edit' | 'search' | 'title_view' | 'similar_tap' | 'provider_tap' | 'shortlist_add' | 'poll_create' | 'poll_share' | 'vote_cast' | 'result_view' | 'watch_click';
export function track(event: Event, props: Record<string, unknown> = {}) { console.info('[analytics]', event, props); }
