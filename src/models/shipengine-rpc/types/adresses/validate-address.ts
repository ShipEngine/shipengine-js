import { Compute } from '../../../../utils/ts';
import type { components } from '../generated';

/**
 * type AddressReply = {
    validated_address: {
        address_lines?: string[] | undefined;
        city_locality?: string | undefined;
        country_code?: string | undefined;
        state_province?: string | undefined;
        company_name?: string | undefined;
        is_residential?: boolean | undefined;
    };
    is_valid: boolean;
    messages: {
        ...;
    }[];
}
 */
export type AddressReply = Compute<
  components['schemas']['AddressValidationInfo']
>;

/**
 * type AddressCall = {
    address_lines?: string[] | undefined;
    city_locality?: string | undefined;
    country_code?: string | undefined;
    state_province?: string | undefined;
}
 */
export type AddressCall = Compute<components['schemas']['BaseLocationAddress']>;
