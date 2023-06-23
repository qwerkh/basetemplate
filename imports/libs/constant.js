let secret = "narongbilling";

//firebase cloud messaging
let vapIdKey = "AAAAKjvCuFE:APA91bHJL8_Yr6YUVtBWieikttHPi6Zbgf9PS6MCF2rrufkJvZHFzq0BKVb9EWtjw9fYWAIb4ELZH5WmIm9X96m1griCSNwjkao6KOrj9MbsfR_UwsMsDTfswRSVUm_hqXZefPRskPK5";

let defaultRoles = [
    "Admin",
    "BM",
    "CCO",
    "Account",
    "CO",
    "Teller",
    "Analyst",
    "CFO",
    "Create",
    "Update",
    "Delete",
    "Setting",
    "Data",
    "Report",
    "Update Disbursement",
    "Control User",


];

let PickDateListRange = ['today', 'thisMonth', 'lastMonth', 'quarter1', 'quarter2', 'quarter3', 'quarter4', 'semester1', 'semester2'];
let PickDateListRangeDay = ['today', 'yesterday', 'thisWeek', 'thisMonth', 'lastMonth', 'quarter1', 'quarter2', 'quarter3', 'quarter4'];
let PickDateList = ['today', 'yesterday', 'thisWeek', 'lastMonth'];

let Gender = [
    {label: "male", value: "1"},
    {label: "female", value: "2"},
]

let Currency = [
    {label: "USD", value: "USD"},
    {label: "KHR", value: "KHR"},
    {label: "THB", value: "THB"},
]
let CurrencyReport = [
    {label: "All", value: ""},
    {label: "USD", value: "USD"},
    {label: "KHR", value: "KHR"},
    {label: "THB", value: "THB"},
]
let Type = [
    {label: "Fixed", value: "fixed"},
    {label: "Normal", value: "normal"},
]


let Setting = [
    'Admin', 'Setting', 'Super'
];
let Data = [
    'Admin', 'Data', 'Super'
];
let Report = [
    'Admin', 'Report', 'Super'
];

let ControlUser = [
    'Control User', 'Super'
];
let UpdateDisbursement = [
    'Update Disbursement', 'Super'
];

let Super = [
    'Super'
];

let Create = [
    'Create', "Super"
];
let Delete = [
    'Delete', "Super"
];

let Update = [
    'Update', "Super"
];
let Analyst = [
    'Analyst', "Super"
];

let CFO = [
    'CFO', "Super"
];
let Teller = [
    'Teller', "Super", "Admin"
];

let Administration = [
    'Administration', "Super", "Admin"
];

let BM = [
    'BM', "Super", "Admin"
];

let CCO = [
    'CCO', "Super", "Admin"
];

let Account = [
    'Account', "Super"
];


let CO = [
    'CO', "Super", "Admin"
];

let defaultModules = [
    "Loan",
    "Saving",
    "Account",
]

let RateType = [
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly"
]

let MethodType = [
    "Straight Line",
    "Declining Balance",
    "Annuity",
]
let FeeType = [
    "Amount",
    "Percent"
]
let OperationFeeOf = [
    "Loan Amount",
    "Loan Outstanding",
    "Principle"
]

let RoundType = [
    "Normal",
    "Up",
    "Down"
]
let EscapeType = [
    "No Escape",
    "Before Day",
    "After Day"
]

let NationOption = [
    {value: "IdentityCard", label: "អត្តសញ្ញាណប័ណ្ណ (Identity Card)"},
    {value: "FamilyBook", label: "សៀវភៅគ្រួសារ (Family Book)"},
    {value: "ResidenceBook", label: "សៀវភៅស្នាក់នៅ (Residence Book)"},
    {value: "Passport", label: "លិខិតឆ្លងដែន (Passport)"},
    {value: "BirthCertificate", label: "សំបុត្រកំណើត (Birth Certificate)"},
    {value: "other", label: "ផ្សេងៗ (Other)"},
]


import {en} from "../libs/lang/en";
import {km} from "../libs/lang/km";

export const t = {en, km};

export const Constants = {
    rolesOption: defaultRoles,
    modulesOption: defaultModules,
    setting: Setting,
    data: Data,
    report: Report,
    controlUser: ControlUser,
    updateDisbursement: UpdateDisbursement,
    super: Super,
    create: Create,
    delete: Delete,
    update: Update,
    analyst: Analyst,
    cfo: CFO,
    account: Account,
    teller: Teller,
    administration: Administration,
    co: CO,
    bm: BM,
    cco: CCO,
    secret: secret,
    gender: Gender,
    currency: Currency,
    currencyReport: CurrencyReport,
    rateType: RateType,
    methodType: MethodType,
    type: Type,
    feeType: FeeType,
    operationFeeOf: OperationFeeOf,
    roundType: RoundType,
    escapeType: EscapeType,
    nationOption: NationOption,

    pickDateListRange: PickDateListRange,
    pickDateListRangeDay: PickDateListRangeDay,
    vapIdKey: vapIdKey

}

