export class AccountInfo {
    //personal info
    id?: number;
    user_id?: number;
    account_id?: number;
    name_chinese?: string;
    name_english: string;
    identification_country_id : number;  
    identification_number?: string;
    gender_id?: number;
    email?: string;
    highest_education_id?: number;
    dob?: string;
    place_of_birth_country_id?: number;
    address?: string;
    is_permanent_resident?: number;

    //employment nature
    professional_status_id?: number;
    company_name?: string;
    career_position?: string;
    business_nature_id?: number;

    //Financial and Investment status 
     //financial
    annual_income_id?: number;
    total_net_asset_value_id?: number;
    sources_of_found_ids?: string;
    investment_knowledge_id?: number;
    investment_objective_id?: number;
    frequency_of_transactions_per_month_id?: number;
    risk_tolerance_id?: number;
     //investment
    stock_experience_id?: number;
    structured_product_experience_id?: number;
    foreign_currency_gold_experience_id?: number;
    warrants_experience_id?: number;
    futures_options_experience_id?: number;
    other_experience_id?: number;
    derivatives_trading_id?: number;
    
    //other disclosure 
    other_information_disclosure_ids?: string;
    tax_information_id?: number;
    tax_country_id?: number;
    tax_id?: string;
    w8ben_country_id?: number;

    //select account 
    securities_account_ids?: string;
    found_account_ids?: string;

}

export class Account {
    id?: number;
    user_id?: number;
    complete?: number;
    approved?: number;
    type?: string;
    balance?: any;
    approved_user_id?: number;
    create_time?: string;
    complete_time?: string;
}
