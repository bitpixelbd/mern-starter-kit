export const EXPERT_STEP_1_CARE_RECEPIENT = 'care_recipient'
export const EXPERT_STEP_2_LIVING_OPTIONS = 'living_options'
export const EXPERT_STEP_3_TIMELINE = 'timeline'
export const EXPERT_STEP_4_BUDGET = 'budget'
export const EXPERT_STEP_5_FIN_RESOURCE = 'financial_resources'
export const EXPERT_STEP_6_LOCATION = 'location'
export const EXPERT_STEP_7_CONTACT_INFO = 'contact_info'

export const BUTTON_RADIO = 'radio'
export const BUTTON_CHECKBOX = 'checkbox'

export const FIRST_5_STEPS_FOR_EXPERT = [
    EXPERT_STEP_1_CARE_RECEPIENT,
    EXPERT_STEP_2_LIVING_OPTIONS,
    EXPERT_STEP_3_TIMELINE,
    EXPERT_STEP_4_BUDGET,
    EXPERT_STEP_5_FIN_RESOURCE
 ]

export const EXPERTS = [
    {
        step: EXPERT_STEP_1_CARE_RECEPIENT,
        title: "Are you looking for senior living options for yourself or someone else?",
        nextStep: EXPERT_STEP_2_LIVING_OPTIONS,
        prevStep: null,
        button_type: BUTTON_RADIO,
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
        step: EXPERT_STEP_2_LIVING_OPTIONS,
        title: "Do you know what senior living option would be best for your loved one?",
        nextStep: EXPERT_STEP_3_TIMELINE,
        prevStep: EXPERT_STEP_1_CARE_RECEPIENT,
        button_type:BUTTON_RADIO,
        completed: 30,
        options: [
            {
                label: 'Independent Living (No assistance required of any kind)',
                value: 'independent_living'
            },
            {
                label: 'Assisted Living (Need assistance for Activities of Daily Living)',
                value: 'assisted_living'
            },
            {
                label: 'Memory Care (Specialized care for cognitive decline)',
                value: 'memory_care'
            },

        ],
    }, 
    {
        step: EXPERT_STEP_3_TIMELINE,
        title: "What is your move timeline?",
        nextStep:EXPERT_STEP_4_BUDGET, 
        prevStep: EXPERT_STEP_2_LIVING_OPTIONS,
        button_type:BUTTON_RADIO,
        completed: 45,
        options: [
            {
                label: 'Immediately (within the next couple weeks)',
                value: 'immediately'
            },
            {
                label: 'Within 1-3 months',
                value: '1_3'
            },
            {
                label: 'Next 3-6 months',
                value: '3_6'
            },
            {
                label: 'I’m not sure (Planning Ahead)',
                value: 'not_sure'
            },

        ],

       
       
    },
    {
        step: EXPERT_STEP_4_BUDGET,
        title: "What is your monthly budget?",
        nextStep:EXPERT_STEP_5_FIN_RESOURCE, 
        prevStep: EXPERT_STEP_3_TIMELINE,
        button_type: BUTTON_RADIO,
        completed: 60,
        options: [
            {
                label: 'Less than $2k',
                value: 'below_2'
            },
            {
                label: '$2K - $5k',
                value: '2_5'
            },
            {
                label: '$5K+',
                value: 'above_5'
            },
        ],
       
    },
    {
        step: EXPERT_STEP_5_FIN_RESOURCE,
        title: "Do they have access to any of the financial resources?",
        nextStep:EXPERT_STEP_6_LOCATION, 
        prevStep: EXPERT_STEP_4_BUDGET,
        button_type: BUTTON_CHECKBOX,
        completed: 70,
        options: [
            {
                label: 'Veterans’ benefits',
                value: 'veteran_benefit'
            },
            {
                label: 'Long-term care insurance',
                value: 'care_insurance'
            },
            {
                label: 'Equity in a home',
                value: 'equity'
            },
            {
                label: 'Pension plan',
                value: 'pension'
            },
            {
                label: 'Medicaid',
                value: 'medicaid'
            },
            {
                label: 'I am not sure',
                value: 'not_sure'
            },
            {
                label: 'I don’t have access to any of these benefits',
                value: 'no_access'
            },
        ],
       
    },
    {
        step: EXPERT_STEP_6_LOCATION,
        nextStep:EXPERT_STEP_7_CONTACT_INFO, 
        prevStep: EXPERT_STEP_5_FIN_RESOURCE,
        completed: 85,
    },
    {
        step: EXPERT_STEP_7_CONTACT_INFO,
        nextStep: null, 
        prevStep:EXPERT_STEP_6_LOCATION,
        completed: 100,
       
    },
]