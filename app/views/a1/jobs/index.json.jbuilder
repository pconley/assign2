json.array! @jobs do |job|
	json.status      job.status
	json.description job.description
	json.customer do
		json.id           job.customer.id
		json.company_name job.customer.company_name
	end
end