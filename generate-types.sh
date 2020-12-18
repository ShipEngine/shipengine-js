#!/bin/bash
src="node_modules/shipengine-json-schema"
dir="src/models/api/validate-address"

# generate requests
declare -a requests=(
  "get_tracking_log_from_label_response_body"
  # add_funds_to_carrier_request_body
  # "add_funds_to_insurance_request_body"
  # add_to_batch_request_body
  # calculate_rates_request_body
  # compare_bulk_rates_request_body
  # connect_carrier_request_body
  # connect_insurer_request_body
  # create_batch_request_body
  # create_label_from_rate_request_body
  # create_label_from_shipment_request_body
  # create_label_request_body
  # create_manifest_request_body
  # create_package_type_request_body
  # create_return_label_request_body
  # create_shipments_request_body
  # create_warehouse_request_body
  # create_webhook_request_body
  # estimate_rates_request_body
  # parse_address_request_body
  # parse_shipment_request_body
  # process_batch_request_body
  # remove_from_batch_request_body
  # update_carrier_settings_request_body
  # update_package_type_request_body
  # update_shipment_request_body
  # update_warehouse_request_body
  # update_webhook_request_body
  # validate_address_request_body
)
for i in "${requests[@]}"; do
  npx json2ts \
    "$src/requests/$i.json" \
    "$dir/$i.ts"
done

declare -a responses=(
  "get_tracking_log_from_label_response_body"
  # 400_error_response_body
  # 404_error_response_body
  # 409_error_response_body
  # 500_error_response_body
  # add_funds_to_carrier_response_body
  # add_funds_to_insurance_response_body
  # add_to_batch_response_body
  # calculate_rates_response_body
  # cancel_shipments_response_body
  # compare_bulk_rates_response_body
  # connect_carrier_response_body
  # connect_insurer_response_body
  # create_batch_response_body
  # create_label_from_rate_response_body
  # create_label_from_shipment_response_body
  # create_label_response_body
  # create_manifest_response_body
  # create_package_type_response_body
  # create_return_label_response_body
  # create_shipments_response_body
  # create_tag_response_body
  # create_warehouse_response_body
  # create_webhook_response_body
  # delete_batch_response_body
  # delete_package_type_response_body
  # delete_tag_response_body
  # delete_warehouse_response_body
  # delete_webhook_response_body
  # disconnect_carrier_response_body
  # disconnect_insurer_response_body
  # download_file_response_body
  # estimate_rates_response_body
  # get_batch_by_external_id_response_body
  # get_batch_by_id_response_body
  # get_carrier_by_id_response_body
  # get_carrier_options_response_body
  # get_carrier_settings_response_body
  # get_insurance_balance_response_body
  # get_label_by_external_shipment_id_response_body
  # get_label_by_id_response_body
  # get_manifest_by_id_response_body
  # get_package_type_by_id_response_body
  # get_rate_by_id_response_body
  # get_shipment_by_external_id_response_body
  # get_shipment_by_id_response_body
  # get_tracking_log_from_label_response_body
  # get_tracking_log_response_body
  # get_warehouse_by_id_response_body
  # get_webhook_by_id_response_body
  # list_batch_errors_response_body
  # list_batches_response_body
  # list_carrier_package_types_response_body
  # list_carrier_services_response_body
  # list_carriers_response_body
  # list_labels_response_body
  # list_manifests_response_body
  # list_package_types_response_body
  # list_shipment_errors_response_body
  # list_shipment_rates_response_body
  # list_shipments_response_body
  # list_tags_response_body
  # list_warehouses_response_body
  # list_webhooks_response_body
  # parse_address_response_body
  # parse_shipment_response_body
  # process_batch_response_body
  # remove_from_batch_response_body
  # rename_tag_response_body
  # start_tracking_response_body
  # stop_tracking_response_body
  # tag_shipment_response_body
  # untag_shipment_response_body
  # update_batch_response_body
  # update_carrier_settings_response_body
  # update_package_type_response_body
  # update_shipment_response_body
  # update_warehouse_response_body
  # update_webhook_response_body
  # validate_address_response_body
  # void_label_response_body
)

# generate responses
for i in "${responses[@]}"; do
  npx json2ts \
    "$src/responses/$i.json" \
    "$dir/$i.ts"
done
