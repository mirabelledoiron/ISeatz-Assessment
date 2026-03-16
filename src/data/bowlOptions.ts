/*
  data/bowlOptions.ts
  Author: Mirabelle Doiron

  Static menu data for the Build a Bowl experience.
*/

export type Option = {
  value: string
  label: string
  helpText?: string
}

export const BASE_OPTIONS: Option[] = [
  { value: 'brown-rice', label: 'Brown rice' },
  { value: 'kale', label: 'Kale' },
  { value: 'quinoa', label: 'Quinoa' },
  { value: 'rice-noodles', label: 'Rice noodles' },
  { value: 'white-rice', label: 'White rice' },
]

export const PROTEIN_OPTIONS: Option[] = [
  { value: 'blackened-chicken', label: 'Blackened chicken' },
  { value: 'caramelized-garlic-steak', label: 'Caramelized garlic steak', helpText: '+$2' },
  { value: 'hard-boiled-egg', label: 'Hard boiled egg' },
  { value: 'miso-glazed-salmon', label: 'Miso glazed salmon' },
  { value: 'roasted-tofu', label: 'Roasted tofu' },
]

export const TOPPINGS_OPTIONS: Option[] = [
  { value: 'avocado', label: 'Avocado', helpText: '+$2' },
  { value: 'cherry-tomatoes', label: 'Cherry tomatoes' },
  { value: 'cucumbers', label: 'Cucumbers' },
  { value: 'feta-cheese', label: 'Feta cheese', helpText: '+$1' },
  { value: 'goat-cheese', label: 'Goat cheese', helpText: '+$1' },
  { value: 'pickled-red-onions', label: 'Pickled red onions' },
  { value: 'roasted-broccoli', label: 'Roasted broccoli' },
  { value: 'shredded-carrots', label: 'Shredded carrots' },
  { value: 'sweet-corn', label: 'Sweet corn' },
  { value: 'toasted-almonds', label: 'Toasted almonds' },
]

export const SAUCE_OPTIONS: Option[] = [
  { value: 'balsamic-vinaigrette', label: 'Balsamic vinaigrette' },
  { value: 'creamy-cilantro-lime', label: 'Creamy cilantro lime' },
  { value: 'lemon-tahini', label: 'Lemon tahini' },
  { value: 'miso-ginger', label: 'Miso ginger' },
  { value: 'spicy-peanut', label: 'Spicy peanut' },
]
