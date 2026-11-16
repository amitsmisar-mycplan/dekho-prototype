import { MIN_TITLES_PER_LANGUAGE } from '../catalog-config';
import { canPickTonight } from './availability';
import { languages, type Title } from './types';
export function selectableLanguages(titles: readonly Title[], minimum = MIN_TITLES_PER_LANGUAGE) {
  return languages.filter(language => titles.filter(t => t.originalLanguage === language && canPickTonight(t)).length >= minimum);
}
