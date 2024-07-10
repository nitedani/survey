/* tslint:disable */
/* eslint-disable */
/**
 * Example API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { GetV1UsersMe400ResponseError } from './GetV1UsersMe400ResponseError';
import {
    GetV1UsersMe400ResponseErrorFromJSON,
    GetV1UsersMe400ResponseErrorFromJSONTyped,
    GetV1UsersMe400ResponseErrorToJSON,
} from './GetV1UsersMe400ResponseError';

/**
 * 
 * @export
 * @interface GetV1UsersMe400Response
 */
export interface GetV1UsersMe400Response {
    /**
     * 
     * @type {string}
     * @memberof GetV1UsersMe400Response
     */
    status: string;
    /**
     * 
     * @type {GetV1UsersMe400ResponseError}
     * @memberof GetV1UsersMe400Response
     */
    error: GetV1UsersMe400ResponseError;
}

/**
 * Check if a given object implements the GetV1UsersMe400Response interface.
 */
export function instanceOfGetV1UsersMe400Response(value: object): value is GetV1UsersMe400Response {
    if (!('status' in value) || value['status'] === undefined) return false;
    if (!('error' in value) || value['error'] === undefined) return false;
    return true;
}

export function GetV1UsersMe400ResponseFromJSON(json: any): GetV1UsersMe400Response {
    return GetV1UsersMe400ResponseFromJSONTyped(json, false);
}

export function GetV1UsersMe400ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetV1UsersMe400Response {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'],
        'error': GetV1UsersMe400ResponseErrorFromJSON(json['error']),
    };
}

export function GetV1UsersMe400ResponseToJSON(value?: GetV1UsersMe400Response | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'error': GetV1UsersMe400ResponseErrorToJSON(value['error']),
    };
}

