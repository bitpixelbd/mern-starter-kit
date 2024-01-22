export const STEP_1_CARE_RECEPIENT = 'care_recipient'
export const STEP_2_LIVING_OPTIONS = 'living_options'
export const STEP_3_MEMORY_CARE = 'memory_care'
export const STEP_4_SENIOR_CARE = 'senior_care_services'
export const STEP_5_AMENITIES = 'amenities'
export const STEP_6_TIMELINE = 'timeline'
export const STEP_7_BUDGET = 'budget'
export const STEP_8_LOCATION = 'location'
export const STEP_9_CONTACT_INFO = 'contact_info'
export const STEP_10_OTP_VERIFICATION = 'contact_info'

export const LIVING_OPTIONS_MEMORY_CARE = 'memory-care'
export const LIVING_OPTIONS_ASSISTED_LIVING = 'assisted-living'
export const LIVING_OPTIONS_INDEPENDENT_LIVING = 'independent-living'

export const BUTTON_RADIO = 'radio'
export const BUTTON_CHECKBOX = 'checkbox'

export const FIRST_7_STEPS = [
    STEP_1_CARE_RECEPIENT,
    STEP_2_LIVING_OPTIONS,
    STEP_3_MEMORY_CARE,
    STEP_4_SENIOR_CARE,
    STEP_5_AMENITIES,
    STEP_6_TIMELINE,
    STEP_7_BUDGET,
 ]


export const QUIZES = [
    {
        step: STEP_1_CARE_RECEPIENT,
        title: "Are you looking for senior living options for yourself or someone else?",
        nextStep: STEP_2_LIVING_OPTIONS,
        prevStep: null,
        button_type: 'radio',
        completed: 15,
        options: [
            {
                label: 'Myself',
                value: 'myself'
            },
            {
                label: 'My parents',
                value: 'parents'
            },
            {
                label: 'Someone else',
                value: 'others'
            },

        ]
    },
    {
        step: STEP_2_LIVING_OPTIONS,
        title: "Do you know what senior living option would be best for your loved one?",
        nextStep: 'amenities',
        prevStep: 'care_recipient',
        button_type: 'radio',
        completed: 30,
        options: [
            {
                label: 'Independent Living (No assistance required of any kind)',
                value: LIVING_OPTIONS_INDEPENDENT_LIVING
            },
            {
                label: 'Assisted Living (Need assistance for Activities of Daily Living)',
                value: LIVING_OPTIONS_ASSISTED_LIVING
            },
            {
                label: 'Memory Care (Specialized care for cognitive decline)',
                value: LIVING_OPTIONS_MEMORY_CARE
            },

        ],
        getNextStep: (value: string) => {
            if (value === LIVING_OPTIONS_INDEPENDENT_LIVING) return STEP_5_AMENITIES
            if (value === LIVING_OPTIONS_ASSISTED_LIVING) return STEP_4_SENIOR_CARE
            if (value === LIVING_OPTIONS_MEMORY_CARE) return STEP_3_MEMORY_CARE
        },
    },
    {
        step: STEP_3_MEMORY_CARE,
        nextStep:STEP_4_SENIOR_CARE,
        prevStep: STEP_2_LIVING_OPTIONS,
        title: "Is your loved one currently experiencing any of these conditions?",
        button_type: 'checkbox',
        completed: 40,
        alternate_completed: 50,
        options: [
            {
                label: 'Dementia',
                value: 'dementia'
            },
            {
                label: 'Sundowners',
                value: 'sundowners'
            },
            {
                label: 'Hallucinations',
                value: 'hallucinations'
            },
            {
                label: 'Alzheimers',
                value: 'alzheimers'
            },
            {
                label: 'Wandering',
                value: 'wandering'
            },
            {
                label: 'None of the above',
                value: 'none_of_the_above'
            },

        ],

        getNextStep: (value: string) => {
            if (value === LIVING_OPTIONS_INDEPENDENT_LIVING) return STEP_4_SENIOR_CARE
            if (value === LIVING_OPTIONS_ASSISTED_LIVING) return STEP_5_AMENITIES
            if (value === LIVING_OPTIONS_MEMORY_CARE) return STEP_4_SENIOR_CARE
        },
        getPrevStep: (value:string) => {
            if (value === LIVING_OPTIONS_ASSISTED_LIVING) return STEP_4_SENIOR_CARE
            if (value === LIVING_OPTIONS_MEMORY_CARE) return STEP_2_LIVING_OPTIONS
        },

    },
    {
        step: STEP_4_SENIOR_CARE,
        title: "Does your loved ones need assistance with any of the following:",
        nextStep:'amenities',
        button_type: 'checkbox',
        completed: 50,
        alternate_completed: 40,
        options: [
            {
                label: 'Medication Management',
                value: 'medication_management'
            },
            {
                label: 'Laundry Service',
                value: 'laundry-service'
            },
            {
                label: 'Meals Provide',
                value: 'meals-provide'
            },
            {
                label: 'Diabetic Care',
                value: 'diabetic_care'
            },
            {
                label: 'Special Dites',
                value: 'special_dites'
            },
            {
                label: 'Dressing Assistance',
                value: 'dressing_assistance'
            },

            {
                label: 'Bathing Assistance',
                value: 'bathing_assistance'
            }

        ],
        getNextStep: (value:string) => {
            if (value === LIVING_OPTIONS_INDEPENDENT_LIVING) return STEP_5_AMENITIES
            if (value === LIVING_OPTIONS_ASSISTED_LIVING) return STEP_3_MEMORY_CARE
            if (value === LIVING_OPTIONS_MEMORY_CARE) return STEP_5_AMENITIES
        },

        getPrevStep: (value:string) => {
            if (value === LIVING_OPTIONS_ASSISTED_LIVING) return STEP_2_LIVING_OPTIONS
            if (value === LIVING_OPTIONS_MEMORY_CARE) return STEP_3_MEMORY_CARE
        },

    },
    {
        step: 'amenities',
        title: "Check any amenities that you MUST have:",
        nextStep:'timeline',
        button_type: 'checkbox',
        completed: 60,
        options: [
            {
                label: 'Pets Allowed',
                value: 'pets-allowed'
            },
            {
                label: 'Fitness Center',
                value: 'fitness-center'
            },
            {
                label:'Spa/Wellness Room',
                value:'spa-wellness-room'
            },
            {
                label:'Library',
                value:'library'
            },
            {
                label:'Movie Room',
                value:'movie-room'
            },
            {
                label:'Swimming Pool',
                value:'swimming-pool'
            },
            {
                label:'Handicap Accessible',
                value:'handicap-accessible'
            }

        ],

        getPrevStep: (value:string) => {
            if (value === LIVING_OPTIONS_INDEPENDENT_LIVING) return STEP_2_LIVING_OPTIONS
            if (value === LIVING_OPTIONS_ASSISTED_LIVING) return STEP_3_MEMORY_CARE
            if (value === LIVING_OPTIONS_MEMORY_CARE) return STEP_4_SENIOR_CARE
        },

    },
    {
        step: 'timeline',
        title: "What is your move timeline?",
        nextStep:'budget',
        prevStep: 'amenities',
        button_type: 'radio',
        completed: 70,
        options: [
            {
                label: 'Immediately (within the next couple weeks)',
                value: 'immediately'
            },
            {
                label: 'Within 1-3 months',
                value: '1-3'
            },
            {
                label: 'Next 3-6 months',
                value: '3-6'
            },
            {
                label: 'I’m not sure (Planning Ahead)',
                value: 'not-sure'
            },

        ],



    },
    {
        step: 'budget',
        title: "What is your monthly budget?",
        nextStep:'location',
        prevStep: 'timeline',
        button_type: 'radio',
        completed: 80,
        options: [
            {
                label: 'Less than $2k',
                value: 'below-2'
            },
            {
                label: '$2K - $5k',
                value: '2-5'
            },
            {
                label: '$5K+',
                value: 'above-5'
            },
        ],

    },
    {
        step: 'location',
        nextStep:'contact_info',
        prevStep: 'budget',
        completed: 90,
    },
    {
        step: 'contact_info',
        nextStep: 'otp_verificatiion',
        prevStep: 'location',
        completed: 100,

    },
    {
        step: 'otp_verificatiion',
        nextStep: null,
        prevStep: 'contact_info',
        completed: 100,

    },
]