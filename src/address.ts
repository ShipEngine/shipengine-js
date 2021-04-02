import { sendRequest } from './utils/client';
import { Country, isCountry } from './types/country';
import * as assert from './utils/assert';

export interface Address {
    street: string | string[];
    country: Country;
    name?: string;
    companyName?: string;
    phone?: string;
    cityLocality?: string;
    stateProvince?: string;
    postalCode?: string;
    isResidential?: boolean | null;
}

export interface AddressValidationResponse {
    address?: Address,
    messages: string,
    isValid: boolean
}

export async function validateAddress(addressToValidate: Address, apiKey: string) : Promise<AddressValidationResponse> {

    // Normalizing street to an array
    const street = Array.isArray(addressToValidate.street) ? addressToValidate.street : [addressToValidate.street];
    const requestBody = {
        method: "address/validate",
        params: {
            address: {
                street,
                country_code: addressToValidate.country,
                name: addressToValidate.name,
                company_name: addressToValidate.companyName,
                phone: addressToValidate.phone,
                city_locality: addressToValidate.cityLocality,
                state_province: addressToValidate.stateProvince,
                postal_code: addressToValidate.postalCode,
                residential: addressToValidate.isResidential
            }
        }
    }

    try {
        const response = await sendRequest(requestBody, apiKey)
        const data = await response.json();
        const { valid, messages, address } = data.result;

        return {
            isValid: valid,
            address,
            messages: messages
        }
    } catch(error) {
        console.log(error);
    }
}

function validateAddressValidationParams(addressToValidate: Address) : void | Error{
    if(!isCountry(addressToValidate.country)){
        // TODO: throw a validation error
        
    }

    assert.isString(addressToValidate.companyName);
    assert.isString(addressToValidate.companyName);


}
