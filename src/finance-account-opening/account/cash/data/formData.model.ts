export class FormData {

    //step-1 info 
    owner_type_id: number = 2;
    name_chinese: string = '';
    name_english: string = '';
    firstname_en: string = '';
    lastname_en: string = '';
    firstname_zh: string = '';
    lastname_zh: string = '';
    identification_country_id: number = 1;
    identification_province_text: string = '';
    identification_other_country_text: string = '';
    identification_number: string = '';
    gender_id: number = 1;
    email: string = '';
    country_phone_code: string = '';
    phone_number: string = '';
    country_phone_code_home: string = '';
    phone_number_home: string = '';
    highest_education_id: number = 1;
    dob: string = '';
    place_of_birth_country_id: number = 1;
    place_of_birth_province_text: string = '';
    place_of_birth_other_country_text: string = '';
    address: string;
    address_type_id: number = 1;
    address_type_other_text: string = '';
    address_live_duration: string = '';
    is_permanent_resident: number = 1;
    professional_status_id: number = 1;
    company_name : string = '';
    career_position: string = '';
    business_nature_id: number = 1;
    professionalStatus: number = 1;
    companyName : string = '';
    carrerPosition: string = '';
    bussinessNature: number = 1;
    business_nature_text: string = ''
    employer_address: string = '';
    employer_country_phone_code: string = '';
    employer_phone_number: string = '';
    employer_fax_number: string = '';
    //step-2 info
    settlement_collection_by_email_yesno: number = 0;
    settlement_collection_by_mail_yesno: number = 0;
    settlement_collection_in_person_yesno: number = 0;
    settlement_lang: string = 'zh_CN';
    annual_income_id: number = 1;
    total_net_asset_value_id: number = 1;
    sources_of_found_ids: number = 1;
    investment_knowledge_id: number = 1;
    investment_objective_id: number = 1;
    frequency_of_transactions_per_month_id: number = 1;
    risk_tolerance_id: number = 1;
    stock_experience_id: number = 1;
    structured_product_experience_id: number = 1;
    foreign_currency_gold_experience_id: number = 1;
    warrants_experience_id: number = 1;
    futures_options_experience_id: number = 1;
    other_experience_id: number = 1;
    derivatives_trading_id: number = 1;
    withdraw_method_id: number = 1;
    bank_name: string = '';
    bank_account_number: string = '';
    bank_account_holder: string = '';
    identity_declaration1_id: number = 0;
    identity_declaration2_id: number = 0;
    identity_declaration1_text: string = '';
    identity_declaration2_text: string = '';
    referral_person_text: string = '';
    password_collection_by_email_yesno: number = 0;
    password_collection_by_mail_yesno: number = 0;
    password_collection_in_person_yesno: number = 0;
    authorised_person_1_name: string = '';
    authorised_person_1_relationship: string = '';
    authorised_person_1_id_card: string = '';
    authorised_person_1_country_phone_code: string = '';
    authorised_person_1_phone_number: string = '';
    authorised_person_2_name: string = '';
    authorised_person_2_relationship: string = '';
    authorised_person_2_id_card: string = '';
    authorised_person_2_country_phone_code: string = '';
    authorised_person_2_phone_number: string = '';
    authorised_person_3_name: string = '';
    authorised_person_3_relationship: string = '';
    authorised_person_3_id_card: string = '';
    authorised_person_3_country_phone_code: string = '';
    authorised_person_3_phone_number: string = '';
    
    //step - 3 info
    // other_information_disclosure_ids: string = '';
    tax_information_id: number = 1;
    tax_country_id: number = 1;
    tax_id: string = '';
    // w8ben_country_id: number = 1;

    //step - 4 info
    securities_account_ids: string = '';
    found_account_ids: string = '';


clear() {
    //step-1
    this.owner_type_id = 2;
    this.name_chinese = '';
    this.name_english = '';
    this.firstname_en = '';
    this.lastname_en = '';
    this.firstname_zh = '';
    this.lastname_zh = '';
    this.identification_country_id = 1;
    this.identification_province_text = '';
    this.identification_other_country_text = '';
    this.identification_number = '';
    this.gender_id= 1;
    this.email = '';
    this.country_phone_code = '';
    this.phone_number = '';
    this.country_phone_code_home = '';
    this.phone_number_home = '';
    this.highest_education_id = 1;
    this.dob = '';
    this.place_of_birth_country_id = 1;
    this.place_of_birth_province_text = '';
    this.place_of_birth_other_country_text = '';
    this.address = '';
    this.address_type_id = 1;
    this.address_type_other_text = '';
    this.address_live_duration = '';
    this.is_permanent_resident = 1;
    this.professional_status_id = 1;
    this.company_name = '';
    this.career_position = '';
    this.business_nature_id = 1;
    this.business_nature_text = ''
    this.employer_address = '';
    this.employer_country_phone_code = '';
    this.employer_phone_number = '';
    this.employer_fax_number = '';
    //step-2
    this.settlement_collection_by_email_yesno = 0;
    this.settlement_collection_by_mail_yesno = 0;
    this.settlement_collection_in_person_yesno = 0;
    this.settlement_lang = 'zh_CN';
    this.annual_income_id = 1;
    this.total_net_asset_value_id = 1;
    this.sources_of_found_ids = 1;
    this.investment_knowledge_id = 1;
    this.investment_objective_id = 1;
    this.frequency_of_transactions_per_month_id = 1;
    this.risk_tolerance_id = 1;
    this.stock_experience_id = 1;
    this.structured_product_experience_id = 1;
    this.foreign_currency_gold_experience_id = 1;
    this.warrants_experience_id = 1;
    this.futures_options_experience_id = 1;
    this.other_experience_id = 1;
    this.derivatives_trading_id = 1;
    this.withdraw_method_id = 1;
    this.bank_name = '';
    this.bank_account_number = '';
    this.bank_account_holder = '';
    this.identity_declaration1_id = 0;
    this.identity_declaration2_id = 0;
    this.identity_declaration1_text = '';
    this.identity_declaration2_text = '';
    this.referral_person_text = '';
    this.password_collection_by_email_yesno = 0;
    this.password_collection_by_mail_yesno = 0;
    this.password_collection_in_person_yesno = 0;
    this.authorised_person_1_name = '';
    this.authorised_person_1_relationship = '';
    this.authorised_person_1_id_card = '';
    this.authorised_person_1_country_phone_code = '';
    this.authorised_person_1_phone_number = '';
    this.authorised_person_2_name = '';
    this.authorised_person_2_relationship = '';
    this.authorised_person_2_id_card = '';
    this.authorised_person_2_country_phone_code = '';
    this.authorised_person_2_phone_number = '';
    this.authorised_person_3_name = '';
    this.authorised_person_3_relationship = '';
    this.authorised_person_3_id_card = '';
    this.authorised_person_3_country_phone_code = '';
    this.authorised_person_3_phone_number = '';
    //step-3
    // this.other_information_disclosure_ids = '';
    this.tax_information_id = 1;
    this.tax_country_id = 1;
    this.tax_id = '';
    // this.w8ben_country_id = 1;
    //step-4
    this.securities_account_ids = '';
    this.found_account_ids = '';

}
}

//step: 1
export class Step1 {
    owner_type_id: number = 2;
    name_chinese: string = '';
    name_english: string = '';
    firstname_en: string = '';
    lastname_en: string = '';
    firstname_zh: string = '';
    lastname_zh: string = '';
    identification_country_id: number = 1;
    identification_province_text: string = '';
    identification_other_country_text: string = '';
    identification_number: string = '';
    gender_id: number = 1;
    email: string = '';
    country_phone_code: string = '';
    phone_number: string = '';
    country_phone_code_home: string = '';
    phone_number_home: string = '';
    highest_education_id: number = 1;
    dob: string = '';
    place_of_birth_country_id: number = 1;
    place_of_birth_province_text: string = '';
    place_of_birth_other_country_text: string = '';
    address: string;
    address_type_id: number = 1;
    address_type_other_text: string = '';
    address_live_duration: string = '';
    is_permanent_resident: number = 1;
    //employment info
    employer_address: string = '';
    employer_country_phone_code: string = '';
    employer_phone_number: string = '';
    employer_fax_number: string = '';
    professional_status_id: number = 1;
    company_name : string = '';
    career_position: string = '';
    business_nature_id: number = 1;
    business_nature_text: string = ''


}

//step: 2
export class Step2 {
    //method to send settlement
    settlement_collection_by_email_yesno: number = 0;
    settlement_collection_by_mail_yesno: number = 0;
    settlement_collection_in_person_yesno: number = 0;
    settlement_lang: string = 'zh_CN';
    //financial
    annual_income_id: number = 1;
    total_net_asset_value_id: number = 1;
    sources_of_found_ids: number = 1;
    investment_knowledge_id: number = 1;
    investment_objective_id: number = 1;
    frequency_of_transactions_per_month_id: number = 1;
    risk_tolerance_id: number = 1;
    //investment
    stock_experience_id: number = 1;
    structured_product_experience_id: number = 1;
    foreign_currency_gold_experience_id: number = 1;
    warrants_experience_id: number = 1;
    futures_options_experience_id: number = 1;
    other_experience_id: number = 1;
    derivatives_trading_id: number = 1;
    //withdraw method
    withdraw_method_id: number = 1;
    bank_name: string = '';
    bank_account_number: string = '';
    bank_account_holder: string = '';
    //identity declaration
    identity_declaration1_id: number = 0;
    identity_declaration2_id: number = 0;
    identity_declaration1_text: string = '';
    identity_declaration2_text: string = '';
    referral_person_text: string = '';
    //password collection
    password_collection_by_email_yesno: number = 0;
    password_collection_by_mail_yesno: number = 0;
    password_collection_in_person_yesno: number = 0;
    //authorized person
    authorised_person_1_name: string = '';
    authorised_person_1_relationship: string = '';
    authorised_person_1_id_card: string = '';
    authorised_person_1_country_phone_code: string = '';
    authorised_person_1_phone_number: string = '';
    authorised_person_2_name: string = '';
    authorised_person_2_relationship: string = '';
    authorised_person_2_id_card: string = '';
    authorised_person_2_country_phone_code: string = '';
    authorised_person_2_phone_number: string = '';
    authorised_person_3_name: string = '';
    authorised_person_3_relationship: string = '';
    authorised_person_3_id_card: string = '';
    authorised_person_3_country_phone_code: string = '';
    authorised_person_3_phone_number: string = '';
}

//step: 3
export class Step3 {
//  other_information_disclosure_ids: string = '';
 tax_information_id: number = 1;
 tax_country_id: number = 1;
 tax_id: string = '';
//  w8ben_country_id: number = 1;

}

//step: 4
export class Step4 {
securities_account_ids: string = '';
found_account_ids: string = '';
}

