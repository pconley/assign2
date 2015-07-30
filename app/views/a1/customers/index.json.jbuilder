json.array! @customers do |customer|
	json.id           customer.id
	json.company_name  customer.company_name
	json.contact_name  customer.contact_name
	json.contact_email customer.contact_email
	json.contact_phone customer.contact_phone
	json.billing do
		json.email    customer.billing_email
		json.rate     customer.billing_rate
	end
end
