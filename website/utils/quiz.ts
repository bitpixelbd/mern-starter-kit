import { STEP_1_CARE_RECEPIENT, STEP_2_LIVING_OPTIONS, STEP_3_MEMORY_CARE, STEP_4_SENIOR_CARE } from "@/components/common/pop-up/component/quizz/quizOption";

export const QUIZ_ANSWER_LOCAL_STORAGE_KEY = 'quizAnswers'
export const EXPERT_ANSWER_LOCAL_STORAGE_KEY = 'expertAnswers'

export const setQuizValue = (step_name: string, value: string[], localStorageKey: string) => {
  const quizStepValue = localStorage.getItem(localStorageKey)

  let quizAnswers = {}

  // console.log(quizStepValue);

  if (quizStepValue) {
    quizAnswers = JSON.parse(quizStepValue);
  }

  quizAnswers[step_name] = value;

  localStorage.setItem(localStorageKey, JSON.stringify(quizAnswers));

};

export const getQuizAnswersfromLS = (localStorageKey: string) => {

  if (typeof window !== 'undefined') {
    const quizStepValue = localStorage.getItem(localStorageKey)

    if (quizStepValue === null) return

    const parsed = JSON.parse(quizStepValue);

    const transformedData = {};

    for (const key in parsed) {
      const value = parsed[key];

      if (value.length === 1) {
        transformedData[key] = value[0]; // Convert to a single string
      } else {
        transformedData[key] = value.join(', '); // Convert to a comma-separated string
      }
    }

    return transformedData
  }


}

export const getQuizStepValueFromLS = (step: string, localStorageKey: string): string => {

  if (typeof window === "undefined") return '';

  const quizStepValue = localStorage.getItem(localStorageKey)
  if (quizStepValue === null || quizStepValue === undefined) return '';


  const quizAnswers = JSON.parse(quizStepValue);


  if (quizAnswers.hasOwnProperty(step)) {
    return quizAnswers[step]
  }

  return '';
};

export const getMatchScoring = (quizz: any, amenities: any, services: any, price: any) => {
  let unknown: number = 0
  let match: number = 0


  const livingOptions: any = { title: "", items: [] }
  quizz?.living_options?.map(item => {
    const find = services?.find(service => service?.slug == item)
    if (find) {
      livingOptions.title = "Care Type"
      livingOptions.items.push(find)
      match += 1
    } else unknown += 1
  })

  const amenityOptions: any = { title: "", items: [] }
  quizz?.amenities?.map(item => {
    const find = amenities?.find(amenity => amenity?.slug == item)
    if (find) {
      amenityOptions.title = "Amenities"
      amenityOptions.items.push(find)
      match += 1
    } else unknown += 1
  })


  const assistanceOptions: any = { title: "", items: [] }
  quizz?.senior_care_services?.map(item => {
    const find = amenities?.find(amenity => amenity?.slug === item)
    if (find) {
      assistanceOptions.title = "Assistance"
      assistanceOptions.items.push(find)
      match += 1
    } else unknown += 1
  })

  const memoryCareOptions: any = { title: "", items: [] }
  quizz?.memory_care?.map(item => {
    const find = amenities?.find(amenity => amenity?.slug == item)
    if (find) {
      memoryCareOptions.title = "Memory care"
      memoryCareOptions.items.push(find)
      match += 1
    } else unknown += 1
  })


  const priceRangeOptions: any = { title: "", items: [] }
  quizz?.budget?.map(item => {
    if (item === "above-5") {
      if (Number(price?.price_start) >= 5000) {
        priceRangeOptions.title = "Price Range";
        priceRangeOptions.items.push({ name: "$5K+" });
        match += 1
      }
    } else if (item === "2-5") {
      if (Number(price?.price_start) >= 2000 && Number(price?.price_end) <= 5000) {
        priceRangeOptions.title = "Price Range";
        priceRangeOptions.items.push({ name: "$2K - $5k" });
        match += 1
      }

    } else if (item === "below-2") {
      if (Number(price?.price_end) <= 2000 || Number(price?.price_start) <= 2000) {
        priceRangeOptions.title = "Price Range";
        priceRangeOptions.items.push({ name: "Less than $2k" });
        match += 1
      }
    } else unknown += 1
  })

  return { unknown, match, livingOptions, amenityOptions, assistanceOptions, memoryCareOptions, priceRangeOptions }
} 