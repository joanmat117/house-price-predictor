import citiesAndTownsCords from '@/shared/data/citiesAndTownsCords.json'

export const AVALIABLE_LANGUAGES = ['es','en']

export const SESSION_STORAGE_CITY_KEY = "hero-city-value"

export const TOTAL_STEPS = 5

export const CITIES = Object.keys(citiesAndTownsCords)

export const PROPERTY_TYPES = ["apartment", "house"]
export const RELATION_WITH_PROPERTY = ["sells", "buys", "agent"]
export const PROPERTY_STATUSES = ["unoccupied", "rented", "inhabitates it"]
export const SELLING_MOTIVES = [
  "house change",
  "settle a debt",
  "business opportunity",
  "browsing offers",
  "investment for studies or travel",
  "Change city or live in the countryside",
  "I don't want to keep renting",
  "property division"
] 
export const BUYING_MOTIVES = [
  "proximity to work and schools",
  "investment opportunity",
  "affordability and financing options",
  "interest in newer home",
  "bigger house",
  "desire for a move-in ready home"
]
