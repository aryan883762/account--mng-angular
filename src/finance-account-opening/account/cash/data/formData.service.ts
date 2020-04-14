import { Injectable } from '@angular/core';

import { FormData, Step1, Step2, Step3, Step4 }  from './formData.model';

import { WorkflowService } from '../workflow/workflow.service';

import { STEPS } from '../workflow/workflow.model';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private isStep1FormValid: boolean = false;
    private isStep2FormValid: boolean = false;
    private isStep3FormValid: boolean = false;
    private isStep4FormValid: boolean = false;
    constructor(private workflowService: WorkflowService) { 
    }

    //Step1 Information
    getStep1Data(): Step1 {
        var data: Step1 = {
            owner_type_id: this.formData.owner_type_id,
            name_chinese: this.formData.name_chinese,
            name_english: this.formData.name_english,
            firstname_en: this.formData.firstname_en,
            lastname_en: this.formData.lastname_en,
            firstname_zh: this.formData.firstname_zh,
            lastname_zh: this.formData.lastname_zh,
            identification_country_id: this.formData.identification_country_id,
            identification_province_text: this.formData.identification_province_text,
            identification_other_country_text: this.formData.identification_other_country_text,
            identification_number: this.formData.identification_number,
            gender_id: this.formData.gender_id,
            email: this.formData.email,
            country_phone_code: this.formData.country_phone_code,
            phone_number: this.formData.phone_number,
            country_phone_code_home: this.formData.country_phone_code_home,
            phone_number_home: this.formData.phone_number_home,
            highest_education_id: this.formData.highest_education_id,
            dob: this.formData.dob,
            place_of_birth_country_id: this.formData.place_of_birth_country_id,
            place_of_birth_province_text: this.formData.place_of_birth_province_text,
            place_of_birth_other_country_text: this.formData.place_of_birth_other_country_text,
            address: this.formData.address,
            is_permanent_resident: this.formData.is_permanent_resident,
            address_type_id: this.formData.address_type_id,
            address_type_other_text: this.formData.address_type_other_text,
            address_live_duration: this.formData.address_live_duration,
            company_name: this.formData.company_name,
            //employment info
            employer_address: this.formData.employer_address,
            employer_country_phone_code: this.formData.employer_country_phone_code,
            employer_phone_number: this.formData.employer_phone_number,
            employer_fax_number: this.formData.employer_fax_number,
            career_position: this.formData.career_position,
            business_nature_id: this.formData.business_nature_id,
            business_nature_text: this.formData.business_nature_text,
            professional_status_id: this.formData.professional_status_id

        };
        return data;
    }

    setStep1Data(data: Step1) {
        this.isStep1FormValid = true;
        this.formData.owner_type_id = data.owner_type_id;
        this.formData.name_chinese = data.name_chinese;
        this.formData.name_english = data.name_english;
        this.formData.firstname_en = data.firstname_en;
        this.formData.lastname_en = data.lastname_en;
        this.formData.firstname_zh = data.firstname_zh;
        this.formData.lastname_zh = data.lastname_zh;
        this.formData.identification_country_id = data.identification_country_id;
        this.formData.identification_province_text = data.identification_province_text;
        this.formData.identification_other_country_text = data.identification_other_country_text;
        this.formData.is_permanent_resident = data.is_permanent_resident;
        this.formData.identification_number = data.identification_number;
        this.formData.gender_id = data.gender_id;
        this.formData.email = data.email;
        this.formData.country_phone_code = data.country_phone_code;
        this.formData.phone_number = data.phone_number;
        this.formData.country_phone_code_home = data.country_phone_code_home;
        this.formData.phone_number_home = data.phone_number_home;
        this.formData.highest_education_id = data.highest_education_id;
        this.formData.dob = data.dob;
        this.formData.place_of_birth_country_id = data.place_of_birth_country_id;
        this.formData.place_of_birth_province_text = data.place_of_birth_province_text;
        this.formData.place_of_birth_other_country_text = data.place_of_birth_other_country_text;
        this.formData.address = data.address;
        this.formData.address_type_id = data.address_type_id;
        this.formData.address_type_other_text = data.address_type_other_text;
        this.formData.address_live_duration = data.address_live_duration;
        //employment info
        this.formData.employer_address = data.employer_address,
        this.formData.employer_country_phone_code = data.employer_country_phone_code,
        this.formData.employer_phone_number = data.employer_phone_number,
        this.formData.employer_fax_number = data.employer_fax_number,
        this.formData.company_name = data.company_name,
        this.formData.career_position = data.career_position,
        this.formData.business_nature_id = data.business_nature_id,
        this.formData.professional_status_id = data.professional_status_id,
        this.formData.business_nature_text = data.business_nature_text
        this.workflowService.validateStep(STEPS.step1);
    }

    //Employment status
    getStep2Data(): Step2 {
        var data: Step2 = {
        //method to send settlement
        settlement_collection_by_email_yesno: this.formData.settlement_collection_by_email_yesno,
        settlement_collection_by_mail_yesno: this.formData.settlement_collection_by_mail_yesno,
        settlement_collection_in_person_yesno: this.formData.settlement_collection_in_person_yesno,
        settlement_lang: this.formData.settlement_lang,
        //financial
        annual_income_id: this.formData.annual_income_id,
        total_net_asset_value_id: this.formData.total_net_asset_value_id,
        sources_of_found_ids: this.formData.sources_of_found_ids,
        investment_knowledge_id: this.formData.investment_knowledge_id,
        investment_objective_id: this.formData.investment_objective_id,
        frequency_of_transactions_per_month_id: this.formData.frequency_of_transactions_per_month_id,
        risk_tolerance_id: this.formData.risk_tolerance_id,
        //investment
        stock_experience_id: this.formData.stock_experience_id,
        structured_product_experience_id: this.formData.structured_product_experience_id,
        foreign_currency_gold_experience_id: this.formData.foreign_currency_gold_experience_id,
        warrants_experience_id: this.formData.warrants_experience_id,
        futures_options_experience_id: this.formData.futures_options_experience_id,
        other_experience_id: this.formData.other_experience_id,
        derivatives_trading_id: this.formData.derivatives_trading_id,
        //withdraw method
        withdraw_method_id: this.formData.withdraw_method_id,
        bank_name: this.formData.bank_name,
        bank_account_number: this.formData.bank_account_number,
        bank_account_holder: this.formData.bank_account_holder,
        //identity declaration
        identity_declaration1_id: this.formData.identity_declaration1_id,
        identity_declaration2_id: this.formData.identity_declaration2_id,
        identity_declaration1_text: this.formData.identity_declaration1_text,
        identity_declaration2_text: this.formData.identity_declaration2_text,
        referral_person_text: this.formData.referral_person_text,
        //password collection
        password_collection_by_email_yesno: this.formData.password_collection_by_email_yesno,
        password_collection_by_mail_yesno: this.formData.password_collection_by_mail_yesno,
        password_collection_in_person_yesno: this.formData.password_collection_in_person_yesno,
        //authorized person
        authorised_person_1_name: this.formData.authorised_person_1_name,
        authorised_person_1_relationship:this.formData.authorised_person_1_relationship,
        authorised_person_1_id_card: this.formData.authorised_person_1_id_card,
        authorised_person_1_country_phone_code: this.formData.authorised_person_1_country_phone_code,
        authorised_person_1_phone_number: this.formData.authorised_person_1_phone_number,
        authorised_person_2_name: this.formData.authorised_person_2_name,
        authorised_person_2_relationship: this.formData.authorised_person_2_relationship,
        authorised_person_2_id_card: this.formData.authorised_person_2_id_card,
        authorised_person_2_country_phone_code: this.formData.authorised_person_2_country_phone_code,
        authorised_person_2_phone_number: this.formData.authorised_person_2_phone_number,
        authorised_person_3_name: this.formData.authorised_person_3_name,
        authorised_person_3_relationship: this.formData.authorised_person_3_relationship,
        authorised_person_3_id_card: this.formData.authorised_person_3_id_card,
        authorised_person_3_country_phone_code: this.formData.authorised_person_3_country_phone_code,
        authorised_person_3_phone_number: this.formData.authorised_person_3_phone_number
        };
        return data;
    }

    setStep2Data(data: Step2) {
        this.isStep2FormValid = true;
        //method to send settlement
        this.formData.settlement_collection_by_email_yesno = data.settlement_collection_by_email_yesno,
        this.formData.settlement_collection_by_mail_yesno = data.settlement_collection_by_mail_yesno,
        this.formData.settlement_collection_in_person_yesno = data.settlement_collection_in_person_yesno,
        this.formData.settlement_lang = data.settlement_lang,
        //financial
        this.formData.annual_income_id = data.annual_income_id,
        this.formData.total_net_asset_value_id = data.total_net_asset_value_id,
        this.formData.sources_of_found_ids = data.sources_of_found_ids,
        this.formData.investment_knowledge_id = data.investment_knowledge_id,
        this.formData.investment_objective_id = data.investment_objective_id,
        this.formData.frequency_of_transactions_per_month_id = data.frequency_of_transactions_per_month_id,
        this.formData.risk_tolerance_id = data.risk_tolerance_id,
        //investment
        this.formData.stock_experience_id = data.stock_experience_id,
        this.formData.structured_product_experience_id = data.structured_product_experience_id,
        this.formData.foreign_currency_gold_experience_id = data.foreign_currency_gold_experience_id,
        this.formData.warrants_experience_id = data.warrants_experience_id,
        this.formData.futures_options_experience_id = data.futures_options_experience_id,
        this.formData.other_experience_id = data.other_experience_id,
        this.formData.derivatives_trading_id = data.derivatives_trading_id,
        //withdraw method
        this.formData.withdraw_method_id = data.withdraw_method_id,
        this.formData.bank_name = data.bank_name,
        this.formData.bank_account_number = data.bank_account_number,
        this.formData.bank_account_holder = data.bank_account_holder,
        //identity declaration
        this.formData.identity_declaration1_id = data.identity_declaration1_id,
        this.formData.identity_declaration2_id = data.identity_declaration2_id,
        this.formData.identity_declaration1_text = data.identity_declaration1_text,
        this.formData.identity_declaration2_text = data.identity_declaration2_text,
        this.formData.referral_person_text = data.referral_person_text,
        //password collection
        this.formData.password_collection_by_email_yesno = data.password_collection_by_email_yesno,
        this.formData.password_collection_by_mail_yesno = data.password_collection_by_mail_yesno,
        this.formData.password_collection_in_person_yesno = data.password_collection_in_person_yesno,
        //authorized person
        this.formData.authorised_person_1_name = data.authorised_person_1_name,
        this.formData.authorised_person_1_relationship = data.authorised_person_1_relationship,
        this.formData.authorised_person_1_id_card = data.authorised_person_1_id_card,
        this.formData.authorised_person_1_country_phone_code = data.authorised_person_1_country_phone_code,
        this.formData.authorised_person_1_phone_number = data.authorised_person_1_phone_number,
        this.formData.authorised_person_2_name = data.authorised_person_2_name,
        this.formData.authorised_person_2_relationship = data.authorised_person_2_relationship,
        this.formData.authorised_person_2_id_card = data.authorised_person_2_id_card,
        this.formData.authorised_person_2_country_phone_code = data.authorised_person_2_country_phone_code,
        this.formData.authorised_person_2_phone_number = data.authorised_person_2_phone_number,
        this.formData.authorised_person_3_name = data.authorised_person_3_name,
        this.formData.authorised_person_3_relationship = data.authorised_person_3_relationship,
        this.formData.authorised_person_3_id_card = data.authorised_person_3_id_card,
        this.formData.authorised_person_3_country_phone_code = data.authorised_person_3_country_phone_code,
        this.formData.authorised_person_3_phone_number = data.authorised_person_3_phone_number
        this.workflowService.validateStep(STEPS.step2);
    }

    //Financial and Investment experties
    getStep3Data(): Step3 {
        var data: Step3 = {
            // other_information_disclosure_ids: this.formData.other_information_disclosure_ids,
            tax_information_id:this.formData.tax_information_id,
            tax_country_id: this.formData.tax_country_id,
            tax_id: this.formData.tax_id,
            // w8ben_country_id: this.formData.w8ben_country_id
        };
        return data;
    }

    setStep3Data(data: Step3) {
        this.isStep3FormValid = true;
        // this.formData.other_information_disclosure_ids = data.other_information_disclosure_ids,
        this.formData.tax_information_id = data.tax_information_id,
        this.formData.tax_country_id = data.tax_country_id,
        this.formData.tax_id = data.tax_id,
        // this.formData.w8ben_country_id = data.w8ben_country_id
        this.workflowService.validateStep(STEPS.step3);
    }

    //Disclosure
    getStep4Data(): Step4 {
        var data: Step4 = {
            securities_account_ids: this.formData.securities_account_ids,
            found_account_ids: this.formData.found_account_ids
        };
        return data;
    }

    setStep4Data(data: Step4) {
        this.isStep4FormValid = true;
        this.formData.securities_account_ids = data.securities_account_ids,
        this.formData.found_account_ids = data.found_account_ids,
        this.workflowService.validateStep(STEPS.step4);
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isStep1FormValid = false;
        this.isStep2FormValid = false;
        this.isStep3FormValid = false;
        this.isStep4FormValid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isStep1FormValid &&
                this.isStep2FormValid &&
                this.isStep3FormValid &&
                this.isStep4FormValid
    }
}
