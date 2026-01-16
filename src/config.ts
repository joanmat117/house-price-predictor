import citiesAndTownsCords from '@/shared/data/citiesAndTownsCords.json'

export const AVALIABLE_LANGUAGES = ['es','en']

export const SESSION_STORAGE_CITY_KEY = "hero-city-value"

export const DEFAULT_DEPARTAMENT = 'Antioquia'

export const TOTAL_STEPS = 5

export const CITIES = Object.keys(citiesAndTownsCords)

export const TYPE_WAY = [
  "calle",
  "carrera",
  "avenida",
  "diagonal",
  "transversal"
]

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

export const STRATA = {
  min:1,
  max:6
}

export const AREA = {
  min:30,
  max:10000
}

export const BUILT_AREA = {
  min:30,
  max:5000
}

export const ROOMS = {
  min:1,
  max:9
}

export const BATHROOMS = {
  min:1,
  max:9
}

export const PARKING_SPOTS = {
  min:0,
  max:9
}

export const ANTIQUITY = {
  min:1,
  max:5
} 

export const LATITUDE = {
  min:6,
  max:6.5
}

export const LONGITUDE = {
  min:-75.6,
  max:-75.3
}

export const WILLING_PRICE = {
  min:50000000,
  max:10000000000000
}
